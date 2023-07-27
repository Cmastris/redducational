export default function SearchBar() {
  // TODO: implement search functionality
  return (
    <form>
      <input
        type="text"
        placeholder="Search posts..."
        aria-label="Enter search query"
      />
      <input type="submit" aria-label="Search" />
    </form>
  );
}