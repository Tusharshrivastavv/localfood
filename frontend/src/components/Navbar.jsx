import { Link } from "react-router-dom";
import {
  ShoppingBag,
  User,
  Store,
  ShieldCheck
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-gray-900"
        >
          Local<span className="text-orange-500">Bite</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-5">

          <Link
            to="/"
            className="text-sm font-semibold text-gray-700 hover:text-orange-500"
          >
            Home
          </Link>

          {!user && (
            <>
              <Link
                to="/shop-register"
                className="hidden sm:flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-orange-500"
              >
                <Store size={17} />
                Register Shop
              </Link>

              <Link
                to="/shop-login"
                className="hidden sm:block text-sm font-semibold text-gray-700 hover:text-orange-500"
              >
                Partner Login
              </Link>

              <Link
                to="/login"
                className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-orange-500"
              >
                <User size={17} />
                Login
              </Link>

              {/* ADMIN LOGIN */}
              <Link
                to="/admin-login"
                className="hidden sm:flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:border-orange-500 hover:text-orange-500"
              >
                <ShieldCheck size={17} />
                Admin
              </Link>
            </>
          )}

          {user?.role === "shop_owner" && (
            <Link
              to="/shop-dashboard"
              className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-orange-500"
            >
              <Store size={17} />
              My Shop
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="flex items-center gap-1 text-sm font-semibold text-orange-500"
            >
              <ShieldCheck size={17} />
              Admin Dashboard
            </Link>
          )}

          <Link
            to="/checkout"
            className="flex items-center gap-1 rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600"
          >
            <ShoppingBag size={18} />
            Cart ({cart.length})
          </Link>

          {user && (
            <button
              onClick={logout}
              className="hidden sm:block rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-500"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;