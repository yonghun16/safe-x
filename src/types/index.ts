/**
 * 게시글에 작성된 댓글을 나타낸다.
 */
export interface Comment {
  /** 댓글의 고유 ID */
  id: string;

  /** 댓글 작성자 이름 */
  user: string;

  /** 댓글 내용 */
  text: string;

  /** 댓글 작성 시간 */
  time: string;
}

/**
 * 사용자가 작성한 안전 제보 게시글을 나타낸다.
 */
export interface Post {
  /** 게시글의 고유 ID */
  id: string;

  /** 게시글 제목 */
  title: string;

  /** 제보 위치 */
  location: string;

  /** 게시글 작성 시간 */
  time: string;

  /**
   * 위험도
   *
   * - `high` : 위험
   * - `medium` : 주의
   * - `low` : 안전
   */
  dangerLevel: "high" | "medium" | "low";

  /** 좋아요 개수 */
  likes: number;

  /** 댓글 개수 */
  commentsCount: number;

  /** 게시글 내용 */
  description: string;

  /** BASE64 인코딩된 대표 이미지 (data URL) */
  imageBase64?: string;

  /** 대표 이미지의 첫 번째 배경색 */
  imageColor1: string;

  /** 대표 이미지의 두 번째 배경색 */
  imageColor2: string;

  /** 게시글 작성자 ID */
  authorId?: string;

  /** 게시글 작성자 이름 */
  authorName?: string;

  /** ISO 형식 작성 시간 */
  createdAt?: string;

  /** 게시글에 작성된 댓글 목록 */
  comments: Comment[];

  /**
   * 현재 사용자의 좋아요 여부
   *
   * - `true` : 좋아요를 누른 상태
   * - `false` : 좋아요를 누르지 않은 상태
   *
   * @remarks
   * 실제 서버에서는 사용자별 좋아요 정보를 조회하여 결정되는 값이며,
   * 현재 예제에서는 프론트엔드 상태에서만 관리된다.
   */
  hasLiked?: boolean;
}
