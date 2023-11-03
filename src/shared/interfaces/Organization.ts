export interface Organization {
  name: string;
  createdEvents?: { createdEventId: string }[];
  phone: string;
  email: string;
  isDeleted: boolean;
  id: string;
  address?: string;
  manager?: string;
}
