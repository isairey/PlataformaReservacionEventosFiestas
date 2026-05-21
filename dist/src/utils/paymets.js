"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckOutSessions = void 0;
const stripe_1 = __importDefault(require("stripe"));
const catchErrors_1 = require("../middlewares/catchErrors");
const venue_model_1 = require("../modules/venue/venue.model");
const booking_model_1 = require("../modules/bookings/booking.model");
const transaction_model_1 = require("../../Database/transaction.model");
const dotenv_1 = __importDefault(require("dotenv"));
const appError_1 = require("./appError");
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
exports.createCheckOutSessions = (0, catchErrors_1.catchError)(
  async (req, res, next) => {
    let venue = await venue_model_1.Venue.findById(req.params.id);
    let booking = await booking_model_1.Booking.findOne({
      date: req.body.date,
    });
    let session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "egp",
            unit_amount: venue?.price,
            product_data: {
              name: venue?.name,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/success-payment/${booking?._id}`,
      cancel_url: `https://gemini.google.com/app/7017f304a2d562fe`,
      customer_email: req.user?.email,
      client_reference_id: req.user?.userId,
    });
    // storing transactions in the sql database
    await transaction_model_1.Transaction.create({
      amount_total: session.amount_total,
      email: session.customer_email,
      payment_status: session.payment_status,
    })
    res.status(200).json({ message: "success", url: session.url });
  }
);
