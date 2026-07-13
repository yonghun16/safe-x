export interface Comment {
  id: string;
  user: string;
  text: string;
  time: string;
}

export interface Post {
  id: string;
  title: string;
  location: string;
  time: string;
  dangerLevel: 'high' | 'medium' | 'low';
  likes: number;
  commentsCount: number;
  description: string;
  imageColor1: string;
  imageColor2: string;
  comments: Comment[];
  hasLiked?: boolean;
}
