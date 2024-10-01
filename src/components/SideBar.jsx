import React, { useState } from "react";
import { Link } from "react-router-dom";

export const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 p-4 pr-8 z-50 h-full bg-cyan-950 text-white shadow-md">
        <div className="flex justify-between items-center">
          <button className="p-4 focus:outline-none" onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"
              />
            </svg>
          </button>
          <h2 className="text-2xl font-bold">Dragfire Shop</h2>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`lg:w-1/5 w-64 bg-cyan-950 text-white lg:static fixed top-0 left-0 lg:translate-x-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform z-40`}
      >
        <div className="logo h-20 shadow-lg flex justify-center items-center">
          <h2 className="flex items-center text-2xl font-bold gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 640 512"
            >
              <path
                fill="currentColor"
                d="M18.32 255.78L192 223.96l-91.28 68.69c-10.08 10.08-2.94 27.31 11.31 27.31h222.7c-9.44-26.4-14.73-54.47-14.73-83.38v-42.27l-119.73-87.6c-23.82-15.88-55.29-14.01-77.06 4.59L5.81 227.64c-12.38 10.33-3.45 30.42 12.51 28.14zm556.87 34.1l-100.66-50.31A47.992 47.992 0 0 1 448 196.65v-36.69h64l28.09 22.63c6 6 14.14 9.37 22.63 9.37h30.97a32 32 0 0 0 28.62-17.69l14.31-28.62a32.005 32.005 0 0 0-3.02-33.51l-74.53-99.38C553.02 4.7 543.54 0 533.47 0H296.02c-7.13 0-10.7 8.57-5.66 13.61L352 63.96L292.42 88.8c-5.9 2.95-5.9 11.36 0 14.31L352 127.96v108.62c0 72.08 36.03 139.39 96 179.38c-195.59 6.81-344.56 41.01-434.1 60.91C5.78 478.67 0 485.88 0 494.2C0 504 7.95 512 17.76 512h499.08c63.29.01 119.61-47.56 122.99-110.76c2.52-47.28-22.73-90.4-64.64-111.36zM489.18 66.25l45.65 11.41c-2.75 10.91-12.47 18.89-24.13 18.26c-12.96-.71-25.85-12.53-21.52-29.67z"
              />
            </svg>
            DragFire Shop
          </h2>
        </div>

        {/* Navigation Menu */}
        <nav className="flex justify-center pt-10">
          <ul className="flex flex-col gap-8">
            <li>
              <LinkSideBar link={"/"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M22 3H2v6h1v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9h1V3zM4 5h16v2H4V5zm15 15H5V9h14v11zM9 11h6a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"
                  />
                </svg>
                Dashboard
              </LinkSideBar>
            </li>
            <li>
              {" "}
              <LinkSideBar link={"/table"}>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                >
                  {" "}
                  <path fill="currentColor" d="M8 18h6v2H8zm0 4h10v2H8z" />{" "}
                  <path
                    fill="currentColor"
                    d="M26 4H6a2.002 2.002 0 0 0-2 2v20a2.002 2.002 0 0 0 2 2h20a2.002 2.002 0 0 0 2-2V6a2.002 2.002 0 0 0-2-2Zm-8 2v4h-4V6ZM6 26V6h6v6h8V6h6l.001 20Z"
                  />{" "}
                </svg>{" "}
                Table Product{" "}
              </LinkSideBar>{" "}
            </li>{" "}
            <li>
              {" "}
              <LinkSideBar link={"/all-products"}>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 2048 2048"
                >
                  {" "}
                  <path
                    fill="currentColor"
                    d="m960 120l832 416v1040l-832 415l-832-415V536l832-416zm625 456L960 264L719 384l621 314l245-122zM960 888l238-118l-622-314l-241 120l625 312zM256 680v816l640 320v-816L256 680zm768 1136l640-320V680l-640 320v816z"
                  />{" "}
                </svg>{" "}
                All Products{" "}
              </LinkSideBar>{" "}
            </li>{" "}
            <li>
              {" "}
              <LinkSideBar link={"/data-supplier"}>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 14 14"
                >
                  {" "}
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path d="M2.9 8.875h8.2a2.305 2.305 0 0 1 0 4.61H2.9a2.305 2.305 0 0 1 0-4.61m7.545-7.379h-7c-.351 0-.636.254-.636.568v6.243c0 .314.285.568.636.568h7c.351 0 .636-.254.636-.568V2.064c0-.314-.285-.568-.636-.568" />{" "}
                    <path d="M8.218 1.496v2.838a.27.27 0 0 1-.093.2a.339.339 0 0 1-.225.084H5.99a.339.339 0 0 1-.224-.083a.27.27 0 0 1-.093-.2v-2.839" />{" "}
                  </g>{" "}
                </svg>{" "}
                Data Supplier{" "}
              </LinkSideBar>{" "}
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

// Component for Sidebar Links
const LinkSideBar = ({ link, children }) => {
  return (
    <Link
      to={link}
      className="flex items-center gap-2 p-2 hover:bg-cyan-700 rounded-md transition-all duration-300"
    >
      {children}
    </Link>
  );
};
