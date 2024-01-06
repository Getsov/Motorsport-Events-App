import { User } from './User';

export interface Event {
  shortTitle: string;
  longTitle?: string;
  shortDescription: string;
  longDescription?: string;
  visitorPrices: { price: number; description: string }[];
  participantPrices?: { price: number; description: string }[];
  dates: { date: string; startTime: string; endTime: string }[];
  imageUrl: string;
  contacts: {
    coordinates: { lat: number; lng: number };
    region: string;
    address: string;
    phone: string;
    email: string;
  };
  category: string;
  likes: [];
  creator: User;
  winners?: { name: string; vehicle: string; place: number }[];
  isDeleted: boolean;
  _id: string;
}
