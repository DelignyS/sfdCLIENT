import { ORDER_SUCCESS_ROUTE } from "../utils/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useCookies } from 'react-cookie';

function Success() {
  const router = useRouter();
  const { payment_intent } = router.query;
  const [cookies] = useCookies(['jwt']); 

  useEffect(() => {
    const changeOrderStatus = async () => {
      try {
        await axios.post(
          ORDER_SUCCESS_ROUTE,
          { paymentIntent: payment_intent },
          { 
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${cookies.jwt}`, 
            }
          }
        );
        setTimeout(() => router.push("/buyer/orders"), 5000);
      } catch (err) {
        console.error(err);
      }
    };
    if (payment_intent) {
      changeOrderStatus();
    } else {
      router.push("/");
    }
  }, [payment_intent, router, cookies.jwt]);

  return (
    <div className="h-[80vh] flex items-center px-20 pt-20 flex-col">
      <h1 className="text-4xl text-center">
        Payment successful. You are being redirected to the orders page.
      </h1>
      <h1 className="text-4xl text-center">Please do not close the page.</h1>
    </div>
  );
}

export default Success;