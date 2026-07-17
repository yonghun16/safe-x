import { useEffect, useState } from "react";
import { IoBatteryFull, IoCellular, IoWifi } from "react-icons/io5";
import clsx from "clsx";

/**
 * StatusBar 컴포넌트의 Props
 */
interface StatusBarProps {
  /**
   * 상태바 테마
   *
   * @defaultValue "light"
   */
  variant?: "light" | "dark";

  /**
   * 표시할 시간
   *
   * @defaultValue "09:41"
   */
}

const getCurrentTime = () =>
  new Date().toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

/**
 * iPhone 스타일의 상태바
 *
 * @remarks
 * 앱 상단에 현재 시간과 Dynamic Island,
 * 통신 상태, Wi-Fi, 배터리 아이콘을 표시한다.
 */
const StatusBar = ({
  variant = "light",
}: StatusBarProps) => {
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getCurrentTime());
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header
      className={clsx(
        "status-bar",
        variant === "dark" && "dark-status"
      )}
    >
      <time className="status-time">{time}</time>

      <div className="dynamic-island" />

      <div className="status-icons">
        <IoCellular size={16} />
        <IoWifi size={15} />
        <IoBatteryFull size={18} />
      </div>
    </header>
  );
};

export default StatusBar;
