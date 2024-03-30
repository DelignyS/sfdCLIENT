import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function HeroBanner() {
  const [searchData, setSearchData] = useState("");
  const router = useRouter();
  const [image, setImage] = useState(2);
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${searchData}`);
  };

  useEffect(() => {
    const interval = setInterval(
      () => setImage(image >= 6 ? 1 : image + 1),
      10000
    );
    return () => clearInterval(interval);
  }, [image]);

  return (
    <div className="h-[500px] relative bg-cover">
      <div className="absolute top-0 right-0 w-[110vw] h-full transition-opacity z-0">
        <Image
          alt="hero"
          src="/bg-hero1.jpg"
          fill
          className={`${
            image === 1 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero"
          src="/bg-hero2.jpg"
          fill
          className={`${
            image === 2 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero"
          src="/bg-hero3.jpg"
          fill
          className={`${
            image === 3 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero"
          src="/bg-hero4.jpg"
          fill
          className={`${
            image === 4 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero"
          src="/bg-hero5.jpg"
          fill
          className={`${
            image === 5 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />{" "}
        <Image
          alt="hero"
          src="/bg-hero6.jpg"
          fill
          className={`${
            image === 6 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
      </div>
      <div className="z-10 relative w-[500px] flex justify-center flex-col h-full gap-5 ml-20">
        <h1 className="text-white text-5xl leading-snug">
          Spot your &nbsp; <i>Dev</i> <br /> On SpotForDevs
        </h1>
        <div className="flex align-middle">
          <form onSubmit={handleSearch} className="flex relative">
            <input
              type="text"
              className="h-14 w-[400px] pl-10 rounded-md rounded-r-none"
              placeholder="Try 'Building nest app' or 'React developer'"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#727f79] text-white hover:text-black hover:bg-[#bccac3] hover:font-bold px-2 text-lg font-semibold rounded-r-md w-auto whitespace-nowrap"
            >
              CATCH DEVS
            </button>
          </form>
        </div>
        <div className="text-white flex gap-4 pt-4">
          <h1 className="pt-4">Popular:</h1>
          <ul className="flex gap-5">
            <li
              className="text-sm py-4 px-3 border rounded hover:bg-white hover:text-black transition-all duration-300	cursor-pointer"
              onClick={() => router.push("/search?q=Dropshiping website")}
            >
              Dropshiping
            </li>
            <li
              className="text-sm py-4 px-3 border rounded hover:bg-white hover:text-black transition-all duration-300	cursor-pointer"
              onClick={() => router.push("/search?q=UI/UX")}
            >
              UI/UX
            </li>
            <li
              className="text-sm py-4 px-3 border rounded hover:bg-white hover:text-black transition-all duration-300	cursor-pointer"
              onClick={() => router.push("/search?q=design")}
            >
              Design
            </li>
            <li
              className="text-sm py-4 px-3 border rounded hover:bg-white hover:text-black transition-all duration-300	cursor-pointer"
              onClick={() => router.push("/search?q=Backend")}
            >
              Backend
            </li>
            <li
              className="text-sm py-4 px-3 border rounded hover:bg-white hover:text-black transition-all duration-300	cursor-pointer w-auto"
              onClick={() => router.push("/search?q=Ruby on Rails")}
            >
              Ruby
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
