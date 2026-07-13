import type { Post } from '../types';

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    title: '공사장 바닥 철근 노출',
    location: '서울 강남구 역삼동',
    time: '2시간 전',
    dangerLevel: 'high',
    likes: 24,
    commentsCount: 5,
    description: '공사장 바닥 철근이 완전히 노출되어 지나가는 시민들이 발이 걸려 넘어질 위험이 매우 큽니다. 빠른 안전 펜스 설치나 바닥 보수가 필요해 보입니다.',
    imageColor1: '#FF5C00',
    imageColor2: '#3A1200',
    comments: [
      { id: 'c-1', user: '안전이최고', text: '위험해 보입니다. 조치가 필요해요!', time: '1시간 전' },
      { id: 'c-2', user: '건설맨', text: '관리자에게 신고했습니다.', time: '30분 전' },
      { id: 'c-3', user: '현장관리자', text: '빠른 조치 하겠습니다.', time: '10분 전' },
      { id: 'c-4', user: '안전이최고', text: '감사합니다!', time: '방금 전' }
    ]
  },
  {
    id: 'post-2',
    title: '인도 블록 파손',
    location: '부산 해운대구 우동',
    time: '3시간 전',
    dangerLevel: 'medium',
    likes: 12,
    commentsCount: 3,
    description: '인도 보도블록이 심하게 깨지고 솟아올라 있어 휠체어 및 유모차 통행이 전혀 불가능하고, 밤 시간대 보행 시 발목 부상 우려가 높습니다.',
    imageColor1: '#FF9500',
    imageColor2: '#2C1B00',
    comments: [
      { id: 'c-10', user: '시민A', text: '구청에 민원 넣어볼게요.', time: '2시간 전' },
      { id: 'c-11', user: '동네주민', text: '여기는 맨날 이러네요.', time: '1시간 전' }
    ]
  },
  {
    id: 'post-3',
    title: '맨홀 뚜껑 없음',
    location: '대구 중구 동성로',
    time: '5시간 전',
    dangerLevel: 'high',
    likes: 18,
    commentsCount: 7,
    description: '유동 인구가 극도로 많은 골목길 안쪽에 맨홀 뚜껑이 열려 있어 구멍이 그대로 방치되어 있습니다. 빠질 경우 대형 추락사고로 이어질 위험이 있습니다.',
    imageColor1: '#FF3B30',
    imageColor2: '#410B00',
    comments: [
      { id: 'c-20', user: '동성로지킴이', text: '방금 고깔 세워두고 왔습니다.', time: '4시간 전' },
      { id: 'c-21', user: '안전수칙', text: '진짜 다칠 뻔했네요 ㅠㅠ', time: '3시간 전' }
    ]
  }
];
