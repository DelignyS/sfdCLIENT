import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

function Index() {
  const [gigs, setGigs] = useState([]);
  const [cookies] = useCookies(["jwt"]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [gigToDelete, setGigToDelete] = useState(null);

  useEffect(() => {
    const getGigsAndOrders = async () => {
      try {
        const decodedToken = jwt.decode(cookies.jwt);
        const userId = decodedToken.sub;

        const { data: gigs } = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/gigs/user/${userId}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${cookies.jwt}`,
            },
          }
        );

        const { data: orders } = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/seller`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${cookies.jwt}`,
            },
          }
        );

        const gigsWithOrderCount = gigs.map((gig) => ({
          ...gig,
          orderCount: orders.filter((order) => order.gigId === gig.id).length,
        }));

        setGigs(gigsWithOrderCount);
      } catch (error) {
        console.error("Failed to fetch gigs or orders", error);
      }
    };

    getGigsAndOrders();
  }, []);

  const openModal = (id) => {
    setGigToDelete(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/gigs/${gigToDelete}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        }
      );
      setGigs(gigs.filter((gig) => gig.id !== gigToDelete));
      setModalIsOpen(false);
    } catch (error) {
      console.error("Failed to delete gig", error);
    }
  };

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <h3 className="m-5 text-2xl font-semibold">All your Current Gigs</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {gigs.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <p className="p-4 text-2xl text-gray-500 dark:text-gray-400">
              You have no gigs yet. Create one now!
            </p>
            <Link passHref href="/seller/gigs/create">
              <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600">
                Create a gig
              </button>
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Delivery Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Orders
                </th>
                <th scope="col" className="px-6 py-3">
                  Delivery Time
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {gigs.map((gig) => (
                <tr
                  key={gig.id}
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {gig.title}
                  </th>
                  <td className="px-6 py-4">{gig.category}</td>
                  <td className="px-6 py-4">{gig.price}</td>
                  <td className="px-6 py-4">{gig.deliveryTime}</td>
                  <td className="px-6 py-4">
                    {gig.orderCount > 0 ? gig.orderCount : "Not Yet"}
                  </td>
                  <td className="px-6 py-4">{gig.deliveryTime}</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/seller/gigs/${gig.id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => openModal(gig.id)}
                      className="ml-4 font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <AnimatePresence>
          {modalIsOpen && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.5 }}
            >
              <p className="bg-blue-200">
                Are you sure you want to delete this gig?
              </p>
              <button
                className="text-black p-4 bg-blue-400 hover:bg-blue-500 hover:text-white"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="text-white p-4 bg-red-400 hover:bg-red-500 hover:text-black"
                onClick={closeModal}
              >
                No
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Link href="/seller/gigs/create">
        <button className="mb-5 inline-block px-6 py-3 mt-8 text-white bg-blue-500 rounded hover:bg-blue-600">
          Create New Gig
        </button>
      </Link>
    </div>
  );
}

export default Index;
