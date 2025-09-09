import React from "react";

function FlightPageFilter({
  setTripType,
  tripType,
  filters,
  setFilters,
  onSearch,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch();
  };

  const handleSegmentChange = (idx, field, value) => {
    const newSegments = [...filters.segments];
    newSegments[idx][field] = value;
    setFilters({ ...filters, segments: newSegments });
  };

  const addSegment = () => {
    setFilters({
      ...filters,
      segments: [...filters.segments, { from: "", to: "", date: "" }],
    });
  };

  const removeSegment = (idx) => {
    const newSegments = filters.segments.filter((_, i) => i !== idx);
    setFilters({ ...filters, segments: newSegments });
  };

  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {["oneway", "roundtrip", "multicity"].map((type) => (
              <button
                key={type}
                onClick={() => setTripType(type)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  tripType === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {type === "oneway"
                  ? "One Way"
                  : type === "roundtrip"
                  ? "Round Trip"
                  : "Multi City"}
              </button>
            ))}
          </div>
          <div className="text-gray-700 font-semibold text-lg">
            Search Lowest Price
          </div>
        </div>

        <form
          className="grid gap-6 p-4 bg-white rounded-2xl shadow-lg"
          onSubmit={handleSubmit}
        >
          {tripType !== "multicity" && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <input
                type="text"
                name="from"
                placeholder="From"
                value={filters.from}
                onChange={(e) =>
                  setFilters({ ...filters, from: e.target.value })
                }
                className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
              <input
                type="text"
                name="to"
                placeholder="To"
                value={filters.to}
                onChange={(e) => setFilters({ ...filters, to: e.target.value })}
                className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
              <input
                type="date"
                name="departDate"
                value={filters.departDate}
                onChange={(e) =>
                  setFilters({ ...filters, departDate: e.target.value })
                }
                className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
              {tripType === "roundtrip" && (
                <input
                  type="date"
                  name="returnDate"
                  value={filters.returnDate}
                  onChange={(e) =>
                    setFilters({ ...filters, returnDate: e.target.value })
                  }
                  className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
              )}
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                SEARCH
              </button>
            </div>
          )}

          {tripType === "multicity" && (
            <>
              {filters.segments.map((seg, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-3 md:grid-cols-4 gap-4 items-end mb-3"
                >
                  <input
                    type="text"
                    placeholder="From"
                    value={seg.from}
                    onChange={(e) =>
                      handleSegmentChange(idx, "from", e.target.value)
                    }
                    className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                  />
                  <input
                    type="text"
                    placeholder="To"
                    value={seg.to}
                    onChange={(e) =>
                      handleSegmentChange(idx, "to", e.target.value)
                    }
                    className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                  />
                  <input
                    type="date"
                    value={seg.date}
                    onChange={(e) =>
                      handleSegmentChange(idx, "date", e.target.value)
                    }
                    className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => removeSegment(idx)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium shadow-sm hover:shadow-md transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="flex gap-3 mb-4">
                <button
                  type="button"
                  onClick={addSegment}
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-semibold shadow-sm hover:shadow-md transition"
                >
                  Add Segment
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                >
                  SEARCH
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

export default FlightPageFilter;
