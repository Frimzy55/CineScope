import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Cine<span>Scope</span>
        </Link>

        <nav className="navigation">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Discover
          </NavLink>

          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            ♡ Watchlist
          </NavLink>
        </nav>
      </div>
    </header>
  );
}