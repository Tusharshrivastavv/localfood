import { Clock, Star, MapPin, Navigation } from "lucide-react";
import { useGeolocation } from "../hooks/useGeolocation";
import {
  getDistanceKm,
  formatDistance
} from "../utils/distance";

const RestaurantCard = ({ restaurant }) => {
  const {
    location,
    status,
    requestLocation
  } = useGeolocation();

  if (!restaurant) {
    return null;
  }

  const distance =
    location &&
    restaurant.latitude &&
    restaurant.longitude
      ? getDistanceKm(
          location.latitude,
          location.longitude,
          restaurant.latitude,
          restaurant.longitude
        )
      : null;

  const deliveryRadius =
    restaurant.deliveryRadius || 10;

  const withinDelivery =
    distance === null ||
    distance <= deliveryRadius;

  return (
    <div className="restaurant-card">

      {restaurant.image ? (
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurant-image"
        />
      ) : (
        <div className="restaurant-image-placeholder">
          🍽️
        </div>
      )}

      <div className="restaurant-info">

        <div className="restaurant-title-row">
          <h3>{restaurant.name}</h3>

          <span className="rating">
            <Star size={15} fill="currentColor" />
            {restaurant.rating || "4.5"}
          </span>
        </div>

        <p className="restaurant-description">
          {restaurant.description ||
            "Delicious local food"}
        </p>

        <div className="restaurant-meta">

          <span>
            <MapPin size={15} />
            {restaurant.city}
          </span>

          <span>
            <Clock size={15} />
            {restaurant.isOpen
              ? "Open"
              : "Closed"}
          </span>

        </div>

        {distance !== null && (
          <div className="distance-info">
            <Navigation size={15} />
            {formatDistance(distance)}
          </div>
        )}

        {!location && status !== "loading" && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              requestLocation();
            }}
            className="location-button"
          >
            <Navigation size={15} />
            Detect my location
          </button>
        )}

        {!withinDelivery && (
          <div className="delivery-warning">
            Outside delivery area
          </div>
        )}

        <div className="delivery-info">
          Delivery available within{" "}
          {deliveryRadius} km
        </div>

      </div>
    </div>
  );
};

export default RestaurantCard;