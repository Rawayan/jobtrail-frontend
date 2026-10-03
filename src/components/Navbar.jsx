import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/dashboard" className="navbar-brand">
          <span className="navbar-brand-mark">J</span>

          <span className="navbar-brand-text">
            Job<span>Trail</span>
          </span>
        </Link>

        {user && (
          <>
            <nav className="navbar-links">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `navbar-link ${isActive ? "active" : ""}`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/applications"
                className={({ isActive }) =>
                  `navbar-link ${isActive ? "active" : ""}`
                }
              >
                Applications
              </NavLink>
            </nav>

            <div className="navbar-actions">
              <div className="navbar-user">
                <span className="navbar-user-avatar">
                  {user.username?.charAt(0).toUpperCase()}
                </span>

                <span className="navbar-user-name">{user.username}</span>
              </div>

              <button
                type="button"
                className="navbar-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;

/* =========================
   NAVBAR STYLES
========================= */

const style = document.createElement("style");

style.textContent = `
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;

  width: 100%;

  border-bottom: 1px solid rgba(51, 20, 12, 0.08);

  background: rgba(247, 245, 237, 0.82);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.navbar-inner {
  width: min(100% - 40px, 1200px);
  min-height: 76px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  gap: 34px;
}

.navbar-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  flex-shrink: 0;
}

.navbar-brand-mark {
  width: 38px;
  height: 38px;

  display: grid;
  place-items: center;

  border-radius: 13px;

  color: #33140c;
  background: #c3d638;

  font-family: "DM Serif Display", serif;
  font-size: 1.3rem;

  box-shadow: 0 5px 14px rgba(195, 214, 56, 0.24);
}

.navbar-brand-text {
  color: #33140c;

  font-family: "DM Serif Display", serif;
  font-size: 1.45rem;
  letter-spacing: -0.02em;
}

.navbar-brand-text span {
  color: #146c84;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 6px;
}

.navbar-link {
  position: relative;

  padding: 9px 13px;

  border-radius: 50px;

  color: #705f57;

  font-size: 0.87rem;
  font-weight: 700;

  transition:
    color 180ms ease,
    background 180ms ease;
}

.navbar-link:hover {
  color: #33140c;
  background: rgba(255, 254, 252, 0.8);
}

.navbar-link.active {
  color: #146c84;
  background: #dcecef;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 14px;

  margin-left: auto;
}

.navbar-user {
  display: flex;
  align-items: center;
  gap: 9px;
}

.navbar-user-avatar {
  width: 34px;
  height: 34px;

  display: grid;
  place-items: center;

  border-radius: 50%;

  color: #fff;
  background: #146c84;

  font-size: 0.78rem;
  font-weight: 700;
}

.navbar-user-name {
  max-width: 130px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: #33140c;
  font-size: 0.84rem;
  font-weight: 700;
}

.navbar-logout {
  min-height: 38px;
  padding: 0 15px;

  border: 1px solid rgba(51, 20, 12, 0.1);
  border-radius: 50px;

  color: #705f57;
  background: rgba(255, 254, 252, 0.7);

  font-size: 0.8rem;
  font-weight: 700;

  transition:
    color 180ms ease,
    background 180ms ease,
    transform 180ms ease;
}

.navbar-logout:hover {
  color: #33140c;
  background: #fffefc;
  transform: translateY(-1px);
}

@media (max-width: 760px) {
  .navbar-inner {
    width: min(100% - 28px, 1200px);
    min-height: 68px;
    gap: 16px;
  }

  .navbar-links {
    display: none;
  }

  .navbar-user-name {
    display: none;
  }
}

@media (max-width: 430px) {
  .navbar-inner {
    width: min(100% - 22px, 1200px);
  }

  .navbar-brand-text {
    font-size: 1.25rem;
  }

  .navbar-brand-mark {
    width: 35px;
    height: 35px;
  }

  .navbar-actions {
    gap: 8px;
  }

  .navbar-logout {
    padding: 0 12px;
  }
}
`;

document.head.appendChild(style);