import { FiSearch } from 'react-icons/fi';

const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  onSubmit,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form className={`search-bar-wrapper ${className}`} onSubmit={handleSubmit}>
      <FiSearch className="search-bar-icon" size={18} />
      <input
        type="text"
        className="form-control search-bar-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
