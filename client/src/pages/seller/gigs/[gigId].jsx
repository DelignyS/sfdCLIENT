import BackToTopButton from "@/components/BackToTopButton";
import React, { useEffect, useState } from "react";
import { categories } from "@/utils/categories";

import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import axios from "axios";


function editGig() {
  const router = useRouter();
  const { gigId } = router.query;
  const [cookies] = useCookies();
  const [files, setFiles] = useState([]);
  const [features, setFeatures] = useState([]);
  const [data, setData] = useState({
    title: "",
    category: "",
    description: "",
    time: "",
    revisions: "",
    feature: "",
    price: "",
    shortDesc: "",
  });


  const EDIT_GIG_DATA = `${process.env.NEXT_PUBLIC_SERVER_URL}/gigs/${gigId}`;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const addFeature = () => {
    if (data.feature) {
      setFeatures([...features, data.feature]);
      setData({ ...data, feature: "" });
    }
  };
  const removeFeature = (index) => {
    const clonedFeatures = [...features];
    clonedFeatures.splice(index, 1);
    setFeatures(clonedFeatures);
  };

  const editGig = async () => {
    const { category, description, price, revisions, time, title, shortDesc } = data;
    if (
      category &&
      description &&
      title &&
      features.length &&
      price > 0 &&
      shortDesc.length &&
      revisions > 0 &&
      time > 0
    ) {
      const gigData = {
        title,
        description,
        category,
        features, // Pas besoin de .join(',')
        price: parseInt(price),
        revisions: parseInt(revisions),
        deliveryTime: parseInt(time),
        shortDesc,
      };
  
      try {
        console.log(gigData);
        const response = await axios.patch(EDIT_GIG_DATA, gigData, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });
      
        if (response.status === 200) {
          router.push("/seller/gigs");
        }
      } catch (error) {
        console.error("Failed to edit gig", error);
      }
    }
  };
  const fetchGigData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/gigs/${gigId}`, {
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      });
      const gigData = response.data;
      setData({
        title: gigData.title,
        category: gigData.category,
        description: gigData.description,
        time: gigData.deliveryTime.toString(),
        revisions: gigData.revisions.toString(),
        price: gigData.price.toString(),
        shortDesc: gigData.shortDesc,
        feature: "",
      });
      setFeatures(gigData.features || []);
    } catch (error) {
      console.error("Failed to fetch gig data", error);
    }
  };

  useEffect(() => {
    if (gigId) {
      fetchGigData();
    }
  }, [gigId]);

  const inputClassName =
    "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500";
  const labelClassName = "mb-2 text-lg font-medium text-gray-900";

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <h1 className="text-6xl text-black mb-5">Edit This Gig</h1>
      <h3 className="text-3xl text-black mb-5">Give us some details to Edit this Gig</h3>
      <div className="flex flex-col gap-5 mt-10">
        <form action="" className="flex flex-col gap-5 mt-10">
          <div className="grid grid-cols-1 gap-11">
            <div>
              <label htmlFor="title" className={labelClassName}>
                Title
              </label>
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                id="title"
                className={inputClassName}
                placeholder="ex: I'll growth your buisness, I'll perform a magnificent design..."
              />
            </div>
            <div>
              <label htmlFor="categories" className={labelClassName}>
                Select a Category
              </label>
              <select
                id="categories"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                name="category"
                onChange={handleChange}
                defaultValue="Choose a Category"
              >
                {categories.map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="description" className={labelClassName}>
              Description of your Gig
            </label>
            <textarea
              name="description"
              id="description"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Give us a short description of what you are offering"
              value={data.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="grid grid-cols-1 gap-11">
            <div>
              <label htmlFor="delivery" className={labelClassName}>
                Delivery Time
              </label>
              <input
                type="number"
                className={inputClassName}
                id="delivery"
                name="time"
                value={data.time}
                onChange={handleChange}
                placeholder="The minimum time to deliver your work"
                min="0"
              />
            </div>
            <div>
              <label htmlFor="revision" className={labelClassName}>
                Revisions
              </label>
              <input
                type="number"
                id="revision"
                className={inputClassName}
                placeholder="Max of Revisions I can do for you"
                name="revisions"
                value={data.revisions}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-11 border border-gray-300 rounded p-6">
            <div className="">
              <label htmlFor="features" className={labelClassName}>
                Features
              </label>
              <input
                type="text"
                name="feature"
                value={data.feature}
                onChange={handleChange}
                id="features"
                className={inputClassName}
                placeholder="A feature of your gig"
              />
              <button
                type="button"
                className="focus:outline-none text-white bg-blue-400 hover:bg-blue-500 hover:text-black  font-medium  text-lg px-10 py-3 rounded-md mt-5"
                onClick={addFeature}
              >
                Add
              </button>
            </div>
            <ul className="flex gap-2 flex-wrap">
              {features.map((feature, index) => {
                return (
                  <li
                    key={feature + index.toString()}
                    className="flex gap-2 items-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 cursor-pointer hover:border-red-200 h-[50px] w-auto"
                  >
                    <span>{feature}</span>
                    <span
                      className="text-red-700"
                      onClick={() => removeFeature(index)}
                    >
                      X
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
       
          <div className="grid grid-cols-2 gap-11">
            <div>
              <label htmlFor="shortDesc" className={labelClassName}>
                Short Description
              </label>
              <input
                type="text"
                className={`${inputClassName} w-4/5`}
                id="shortDesc"
                placeholder="Please make a short description of your gig"
                name="shortDesc"
                value={data.shortDesc}
                onChange={handleChange}
              />
            </div>
       
          </div>
          <div>
              <label htmlFor="price" className={labelClassName}>
                Gig Price ( $ )
              </label>
              <input
                type="number"
                className={`${inputClassName} w-1/5`}
                id="price"
                placeholder="The Gig Price"
                name="price"
                value={data.price}
                onChange={handleChange}
              />
            </div>
            <button
            className="border   text-lg font-semibold px-5 py-3   border-blue-500 bg-blue-400 hover:bg-blue-500 text-white rounded-md w-1/5"
            type="button"
            onClick={editGig}
          >
            Edit
          </button>
        </form>
      </div>
      <BackToTopButton />
    </div>
  );
}

export default editGig;
