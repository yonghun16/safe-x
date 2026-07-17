import type { CSSProperties } from 'react';
import type { Post } from '../../../types';
import { ShieldSmall } from '../../../components/ui/Icons';

interface PostImageProps {
  post: Pick<Post, 'imageBase64' | 'imageColor1' | 'imageColor2'>;
  className?: string;
  style?: CSSProperties;
  variant?: 'card' | 'banner' | 'thumbnail';
}

const PostImage = ({
  post,
  className = '',
  style,
  variant = 'card',
}: PostImageProps) => {
  const baseClass =
    variant === 'banner'
      ? 'detail-img-banner'
      : variant === 'thumbnail'
        ? ''
        : 'post-card-img-placeholder';

  if (post.imageBase64) {
    return (
      <img
        src={post.imageBase64}
        alt=""
        className={`${baseClass} ${className}`.trim()}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: variant === 'banner' ? '240px' : variant === 'thumbnail' ? '100%' : '100%',
          display: 'block',
          ...style,
        }}
      />
    );
  }

  if (variant === 'thumbnail') {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${post.imageColor1} 0%, ${post.imageColor2} 100%)`,
          ...style,
        }}
      />
    );
  }

  return (
    <div
      className={`${baseClass} ${className}`.trim()}
      style={{
        background: `linear-gradient(135deg, ${post.imageColor1} 0%, ${post.imageColor2} 100%)`,
        ...style,
      }}
    >
      {(
        <>
          <div className="hazard-stripes" style={variant === 'banner' ? { position: 'absolute', inset: 0 } : undefined} />
          <div style={variant === 'banner' ? { transform: 'scale(1.8)', zIndex: 1 } : undefined}>
            <ShieldSmall />
          </div>
        </>
      )}
    </div>
  );
};

export default PostImage;
