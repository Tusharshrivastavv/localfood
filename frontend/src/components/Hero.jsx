import { Search, MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-orange-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
            <MapPin size={16} />
            Delivering in Bhopal
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Good food.
            <br />
            <span className="text-orange-500">
              Delivered locally.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-lg text-gray-600">
            Discover delicious food from your local restaurant
            and get it delivered to your doorstep.
          </p>

          <div className="mt-8 flex max-w-xl items-center rounded-2xl border border-gray-200 bg-white p-2 shadow-lg">
            <Search
              size={22}
              className="ml-3 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search for biryani, pizza, burgers..."
              className="w-full px-3 py-3 text-sm outline-none"
            />

            <button className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;