import React from 'react'

function Footer() {
  return (
    <div>

<footer className="w-full">
  {/* City Names Section */}
  {/* <div className="bg-gray-400 py-8 px-4 md:px-20 text-white">
    <h2 className="text-lg font-semibold mb-4">Popular Cities</h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 ">
      {[
        "Manali",
        "Leh Ladakh",
        "Kerala",
        "Nainital",
        "Mumbai",
        "Munnar",
        "Manali",
        "Leh Ladakh",
        "Kerala",
        "Nainital",
        "Mumbai",
        "Munnar",
      ].map((city, idx) => (
        <span key={idx} className="text-white-300 hover:text-yellow-500 cursor-pointer">
          {city}
        </span>
      ))}
    </div>
  </div> */}

  {/* Download App Section */}
  {/* <div className="bg-black py-10 px-4 md:px-20 text-white text-center">
    <h2 className="text-2xl font-bold mb-4">Download Vacationum App</h2>
    <p className="mb-4">Book flights & trips anytime, anywhere!</p>
    <div className="flex justify-center gap-4">
      <button className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded">
        App Store
      </button>
      <button className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded">
        Google Play
      </button>
    </div>
  </div> */}

  {/* Copyright Section */}
  <div className="bg-gray-400 py-4 px-4 md:px-20 text-center text-gray-700 text-sm mt-2">
    Copyright © 2024 All rights reserved Vacationum Trip Planners Private Limited
  </div>
</footer>

    </div>
  )
}

export default Footer