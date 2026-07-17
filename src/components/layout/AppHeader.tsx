import type { ReactNode, CSSProperties } from 'react';

/**
 * AppHeader 컴포넌트의 Props
 *
 * 화면 상단(Header)에 표시될 제목과 좌우 영역의
 * 컴포넌트를 전달하기 위해 사용하는 객체이다.
 */
interface AppHeaderProps {
  title?: string;
  left?: ReactNode;
  right?: ReactNode;
  titleStyle?: CSSProperties;
}

/**
 * 공통 Header 컴포넌트
 *
 * @param props Header에 표시할 제목과 좌우 영역 정보를 담은 Props
 *
 * @remarks
 * 여러 화면에서 동일한 Header를 재사용하기 위한 컴포넌트이다.
 *
 * 좌측(left), 제목(title), 우측(right)을 각각 독립적으로
 * 전달할 수 있도록 설계되어 있다.
 */
const AppHeader = ({ title, left, right, titleStyle }: AppHeaderProps) => {
  return (
    <header className="app-header">
      <div className="header-left">
        {left}
      </div>

      {title && (
        <h3 className="header-title" style={titleStyle}>
          {title}
        </h3>
      )}

      <div className="header-right">
        {right}
      </div>
    </header>
  );
};

export default AppHeader;
