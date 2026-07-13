import type { ReactNode, CSSProperties } from 'react';

interface PageContainerProps {
  children: ReactNode;
  style?: CSSProperties;
  withBottomPadding?: boolean;
}

const PageContainer = ({ children, style, withBottomPadding = true }: PageContainerProps) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      paddingBottom: withBottomPadding ? '88px' : undefined,
      ...style
    }}>
      {children}
    </div>
  );
};

export default PageContainer;
