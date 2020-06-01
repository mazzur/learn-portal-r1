export interface Course {
  id: string;
  title: string;
  creationDate: string;
  duration: number;
  description: string;
  date?: string;
  authors?: string;
  topRated?: boolean;
}
