import FlightFilters from "./FlightFilters";
import OneWayFlights from "../FlightPage/OneWayFlights"
import RoundTripFlights from "../FlightPage/RoundTripFlights";
import MultiCityFlights from "../FlightPage/MultiCityFlights";

export default function FlightResultsSection({ tripType, filters, searchTrigger }) {
  return (
    <section className="w-full flex gap-6 mt-8 max-w-6xl mx-auto">
      {/* Left: Filters */}
      <div className="w-1/4">
        <FlightFilters />
      </div>

      {/* Right: Flight Results */}
      <div className="w-3/4 space-y-4">
        {tripType === "oneway" && <OneWayFlights {...filters} searchTrigger={searchTrigger} />}
        {tripType === "roundtrip" && <RoundTripFlights {...filters} searchTrigger={searchTrigger} />}
        {tripType === "multicity" && <MultiCityFlights filters={filters} searchTrigger={searchTrigger} />}
      </div>
    </section>
  );
}
