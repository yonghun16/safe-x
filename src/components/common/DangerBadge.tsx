import type { CSSProperties } from 'react';
import type { Post } from '../../types';

interface DangerBadgeProps {
  level: Post['dangerLevel'];
  style?: CSSProperties;
}

const LEVEL_LABELS: Record<Post['dangerLevel'], string> = {
  high: '높음',
  medium: '보통',
  low: '낮음',
};

const DangerBadge = ({ level, style }: DangerBadgeProps) => {
  return (
    <span className={`post-badge level-${level}`} style={style}>
      위험도 {LEVEL_LABELS[level]}
    </span>
  );
};

export default DangerBadge;
