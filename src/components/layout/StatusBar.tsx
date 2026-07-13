interface StatusBarProps {
  variant?: 'light' | 'dark';
}

const StatusBar = ({ variant = 'light' }: StatusBarProps) => {
  return (
    <div className={`status-bar ${variant === 'dark' ? 'dark-status' : ''}`}>
      <div>09:41</div>
      <div style={{
        width: '100px',
        height: '24px',
        backgroundColor: '#000000',
        borderRadius: '20px',
        marginTop: '-4px',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)'
      }} />
      <div className="status-bar-icons">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="8" width="2.5" height="3" rx="0.5" />
          <rect x="4.5" y="6" width="2.5" height="5" rx="0.5" />
          <rect x="9" y="4" width="2.5" height="7" rx="0.5" />
          <rect x="13.5" y="1" width="2.5" height="10" rx="0.5" />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
          <path d="M7.5 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-4.24-4.24a1 1 0 0 1 0-1.42A7.5 7.5 0 0 1 14.16 3.1a1 1 0 1 1-1.41 1.41 5.5 5.5 0 0 0-7.78 0 1 1 0 0 1-1.41 0z" />
        </svg>
        <svg width="22" height="11" viewBox="0 0 22 11" fill="currentColor">
          <rect x="0" y="0" width="18" height="11" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
          <rect x="2" y="2" width="14" height="7" rx="1.5" />
          <path d="M19 3.5h1.5a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H19V3.5z" />
        </svg>
      </div>
    </div>
  );
};

export default StatusBar;
