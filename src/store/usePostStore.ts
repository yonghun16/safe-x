import { create } from 'zustand';
import type { Post } from '../types';
import {
  createPost,
  subscribePosts,
  updatePost,
  deletePost,
  type CreatePostInput,
} from '../services/postService';
import { useNavigationStore } from './useNavigationStore';
import { useToastStore } from './useToastStore';

interface PostStore {
  posts: Post[];
  homeTab: 'new' | 'popular';
  searchQuery: string;
  isLoading: boolean;
  isSubmitting: boolean;
  setHomeTab: (tab: 'new' | 'popular') => void;
  setSearchQuery: (query: string) => void;
  resetSearchQuery: () => void;
  initPostsSubscription: () => () => void;
  addPost: (postData: CreatePostInput) => Promise<void>;
  updatePost: (postId: string, postData: Partial<CreatePostInput>) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, commentText: string, authorName: string) => void;
  navigateToSearchWithUser: (userName: string) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  homeTab: 'new',
  searchQuery: '',
  isLoading: true,
  isSubmitting: false,

  setHomeTab: (tab) => set({ homeTab: tab }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  resetSearchQuery: () => set({ searchQuery: '' }),

  initPostsSubscription: () => {
    set({ isLoading: true });

    const unsubscribe = subscribePosts((posts) => {
      set({ posts, isLoading: false });
    });

    return unsubscribe;
  },

  addPost: async (postData) => {
    set({ isSubmitting: true });

    try {
      await createPost(postData);
      useToastStore.getState().showToast('제보가 성공적으로 등록되었습니다!');
      useNavigationStore.getState().setScreen('home');
    } catch (error) {
      const message = error instanceof Error ? error.message : '제보 등록에 실패했습니다.';
      useToastStore.getState().showToast(message, 'error');
      throw error;
    } finally {
      set({ isSubmitting: false });
    }
  },

  updatePost: async (postId, postData) => {
    set({ isSubmitting: true });

    try {
      await updatePost(postId, postData);
      useToastStore.getState().showToast('제보가 성공적으로 수정되었습니다!');
      useNavigationStore.getState().setScreen('home');
    } catch (error) {
      const message = error instanceof Error ? error.message : '제보 수정에 실패했습니다.';
      useToastStore.getState().showToast(message, 'error');
      throw error;
    } finally {
      set({ isSubmitting: false });
    }
  },

  deletePost: async (postId) => {
    set({ isSubmitting: true });

    try {
      await deletePost(postId);
      useToastStore.getState().showToast('제보가 성공적으로 삭제되었습니다!');
      useNavigationStore.getState().setScreen('home');
    } catch (error) {
      const message = error instanceof Error ? error.message : '제보 삭제에 실패했습니다.';
      useToastStore.getState().showToast(message, 'error');
      throw error;
    } finally {
      set({ isSubmitting: false });
    }
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

export type { CreatePostInput as NewPostData };
