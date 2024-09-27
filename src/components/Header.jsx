import React from "react";
import DropdownUser from "./nextui/DropDownUser";

const Header = () => {
  return (
    <header className="relative z-10 h-20 lg:h-20 shadow-lg flex items-center px-10 lg:pt-0 bg-white">
      <h2 className="text-2xl font-bold text-black" id="title"></h2>

      <div className="ml-auto">
        <DropdownUser />
      </div>
    </header>
  );
};

export default Header;
