import { useCookies } from "react-cookie";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "../utils/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { useRouter } from "next/router";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import { AiOutlineClose } from "react-icons/ai";
import { GET_USER_INFO } from "../utils/constants";

function AuthWrapper({ type }) {
  const [cookies, setCookies] = useCookies();
  const [{ showLoginModal, showSignupModal }, dispatch] = useStateProvider();
  const router = useRouter();

  const [values, setValues] = useState({ email: "", password: "" });

  useEffect(() => {
    if (cookies.jwt) {
      dispatch({ type: reducerCases.CLOSE_AUTH_MODAL });
      router.push("/profilPage");
    }
  }, [cookies, dispatch, router]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    try {
      const { email, password } = values;
      if (email && password) {
        const response = await axios.post(
          type === "login" ? LOGIN_ROUTE : SIGNUP_ROUTE,
          { email, password },
          { withCredentials: true }
        );
      
        const { user, access_token } = response.data;
        setCookies("jwt", access_token);
        dispatch({ type: reducerCases.CLOSE_AUTH_MODAL });
  
        // Fetch user info
        const userInfoResponse = await axios.get(GET_USER_INFO, {
          headers: {
            'Authorization': `Bearer ${access_token}`
          },
          withCredentials: true
        });
        console.log(userInfoResponse);
  
        if (userInfoResponse.data) {
          dispatch({ type: reducerCases.SET_USER, userInfo: userInfoResponse.data });
     
        }
  
        // Redirect to profile page
        router.push('/profilPage');
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const html = document.querySelector("html");
    const authModal = document.querySelector("#auth-modal");
    const blurDiv = document.querySelector("#blur-div");
    html.style.overflowY = "hidden";
    const handleBlurDivClick = () => {
      // dispatch(closeAuthModal());
    };
    const handleAuthModalClick = (e) => {
      // e.stopPropagation();
    };
    authModal?.addEventListener("click", handleAuthModalClick);
    blurDiv?.addEventListener("click", handleBlurDivClick);

    return () => {
      const html = document.querySelector("html");
      html.style.overflowY = "initial";
      blurDiv?.removeEventListener("click", handleBlurDivClick);
      authModal?.removeEventListener("click", handleAuthModalClick);
    };
  }, [dispatch, showLoginModal, showSignupModal]);

  return (
    <div className="fixed top-0 z-[100]">
      <div
        className="h-[100vh] w-[100vw] backdrop-blur-md fixed top-0"
        id="blur-div"
      ></div>
      <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
        <div
          className="fixed z-[101] h-max w-max bg-white flex flex-col justify-center items-center rounded"
          id="auth-modal"
        >
            <button
    className="absolute top-[-10px] right-[-10px] bg-black text-white rounded-full p-1"
    onClick={() => dispatch({ type: reducerCases.CLOSE_AUTH_MODAL })}
  >
    <AiOutlineClose />
  </button>
          <div className="flex flex-col justify-center items-center p-8 gap-7">
            <h3 className="text-2xl font-semibold text-slate-700">
              {type === "login" ? "Login" : "Sign"}
                -SpotForDevs
            </h3>
            <div className="flex flex-col gap-5">

              <button className="border border-slate-300 p-3 font-medium w-80 flex items-center justify-center relative">
                <FcGoogle className="absolute left-4 text-2xl" />
                Login with Google
              </button>
            </div>
            <div className="relative  w-full text-center">
              <span className="before:content-[''] before:h-[0.5px] before:w-80 before:absolute before:top-[50%] before:left-0 before:bg-slate-400">
                <span className="bg-white relative z-10 px-2">OR</span>
              </span>
            </div>
            <div className="flex flex-col gap-5">
              <input
                type="text"
                name="email"
                placeholder="Email / Username"
                className="border border-slate-300 p-3 w-80"
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                className="border border-slate-300 p-3 w-80"
                name="password"
                onChange={handleChange}
              />
              <button
                className="bg-[#498ba1] text-white px-12 text-lg font-semibold rounded p-3 w-80"
                onClick={handleClick}
                type="button"
              >
                SpotTheDevs
              </button>
            </div>
          </div>
          <div className="py-5 w-full flex items-center justify-center border-t border-slate-400">
            <span className="text-sm  text-slate-700">
              {" "}
              {type === "login" ? (
                <>
                  Not registered?&nbsp;
                  <span
                    className="text-[#498ba1] cursor-pointer"
                    onClick={() => {
                      dispatch({
                        type: reducerCases.TOGGLE_SIGNUP_MODAL,
                        showSignupModal: true,
                      });
                      dispatch({
                        type: reducerCases.TOGGLE_LOGIN_MODAL,
                        showLoginModal: false,
                      });
                    }}
                  >
                    Sign-up
                  </span>
                </>
              ) : (
                <>
                  Already in?&nbsp;
                  <span
                    className="text-[#498ba1] cursor-pointer"
                    onClick={() => {
                      dispatch({
                        type: reducerCases.TOGGLE_SIGNUP_MODAL,
                        showSignupModal: false,
                      });
                      dispatch({
                        type: reducerCases.TOGGLE_LOGIN_MODAL,
                        showLoginModal: true,
                      });
                    }}
                  >
                    Log-in
                  </span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthWrapper;