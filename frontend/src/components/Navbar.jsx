import { useEffect, useState } from "react";
import { ShoppingBag, MapPin, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartCount } = useCart();
  const [city, setCity] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/restaurant")
      .then((res) => res.json())
      .then((data) => data.success && setCity(data.restaurant.city))
      .catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-bold text-orange-500">
          LocalBite
        </Link>

        {city && (
          <button className="hidden items-center gap-2 text-sm text-gray-600 md:flex">
            <MapPin size={18} className="text-orange-500" />
            <span>{city}</span>
          </button>
        )}

        <nav className="flex items-center gap-5">
          <Link
            to="/orders"
            className="hidden text-sm font-medium text-gray-600 hover:text-orange-500 sm:block"
          >
            Orders
          </Link>

          <Link
            to="/admin"
            className="hidden items-center gap-1 text-sm font-medium text-gray-600 hover:text-orange-500 sm:flex"
          >
            <Settings size={16} />
            Admin
          </Link>

          <button className="text-gray-600">
            <User size={21} />
          </button>

          <Link
            to="/checkout"
            className="relative text-gray-700"
          >
            <ShoppingBag size={22} />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;