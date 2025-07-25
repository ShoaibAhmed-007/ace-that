import React from "react";
import Header from "./_components/Header";

function Dashboardlayout({ children }) {
  return (
    <>
      <Header />
      <div className="mx-36 my-8">{children}</div>
    </>
  );
}

export default Dashboardlayout;
