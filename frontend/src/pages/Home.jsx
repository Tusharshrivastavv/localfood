import Hero from "../../../frontend/src/components/Hero";
import CategoryList from "../../../frontend/src/components/CategoryList";
import RestaurantCard from "../../../frontend/src/components/RestaurantCard";
import MenuSection from "../../../frontend/src/components/MenuSection";

const Home = () => {
  return (
    <>
      <Hero />
      <CategoryList />
      <RestaurantCard />
      <MenuSection />
    </>
  );
};

export default Home;