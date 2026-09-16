import {
  useEffect,
  useState
} from "react";

import { apiFetch } from "../utils/api";

const Admin = () => {
  const [shops, setShops] =
    useState([]);

  const [filter, setFilter] =
    useState("all");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchShops = async () => {
    try {
      setLoading(true);

      const endpoint =
        filter === "all"
          ? "/shops/admin/all"
          : `/shops/admin/all?status=${filter}`;

      const data =
        await apiFetch(endpoint);

      setShops(data);

    } catch (error) {
      setError(
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, [filter]);

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await apiFetch(
        `/shops/admin/${id}/status`,
        {
          method: "PATCH",

          body: JSON.stringify({
            status
          })
        }
      );

      fetchShops();

    } catch (error) {
      setError(
        error.message
      );
    }
  };

  const pendingShops =
    shops.filter(
      (shop) =>
        shop.status ===
        "pending"
    );

  const approvedShops =
    shops.filter(
      (shop) =>
        shop.status ===
        "approved"
    );

  const rejectedShops =
    shops.filter(
      (shop) =>
        shop.status ===
        "rejected"
    );

  const suspendedShops =
    shops.filter(
      (shop) =>
        shop.status ===
        "suspended"
    );

  return (
    <div className="admin-page">

      <div className="admin-header">

        <div>
          <h1>
            Admin Dashboard
          </h1>

          <p>
            Manage LocalBite
            shops and approvals.
          </p>
        </div>

        <button
          className="verify-button"
          onClick={() =>
            setFilter("pending")
          }
        >
          Verify New Shops
        </button>

      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      <div className="admin-stats">

        <div className="stat-card">
          <h3>
            Total
          </h3>
          <strong>
            {shops.length}
          </strong>
        </div>

        <div className="stat-card">
          <h3>
            Pending
          </h3>
          <strong>
            {pendingShops.length}
          </strong>
        </div>

        <div className="stat-card">
          <h3>
            Approved
          </h3>
          <strong>
            {approvedShops.length}
          </strong>
        </div>

        <div className="stat-card">
          <h3>
            Rejected
          </h3>
          <strong>
            {rejectedShops.length}
          </strong>
        </div>

        <div className="stat-card">
          <h3>
            Suspended
          </h3>
          <strong>
            {suspendedShops.length}
          </strong>
        </div>

      </div>

      <div className="admin-filters">

        <button
          onClick={() =>
            setFilter("all")
          }
          className={
            filter === "all"
              ? "active"
              : ""
          }
        >
          All Shops
        </button>

        <button
          onClick={() =>
            setFilter("pending")
          }
          className={
            filter === "pending"
              ? "active"
              : ""
          }
        >
          Verify New Shops
        </button>

        <button
          onClick={() =>
            setFilter("approved")
          }
          className={
            filter === "approved"
              ? "active"
              : ""
          }
        >
          Approved
        </button>

        <button
          onClick={() =>
            setFilter("rejected")
          }
          className={
            filter === "rejected"
              ? "active"
              : ""
          }
        >
          Rejected
        </button>

        <button
          onClick={() =>
            setFilter("suspended")
          }
          className={
            filter === "suspended"
              ? "active"
              : ""
          }
        >
          Suspended
        </button>

      </div>

      {loading ? (
        <div className="loading">
          Loading shops...
        </div>
      ) : (
        <div className="admin-shop-list">

          {shops.length === 0 && (
            <div className="empty-state">
              No shops found.
            </div>
          )}

          {shops.map(
            (shop) => (
              <div
                className="admin-shop-card"
                key={shop._id}
              >

                <div className="shop-card-header">

                  <div>

                    <h2>
                      {shop.name}
                    </h2>

                    <span
                      className={`status-badge ${shop.status}`}
                    >
                      {shop.status}
                    </span>

                  </div>

                </div>

                <div className="shop-card-details">

                  <p>
                    <strong>
                      Owner:
                    </strong>{" "}
                    {shop.owner?.name}
                  </p>

                  <p>
                    <strong>
                      Email:
                    </strong>{" "}
                    {shop.owner?.email}
                  </p>

                  <p>
                    <strong>
                      Phone:
                    </strong>{" "}
                    {shop.owner?.phone ||
                      shop.phone}
                  </p>

                  <p>
                    <strong>
                      Address:
                    </strong>{" "}
                    {shop.address}
                  </p>

                  <p>
                    <strong>
                      City:
                    </strong>{" "}
                    {shop.city}
                  </p>

                  <p>
                    <strong>
                      Description:
                    </strong>{" "}
                    {shop.description ||
                      "No description"}
                  </p>

                </div>

                <div className="admin-actions">

                  {shop.status !==
                    "approved" && (
                    <button
                      onClick={() =>
                        updateStatus(
                          shop._id,
                          "approved"
                        )
                      }
                    >
                      Approve
                    </button>
                  )}

                  {shop.status !==
                    "rejected" && (
                    <button
                      onClick={() =>
                        updateStatus(
                          shop._id,
                          "rejected"
                        )
                      }
                    >
                      Reject
                    </button>
                  )}

                  {shop.status !==
                    "suspended" && (
                    <button
                      onClick={() =>
                        updateStatus(
                          shop._id,
                          "suspended"
                        )
                      }
                    >
                      Suspend
                    </button>
                  )}

                  {shop.status ===
                    "suspended" && (
                    <button
                      onClick={() =>
                        updateStatus(
                          shop._id,
                          "approved"
                        )
                      }
                    >
                      Reactivate
                    </button>
                  )}

                </div>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
};

export default Admin;