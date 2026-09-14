import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    cartTotal,
    cartCount,
  } = useCart();

  const deliveryFee = cartTotal > 0 ? 30 : 0;
  const total = cartTotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="text-6xl">🛒</div>

        <h1 className="mt-5 text-2xl font-bold">
          Your cart is empty
        </h1>

        <p className="mt-2 text-gray-500">
          Add something delicious to get started.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">
        Your Cart
      </h1>

      <p className="mt-1 text-gray-500">
        {cartCount} items
      </p>

      <div className="mt-8 divide-y rounded-2xl border bg-white">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-5"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-20 w-20 rounded-xl object-cover"
            />

            <div className="flex-1">
              <h3 className="font-semibold">
                {item.name}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                ₹{item.price}
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-lg border px-2 py-1">
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-1"
              >
                <Minus size={16} />
              </button>

              <span className="text-sm font-semibold">
                {item.quantity}
              </span>

              <button
                onClick={() => addToCart(item)}
                className="p-1"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="w-20 text-right font-semibold">
              ₹{item.price * item.quantity}
            </div>

            <button
              onClick={() => {
                for (let i = 0; i < item.quantity; i++) {
                  removeFromCart(item.id);
                }
              }}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border bg-white p-6">
        <h2 className="text-xl font-bold">
          Bill Details
        </h2>

        <div className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Item total</span>
            <span>₹{cartTotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery fee</span>
            <span>₹{deliveryFee}</span>
          </div>

          <div className="border-t pt-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>

        <button className="mt-6 w-full rounded-xl bg-orange-500 py-4 font-semibold text-white hover:bg-orange-600">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Checkout;