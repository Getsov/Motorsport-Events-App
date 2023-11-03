export interface Event {
  title: string;
  shortDescription: string;
  longDescription: string;
  dates: { date: string; startTime: string; endTime: string }[];
  imageUrl: string;
  contacts: {
    coordinates: { lat: string; long: string };
    city: string;
    address: string;
    phone?: string;
    email: string;
  };
  category: string;
  likedCount: number;
  creator: string;
  winners?: {name: string, vehicle: string}[];
  isDeleted: boolean;
  id: string;
}
