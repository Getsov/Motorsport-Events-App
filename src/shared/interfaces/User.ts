export interface User {
  email: string;
  organizatorName?: string;
  role: string;
  firstName?: string;
  lastName?: string;
  region?: string;
  address?: string;
  phone?: string;
  createdEvents: { createdEventsId: string }[];
  isDeleted: boolean;
  likedEvents?: { likedEventId: string }[];
  _id?: string;
}
