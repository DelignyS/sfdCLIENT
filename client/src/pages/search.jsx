import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ListItem from "@/components/ListItem";
import BackToTopButton from "@/components/BackToTopButton";



function Search() {
  const router = useRouter();
  const { category, q } = router.query;
  const [gigs, setGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchGigs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/gigs`,
          {
            params: {
              q,
            },
          }
        );
        let fetchedGigs = response.data;
        if (q) {
          fetchedGigs = fetchedGigs.filter((gig) =>
            gig.title.toLowerCase().includes(q.toLowerCase())
          );
        }
        if (category) {
          fetchedGigs = fetchedGigs.filter(
            (gig) => gig.category.toLowerCase() === category.toLowerCase()
          );
        }
        setGigs(fetchedGigs);
        setIsError(false);
      } catch (error) {
        console.error("Failed to fetch gigs", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGigs();
  }, [category, q]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;

  return (
    <>
   
     
      {gigs && (
        <div className="mx-24 mb-24 pt-28">
          {q && (
            <h3 className="text-4xl mb-10">
              Results for <strong>{q}</strong>
            </h3>
          )}

          <div>
            <div className="my-4">
              <span className="text-[#74767e] font-medium ">
                {gigs.length} services available
              </span>
            </div>
            <div className="grid grid-cols-4">
              {gigs.map((gig) => (
                <ListItem gig={gig} key={gig.id} />
              ))}
            </div>
           
          </div>
          <BackToTopButton />
        </div>
      )}
    </>
  );
}

export default Search;
