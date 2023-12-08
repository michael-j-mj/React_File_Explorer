
const SearchBar = ({ searchText, onSearchChange }) => {
    return (
        <input
            type="text"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
        />
    );
};
export default SearchBar;