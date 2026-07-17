import type { ReactNode } from "react";

interface DeviceFrameProps {
  children: ReactNode;
}

/**
 * iPhone 스타일의 기기 프레임을 렌더링하는 컴포넌트
 *
 * @remarks
 * 앱 화면을 기기 프레임 안에 표시하기 위한 레이아웃 컴포넌트이다.
 * 전달받은 `children`을 화면 영역(`device-screen`)에 렌더링한다.
 *
 * @param props - DeviceFrame 컴포넌트의 속성
 * @returns 기기 프레임으로 감싼 화면 레이아웃
 */
const DeviceFrame = ({ children }: DeviceFrameProps) => {
  return (
    <div className="device-container">
      <div className="device-screen">
        {children}
      </div>
    </div>
  );
};

export default DeviceFrame;
