import { Link } from "react-router-dom";
import { FaPlane, FaHotel, FaUmbrellaBeach, FaConciergeBell, FaShip } from "react-icons/fa";

export default function Header() {
  const navItems = [
    { name: "Flights", path: "/", icon: <FaPlane size={20} /> },
    { name: "Hotels", path: "/hotels", icon: <FaHotel size={20} /> },
    { name: "Holidays", path: "/holidays", icon: <FaUmbrellaBeach size={20} /> },
    { name: "Hotel + Flight", path: "/hotel-flight", icon: <FaConciergeBell size={20} /> },
    { name: "Cruise", path: "/cruise", icon: <FaShip size={20} /> },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Vacationum
        </Link>

        {/* Center: Navigation */}
        <nav className="flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center text-gray-700 hover:text-blue-600 font-medium text-sm"
            >
              <div>{item.icon}</div>
              <span className="mt-1">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Right: Login */}
        <div>
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
