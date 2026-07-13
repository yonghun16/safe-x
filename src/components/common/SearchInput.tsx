import { SearchIcon } from '../ui/Icons';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = '검색어를 입력하세요'
}: SearchInputProps) => {
  return (
    <div className="search-input-wrapper">
      <span className="search-input-icon"><SearchIcon /></span>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
