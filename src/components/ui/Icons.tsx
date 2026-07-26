import type { ComponentProps } from "react";
import {
  LuMail,
  LuLock,
  LuUser,
  LuEye,
  LuEyeOff,
  LuCheck,
  LuChevronLeft,
  LuCircleAlert,
  LuBell,
  LuMapPin,
  LuHeart,
  LuMessageCircle,
  LuShare2,
  LuCamera,
  LuChevronRight,
  LuHouse,
  LuPencil,
  LuSearch,
  LuEllipsis,
} from "react-icons/lu";

/**
 * 앱 브랜드 로고
 */
export const Shield = () => (
  <img
    src="/safex.png"
    alt="SafeX Logo"
    style={{ width: "48px", height: "48px", objectFit: "contain" }}
  />
);

/**
 * 작은 브랜드 로고
 */
export const ShieldSmall = () => (
  <img
    src="/safex.png"
    alt="SafeX Logo Small"
    style={{ width: "24px", height: "24px", objectFit: "contain" }}
  />
);

// ===== React Icons =====

export const Email = LuMail;
export const Lock = LuLock;
export const User = LuUser;
export const Eye = LuEye;
export const EyeOff = LuEyeOff;
export const Check = LuCheck;
export const ChevronLeft = LuChevronLeft;
export const AlertCircle = LuCircleAlert;
export const Bell = LuBell;
export const MapPin = LuMapPin;
export const MessageCircle = LuMessageCircle;
export const Share = LuShare2;
export const Camera = LuCamera;
export const ChevronRight = LuChevronRight;
export const HomeIcon = LuHouse;
export const EditIcon = LuPencil;
export const SearchIcon = LuSearch;
export const MoreIcon = LuEllipsis;

/**
 * Heart 아이콘
 *
 * @remarks
 * `filled`가 true이면 빨간색으로 채워진 하트를 표시한다.
 */
interface HeartProps extends ComponentProps<typeof LuHeart> {
  filled?: boolean;
}

export const Heart = ({
  filled = false,
  ...props
}: HeartProps) => (
  <LuHeart
    {...props}
    fill={filled ? "#FF3B30" : "none"}
    color={filled ? "#FF3B30" : props.color}
  />
);
