import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Details from "@/components/ItemDetails";
import Pricing from "@/components/Pricing";
import Image from 'next/image';


function GigDetails() {
  const router = useRouter();
  const { gigId } = router.query;
  const [gigData, setGigData] = useState(null);
  useEffect(() => {
    const fetchGigData = async () => {
      try {
        console.log('Fetching gig data...');
        const jwt = document.cookie
          .split('; ')
          .find(row => row.startsWith('jwt='))
          .split('=')[1];
        const response = await axios.get(`https://apiforspotfordev.onrender.com/gigs/${gigId}`, {
          headers: {
            'Authorization': `Bearer ${jwt}`,
          },
        });
        setGigData(response.data);
        console.log('Gig data:', response.data);
      } catch (err) {
        console.log('Error fetching gig data:', err); 
      }
    };
    if (gigId) fetchGigData();
  }, [gigId]);

  if (!gigData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 mx-32 gap-20 pt-28">
      <Details gigData={gigData} />
      <Pricing gigData={gigData} />
    </div>
  );
}

export default GigDetails;