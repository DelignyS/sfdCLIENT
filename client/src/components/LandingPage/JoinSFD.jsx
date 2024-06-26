import Image from "next/image";
import React from "react";

function JoinSFD() {
  return (
    <div className=" relative">
      <div className="ml-10 absolute z-10 top-1/3 left-10">
        <h4 className="text-black font-bold text-5xl mb-10">
          Everything is <i>POSSIBLE</i>
        </h4>
        <button
          className="border text-base font-medium px-5 py-2   border-blue-700 bg-blue-400 hover:text-black hover:bg-blue-500 text-white rounded-md"
          type="button"
        >
          Join SFD
        </button>
      </div>
      <div className=" w-full h-96">
        <Image src="/bg-hero7.jpg" fill alt="signup" className="rounded-sm" />
      </div>
    </div>
  );
}

export default JoinSFD;