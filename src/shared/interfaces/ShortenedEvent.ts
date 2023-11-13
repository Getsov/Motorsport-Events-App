export interface ShortenedEvent {
  shortTitle: string;
  dates: { date: string; startTime: string; endTime: string }[];
  imageUrl: string;
  _id: string;
  likedCount: number;
}
