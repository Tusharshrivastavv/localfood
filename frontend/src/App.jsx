import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ShopPage from "./pages/ShopPage";
import Login from "./pages/Login";
import ShopRegister from "./pages/ShopRegister";
import ShopDashboard from "./pages/ShopDashboard";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

import ProtectedRoute from "./components/ProtectedRoute";

import {
  AuthProvider
} from "./context/AuthContext";

import {
  CartProvider
} from "./context/CartContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>

          <Navbar />

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/shop/:id"
              element={<ShopPage />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/shop-login"
              element={<Login />}
            />

            <Route
              path="/shop-register"
              element={<ShopRegister />}
            />

            <Route
              path="/shop-dashboard"
              element={
                <ProtectedRoute
                  roles={["shop_owner"]}
                >
                  <ShopDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute
                  roles={["admin"]}
                >
                  <Admin />
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="/orders"
              element={<Orders />}
            />

          </Routes>

        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;