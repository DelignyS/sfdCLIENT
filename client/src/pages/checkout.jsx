import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { CREATE_ORDER } from "../utils/constants";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useRouter } from "next/router";
import { useCookies } from 'react-cookie';

const stripePromise = loadStripe("pk_test_51OAeB8D8gl5KJjJk03Gw3QgDsJ1ktdCwZUbSkVXImxQzCENcLkxh1CeYN8SXBaop58e1HmRXuRdwpoUBaEEYxr3Z00azLUiCKr");

function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const router = useRouter();
  const { gigId } = router.query;
  const [cookies, setCookie] = useCookies(['jwt']);

  useEffect(() => {
    const createOrderIntent = async () => {
      const { data } = await axios.post(
        CREATE_ORDER,
        { gigId: Number(gigId) }, // Convert gigId to number
        {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
          withCredentials: true
        }
      );
      setClientSecret(data.clientSecret);
    };
    if (gigId) createOrderIntent();
  }, [gigId]);

  return (
    <div className="min-h-[80vh] max-w-full mx-20 flex flex-col gap-10 items-center">
      <h1 className="text-3xl">
        Please complete the payment to place the order.
      </h1>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{clientSecret}}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
}

export default Checkout;