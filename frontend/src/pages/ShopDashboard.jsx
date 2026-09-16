import {
  useEffect,
  useState
} from "react";

import {
  apiFetch
} from "../utils/api";

import {
  useAuth
} from "../context/AuthContext";

const emptyItem = {
  name: "",
  description: "",
  price: "",
  category: "Other",
  image: "",
  isVeg: true,
  available: true
};

const ShopDashboard = () => {
  const {
    shop,
    loadUser
  } = useAuth();

  const [myShop, setMyShop] =
    useState(shop);

  const [menu, setMenu] =
    useState([]);

  const [item, setItem] =
    useState(emptyItem);

  const [editingId, setEditingId] =
    useState(null);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const shopData =
        await apiFetch(
          "/shops/owner/me"
        );

      const menuData =
        await apiFetch(
          "/menu/owner/me"
        );

      setMyShop(shopData);
      setMenu(menuData);
    } catch (error) {
      setError(error.message);
    }
  };

  const updateShop = async (
    e
  ) => {
    e.preventDefault();

    try {
      const data =
        await apiFetch(
          "/shops/owner/me",
          {
            method: "PUT",

            body: JSON.stringify(
              myShop
            )
          }
        );

      setMyShop(data);

      await loadUser();

      setMessage(
        "Shop updated successfully"
      );
    } catch (error) {
      setError(
        error.message
      );
    }
  };

  const handleItemChange = (
    e
  ) => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;

    setItem({
      ...item,

      [name]:
        type === "checkbox"
          ? checked
          : value
    });
  };

  const saveItem = async (
    e
  ) => {
    e.preventDefault();

    try {
      const url = editingId
        ? `/menu/owner/me/${editingId}`
        : "/menu/owner/me";

      const method = editingId
        ? "PUT"
        : "POST";

      const data =
        await apiFetch(
          url,
          {
            method,

            body: JSON.stringify({
              ...item,
              price: Number(
                item.price
              )
            })
          }
        );

      if (editingId) {
        setMenu(
          menu.map((m) =>
            m._id === editingId
              ? data
              : m
          )
        );
      } else {
        setMenu([
          data,
          ...menu
        ]);
      }

      setItem(emptyItem);
      setEditingId(null);

      setMessage(
        "Menu item saved"
      );

    } catch (error) {
      setError(
        error.message
      );
    }
  };

  const editItem = (
    menuItem
  ) => {
    setEditingId(
      menuItem._id
    );

    setItem({
      name: menuItem.name,
      description:
        menuItem.description || "",
      price: menuItem.price,
      category:
        menuItem.category || "Other",
      image:
        menuItem.image || "",
      isVeg:
        menuItem.isVeg,
      available:
        menuItem.available
    });
  };

  const deleteItem = async (
    id
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this menu item?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      await apiFetch(
        `/menu/owner/me/${id}`,
        {
          method: "DELETE"
        }
      );

      setMenu(
        menu.filter(
          (item) =>
            item._id !== id
        )
      );

      setMessage(
        "Menu item deleted"
      );
    } catch (error) {
      setError(
        error.message
      );
    }
  };

  if (!myShop) {
    return (
      <div className="loading">
        Loading shop...
      </div>
    );
  }

  const approved =
    myShop.status ===
    "approved";

  return (
    <div className="dashboard">

      <h1>
        Shop Dashboard
      </h1>

      <div
        className={`status-badge ${myShop.status}`}
      >
        Status:{" "}
        {myShop.status}
      </div>

      {message && (
        <div className="success">
          {message}
        </div>
      )}

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {!approved && (
        <div className="warning">

          Your shop is not approved
          yet.

          <br />

          You cannot add menu items
          until an admin approves
          your shop.

        </div>
      )}

      <section className="dashboard-section">

        <h2>
          Shop Details
        </h2>

        <form
          onSubmit={updateShop}
        >

          <input
            value={myShop.name || ""}
            onChange={(e) =>
              setMyShop({
                ...myShop,
                name: e.target.value
              })
            }
            placeholder="Shop Name"
          />

          <textarea
            value={
              myShop.description ||
              ""
            }
            onChange={(e) =>
              setMyShop({
                ...myShop,
                description:
                  e.target.value
              })
            }
            placeholder="Description"
          />

          <input
            value={
              myShop.address || ""
            }
            onChange={(e) =>
              setMyShop({
                ...myShop,
                address:
                  e.target.value
              })
            }
            placeholder="Address"
          />

          <input
            value={myShop.city || ""}
            onChange={(e) =>
              setMyShop({
                ...myShop,
                city: e.target.value
              })
            }
            placeholder="City"
          />

          <input
            value={
              myShop.phone || ""
            }
            onChange={(e) =>
              setMyShop({
                ...myShop,
                phone: e.target.value
              })
            }
            placeholder="Phone"
          />

          <input
            value={
              myShop.image || ""
            }
            onChange={(e) =>
              setMyShop({
                ...myShop,
                image: e.target.value
              })
            }
            placeholder="Image URL"
          />

          <input
            type="number"
            value={
              myShop.deliveryRadius ||
              10
            }
            onChange={(e) =>
              setMyShop({
                ...myShop,
                deliveryRadius:
                  Number(
                    e.target.value
                  )
              })
            }
            placeholder="Delivery Radius"
          />

          <label>
            <input
              type="checkbox"
              checked={
                myShop.isOpen !== false
              }
              onChange={(e) =>
                setMyShop({
                  ...myShop,
                  isOpen:
                    e.target.checked
                })
              }
            />

            Shop is Open
          </label>

          <button type="submit">
            Save Shop
          </button>

        </form>

      </section>

      <section className="dashboard-section">

        <h2>
          Add Menu Item
        </h2>

        <form
          onSubmit={saveItem}
        >

          <input
            name="name"
            placeholder="Item Name"
            value={item.name}
            onChange={
              handleItemChange
            }
            disabled={!approved}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={
              item.description
            }
            onChange={
              handleItemChange
            }
            disabled={!approved}
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={
              handleItemChange
            }
            disabled={!approved}
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={
              item.category
            }
            onChange={
              handleItemChange
            }
            disabled={!approved}
          />

          <input
            name="image"
            placeholder="Image URL"
            value={item.image}
            onChange={
              handleItemChange
            }
            disabled={!approved}
          />

          <label>
            <input
              type="checkbox"
              name="isVeg"
              checked={item.isVeg}
              onChange={
                handleItemChange
              }
              disabled={!approved}
            />

            Vegetarian
          </label>

          <label>
            <input
              type="checkbox"
              name="available"
              checked={
                item.available
              }
              onChange={
                handleItemChange
              }
              disabled={!approved}
            />

            Available
          </label>

          <button
            type="submit"
            disabled={!approved}
          >
            {editingId
              ? "Update Item"
              : "Add Item"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setItem(emptyItem);
              }}
            >
              Cancel
            </button>
          )}

        </form>

      </section>

      <section className="dashboard-section">

        <h2>
          Your Menu
        </h2>

        <div className="admin-menu-list">

          {menu.map(
            (menuItem) => (
              <div
                className="admin-menu-item"
                key={menuItem._id}
              >

                <div>

                  <h3>
                    {menuItem.name}
                  </h3>

                  <p>
                    ₹
                    {menuItem.price}
                  </p>

                  <small>
                    {
                      menuItem.category
                    }
                  </small>

                </div>

                <div>

                  <button
                    onClick={() =>
                      editItem(
                        menuItem
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteItem(
                        menuItem._id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>
            )
          )}

        </div>

      </section>

    </div>
  );
};

export default ShopDashboard;