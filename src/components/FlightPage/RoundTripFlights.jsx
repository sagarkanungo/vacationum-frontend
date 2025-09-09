import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaPlaneDeparture, FaPlaneArrival, FaClock } from "react-icons/fa";
import useDebounce from "../../hooks/useDebounce";

export default function RoundTripFlights({
  from,
  to,
  departDate,
  returnDate,
  searchTrigger,
}) {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // pagination
  const [hasMore, setHasMore] = useState(true); // Track if more pages exist
  const listRef = useRef(null);
  console.log('flight length',segments.length)

  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  
  const fetchFlights = async (reset = false) => {
    if (loading) return; // prevent multiple fetches
    setLoading(true);
  
    try {
      const payload = {
        trip_type: "roundtrip",
        page,
      };
      if (from) payload.from = from;
      if (to) payload.to = to;
      if (departDate) payload.depart_date = departDate;
      if (returnDate) payload.return_date = returnDate;
  
      const response = await axios.post(
        `${apiUrl}/api/flights/search`,
        payload,
        { headers: { Accept: "application/json", "Content-Type": "application/json" } }
      );
  
      const newSegments = response.data.segments || [];
  
      if (reset) {
        setSegments(newSegments);
      } else {
        // Merge flights into existing segments by type
        setSegments(prevSegments =>
          prevSegments.map(prevSegment => {
            const matchingSegment = newSegments.find(s => s.type === prevSegment.type);
            if (matchingSegment) {
              return {
                ...prevSegment,
                flights: [...prevSegment.flights, ...matchingSegment.flights],
              };
            }
            return prevSegment;
          })
        );
      }
  
      // Check if more data exists
      setHasMore(newSegments.some(seg => seg.flights.length > 0));
  
    } catch (err) {
      console.error(err);
      if (reset) setSegments([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };
  
  // Reset search
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchFlights(true);
  }, [from, to, departDate, returnDate, searchTrigger]);
  
  // Fetch more on page change
  useEffect(() => {
    if (page > 1) fetchFlights();
  }, [page]);
  
  // Infinite scroll
  const handleScroll = useDebounce(() => {
    const el = listRef.current;
    if (!el || loading || !hasMore) return;
  
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
      setPage(prev => prev + 1);
    }
  }, 200);
  
  // Rendering fallback
  if (!segments.length && loading)
    return <div className="text-center text-gray-600">Loading flights...</div>;
  if (!segments.length)
    return <div className="text-center text-gray-600">No flights found</div>;
  

  return (
    
    <div
      className="space-y-10 overflow-y-auto pr-2"
      onScroll={handleScroll}
      ref={listRef}
      style={{ maxHeight: "calc(100vh - 150px)" }}
    >
      {segments.map((segment, segIdx) => (
        <div key={`${segment.type}-${segIdx}`}>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            {segment.type === "return" ? "Return Flight" : "Departure Flight"}
          </h2>

          <div className="space-y-6">
            {segment.flights?.map((flight,flightIdx) => (
              <div
              key={`${segment.type}-${flight.id}-${flightIdx}`} 
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
                      <FaPlaneArrival /> {flight.destination.city} ({flight.destination.iata})
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <FaClock /> Duration: {Math.floor(flight.duration_minutes / 60)}h{" "}
                      {flight.duration_minutes % 60}m
                    </div>
                    <div className="text-gray-500 text-sm">
                      Stops: {flight.stops === 0 ? "Non-stop" : flight.stops}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-600">₹{flight.price}</div>
                  <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {loading && (
        <div className="text-center text-gray-600">Loading more flights...</div>
      )}
    </div>
  );
}
