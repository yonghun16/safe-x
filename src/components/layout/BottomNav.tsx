import { HomeIcon, EditIcon, SearchIcon, User } from '../ui/Icons';

interface BottomNavProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onSearchReset: () => void;
}

/**
 * 하단 네비게이션 메뉴 정보
 *
 * @remarks
 * 메뉴 정보를 배열로 관리하면 JSX를 반복해서 작성하지 않아도 된다.
 *
 * map()을 이용하여 버튼을 자동으로 생성한다.
 */
const NAV_ITEMS: {
  screen: string;
  icon: typeof HomeIcon;
  label: string;
  activeScreens: string[];
}[] = [
    { screen: 'home', icon: HomeIcon, label: '홈', activeScreens: ['home', 'detail'] },
    { screen: 'report', icon: EditIcon, label: '제보', activeScreens: ['report'] },
    { screen: 'search', icon: SearchIcon, label: '검색', activeScreens: ['search'] },
    { screen: 'mypage', icon: User, label: '내정보', activeScreens: ['mypage'] },
  ];

/**
 * BottomNav를 표시할 화면 목록
 *
 * @remarks
 * 현재 화면이 이 목록에 없으면
 * 하단 네비게이션을 렌더링하지 않는다.
 */
const VISIBLE_SCREENS = ['home', 'report', 'search', 'mypage', 'detail'];
interface BottomNavItemProps {
  label: string;
  Icon: typeof HomeIcon;
  isActive: boolean;
  onClick: () => void;
}

/**
 * 하단 네비게이션의 버튼 하나를 나타내는 컴포넌트
 *
 * @param props 버튼 표시 정보와 클릭 이벤트
 */
const BottomNavItem = ({ label, Icon, isActive, onClick }: BottomNavItemProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`nav-item ${isActive ? 'active' : ''}`}
  >
    <Icon />
    <span>{label}</span>
  </button>
);

/**
 * 화면 하단에 표시되는 공통 네비게이션 컴포넌트
 *
 * @param props 현재 화면과 화면 이동 함수
 *
 * @remarks
 * - 지정된 화면에서만 표시된다.
 * - 메뉴 정보(NAV_ITEMS)를 기반으로 버튼을 생성한다.
 * - Search 메뉴를 누르면 검색 상태를 초기화한 뒤 화면을 이동한다.
 */
const BottomNav = ({ currentScreen, onNavigate, onSearchReset }: BottomNavProps) => {
  if (!VISIBLE_SCREENS.includes(currentScreen)) {
    return null;
  }

  /**
   * 메뉴 클릭을 처리한다.
   *
   * @param screen 이동할 화면 이름
   *
   * @remarks
   * Search 메뉴는 기존 검색 결과를 초기화한 후
   * Search 화면으로 이동한다.
   */
  const handleNavClick = (screen: string) => {
    if (screen === 'search') {
      onSearchReset();
    }

    onNavigate(screen);
  };

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map(({ screen, icon: Icon, label, activeScreens }) => (
        <BottomNavItem
          key={screen}
          label={label}
          Icon={Icon}
          isActive={activeScreens.includes(currentScreen)}
          onClick={() => handleNavClick(screen)}
        />
      ))}
    </nav>
  );
};

export default BottomNav;
