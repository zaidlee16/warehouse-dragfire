import React from "react";

export default function SearchBar({ handleSearch }) {
  return (
    <div className=" flex items-center ">
      <input
        type="text"
        placeholder="Search..."
        className=" w-full rounded-lg "
        onChange={handleSearch}
      />
    </div>
  );
}
