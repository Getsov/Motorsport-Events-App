export interface Event {
  shortTitle: string;
  longTitle?: string;
  shortDescription: string;
  longDescription: string;
  visitorPrices: { price: number; description: string }[];
  participantPrices?: { price: number; description: string }[];
  dates: { date: string; startTime: string; endTime: string }[];
  imageUrl: string;
  contacts: {
    coordinates: { lat: number; long: number };
    region: string;
    address: string;
    phone: string;
    email: string;
  };
  category: string;
  likedCount: number;
  creator: string;
  winners?: { name: string; vehicle: string; place: number }[];
  isDeleted: boolean;
  _id: string;
}
