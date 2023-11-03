export interface Organization {
    name: string;
    createdEvents?: {id: string}[],
    phone: string; 
    email: string;
    isDeleted: boolean;
    id: string;
  };