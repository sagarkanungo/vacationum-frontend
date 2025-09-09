import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaPlaneDeparture, FaPlaneArrival, FaClock } from "react-icons/fa";
import useDebounce from "../../hooks/useDebounce";

export default function MultiCityFlights({ filters, searchTrigger }) {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // pagination
  const [hasMore, setHasMore] = useState(true);
  const listRef = useRef(null);

  // Fetch multicity flights
  const fetchFlights = async (reset = false) => {
    if (loading) return; // prevent multiple fetches
    setLoading(true);

    try {
      const segmentsPayload = filters.segments.filter(
        (s) => s.from && s.to && s.date
      );
      const payload = {
        trip_type: "multicity",
        page,
        segments: segmentsPayload.length ? segmentsPayload : [{}],
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/flights/search",
        payload,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const newSegments = response.data.segments || [];

      if (reset) {
        setSegments(newSegments);
      } else {
        // Merge flights into existing segments by index
        setSegments((prevSegments) =>
          prevSegments.map((prevSegment, idx) => {
            const newSegment = newSegments[idx];
            if (newSegment) {
              return {
                ...prevSegment,
                flights: [
                  ...prevSegment.flights,
                  ...(newSegment.flights || []),
                ],
              };
            }
            return prevSegment;
          })
        );
      }

      // If new segments contain flights, we have more pages
      setHasMore(
        newSegments.some((seg) => seg.flights && seg.flights.length > 0)
      );
    } catch (err) {
      console.error("Error fetching multicity flights:", err);
      if (reset) setSegments([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Reset search whenever filters change
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchFlights(true);
  }, [filters.segments, searchTrigger]);

  // Fetch more when page changes
  useEffect(() => {
    if (page > 1) fetchFlights();
  }, [page]);

  // Infinite scroll
  const handleScroll = useDebounce(() => {
    const el = listRef.current;
    if (!el || loading || !hasMore) return;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
      setPage((prev) => prev + 1);
    }
  }, 200);

  // Render fallback
  if (!segments.length && loading)
    return <div className="text-center text-gray-600">Loading flights...</div>;
  if (!segments.length)
    return <div className="text-center text-gray-600">No flights found</div>;

  return (
<div
  className="space-y-8 overflow-y-auto pr-2"
  onScroll={handleScroll}
  ref={listRef}
  style={{ maxHeight: "calc(100vh - 150px)" }}
>
  {segments.map((segment, idx) => (
    <div key={idx}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        Segment {idx + 1}: {segment.from} → {segment.to} ({segment.date})
      </h2>

      <div className="space-y-4">
        {segment.flights?.map((flight) => (
          <div
            key={flight.id}
            className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 flex items-center justify-center rounded-lg font-semibold text-lg">
                {flight.airline_iata}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-gray-800 font-medium">
                  <FaPlaneDeparture /> {flight.origin.city} ({flight.origin.iata})
                </div>
                <div className="flex items-center gap-2 text-gray-800 font-medium">
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

            <div className="text-right flex flex-col items-end gap-2">
              <div className="text-xl font-bold text-blue-600">₹{flight.price}</div>
              <button className="mt-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-5 py-2 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>


  );
}
