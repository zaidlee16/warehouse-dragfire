import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center py-2 px-4 bg-white border-t-2 border-gray-400 w-full">
      <p className="text-xs lg:text-base">&copy; 2024</p>
      <p className="text-xs lg:text-base">
        Developed By{" "}
        <span className="text-cyan-900 font-semibold">AmingJe</span>
      </p>
    </footer>
  );
};

export default Footer;
