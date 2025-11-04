export interface Course {
  id: any;
  title: string;
  instructor: string;
  category: string;
  duration: number;
  price: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  studentsEnrolled: number;
  description: string;
  image: string;
  lastUpdated: string;
  tags: string[];
}