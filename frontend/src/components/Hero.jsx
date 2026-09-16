const Hero = ({ search, setSearch }) => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <span className="hero-badge">
          🍽️ Local food, local love
        </span>

        <h1>
          Discover the best
          <br />
          <span>food near you</span>
        </h1>

        <p>
          Find local shops and delicious food
          <br />
          around your area.
        </p>

        <div className="hero-search">
          <input
            type="text"
            placeholder="Search shops, food or cuisine..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;