interface FeedTabsProps {
  activeTab: 'new' | 'popular';
  onTabChange: (tab: 'new' | 'popular') => void;
}

const FeedTabs = ({ activeTab, onTabChange }: FeedTabsProps) => {
  return (
    <div className="feed-tabs">
      <button
        type="button"
        onClick={() => onTabChange('new')}
        className={`feed-tab ${activeTab === 'new' ? 'active' : ''}`}
      >
        최신순
      </button>
      <button
        type="button"
        onClick={() => onTabChange('popular')}
        className={`feed-tab ${activeTab === 'popular' ? 'active' : ''}`}
      >
        인기순
      </button>
    </div>
  );
};

export default FeedTabs;
