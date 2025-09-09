import React, { useState } from "react";

function FlightPageHero() {
  const [tripType, setTripType] = useState("oneway");

  return (
    <div className="w-full relative h-[350px]">
      {/* Background Image */}
      <div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/place-flying-sunset-sky_1112-1133.jpg')",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 text-center leading-tight">
          Discover & Book perfect <br /> Flight today!
        </h1>
      </div>
    </div>
  );
}

export default FlightPageHero;
