import Image from "next/image";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";
function Everything() {
  const everythingData = [
    {
      title: "Make a wish and find a Dev to fulfill it",
      subtitle:
        "Spot the perfect freelancer for your project and get the ball rolling.",
    },
    {
      title: "Catch quickly and deliver",
      subtitle:
        "Find the right Dev for your project and start to see results within days.",
    },
    {
      title: "Pay only when you are satisfied",
      subtitle:
        "With secure payments and thousands of reviewed professionals to choose from, SpotForDevs is the simplest and safest way to get work done online.",
    },
    {
      title: "Count on 24/7 support",
      subtitle:
        "Our round-the-clock support team is available to help anytime, anywhere.",
    },
  ];
  return (
    <div className="bg-[#e4e7e5] flex flex-col md:flex-row py-20 justify-between px-4 md:px-24">
      <div className="mb-10 md:mb-0">
        <h2 className="text-2xl md:text-4xl mb-5 text-[#404145] font-bold">
          Devs? What for? Everything!
        </h2>
        <ul className="flex flex-col gap-10">
          {everythingData.map(({ title, subtitle }) => {
            return (
              <li key={title}>
                <div className="flex gap-2 items-center text-lg md:text-xl">
                  <BsCheckCircle className="text-[#62646a]" />
                  <h4>{title}</h4>
                </div>
                <p className="text-[#62646a]">{subtitle}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="hidden xl:block relative h-70 w-2/3 mx-4">
        <Image src="/everything.webp" fill alt="everything" />
      </div>
    </div>
  );
}

export default Everything;