import { globalHandeling } from "../middlewares/globalHandeling";
import { bookingRouter } from "./bookings/booking.routes";
import { userRouter } from "./user/user.routes";
import { venueRouter } from "./venue/venue.routes";

export const bootstrab = function (app: any) {
  app.use(userRouter);
  app.use(venueRouter);
  app.use(bookingRouter);
  app.use(globalHandeling);
};
