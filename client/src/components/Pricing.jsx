import React, { useEffect, useState } from "react";
import { FiClock, FiRefreshCcw } from "react-icons/fi";
import { BiRightArrowAlt } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { useRouter } from "next/router";
import axios from "axios";
import { useCookies } from "react-cookie";

function Pricing({ gigData }) {
  const [cookies] = useCookies(["jwt"]);
  const [hasOrdered, setHasOrdered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkIfOrdered = async () => {
      try {
        const response = await axios.get(
          "https://apiforspotfordev.onrender.com/orders/buyer",
          {
            headers: {
              Authorization: `Bearer ${cookies.jwt}`,
            },
          }
        );

        const orders = response.data;
        if (orders.some((order) => order.gigId === gigData.id)) {
          setHasOrdered(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkIfOrdered();
  }, [gigData, cookies]);

  return (
    <>
      {gigData && (
        <div className="sticky top-36 mb-10 h-max w-96">
          <div className="border p-10 flex flex-col gap-5">
            <div className="flex justify-between">
              <h4 className="text-md font-normal text-[#74767e]">
                {gigData.shortDesc}
              </h4>
              <h6 className="font-medium text-lg">${gigData.price}</h6>
            </div>
            <div>
              <div className="text-[#62646a] font-semibold text-sm flex gap-6">
                <div className="flex items-center gap-2">
                  <FiClock className="text-xl" />
                  <span>{gigData.deliveryTime} Days Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiRefreshCcw className="text-xl" />
                  <span>{gigData.revisions} Revisions</span>
                </div>
              </div>
              <ul></ul>
            </div>
            <ul className="flex gap-1 flex-col">
              {gigData.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <BsCheckLg className="text-blue-400 text-lg" />
                  <span className="text-[#4f5156]">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className="flex items-center bg-blue-400 border border-blue-600 hover:bg-blue-500 hover:text-black  text-white py-2 justify-center font-bold text-lg relative rounded"
              onClick={() => router.push(`/checkout?gigId=${gigData.id}`)}
            >
              <span>Continue</span>
              <BiRightArrowAlt className="text-2xl absolute right-4" />
            </button>
          </div>
          {hasOrdered && (
            <div className="flex items-center justify-center mt-5">
              <button className=" w-5/6 hover:bg-[#74767e] py-1 border border-[#74767e] px-5 text-[#6c6d75] hover:text-white transition-all duration-300 text-lg rounded font-bold">
                Contact Me
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Pricing;