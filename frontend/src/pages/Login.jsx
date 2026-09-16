import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

const Login = () => {
  const navigate =
    useNavigate();

  const {
    login
  } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      const data =
        await login(
          email,
          password
        );

      if (
        data.user.role ===
        "admin"
      ) {
        navigate("/admin");
      } else if (
        data.user.role ===
        "shop_owner"
      ) {
        navigate(
          "/shop-dashboard"
        );
      } else {
        navigate("/");
      }

    } catch (error) {
      setError(
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>
          Login
        </h1>

        <p>
          Login to your
          LocalBite account.
        </p>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <p>
          Are you a shop owner?
        </p>

        <Link to="/shop-register">
          Register your shop
        </Link>

      </div>

    </div>
  );
};

export default Login;