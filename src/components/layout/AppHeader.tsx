import type { ReactNode, CSSProperties } from 'react';

interface AppHeaderProps {
  title?: string;
  left?: ReactNode;
  right?: ReactNode;
  titleStyle?: CSSProperties;
}

const AppHeader = ({ title, left, right, titleStyle }: AppHeaderProps) => {
  return (
    <header className="app-header">
      <div className="header-left">
        {left}
      </div>
      {title && (
        <h3 className="header-title" style={titleStyle}>{title}</h3>
      )}
      <div className="header-right">
        {right}
      </div>
    </header>
  );
};

export default AppHeader;
