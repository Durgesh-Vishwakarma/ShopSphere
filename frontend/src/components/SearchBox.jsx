import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

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
    <Form onSubmit={formSubmitHandler} className="d-flex w-100">
      <Form.Control
        type="text"
        name="q"
        placeholder="Search Products..."
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        className="flex-grow-1"
        style={{ width: "90%", minWidth: "250px", height: "40px" }} // Decreased height, 90% width
      />
      <Button
        type="submit"
        variant="primary" // Changed color to primary
        className="mx-2 d-flex align-items-center justify-content-center"
        style={{ height: "40px", minWidth: "80px" }} // Match height, set min width for better centering
      >
        <span className="w-100 text-center">Search</span>
      </Button>
    </Form>
  );
};

export default SearchBox;
