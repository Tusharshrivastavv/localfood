import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import { apiFetch } from "../utils/api";

const ShopRegister = () => {
  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      phone: "",

      shopName: "",
      description: "",
      address: "",
      city: "",
      shopPhone: "",
      image: "",
      latitude: "",
      longitude: "",
      deliveryRadius: 10
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError(
        "Geolocation is not supported"
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm((prev) => ({
          ...prev,

          latitude:
            position.coords.latitude,

          longitude:
            position.coords.longitude
        }));
      },
      () => {
        setError(
          "Unable to detect location"
        );
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      await apiFetch(
        "/auth/register-shop",
        {
          method: "POST",

          body: JSON.stringify({
            ...form,

            latitude:
              Number(form.latitude),

            longitude:
              Number(form.longitude),

            deliveryRadius:
              Number(
                form.deliveryRadius
              )
          })
        }
      );

      setSuccess(
        "Registration submitted successfully. Wait for admin approval."
      );

      setTimeout(() => {
        navigate("/shop-login");
      }, 2000);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>
          Register Your Shop
        </h1>

        <p>
          Join LocalBite as a
          local food partner.
        </p>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {success && (
          <div className="success">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
        >

          <h3>
            Owner Details
          </h3>

          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />

          <h3>
            Shop Details
          </h3>

          <input
            name="shopName"
            placeholder="Shop Name"
            value={form.shopName}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Shop Description"
            value={form.description}
            onChange={handleChange}
          />

          <input
            name="address"
            placeholder="Shop Address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />

          <input
            name="shopPhone"
            placeholder="Shop Phone"
            value={form.shopPhone}
            onChange={handleChange}
          />

          <input
            name="image"
            placeholder="Shop Image URL"
            value={form.image}
            onChange={handleChange}
          />

          <div className="location-fields">

            <input
              name="latitude"
              placeholder="Latitude"
              value={form.latitude}
              onChange={handleChange}
              required
            />

            <input
              name="longitude"
              placeholder="Longitude"
              value={form.longitude}
              onChange={handleChange}
              required
            />

          </div>

          <button
            type="button"
            onClick={detectLocation}
          >
            Detect Shop Location
          </button>

          <input
            name="deliveryRadius"
            type="number"
            placeholder="Delivery Radius KM"
            value={form.deliveryRadius}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Registering..."
              : "Register Shop"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default ShopRegister;