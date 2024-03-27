import React, { useState , useEffect } from "react";
import BackToTopButton from "@/components/BackToTopButton";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import Image from "next/image";
import axios from "axios";
import { SET_USER_IMAGE, SET_USER_INFO } from "@/utils/constants";
import { reducerCases } from "@/context/constants";

function profilPage() {
  const router = useRouter();
  const [{ userInfo }, dispatch] = useStateProvider();
  const [isLoaded, setIsLoaded] = useState(true);
  const [imageHover, setImageHover] = useState(false);
  const [image, setImage] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState({
    userName: "",
    fullName: "",
    description: "",
  });
  useEffect(() => {
    if (!userInfo) {
      router.push('/');
    }
  }, [userInfo, router]);
  const handleFile = (e) => {
    let file = e.target.files;
    const fileType = file[0]["type"];
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (validImageTypes.includes(fileType)) {
      setImage(file[0]);
    }
  };
  const setProfile = async () => {
    try {
      // Get JWT from cookie
      const jwt = document.cookie
        .split("; ")
        .find((row) => row.startsWith("jwt="))
        .split("=")[1];

      // Update user info
      const response = await axios.patch(SET_USER_INFO, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
      });

      if (response.data.userNameError) {
        setErrorMessage("Enter a Unique Username");
        return;
      }


      // Upload profile image
      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        const imageResponse = await axios.post(SET_USER_IMAGE, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (imageResponse.data.error) {
          // Handle error
          console.error("Failed to upload profile image");
          return;
        }

        dispatch({
          type: reducerCases.SET_USER,
          userInfo: {
            ...userInfo,
            ...data,
            image: imageResponse.data.img
              ? HOST + "/" + imageResponse.data.img
              : false,
          },
        });
      }

      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const inputClassName =
    "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500";
  const labelClassName = "mb-2 text-lg font-medium text-gray-900";

  return (
    <>
      {isLoaded && (
        <div className="flex flex-col items-center justify-start min-h-[80vh] gap-3">
          {errorMessage && (
            <div>
              <span className="bg-red-600 font-bold">{errorMessage}</span>
            </div>
          )}
          <h2 className="text-3xl">Welcome to Your Spot</h2>
          <h4 className="text-xl">
            Please complete your Dev profile to get started
          </h4>
          <div className="flex flex-col items-center w-full gap-5">
            <div
              className="flex flex-col items-center cursor-pointer"
              onMouseEnter={() => setImageHover(true)}
              onMouseLeave={() => setImageHover(false)}
            >
              <label className={labelClassName} htmlFor="profileImage">
                Pic a Picture
              </label>
              <label htmlFor="profileImage" className="cursor-pointer">
                <div className="bg-blue-300 h-36 w-36 flex items-center justify-center rounded-full relative">
                  {image ? (
                    <Image
                      src={URL.createObjectURL(image)}
                      alt="Profile"
                      fill
                      className="rounded-full"
                    />
                  ) : (
                    <span className="text-8xl text-white">
                      {userInfo?.email.charAt(0).toUpperCase()}
                    </span>
                  )}
                  {imageHover && (
                    <div
                      className={`absolute bg-slate-500 h-full w-full rounded-full flex items-center justify-center`}
                    >
                      <span
                        className={` flex items-center justify-center  relative`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-12 h-12 text-white absolute"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  )}
                  <input
                    id="profileImage"
                    type="file"
                    onChange={handleFile}
                    className="hidden"
                    multiple={true}
                    name="profileImage"
                  />
                </div>
              </label>
            </div>
            <div className="flex-gap-4 w-[400px]">
              <div>
                <label className={labelClassName} htmlFor="username">
                  Pic a Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className={inputClassName}
                  value={data.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className={labelClassName} htmlFor="FullName">
                  Your Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className={inputClassName}
                  value={data.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col w-[500px] mt-8 justify-center text-center">
              <label className={labelClassName} htmlFor="description">
                About You
              </label>
              <textarea
                name="description"
                id="description"
                value={data.description}
                onChange={handleChange}
                className={inputClassName}
                placeholder="Tell us something intresting..."
              ></textarea>
            </div>
            <button
              className="border   text-lg font-semibold px-5 py-3   border-blue-400 bg-blue-300 text-white rounded-md"
              type="button"
              onClick={setProfile}
            >
              Set Profile
            </button>
          </div>
        </div>
      )}

      <BackToTopButton />
    </>
  );
}

export default profilPage;
