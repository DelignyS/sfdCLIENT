import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

function Details({ gigData }) {
  return (
    <>
    {gigData && (
      <div className="col-span-2 flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-[#404145] mb-1">
          {gigData.title}
        </h2>
        <div className="relative w-64 h-40">
          {gigData.images && gigData.images.length > 0 && (
            <div className="relative w-full h-full">
              <Image src={gigData.images[0]} alt="gig" layout="fill" className="rounded-xl object-cover" />
            </div>
          )}
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
            <strong className="font-medium">
              {gigData.createdBy.username}
            </strong>
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
        </div>
      )}
    </>
  );
}

export default Details;