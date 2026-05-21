export interface IVenue {
  [x: string]: any;
  _id: string;
  name: string;
  location: string;
  status: string;
  desc: string;
  price: number;
  availability: Date[];
  capacity: number;
  photos: string[];
  owner: string;
}
