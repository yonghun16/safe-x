import type { ReactNode } from 'react';

interface DeviceFrameProps {
  children: ReactNode;
}

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
