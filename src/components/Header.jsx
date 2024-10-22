import React from "react";
import DropdownUser from "./nextui/DropdownUser";
import { Theme } from "./Theme";

const Header = () => {
  return (
    <header className="relative z-10 h-20 lg:h-20 shadow-lg flex items-center px-10 lg:pt-0 bg-cyan-950 dark:bg-cyan-950 text-gray-200 dark:text-gray-200">
      <h2 className="text-2xl font-bold" id="title"></h2>
      <div className="flex gap-5 ml-auto">
        <Theme />
        <DropdownUser />
      </div>
    </header>
  );
};

export default Header;
