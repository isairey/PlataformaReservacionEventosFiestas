import { NextFunction, Request, Response } from "express";
import { catchError } from "../../middlewares/catchErrors";
import { Booking } from "./booking.model";
import { Venue } from "../venue/venue.model";
import { AppError } from "../../utils/appError";
import { Status } from "./status";
import { formatDateToMMDDYY } from "./datehandeling";
import { Transaction } from "../../../Database/transaction.model";
import { IVenue } from "../venue/venueINTF";
// import {pay} from"../../utils/paymets"

const bookVenue = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    // first get the venue and check if it exsist or not
    let venue: IVenue | null = await Venue.findById(req.params.id);
    if (!venue) return next(new AppError("venue not found", 404));
    // then check the date
    let { date } = req.body;
    let availableDates: string[] = venue.availability.map(
      (ele: any) => (ele = formatDateToMMDDYY(ele))
    );
    if (!availableDates.includes(date))
      return next(new AppError("no such date", 400));

    // set the status depending on the date
    if (new Date(date) > new Date()) req.body.status = Status.pending;
    let dateIndex = availableDates.indexOf(date);
    // remove the date from the venue
    if (dateIndex >= 0) venue?.availability.splice(dateIndex, 1);
    else return next(new AppError("date not found", 404));
    await venue?.save();
    // finally book the venue
    req.body.venue = venue?._id;
    req.body.user = req.user?.userId;
    await Booking.create(req.body);
    next();

    // res.status(201).json({ message: "success", book });
  }
);
const cancelBooking = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    let booking = await Booking.findById(req.params.id);
    if (!booking) return next(new AppError("bookin not found", 404));
    else if (booking.user != req.user?.userId)
      return next(new AppError("un authorized", 403));
    else if (new Date() == booking.date)
      return next(new AppError("you cannot cancel", 400));
    booking.status = Status.canceld;
    await booking.save();
    res.status(200).json({ message: "canceld successfully" });
  }
);
const getUserBookings = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    let bookings = await Booking.find({ user: req.user?.userId });
    if (!bookings.length)
      return next(new AppError("You Did not book any venue Yet", 404));
    bookings.forEach(async (ele) => {
      if (
        formatDateToMMDDYY(new Date()) == formatDateToMMDDYY(ele.date) &&
        ele.paymentInfo == "paid"
      )
        ele.status = Status.confirmed;
      else if (
        ele.status == Status.confirmed &&
        formatDateToMMDDYY(new Date()) > formatDateToMMDDYY(ele.date)
      )
        await ele.deleteOne({ _id: String(ele._id) });
      else if (
        formatDateToMMDDYY(new Date()) >= formatDateToMMDDYY(ele.date) &&
        ele.paymentInfo == "unpaid"
      )
        await ele.deleteOne({ _id: String(ele._id) });

      await ele.save();
    });
    res.status(200).json({ message: "success", bookings });
  }
);

const displayMessage = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    await Booking.updateOne({ _id: req.params.id }, { paymentInfo: "paid" });
    await Transaction.update(
      { payment_status: "paid" },
      {
        where: {
          email: req.user?.email,
        },
      }
    );
    res.status(200).json({ message: "successful payment" });
  }
);

export { bookVenue, cancelBooking, getUserBookings, displayMessage };
