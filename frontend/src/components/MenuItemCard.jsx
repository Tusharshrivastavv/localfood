import { Plus } from "lucide-react";
// import { useCart } from "../../../backend/src/context/CartContext";
import { useCart } from "../context/CartContext";
const MenuItemCard = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <div className="flex gap-5 border-b border-gray-100 py-6">
      <div className="flex-1">
        <div
          className={`mb-2 h-3 w-3 rounded-full border-2 ${
            item.isVeg
              ? "border-green-600 bg-green-600"
              : "border-red-600 bg-red-600"
          }`}
        />

        <h3 className="text-lg font-semibold text-gray-900">
          {item.name}
        </h3>

        <p className="mt-1 font-semibold text-gray-800">
          ₹{item.price}
        </p>

        <p className="mt-2 max-w-lg text-sm leading-6 text-gray-500">
          {item.description}
        </p>
      </div>

      <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />

        <button
          onClick={() => addToCart(item)}
          className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-orange-500 shadow-md hover:bg-orange-500 hover:text-white"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;