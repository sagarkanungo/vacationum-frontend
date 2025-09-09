import React, { useEffect, useState } from "react";
import axios from "axios";

const Cruise = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/test", {
          headers: {
            Accept: "application/json",
          },
        });

        console.log("API Response:", response.data); // check browser console
        setMessage(response.data.message || "No message received");
      } catch (error) {
        console.error("Error fetching test API:", error);
        setMessage("Error fetching API");
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Test API Response</h1>
      <p>{message}</p>
    </div>
  );
};

export default Cruise;
