import type { ReactNode, CSSProperties } from "react";

interface PageContainerProps {
  children: ReactNode;
  style?: CSSProperties;
  withBottomPadding?: boolean;
}

/**
 * 페이지의 기본 레이아웃을 제공하는 컨테이너 컴포넌트
 *
 * @remarks
 * 화면을 세로(`flex-direction: column`)로 배치하며,
 * 필요에 따라 하단 네비게이션 영역을 위한 여백을 자동으로 추가한다.
 * `style` 속성을 통해 기본 스타일을 확장하거나 덮어쓸 수 있다.
 */
const PageContainer = ({
  children,
  style,
  withBottomPadding = true,
}: PageContainerProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        paddingBottom: withBottomPadding ? "88px" : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default PageContainer;
