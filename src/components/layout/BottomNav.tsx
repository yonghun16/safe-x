import { HomeIcon, EditIcon, SearchIcon, User } from '../ui/Icons';

interface BottomNavProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onSearchReset: () => void;
}

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

const VISIBLE_SCREENS = ['home', 'report', 'search', 'mypage', 'detail'];

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

const BottomNav = ({ currentScreen, onNavigate, onSearchReset }: BottomNavProps) => {
  if (!VISIBLE_SCREENS.includes(currentScreen)) {
    return null;
  }

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
