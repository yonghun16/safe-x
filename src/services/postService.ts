import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type Timestamp,
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import type { Comment, Post } from '../types';
import { formatRelativeTime } from '../utils/formatTime';

const POSTS_COLLECTION = 'posts';

export interface CreatePostInput {
  title: string;
  location: string;
  description: string;
  dangerLevel: Post['dangerLevel'];
  imageBase64: string;
  imageColor1: string;
  imageColor2: string;
}

interface FirestorePost {
  title: string;
  location: string;
  description: string;
  dangerLevel: Post['dangerLevel'];
  imageBase64: string;
  imageColor1: string;
  imageColor2: string;
  likes: number;
  commentsCount: number;
  comments: Comment[];
  authorId: string;
  authorName: string;
  createdAt: Timestamp | ReturnType<typeof serverTimestamp>;
}

const mapDocToPost = (id: string, data: FirestorePost): Post => {
  const createdAt = data.createdAt && 'toDate' in data.createdAt
    ? data.createdAt.toDate()
    : new Date();

  return {
    id,
    title: data.title,
    location: data.location,
    description: data.description,
    dangerLevel: data.dangerLevel,
    imageBase64: data.imageBase64,
    imageColor1: data.imageColor1,
    imageColor2: data.imageColor2,
    likes: data.likes ?? 0,
    commentsCount: data.commentsCount ?? data.comments?.length ?? 0,
    comments: data.comments ?? [],
    time: formatRelativeTime(createdAt),
    createdAt: createdAt.toISOString(),
    authorId: data.authorId,
    authorName: data.authorName,
  };
};

export const createPost = async (input: CreatePostInput): Promise<Post> => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }

  const docRef = await addDoc(collection(db, POSTS_COLLECTION), {
    title: input.title,
    location: input.location,
    description: input.description,
    dangerLevel: input.dangerLevel,
    imageBase64: input.imageBase64,
    imageColor1: input.imageColor1,
    imageColor2: input.imageColor2,
    likes: 0,
    commentsCount: 0,
    comments: [],
    authorId: user.uid,
    authorName: user.displayName ?? user.email?.split('@')[0] ?? '익명',
    createdAt: serverTimestamp(),
  });

  return {
    id: docRef.id,
    title: input.title,
    location: input.location,
    description: input.description,
    dangerLevel: input.dangerLevel,
    imageBase64: input.imageBase64,
    imageColor1: input.imageColor1,
    imageColor2: input.imageColor2,
    likes: 0,
    commentsCount: 0,
    comments: [],
    time: '방금 전',
    createdAt: new Date().toISOString(),
    authorId: user.uid,
    authorName: user.displayName ?? user.email?.split('@')[0] ?? '익명',
  };
};

export const subscribePosts = (onChange: (posts: Post[]) => void): (() => void) => {
  const postsQuery = query(
    collection(db, POSTS_COLLECTION),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(
    postsQuery,
    (snapshot) => {
      const posts = snapshot.docs.map((doc) =>
        mapDocToPost(doc.id, doc.data() as FirestorePost)
      );
      onChange(posts);
    },
    (error) => {
      console.error('Failed to subscribe posts:', error);
      onChange([]);
    }
  );
};
