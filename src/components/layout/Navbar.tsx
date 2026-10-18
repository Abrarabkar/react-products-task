import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("q") || "";

  const [search, setSearch] = useState(initialSearch);

  function handleSearch(value: string) {
    setSearch(value);

    if (value.trim()) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  }

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo-link">
          <span className="logo-diamond">◇</span>
          <span>crystal.</span>
        </Link>
      </div>

      <nav className="navbar-links">
        <Link to="/products" className="navbar-link active">
          SHOP
        </Link>

        <Link to="/products" className="navbar-link">
          COLLECTIONS
        </Link>

        <a href="#contact" className="navbar-link">
          CONTACT
        </a>

        <a href="#about" className="navbar-link">
          ABOUT
        </a>
      </nav>

      <div className="navbar-search">
        <input
          type="search"
          placeholder="SEARCH"
          value={search}
          onChange={(event) => handleSearch(event.target.value)}
          aria-label="Search products"
        />

        <span className="search-icon">⌕</span>
      </div>

      <a href="#" className="cart-button">
  <span className="cart-icon">🛒</span>
  <span>VIEW CART</span>
</a>
    </header>
  );
}