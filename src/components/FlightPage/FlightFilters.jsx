export default function FlightFilters() {
    return (
      <div className="bg-white p-4 rounded-xl shadow-md space-y-4">
        <h2 className="font-bold text-lg">Filters</h2>
  
        <div>
          <label className="block text-sm font-medium mb-1">Airlines</label>
          <select className="w-full p-2 border border-gray-300 rounded">
            <option>All Airlines</option>
            <option>Air India</option>
            <option>IndiGo</option>
          </select>
        </div>
  
        <div>
          <label className="block text-sm font-medium mb-1">Pricing</label>
          <select className="w-full p-2 border border-gray-300 rounded">
            <option>Lowest First</option>
            <option>Highest First</option>
          </select>
        </div>
  
        {/* Add more filters here */}
      </div>
    );
  }
  