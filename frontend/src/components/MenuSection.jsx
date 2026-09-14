import { menuItems } from "../data/mockData";
import MenuItemCard from "./MenuItemCard";

const MenuSection = () => {
  const categories = [...new Set(menuItems.map((item) => item.category))];

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Our Menu
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Freshly prepared for you
        </p>
      </div>

      {categories.map((category) => {
        const items = menuItems.filter(
          (item) => item.category === category
        );

        return (
          <div key={category} className="mb-10">
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              {category}
            </h3>

            {items.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        );
      })}
    </section>
  );
};

export default MenuSection;