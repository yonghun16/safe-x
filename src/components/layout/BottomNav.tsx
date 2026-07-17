import { HomeIcon, EditIcon, SearchIcon, User } from '../ui/Icons';
import type { Screen } from '../../types/navigation';
import { useNavigationStore } from '../../store/useNavigationStore';
import { usePostStore } from '../../store/usePostStore';

const NAV_ITEMS: {
  screen: Screen;
  icon: typeof HomeIcon;
  label: string;
  activeScreens: Screen[];
}[] = [
  { screen: 'home', icon: HomeIcon, label: '홈', activeScreens: ['home', 'detail'] },
  { screen: 'report', icon: EditIcon, label: '제보', activeScreens: ['report'] },
  { screen: 'search', icon: SearchIcon, label: '검색', activeScreens: ['search'] },
  { screen: 'mypage', icon: User, label: '내정보', activeScreens: ['mypage'] },
];

const VISIBLE_SCREENS: Screen[] = ['home', 'report', 'search', 'mypage', 'detail'];

interface BottomNavItemProps {
  label: string;
  Icon: typeof HomeIcon;
  isActive: boolean;
  onClick: () => void;
}

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

const BottomNav = () => {
  const currentScreen = useNavigationStore((state) => state.currentScreen);
  const setScreen = useNavigationStore((state) => state.setScreen);
  const resetSearchQuery = usePostStore((state) => state.resetSearchQuery);

  if (!VISIBLE_SCREENS.includes(currentScreen)) {
    return null;
  }

  const handleNavClick = (screen: Screen) => {
    if (screen === 'search') {
      resetSearchQuery();
    }

    setScreen(screen);
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
