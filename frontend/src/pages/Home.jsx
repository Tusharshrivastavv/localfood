import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import CategoryList from "../components/CategoryList";
import RestaurantCard from "../components/RestaurantCard";

import { apiFetch } from "../utils/api";

const Home = () => {
  const [shops, setShops] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [category, setCategory] =
    useState("All");

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      setLoading(true);

      const data =
        await apiFetch("/shops");

      setShops(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredShops =
    shops.filter((shop) => {
      const text =
        `${shop.name} ${shop.city} ${shop.description}`
          .toLowerCase();

      return text.includes(
        search.toLowerCase()
      );
    });

  return (
    <div>

      <Hero
        search={search}
        setSearch={setSearch}
      />

      <CategoryList
        selectedCategory={category}
        setSelectedCategory={setCategory}
      />

      <section className="restaurants-section">

        <div className="section-header">

          <div>
            <h2>
              {category === "All"
                ? "All Shops"
                : `${category} Shops`}
            </h2>

            <p>
              Discover local food near you
            </p>
          </div>

        </div>

        {loading && (
          <div className="loading">
            Loading shops...
          </div>
        )}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          filteredShops.length === 0 && (
            <div className="empty-state">
              <h3>
                No shops found
              </h3>

              <p>
                Try another search.
              </p>
            </div>
          )}

        <div className="restaurant-grid">

          {filteredShops.map(
            (shop) => (
              <Link
                key={shop._id}
                to={`/shop/${shop._id}`}
                className="restaurant-link"
              >
                <RestaurantCard
                  restaurant={shop}
                />
              </Link>
            )
          )}

        </div>

      </section>

    </div>
  );
};

export default Home;