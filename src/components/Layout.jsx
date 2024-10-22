import React from "react";
import { SideBar } from "./SideBar";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen lg:flex-row w-full bg-gray-100 dark:bg-gray-900">
      <SideBar />

      <div className="flex flex-col flex-1 w-full lg:w-4/5">
        <Header />
        <div className="flex-1 p-4 text-gray-800 dark:text-gray-200">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
