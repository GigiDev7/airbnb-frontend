export interface ICreatedBy {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  image: string;
  favourites: string[];
}

export interface IBooking {
  _id: string;
  user: ICreatedBy;
  property: IProperty;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
}

export interface IRating {
  rating: number;
  _id: string;
  user: ICreatedBy;
}

export interface IReview {
  review: string;
  _id: string;
  user: ICreatedBy;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProperty {
  _id: string;
  createdBy: ICreatedBy;
  title: string;
  description: string;
  location: { city: string; country: string; address: string };
  maxGuests: number;
  rooms: { total: number; bedrooms: number; bathrooms: number };
  bedsQuantity: number;
  price: number;
  amenities: string[];
  propertyType: string;
  typeOfPlace: string;
  avgRating: number;
  images: string[];
  reviews: IReview[];
  ratings: IRating[];
  bookings: IBooking[];
}
