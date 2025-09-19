import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layouts({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-grow px-4 sm:px-10">{children}</main>
      <Footer />
    </div>
  );
}

export default Layouts;
