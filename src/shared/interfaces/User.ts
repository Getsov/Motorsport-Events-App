export interface User {
  email: string;
  role?: string;
  firstName: string;
  lastName: string;
  region?: string;
  isDeleted: boolean;
  likedEvents: { likedEventId: string }[];
  _id?: string;
}
