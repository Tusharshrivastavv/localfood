import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import { apiFetch } from "../utils/api";

import MenuItemCard from "../components/MenuItemCard";

const ShopPage = () => {
  const { id } = useParams();

  const [shop, setShop] =
    useState(null);

  const [menu, setMenu] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    fetchShop();
  }, [id]);

  const fetchShop = async () => {
    try {
      setLoading(true);

      const shopData =
        await apiFetch(
          `/shops/${id}`
        );

      const menuData =
        await apiFetch(
          `/menu/shop/${id}`
        );

      setShop(shopData);
      setMenu(menuData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        Loading shop...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        {error}
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="empty-state">
        Shop not found
      </div>
    );
  }

  const categories = [
    ...new Set(
      menu.map(
        (item) => item.category
      )
    )
  ];

  return (
    <div className="shop-page">

      <div className="shop-banner">

        {shop.image && (
          <img
            src={shop.image}
            alt={shop.name}
          />
        )}

        <div className="shop-info">

          <h1>
            {shop.name}
          </h1>

          <p>
            {shop.description}
          </p>

          <p>
            📍 {shop.address}, {shop.city}
          </p>

          <p>
            ⭐ {shop.rating}
          </p>

          <p>
            {shop.isOpen
              ? "🟢 Open"
              : "🔴 Closed"}
          </p>

        </div>

      </div>

      <div className="menu-container">

        <h2>
          Menu
        </h2>

        {menu.length === 0 ? (
          <div className="empty-state">
            This shop hasn't added
            any menu items yet.
          </div>
        ) : (
          categories.map(
            (category) => (
              <section
                key={category}
                className="menu-category"
              >

                <h3>
                  {category}
                </h3>

                <div className="menu-grid">

                  {menu
                    .filter(
                      (item) =>
                        item.category ===
                        category
                    )
                    .map((item) => (
                      <MenuItemCard
                        key={item._id}
                        item={item}
                      />
                    ))}

                </div>

              </section>
            )
          )
        )}

      </div>

    </div>
  );
};

export default ShopPage;