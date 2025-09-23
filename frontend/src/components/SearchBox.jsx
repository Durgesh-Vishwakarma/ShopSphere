import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/`);
    }
    setKeyword("");
  };

  return (
    <form onSubmit={formSubmitHandler} className="relative flex w-full max-w-md">
      <div className="relative flex-1">
        <input
          type="text"
          name="q"
          placeholder="Search products..."
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          className="w-full h-10 pl-4 pr-12 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
        />
        <button
          type="submit"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
