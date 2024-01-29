import { User } from './User';

export interface Event {
  shortTitle: string;
  longTitle?: string;
  shortDescription: string;
  longDescription?: string;
  visitorPrices: { price: number | string; description: string }[];
  participantPrices?: { price: number | string; description: string }[];
  dates: { date: string; startTime: string; endTime: string }[];
  imageUrl: string;
  contacts: {
    coordinates: { lat: number; lng: number };
    region: string;
    address: string;
    phone: string;
    email: string;
  };
  categories: string[];
  likes: string[];
  creator: User;
  winners?: { name: string; vehicle: string; place: number }[];
  isApproved: boolean;
  isDeleted: boolean;
  _id: string;
}
