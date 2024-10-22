import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center py-2 px-4 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-t-2 border-gray-400 dark:border-gray-700 w-full">
      <p className="text-xs lg:text-base">&copy; 2024</p>
      <p className="text-xs lg:text-base">
        Developed By{" "}
        <span className="text-cyan-900 dark:text-cyan-400 font-semibold">
          AmingJe
        </span>
      </p>
    </footer>
  );
};

export default Footer;
