import { useEffect, useState } from "react";
import { Clock, Star, MapPin, Navigation } from "lucide-react";
import { useGeolocation } from "../hooks/useGeolocation";
import { getDistanceKm, formatDistance } from "../utils/distance";

const RestaurantCard = () => {
  const [restaurant, setRestaurant] = useState(null);
  const { location, status, requestLocation } = useGeolocation();

  useEffect(() => {
    fetch("http://localhost:5000/api/restaurant")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setRestaurant(data.restaurant);
        // if not found, restaurant just stays null — no restaurant shown yet
      })
      .catch((err) => console.log("No restaurant yet:", err.message));
  }, []);

  if (!restaurant) return null;

  const distanceKm =
    location &&
    getDistanceKm(
      location.latitude,
      location.longitude,
      restaurant.latitude,
      restaurant.longitude
    );

  const inRange =
    distanceKm !== undefined && distanceKm <= restaurant.deliveryRadius;

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
                {restaurant.deliveryTime || "25-35 min"}
              </span>

              <span className="flex items-center gap-2">
                <MapPin size={17} />
                {restaurant.address}
              </span>
            </div>

            {/* Distance section */}
            <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-4">
              {status === "loading" && (
                <p className="text-sm text-gray-500">
                  Finding your location…
                </p>
              )}

              {status === "denied" && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Enable location to check delivery distance
                  </p>
                  <button
                    onClick={requestLocation}
                    className="text-sm font-semibold text-orange-500"
                  >
                    Retry
                  </button>
                </div>
              )}

              {status === "error" && (
                <p className="text-sm text-gray-500">
                  Couldn't get your location. Try again in a moment.
                </p>
              )}

              {status === "granted" && distanceKm !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <Navigation size={16} className="text-orange-500" />
                    {formatDistance(distanceKm)} away
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      inRange
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {inRange ? "Delivers to you" : "Outside delivery range"}
                  </span>
                </div>
              )}
            </div>

            <button
              disabled={status === "granted" && !inRange}
              className="mt-6 w-fit rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              View Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantCard;