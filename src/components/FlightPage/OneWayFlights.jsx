import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { FaPlaneDeparture, FaPlaneArrival, FaClock } from "react-icons/fa";
import useDebounce from "../../hooks/useDebounce";

export default function OneWayFlights({ from, to, date, searchTrigger }) {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1); // for pagination
  const listRef = useRef(null); // scroll container ref

  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  

  const fetchFlights = async (reset = false) => {
    if (loading) return; // Prevent duplicate fetches
    setLoading(true);

    try {
      const payload = { trip_type: "oneway", page };
      if (from) payload.from = from;
      if (to) payload.to = to;
      if (date) payload.date = date;

      const response = await axios.post(
        `${apiUrl}/api/flights/search`, // use env variable
        payload,
        { headers: { Accept: "application/json" } }
      );

      const allFlights =
        response.data.segments?.flatMap((s) => s.flights) || [];

      setFlights((prev) => (reset ? allFlights : [...prev, ...allFlights]));

      // If returned flights are less than expected, assume no more pages
      setHasMore(allFlights.length > 0);
    } catch (err) {
      console.error("Error fetching flights:", err);
      if (reset) setFlights([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch on search trigger
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchFlights(true);
  }, [searchTrigger]);

  // Infinite scroll
  const handleScroll = useDebounce(() => {
    const el = listRef.current;
    if (!el || loading || !hasMore) return;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
      setPage((prev) => prev + 1);
    }
  }, 200);

  // Fetch next page when page changes
  useEffect(() => {
    if (page === 1) return; // Already fetched on searchTrigger
    fetchFlights();
  }, [page]);

  return (
    <div
      ref={listRef}
      onScroll={handleScroll}
      className="space-y-6 overflow-y-auto pr-2"
      style={{ maxHeight: "calc(100vh - 150px)" }}
    >
      {flights.map((flight, index) => (
        <div
          key={`${flight.id}-${index}`}
          className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-lg">
              {flight.airline_iata}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <FaPlaneDeparture /> {flight.origin.city} ({flight.origin.iata})
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <FaPlaneArrival /> {flight.destination.city} (
                {flight.destination.iata})
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <FaClock /> Duration: {Math.floor(flight.duration_minutes / 60)}
                h {flight.duration_minutes % 60}m
              </div>
              <div className="text-gray-500 text-sm">
                Stops: {flight.stops === 0 ? "Non-stop" : flight.stops}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-blue-600">
              ₹{flight.price}
            </div>
            <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold">
              Book Now
            </button>
          </div>
        </div>
      ))}

      {loading && (
        <div className="text-center text-gray-600">Loading more flights...</div>
      )}
    </div>
  );
}
