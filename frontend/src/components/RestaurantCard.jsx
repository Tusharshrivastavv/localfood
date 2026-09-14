import { Clock, Star, MapPin } from "lucide-react";
import { restaurant } from "../data/mockData";

const RestaurantCard = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="grid md:grid-cols-2">
          <div className="h-64 md:h-full">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center p-7 sm:p-10">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-md bg-green-600 px-2 py-1 text-xs font-bold text-white">
                {restaurant.rating} ★
              </span>

              <span className="text-sm text-gray-500">
                Highly rated
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              {restaurant.name}
            </h2>

            <p className="mt-3 text-gray-600">
              {restaurant.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Clock size={17} />
                {restaurant.deliveryTime}
              </span>

              <span className="flex items-center gap-2">
                <MapPin size={17} />
                {restaurant.address}
              </span>
            </div>

            <button className="mt-7 w-fit rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600">
              View Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantCard;