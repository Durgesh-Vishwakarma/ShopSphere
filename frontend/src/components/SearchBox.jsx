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
    <form onSubmit={formSubmitHandler} className="relative flex w-full max-w-2xl">
      <div className="relative flex-1">
        <input
          type="text"
          name="q"
          placeholder="Search products..."
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          className="input pr-10"
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
