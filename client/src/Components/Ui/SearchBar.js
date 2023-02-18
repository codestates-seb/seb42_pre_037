function SearchBar({ placeholder, ...rest }) {
  // 크기에 따른 클래스 이름 결정

  const className = `inline-flex items-center justify-center font-semibold border-2 focus:outline-none bg-white focus:ring-2 focus:ring-opacity-50 disabled:opacity-50 disabled:pointer-events-none text-sm px-4 py-2 rounded `;

  return (
    <input
      type="text"
      className={className}
      placeholder={placeholder}
      {...rest}
    />
  );
}

export default SearchBar;
