const Orders = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">
        Your Orders
      </h1>

      <div className="mt-8 rounded-2xl border bg-white p-10 text-center">
        <div className="text-5xl">🍽️</div>

        <h2 className="mt-4 text-xl font-semibold">
          No orders yet
        </h2>

        <p className="mt-2 text-gray-500">
          Your previous orders will appear here.
        </p>
      </div>
    </div>
  );
};

export default Orders;