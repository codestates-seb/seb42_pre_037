import { AiOutlineSearch } from 'react-icons/ai';

function SearchBar({ placeholder, ...rest }) {
  // 크기에 따른 클래스 이름 결정

  return (
    <div className="flex items-center border-2 px-2 py-2 text-gray-400 group focus-within:border-blue-300 focus-within:shadow-lg rounded">
      <AiOutlineSearch className="mr-2 text-3xl" />
      <input
        type="text"
        className="items-center justify-center focus:outline-none bg-white disabled:opacity-50 text-lg placeholder-gray-300"
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
}

export default SearchBar;
