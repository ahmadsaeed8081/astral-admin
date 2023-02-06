import React from "react";
import { SearchIcon } from "../assets/index";
const SearchBox = () => {
  return (
    <div className="search-box flex items-center">
      <div className="icon">
        <SearchIcon />
      </div>
      <input
        type="text"
        className="txt cleanbtn w-full"
        placeholder="Search Items,Collections,Creators,...."
      />
      <button className="btn button">Search</button>
    </div>
  );
};

export default SearchBox;
