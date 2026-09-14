import { categories } from "../data/mockData";

const CategoryList = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          What are you craving?
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Explore our popular categories
        </p>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className="group flex min-w-[90px] flex-col items-center"
          >
            <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-transparent transition group-hover:border-orange-400">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition group-hover:scale-110"
              />
            </div>

            <span className="mt-3 text-sm font-medium text-gray-700">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;