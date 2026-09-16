const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export const apiFetch = async (
  endpoint,
  options = {}
) => {
  const token =
    localStorage.getItem("localbite_token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization =
      `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers
    }
  );

  const data =
    await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong"
    );
  }

  return data;
};