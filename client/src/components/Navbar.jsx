import React, { useEffect, useState } from "react";

import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCookies } from "react-cookie";
import axios from "axios";
import { GET_USER_INFO, HOST } from "../utils/constants";
import ContextMenu from "./ContextMenu";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import SFDLogo from "./SFDLogo";

function Navbar() {
  const [cookies, setCookies] = useCookies('jwt');
  const router = useRouter();
  const [navFixed, setNavFixed] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [{ showLoginModal, showSignupModal, isSeller, userInfo }, dispatch] =
    useStateProvider();
    useEffect(() => {

    }, [userInfo]);

  const handleLogin = () => {
    if (showSignupModal) {
      dispatch({
        type: reducerCases.TOGGLE_SIGNUP_MODAL,
        showSignupModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_LOGIN_MODAL,
      showLoginModal: true,
    });
  };

  const handleSignup = () => {
    if (showLoginModal) {
      dispatch({
        type: reducerCases.TOGGLE_LOGIN_MODAL,
        showLoginModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_SIGNUP_MODAL,
      showSignupModal: true,
    });
  };

  const links = [
    { linkName: "SFD Business", handler: "#", type: "link" },
    { linkName: "Explore", handler: "#", type: "link" },
    { linkName: "English", handler: "#", type: "link" },
    { linkName: "Become a Seller", handler: "#", type: "link" },
    { linkName: "Sign in", handler: handleLogin, type: "button" },
    { linkName: "Join", handler: handleSignup, type: "button2" },
  ];

  useEffect(() => {
    if (router.pathname === "/") {
      const positionNavbar = () => {
        window.pageYOffset > 0 ? setNavFixed(true) : setNavFixed(false);
      };
      window.addEventListener("scroll", positionNavbar);
      return () => window.removeEventListener("scroll", positionNavbar);
    } else {
      setNavFixed(true);
    }
  }, [router.pathname]);

  const handleOrdersNavigate = () => {
    if (isSeller) router.push("/seller/orders");
    router.push("/buyer/orders");
  };

  const handleModeSwitch = () => {
    if (isSeller) {
      dispatch({ type: reducerCases.SWITCH_MODE });
      router.push("/buyer/orders");
    } else {
      dispatch({ type: reducerCases.SWITCH_MODE });
      router.push("/seller");
    }
  };
  
  useEffect(() => {
    if (cookies.jwt && !userInfo) {
      const getUserInfo = async () => {
        try {
          const { data:user } = await axios.get(
            GET_USER_INFO,
            {
              headers: {
                Authorization: `Bearer ${cookies.jwt}`,
              },
              withCredentials: true,
            }
            
          );
         
          let projectedUserInfo = { ...user };
          if (user && user.isProfileSet === false) {
            projectedUserInfo = {
              ...projectedUserInfo,
              imageName: HOST + "/" + user.image,
            };
          }
          delete projectedUserInfo.image;
          dispatch({
            type: reducerCases.SET_USER,
            userInfo: projectedUserInfo,
          });
          setIsLoaded(true);
          console.log(user.profileImage);
          if (user.isProfileSet === false) {
            router.push("/profilPage");
          }
        } catch (err) {
          console.log(err);
        }
      };

      getUserInfo();
    } else {
      setIsLoaded(true);
    }
  }, [cookies, userInfo, dispatch]);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  useEffect(() => {
    const clickListener = (e) => {
      e.stopPropagation();

      if (isContextMenuVisible) setIsContextMenuVisible(false);
    };
    if (isContextMenuVisible) {
      window.addEventListener("click", clickListener);
    }
    return () => {
      window.removeEventListener("click", clickListener);
    };
  }, [isContextMenuVisible]);
  const ContextMenuData = [
    {
      name: "Profile",
      callback: (e) => {
        e.stopPropagation();

        setIsContextMenuVisible(false);
        router.push("/profilPage");
      },
    },
    {
      name: "Logout",
      callback: (e) => {
        e.stopPropagation();

        setIsContextMenuVisible(false);
        router.push("/logout");
      },
    },
    
  ];

  return (
    <>
      {isLoaded && (
        <nav
          className={`w-full px-24 flex justify-between items-center py-6  top-0 z-30 transition-all duration-300 ${
            navFixed || userInfo
              ? "fixed bg-white border-b border-gray-200"
              : "absolute bg-transparent border-transparent"
          }`}
        >
          <div>
            <Link href="/">
              <SFDLogo
                fillColor={!navFixed && !userInfo ? "#ffffff" : "#404145"}
              />
            </Link>
          </div>
          <div
            className={`flex ${
              navFixed || userInfo ? "opacity-100" : "opacity-0"
            }`}
          >
            <input
              type="text"
              placeholder="Do you need any Dev?"
              className="w-[30rem] py-2.5 px-4 border"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
            <button
              className="bg-gray-900 py-1.5 text-white w-16 flex justify-center items-center rounded-r mr-4"
              onClick={() => {
                setSearchData("");
                router.push(`/search?q=${searchData}`);
              }}
            >
              <IoSearchOutline className="fill-white text-white h-6 w-6" />
            </button>
          </div>
          {!userInfo ? (
            <ul className="flex gap-10 items-center">
              {links.map(({ linkName, handler, type }) => {
                return (
                  <li
                    key={linkName}
                    className={`${
                      navFixed ? "text-black" : "text-white"
                    } font-medium`}
                  >
                    {type === "link" && <Link href={handler}>{linkName}</Link>}
                    {type === "button" && (
                      <button onClick={handler}>{linkName}</button>
                    )}
                    {type === "button2" && (
                      <button
                        onClick={handler}
                        className={`border   text-md font-semibold py-1 px-3 rounded ${
                          navFixed
                            ? "border-[#1dafbf] text-[#1DBF73]"
                            : "border-white text-white"
                        } hover:bg-[#7ed7ee] hover:text-white hover:border-[#1DBF73] transition-all duration-400`}
                      >
                        {linkName}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className="flex gap-10 items-center">
              {isSeller && (
                <li
                  className="cursor-pointer text-[#1DBF73] font-medium"
                  onClick={() => router.push("/seller/gigs/create")}
                >
                  Create Gig
                </li>
              )}
              <li
                className="cursor-pointer text-[#1DBF73] font-medium"
                onClick={handleOrdersNavigate}
              >
                Orders
              </li>

              {isSeller ? (
                <li
                  className="cursor-pointer font-medium"
                  onClick={handleModeSwitch}
                >
                  Switch To Buyer
                </li>
              ) : (
                <li
                  className="cursor-pointer font-medium"
                  onClick={handleModeSwitch}
                >
                  Switch To Seller
                </li>
              )}
              <li
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsContextMenuVisible(true);
                }}
                title="Profile"
              >
                {userInfo?.profileImage ? (
                  <Image
                  src={userInfo.profileImage}
                  alt="Profile"
                  height="0"
                  width="0"
                  sizes="100vw"
                  className="rounded-full object-cover w-14 h-14"
                  priority
                  />
                ) : (
                  <div className="bg-blue-300 h-10 w-10 flex items-center justify-center rounded-full relative">
                    <span className="text-xl text-white">
                      {userInfo &&
                        userInfo?.email &&
                        userInfo?.email.split("")[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </li>
            </ul>
          )}
          {isContextMenuVisible && <ContextMenu data={ContextMenuData} />}
        </nav>
      )}
    </>
  );
}

export default Navbar;