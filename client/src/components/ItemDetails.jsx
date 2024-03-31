import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import Reviews from "@/components/Reviews";
import AddReview from "@/components/AddReview";

function Details({ gigData }) {
  const [cookies] = useCookies(["jwt"]);
  const [hasOrdered, setHasOrdered] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

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

  const handleNext = () => {
    if (gigData && gigData.images) {
      setIndex((prevIndex) => (prevIndex + 1) % gigData.images.length);
    }
  };

  const handlePrev = () => {
    if (gigData && gigData.images) {
      setIndex(
        (prevIndex) =>
          (prevIndex - 1 + gigData.images.length) % gigData.images.length
      );
    }
  };

  return (
    <div className="col-span-2 flex flex-col gap-3">
      <h2 className="text-2xl font-bold text-[#404145] mb-1">
        {gigData.title}
      </h2>
      <div className="flex justify-start items-center">
        <button onClick={handlePrev}>&lt;</button>
        <div className="relative w-64 h-40 mx-2">
          {gigData.images && gigData.images.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="relative w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={gigData.images[index]}
                  alt="gig"
                  layout="fill"
                  className="rounded-xl object-cover"
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        <button onClick={handleNext}>&gt;</button>
      </div>
      <div className="flex items-center gap-2">
        <div>
          {gigData.createdBy.profileImage ? (
            <Image
              src={gigData.createdBy.profileImage}
              alt="profile"
              className="rounded-full object-cover w-6 h-6"
              width={22}
              height={22}
            />
          ) : (
            <div className="bg-purple-500 h-7 w-7 flex items-center justify-center rounded-full relative">
              <span className="text-lg text-white">
                {gigData.createdBy.email[0].toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <strong className="font-medium">{gigData.createdBy.username}</strong>
      </div>
      <div>
        <p className="line-clamp-2 text-[#404145]">{gigData.title}</p>
      </div>
      <div className="flex items-center gap-1 text-yellow-400">
        <FaStar />
        <span>
          <strong className="font-medium">{gigData.averageRating}</strong>
        </span>
        <span className="text-[#74767e]">({gigData.totalReviewsCount})</span>
      </div>
      <div>
        <strong className="font-medium">From {gigData.price}</strong>
      </div>
      <div className="inline-block p-6 bg-black text-white rounded">
        {gigData.description}
      </div>
      <div className="inline-block p-6 bg-black text-white rounded">
      <div
  className="p-2 border rounded bg-white text-black mb-4 cursor-pointer"
  onClick={() => setIsAccordionOpen(!isAccordionOpen)}
>
  <h4 className="font-bold flex items-center justify-between">
    Reviews
    <button
      className="ml-2 rounded-full w-6 h-6 flex items-center justify-center"
      onClick={(e) => {
        e.stopPropagation();
        setIsAccordionOpen(!isAccordionOpen);
      }}
    >
      {isAccordionOpen ? "-" : "+"}
    </button>
  </h4>
</div>
        <AnimatePresence>
          {isAccordionOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {gigData.reviews.map((review, index) => (
                <div key={index}>
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(review.rating)].map((star, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <h4 className="text-2xl font-bold">
                    {review.reviewer.username}
                  </h4>
                  <p>{review.createdAt}</p>
                  <p>{review.reviewText}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Reviews />
      {hasOrdered && <AddReview gigId={gigData.id} />}
    </div>
  );
}

export default Details;
