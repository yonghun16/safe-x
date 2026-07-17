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
  <svg
    width="48"
    height="54"
    viewBox="0 0 48 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 0C37.3333 4 45.3333 12 48 24C48 37.3333 37.3333 48.6667 24 54C10.6667 48.6667 0 37.3333 0 24C2.66667 12 10.6667 4 24 0Z"
      fill="#FF7622"
    />
    <rect x="21" y="14" width="6" height="18" rx="3" fill="white" />
    <circle cx="24" cy="38" r="3.5" fill="white" />
  </svg>
);

/**
 * 작은 브랜드 로고
 */
export const ShieldSmall = () => (
  <svg
    width="24"
    height="27"
    viewBox="0 0 24 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 0C18.6667 2 22.6667 6 24 12C24 18.6667 18.6667 24.3333 12 27C5.33333 24.3333 0 18.6667 0 12C1.33333 6 5.33333 2 12 0Z"
      fill="#FF7622"
    />
    <rect x="10.5" y="7" width="3" height="9" rx="1.5" fill="white" />
    <circle cx="12" cy="19" r="1.75" fill="white" />
  </svg>
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
