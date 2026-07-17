import { create } from 'zustand';
import type { Post } from '../types';
import { INITIAL_POSTS } from '../constants/mockPosts';
import { useNavigationStore } from './useNavigationStore';
import { useToastStore } from './useToastStore';

interface NewPostData {
  title: string;
  location: string;
  description: string;
  dangerLevel: 'high' | 'medium' | 'low';
  imageColor1: string;
  imageColor2: string;
}

interface PostStore {
  posts: Post[];
  homeTab: 'new' | 'popular';
  searchQuery: string;
  setHomeTab: (tab: 'new' | 'popular') => void;
  setSearchQuery: (query: string) => void;
  resetSearchQuery: () => void;
  addPost: (postData: NewPostData) => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, commentText: string, authorName: string) => void;
  navigateToSearchWithUser: (userName: string) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: INITIAL_POSTS,
  homeTab: 'new',
  searchQuery: '',

  setHomeTab: (tab) => set({ homeTab: tab }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  resetSearchQuery: () => set({ searchQuery: '' }),

  addPost: (postData) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      title: postData.title,
      location: postData.location,
      time: '방금 전',
      dangerLevel: postData.dangerLevel,
      likes: 0,
      commentsCount: 0,
      description: postData.description,
      imageColor1: postData.imageColor1,
      imageColor2: postData.imageColor2,
      comments: [],
    };

    set((state) => ({ posts: [newPost, ...state.posts] }));
    useToastStore.getState().showToast('제보가 성공적으로 등록되었습니다!');
    useNavigationStore.getState().setScreen('home');
  },

  toggleLike: (postId) => {
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id !== postId) return post;

        const isLiked = post.hasLiked;
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          hasLiked: !isLiked,
        };
      }),
    }));
  },

  addComment: (postId, commentText, authorName) => {
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id !== postId) return post;

        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: `c-${Date.now()}`,
              user: authorName,
              text: commentText,
              time: '방금 전',
            },
          ],
          commentsCount: post.commentsCount + 1,
        };
      }),
    }));

    useToastStore.getState().showToast('댓글이 등록되었습니다.');
  },

  navigateToSearchWithUser: (userName) => {
    set({ searchQuery: userName });
    useNavigationStore.getState().setScreen('search');
  },
}));

export type { NewPostData };
