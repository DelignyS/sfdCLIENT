import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Reviews({ gigData }) {
  const [reviews, setReviews] = useState([]);
  const [cookies] = useCookies(['jwt']);
  
  useEffect(() => {
    // Fetch gig data by id
    const token = cookies.jwt;
    if (gigData && gigData.id) {
      axios.get(`https://apiforspotfordev.onrender.com/gigs/${gigData.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        setReviews(response.data.reviews);
      })
      .catch((error) => {
        console.error("Error fetching gig data", error);
      });
    }
  }, [gigData, cookies]);

  return (
    <div className="flex flex-col gap-6">
      {reviews.map((review) => {
        const reviewer = review ? review.reviewer : null;
        return (
          <div className="flex gap-3 border-t pt-6" key={review && review.id ? review.id : ''}>
            <div>
            {reviewer && reviewer.profileImage ? (
                <Image
                  src={reviewer.profileImage}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                  <span className="text-xl text-white">
                  {reviewer && reviewer.email ? reviewer.email[0].toUpperCase() : ''}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
            <h4>{reviewer && reviewer.fullName ? reviewer.fullName : ''}</h4>
              <div className="flex text-yellow-500 items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer ${
                        review && review.rating >= star ? "text-yellow-400" : "text-gray-300"}
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span>{review && review.rating ? review.rating : ''}</span>
              </div>
              <p className="text-[#404145] pr-20">{review && review.reviewText ? review.reviewText : ''}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Reviews;