export interface User {
    email: string;
    role: string; 
    firstName?: string; 
    lastName?: string; 
    city: string;
    isDeleted: boolean;
    likedEvents: { id: string }[];
    _id?: string;
}