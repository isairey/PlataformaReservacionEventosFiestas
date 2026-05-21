import { Types } from "mongoose";
import { Schema, model } from "mongoose";

const venueSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
      minLength: [3, "name too short"],
    },
    location: {
      type: String,
      minLength: [3, "name too short"],
    },
    status:{

    },
    desc: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    availability: {
      type: [Date],
    },
    capacity: {
      type: Number,
    },
    photos: {
      type: [String],
    },
    owner: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false }
);
venueSchema.post("find", (doc) => {
  let url = process.env.BASE_URL + "uploads/venues/";
  doc.photos = doc.photos?.map((image: string) => url + image);
});
export let Venue = model("Venue", venueSchema);
