import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

function navClass({ isActive }) {
  return isActive ? "header__link header__link--active" : "header__link";
}

function Header() {
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((n, i) => n + i.quantity, 0),
  );

  return (
    <header>
      <div className="site-header__inner header">
        <div className="header__left">
          <Link to="/" className="header__logo" aria-label="Cookpal home">
            <span className="header__logo-text">C<span style={{ color: "#22c55e" }}>oo</span>kpal
            </span>
          </Link>
        </div>

        <form
          className="header__search"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="visually-hidden" htmlFor="header-category">
            Category
          </label>
          <select id="header-category" className="header__search-select" defaultValue="all">
            <option value="all">All Categories</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="dessert">Dessert</option>
          </select>
          <span className="header__search-divider" aria-hidden />
          <label className="visually-hidden" htmlFor="header-q">
            Search recipes
          </label>
          <input
            id="header-q"
            type="search"
            className="header__search-input"
            placeholder="Search for recipes..."
            autoComplete="off"
          />
          <button type="submit" className="header__search-submit" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M10.5 18a7.5 7.5 0 110-15 7.5 7.5 0 010 15zM16.5 16.5L21 21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </form>

        <nav id="header-nav" className="header__nav" aria-label="Main">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
          <NavLink to="/explore" className={navClass}>
            Explore
          </NavLink>
          <NavLink to="/help" className={navClass}>
            Help
          </NavLink>
          <NavLink to="/cart" className={navClass}>
            <span className="header__cart-link-inner">
              Cart
              {cartCount > 0 ? (
                <span className="header__cart-badge" aria-label={`${cartCount} items in cart`}>
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              ) : null}
            </span>
          </NavLink>
        </nav>

        <div className="header__account">
          <button type="button" className="header__avatar" aria-label="Account">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=88&h=88&fit=crop"
              alt=""
              width={44}
              height={44}
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
