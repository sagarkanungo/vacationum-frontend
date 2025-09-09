import React, { useState } from "react";
import FlightPageHero from "../components/FlightPage/FlightPageHero";
import FlightPageFilter from "../components/FlightPage/FlightPageFilter";
import FlightFilters from "../components/FlightPage/FlightFilters";
import FlightResultsSection from "../components/FlightPage/FlightResultsSection";

function Flights() {
  const [tripType, setTripType] = useState("oneway");
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    segments: [ // initial with one segment for multicity
      { from: "", to: "", date: "" }
    ],
  });

  const [searchTrigger, setSearchTrigger] = useState(0);

  const handleSearch = () => {
    setSearchTrigger((prev) => prev + 1); // trigger fetch in FlightResultsSection
  };
  return (
    <>
      <FlightPageHero />
      <FlightPageFilter
        setTripType={setTripType}
        tripType={tripType}
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
      />
      <FlightResultsSection
        tripType={tripType}
        filters={filters}
        searchTrigger={searchTrigger}
      />
    </>
  );
}

export default Flights;
