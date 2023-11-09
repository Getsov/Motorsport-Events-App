export interface Organization {
  name: string;
  createdEvents?: { createdEventId: string }[];
  phone: string;
  email: string;
  managerFirstName: string;
  managerLastName: string;
  region: string;
  isDeleted: boolean;
  _id: string;
  address?: string;
  manager?: string;
}
