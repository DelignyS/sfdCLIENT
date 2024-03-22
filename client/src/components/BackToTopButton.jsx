import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (!isVisible && window.pageYOffset > 200) {
        setIsVisible(true);
      } else if (isVisible && window.pageYOffset <= 200) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <motion.div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0.2, y: 0 }}
          animate={{ opacity: 1, y: "10px" }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="fixed bottom-4 right-4 cursor-pointer  p-2 rounded-full" // Position fixe en bas à droite avec Tailwind CSS
        >
          <svg
            viewBox="0 0 38 24"
            fill="none"
            width={50}
            height={50}
          >
            <path
              d="M5 9C5 7.14348 5.73754 5.36305 7.05029 4.05029C8.36305 2.73754 10.1435 2 12 2C13.8565 2 15.637 2.73754 16.9498 4.05029C18.2625 5.36305 19 7.14348 19 9V15C19 16.8565 18.2625 18.6371 16.9498 19.9498C15.637 21.2626 13.8565 21.9999 12 21.9999C10.1435 21.9999 8.36305 21.2626 7.05029 19.9498C5.73754 18.6371 5 16.8565 5 15Z"
              stroke="#000000"
              strokeWidth="1"
            ></path>
            <path d="M12 18V10" stroke="#000000" strokeWidth="1"></path>
            <path d="M9 13L12 10L15 13" stroke="#000000" strokeWidth="1"></path>
          </svg>
        </motion.div>
      )}
    </>
  );
}