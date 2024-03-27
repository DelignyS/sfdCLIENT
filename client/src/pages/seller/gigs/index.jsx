import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import BackToTopButton from "@/components/BackToTopButton";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import jwt from 'jsonwebtoken';

function index() {
  const [gigs, setGigs] = useState([]);
  const [cookies] = useCookies(["jwt"]);

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const getGigs = async () => {
      try {
        const decodedToken = jwt.decode(cookies.jwt);
        const userId = decodedToken.sub;
  
        console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}/gigs/user/${userId}`);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/gigs/user/${userId}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });
        setGigs(response.data);
      } catch (error) {
        console.error("Failed to fetch gigs", error);
      }
    };
  
    getGigs();
  }, []);
  return (
    <div className="min-h[80vh] my-10 mt-0 px-32">
      <h2 className="m-5 text-2xl font-bold">All your current Gigs</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-500 gap-4">
          <thead className="h-20 text-xs text-gray-200 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
            <tr>
              <th className="w-1 p-9">Title</th>
              <th className="w-1 p-12">Categorie</th>
              <th className="">Short Description</th>
              <th className="">Delivery Time</th>
              <th className="">Images</th>
              <th className="">Oders</th>
              <th className="w-1 p-4">Price</th>
              <th className="">Edit</th>
              <th className="text-red-700">Delete</th>


              
              {/* Ajoutez d'autres en-têtes de tableau ici pour d'autres informations sur le gig */}
            </tr>
          </thead>
          <tbody>
            {gigs.map((gig) => (
              <tr key={gig.id} className="">
                <td className="ml-4 p-9">{gig.title}</td>
                <td className="">{gig.category}</td>
                <td className="">{gig.shortDesc}</td>
                <td className="">{gig.deliveryTime}</td>
                <td className="">
                  {gig.images.length > 1 ? (
                    <div>
                      <button
                        onClick={() =>
                          setCurrentImage(
                            (currentImage - 1 + gig.images.length) %
                              gig.images.length
                          )
                        }
                      >
                        &lt;
                      </button>
                      <button
                        onClick={() =>
                          setCurrentImage(
                            (currentImage + 1) % gig.images.length
                          )
                        }
                      >
                        &gt;
                      </button>
                      <AnimatePresence>
                        <motion.img
                          key={currentImage}
                          className="w-20 h-20 object-cover"
                          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/gigs/${gig.images[currentImage]}`}
                          alt={`Gig ${gig.id} Image ${currentImage}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1 }}
                        />
                      </AnimatePresence>
                    </div>
                  ) : (
                    <img
                      className="w-20 h-20 object-cover"
                      src={`${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/gigs/${gig.images[0]}`}
                      alt={`Gig ${gig.id} Image 0`}
                    />
                  )}
                </td>
                <td className="">{gig.orders && gig.orders.length > 0 ? gig.orders : 'Not yet'}</td>
                <td className="">{gig.price}</td>
                <td className="">                    <Link
                      href={`/seller/gigs/${gig.id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link></td>
                <td className=""></td>
              </tr>
            ))}
          </tbody>
        </table>
        <BackToTopButton />
      </div>
    </div>
  );
}

export default index;
