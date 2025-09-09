import axios from 'axios';
import React, { useEffect } from 'react'

function Holidays() {
  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/airports",
          {
            headers: { Accept: "application/json" },
          }
        );
        console.log("Airports API response:", response.data);
      } catch (error) {
        console.error("Error fetching airports:", error);
      }
    };

    fetchAirports();
  }, []);
  return (
    <div>Holidays</div>
  )
}

export default Holidays