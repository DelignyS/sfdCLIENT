import { useStateProvider } from "../../context/StateContext";
import { GET_SELLER_DASHBOARD_DATA, HOST } from "@/utils/constants";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import BackToTopButton from "@/components/BackToTopButton";

function Index() {
  const [{ userInfo }] = useStateProvider();
  const router = useRouter();
  const [cookies] = useCookies(['jwt']);
  const [dashboardData, setDashboardData] = useState(undefined);

  useEffect(() => {
    const getBuyerDashboardData = async () => {
      const response = await axios.get(GET_SELLER_DASHBOARD_DATA, {
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setDashboardData(response.data);
      }
      console.log({ response });
    };
    if (userInfo) {
      getBuyerDashboardData();
    }
  }, [userInfo, cookies]);
  return (
    <>
      {userInfo && (
        <div className="flex min-h-[80vh] my-10 mt-0 px-32 gap-5">
          <div className="shadow-md h-max p-10 flex flex-col gap-5 min-w-96 w-96">
            <div className="flex gap-5 justify-center items-center">
              <div>
                {userInfo?.profileImage ? (
                  <Image
                    src={userInfo.profileImage}
                    alt="Profile"
                    width={140}
                    height={140}
                    className="rounded-full"
                  />
                ) : (
                  <div className="bg-purple-500 h-24 w-24 flex items-center justify-center rounded-full relative">
                    <span className="text-5xl text-white">
                      {userInfo.email[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#62646a] text-lg font-medium">
                  {userInfo.username}
                </span>
                <span className="font-bold text-md">{userInfo.fullName}</span>
              </div>
            </div>
            <div className="border-t py-5">
              <p>{userInfo.description}</p>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-10 w-full">
              <div
                className="shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => router.push("/seller/gigs")}
              >
                <h2 className="text-xl">Total Count Gigs</h2>
                <h3 className="text-blue-400 text-3xl font-extrabold">
                  {dashboardData?.gigsCount}
                </h3>
              </div>
              <div
                className="shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => router.push("/seller/orders")}
              >
                <h2 className="text-xl">Total Orders</h2>
                <h3 className="text-blue-400 text-3xl font-extrabold">
                  {dashboardData?.ordersCount}
                </h3>
              </div>
              <div
                className="shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => router.push("/seller/unread-messages")}
              >
                <h2 className="text-xl"> Unread Messages</h2>
                <h3 className="text-blue-400 text-3xl font-extrabold">
                  {dashboardData?.unreadMessagesCount}
                </h3>
              </div>

              <div className="shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300">
                <h2 className="text-xl">Earnings Today</h2>
                <h3 className="text-blue-400 text-3xl font-extrabold">
                  ${dashboardData?.dailyRevenue}
                </h3>
              </div>
              <div className="shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300">
                <h2 className="text-xl">Earnings Monthly</h2>
                <h3 className="text-blue-400 text-3xl font-extrabold">
                  ${dashboardData?.monthlyRevenue}
                </h3>
              </div>
              <div className="shadow-md h-max p-10 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300">
                <h2 className="text-xl">Earnings Yearly</h2>
                <h3 className="text-blue-400 text-3xl font-extrabold">
                  ${dashboardData?.annualRevenue}
                </h3>
              </div>
            </div>
          </div>
        <BackToTopButton />        
        </div>
      )}
    </>
  );
}

export default Index;