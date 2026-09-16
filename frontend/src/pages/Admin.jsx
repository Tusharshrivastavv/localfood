import { useEffect, useState } from "react";
import { Trash2, MapPin, Loader2 } from "lucide-react";

const API = "http://localhost:5000/api";

const Admin = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [restForm, setRestForm] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    phone: "",
    image: "",
    latitude: "",
    longitude: "",
    deliveryRadius: 5,
    rating: 4.5,
  });
  const [menuItems, setMenuItems] = useState([]);
  const [menuForm, setMenuForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    isVeg: true,
  });
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [msg, setMsg] = useState("");

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation isn't supported by your browser.");
      return;
    }

    setLocating(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setRestForm((f) => ({
          ...f,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }));
        setLocating(false);
      },
      (err) => {
        setLocating(false);
        setLocationError(
          err.code === err.PERMISSION_DENIED
            ? "Location permission denied — click 'Detect location' to try again, or enter coordinates manually."
            : "Couldn't get your location. Click 'Detect location' to retry."
        );
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const loadRestaurant = () => {
    fetch(`${API}/restaurant`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setRestaurant(data.restaurant);
          setRestForm(data.restaurant);
        } else {
          // no restaurant yet — auto-detect location for the new one
          detectLocation();
        }
      })
      .catch(() => detectLocation());
  };

  const loadMenu = () => {
    fetch(`${API}/menu`)
      .then((r) => r.json())
      .then((data) => data.success && setMenuItems(data.menu))
      .catch((err) => console.log("Failed to load menu:", err.message));
  };

  useEffect(() => {
    loadRestaurant();
    loadMenu();
  }, []);

  const saveRestaurant = async (e) => {
    e.preventDefault();

    const method = restaurant ? "PUT" : "POST";

    const res = await fetch(`${API}/restaurant`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...restForm,
        latitude: Number(restForm.latitude),
        longitude: Number(restForm.longitude),
        deliveryRadius: Number(restForm.deliveryRadius),
        rating: Number(restForm.rating),
      }),
    });

    const data = await res.json();

    if (data.success) {
      setMsg("Restaurant saved ✓");
      loadRestaurant();
    } else {
      setMsg(data.message || "Failed to save");
    }
  };

  const addMenuItem = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/menu`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...menuForm,
        price: Number(menuForm.price),
      }),
    });

    const data = await res.json();

    if (data.success) {
      setMenuForm({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        isVeg: true,
      });
      loadMenu();
    }
  };

  const deleteItem = async (id) => {
    await fetch(`${API}/menu/${id}`, { method: "DELETE" });
    loadMenu();
  };

  const input =
    "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-orange-400";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Admin</h1>

      {msg && (
        <p className="mt-2 text-sm font-medium text-orange-600">{msg}</p>
      )}

      {/* Restaurant form */}
      <form
        onSubmit={saveRestaurant}
        className="mt-8 space-y-4 rounded-2xl border bg-white p-6"
      >
        <h2 className="text-xl font-bold">
          {restaurant ? "Edit Restaurant" : "Add Restaurant"}
        </h2>

        <input
          className={input}
          placeholder="Name"
          value={restForm.name}
          onChange={(e) => setRestForm({ ...restForm, name: e.target.value })}
          required
        />

        <textarea
          className={input}
          placeholder="Description"
          value={restForm.description}
          onChange={(e) =>
            setRestForm({ ...restForm, description: e.target.value })
          }
        />

        <input
          className={input}
          placeholder="Address"
          value={restForm.address}
          onChange={(e) =>
            setRestForm({ ...restForm, address: e.target.value })
          }
          required
        />

        <input
          className={input}
          placeholder="City"
          value={restForm.city}
          onChange={(e) => setRestForm({ ...restForm, city: e.target.value })}
          required
        />

        <input
          className={input}
          placeholder="Phone"
          value={restForm.phone}
          onChange={(e) =>
            setRestForm({ ...restForm, phone: e.target.value })
          }
        />

        <input
          className={input}
          placeholder="Image URL"
          value={restForm.image}
          onChange={(e) =>
            setRestForm({ ...restForm, image: e.target.value })
          }
        />

        {/* Location — auto-filled, editable as fallback */}
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Location (auto-detected)
            </span>

            <button
              type="button"
              onClick={detectLocation}
              className="flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm"
            >
              {locating ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <MapPin size={14} />
              )}
              {locating ? "Detecting…" : "Detect location"}
            </button>
          </div>

          {locationError && (
            <p className="mb-2 text-xs text-red-500">{locationError}</p>
          )}

          <div className="flex items-center gap-3">
            <input
              className={input}
              type="number"
              step="any"
              placeholder="Latitude"
              value={restForm.latitude}
              onChange={(e) =>
                setRestForm({ ...restForm, latitude: e.target.value })
              }
              required
            />

            <input
              className={input}
              type="number"
              step="any"
              placeholder="Longitude"
              value={restForm.longitude}
              onChange={(e) =>
                setRestForm({ ...restForm, longitude: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            className={input}
            type="number"
            placeholder="Delivery radius (km)"
            value={restForm.deliveryRadius}
            onChange={(e) =>
              setRestForm({ ...restForm, deliveryRadius: e.target.value })
            }
          />

          <input
            className={input}
            type="number"
            step="0.1"
            placeholder="Rating"
            value={restForm.rating}
            onChange={(e) =>
              setRestForm({ ...restForm, rating: e.target.value })
            }
          />
        </div>

        <button className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600">
          {restaurant ? "Update Restaurant" : "Create Restaurant"}
        </button>
      </form>

      {/* Menu item form */}
      <form
        onSubmit={addMenuItem}
        className="mt-8 space-y-4 rounded-2xl border bg-white p-6"
      >
        <h2 className="text-xl font-bold">Add Menu Item</h2>

        <input
          className={input}
          placeholder="Name"
          value={menuForm.name}
          onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
          required
        />

        <textarea
          className={input}
          placeholder="Description"
          value={menuForm.description}
          onChange={(e) =>
            setMenuForm({ ...menuForm, description: e.target.value })
          }
        />

        <div className="flex gap-3">
          <input
            className={input}
            type="number"
            placeholder="Price"
            value={menuForm.price}
            onChange={(e) =>
              setMenuForm({ ...menuForm, price: e.target.value })
            }
            required
          />

          <input
            className={input}
            placeholder="Category (e.g. Pizza)"
            value={menuForm.category}
            onChange={(e) =>
              setMenuForm({ ...menuForm, category: e.target.value })
            }
            required
          />
        </div>

        <input
          className={input}
          placeholder="Image URL"
          value={menuForm.image}
          onChange={(e) =>
            setMenuForm({ ...menuForm, image: e.target.value })
          }
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={menuForm.isVeg}
            onChange={(e) =>
              setMenuForm({ ...menuForm, isVeg: e.target.checked })
            }
          />
          Vegetarian
        </label>

        <button className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600">
          Add Item
        </button>
      </form>

      {/* Existing menu items */}
      <div className="mt-8 rounded-2xl border bg-white p-6">
        <h2 className="text-xl font-bold">
          Menu Items ({menuItems.length})
        </h2>

        <div className="mt-4 divide-y">
          {menuItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between py-3"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.category} · ₹{item.price}
                </p>
              </div>

              <button
                onClick={() => deleteItem(item._id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;