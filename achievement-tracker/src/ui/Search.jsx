import Input from "../styles/Input";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchBy, setSearchBy] = useState(searchParams.get('search') || "")

  const processSearch = (e) => {
    searchParams.set("search", searchBy);
    setSearchParams(searchParams);
  }

  return (
    <Input
      type="text"
      id="search"
      value={searchBy}
      onChange={(e) => setSearchBy(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter")
        {
          processSearch(e);
        }
      }}
    />
  )
}

export default Search
