export interface User {
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  phone?: string;
  isDeleted: boolean;
  likedEvents: { likedEventId: string }[];
  _id?: string;
}
