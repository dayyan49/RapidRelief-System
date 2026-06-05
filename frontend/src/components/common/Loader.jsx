import React from "react";
import { logo } from "../../assets/assets";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center  bg-slate-950 z-50">
      <img
        src={logo}
        alt="RapidRelief"
        className="w-20 h-20 mb-4 animate-pulse rounded-4xl"
      />

      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-teal-500"></div>

      <p className="mt-4 text-slate-300">
        Loading...
      </p>
    </div>
  );
};

export default Loader;