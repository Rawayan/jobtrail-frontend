import { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Login() {
  const { user, login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from =
    location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      await login(
        formData.username,
        formData.password
      );

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          "Invalid username or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-layout">
        {/* LEFT / BRAND PANEL */}

        <section className="auth-showcase">
          <Link
            to="/login"
            className="auth-brand"
          >
            <span className="auth-brand-mark">
              J
            </span>

            <span>
              Job<span>Trail</span>
            </span>
          </Link>

          <div className="auth-showcase-content">
            <span className="auth-showcase-kicker">
              YOUR CAREER, ORGANIZED
            </span>

            <h1>
              Every application
              <br />
              has a <em>next step.</em>
            </h1>

            <p>
              Keep your job search clear, intentional,
              and moving forward.
            </p>
          </div>

          <div className="auth-decoration">
            <div className="auth-orbit auth-orbit-one" />
            <div className="auth-orbit auth-orbit-two" />

            <div className="auth-floating-card">
              <span className="auth-floating-dot" />
              <span>Application tracking</span>
              <strong>ON</strong>
            </div>
          </div>
        </section>

        {/* LOGIN PANEL */}

        <section className="auth-form-panel">
          <div className="auth-form-wrapper">
            <div className="auth-mobile-brand">
              <span className="auth-brand-mark">
                J
              </span>

              <span>
                Job<span>Trail</span>
              </span>
            </div>

            <div className="auth-heading">
              <span className="auth-kicker">
                WELCOME BACK
              </span>

              <h2>
                Good to
                <br />
                <em>see you.</em>
              </h2>

              <p>
                Sign in to continue managing your
                applications.
              </p>
            </div>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >
              <div className="auth-field">
                <label htmlFor="username">
                  Username
                </label>

                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  autoComplete="username"
                  required
                />
              </div>

              <div className="auth-field">
                <div className="auth-field-label-row">
                  <label htmlFor="password">
                    Password
                  </label>
                </div>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
              </div>

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                {loading
                  ? "Signing in..."
                  : "Sign in"}

                {!loading && <span>→</span>}
              </button>
            </form>

            <p className="auth-switch">
              Don't have an account?{" "}
              <Link to="/register">
                Create one
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;

/* =========================
   STYLES
========================= */

const style = document.createElement("style");

style.textContent = `
.auth-page {
  min-height: 100vh;

  background: #f7f5ed;
}

.auth-layout {
  min-height: 100vh;

  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
}

/* SHOWCASE */

.auth-showcase {
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  padding: 38px 6vw;

  background:
    radial-gradient(
      circle at 75% 25%,
      rgba(195, 214, 56, 0.4),
      transparent 27%
    ),
    radial-gradient(
      circle at 30% 85%,
      rgba(20, 108, 132, 0.25),
      transparent 34%
    ),
    #e8ead6;
}

.auth-brand {
  position: relative;
  z-index: 5;

  display: inline-flex;
  align-items: center;
  gap: 10px;

  width: fit-content;

  color: #33140c;

  font-family: "DM Serif Display", serif;
  font-size: 1.45rem;
}

.auth-brand > span:last-child span,
.auth-mobile-brand > span:last-child span {
  color: #146c84;
}

.auth-brand-mark {
  width: 39px;
  height: 39px;

  display: grid;
  place-items: center;

  border-radius: 13px;

  color: #33140c;
  background: #c3d638;

  font-family: "DM Serif Display", serif;
  font-size: 1.25rem;

  box-shadow: 0 6px 15px rgba(195, 214, 56, 0.2);
}

.auth-showcase-content {
  position: relative;
  z-index: 3;

  max-width: 650px;

  margin-top: auto;
  margin-bottom: auto;
  padding: 70px 0;
}

.auth-showcase-kicker,
.auth-kicker {
  display: inline-block;

  margin-bottom: 14px;

  color: #146c84;

  font-size: 0.67rem;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.auth-showcase-content h1 {
  margin: 0;

  color: #33140c;

  font-family: "DM Serif Display", serif;
  font-size: clamp(3.5rem, 6vw, 6.3rem);
  font-weight: 400;
  line-height: 0.88;
  letter-spacing: -0.03em;
}

.auth-showcase-content h1 em {
  color: #146c84;
  font-style: italic;
}

.auth-showcase-content p {
  max-width: 450px;

  margin: 28px 0 0;

  color: #705f57;

  font-size: 0.97rem;
  line-height: 1.65;
}

/* DECORATION */

.auth-decoration {
  position: absolute;
  inset: 0;

  pointer-events: none;
}

.auth-orbit {
  position: absolute;

  border: 1px solid rgba(51, 20, 12, 0.1);
  border-radius: 50%;
}

.auth-orbit-one {
  width: 500px;
  height: 500px;

  right: -170px;
  bottom: -150px;
}

.auth-orbit-two {
  width: 700px;
  height: 700px;

  right: -270px;
  bottom: -250px;
}

.auth-floating-card {
  position: absolute;

  right: 12%;
  bottom: 14%;

  display: flex;
  align-items: center;
  gap: 10px;

  padding: 13px 16px;

  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 17px;

  background: rgba(255, 254, 252, 0.72);

  backdrop-filter: blur(12px);

  box-shadow: 0 18px 35px rgba(51, 20, 12, 0.1);

  color: #705f57;

  font-size: 0.73rem;
  font-weight: 700;
}

.auth-floating-card strong {
  color: #146c84;
  font-size: 0.65rem;
}

.auth-floating-dot {
  width: 8px;
  height: 8px;

  border-radius: 50%;

  background: #c3d638;
}

/* FORM PANEL */

.auth-form-panel {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 40px;

  background: #fffefc;
}

.auth-form-wrapper {
  width: min(100%, 430px);
}

.auth-mobile-brand {
  display: none;
}

.auth-heading {
  margin-bottom: 31px;
}

.auth-heading h2 {
  margin: 0;

  color: #33140c;

  font-family: "DM Serif Display", serif;
  font-size: clamp(3rem, 5vw, 4.3rem);
  font-weight: 400;
  line-height: 0.88;
}

.auth-heading h2 em {
  color: #146c84;
  font-style: italic;
}

.auth-heading p {
  max-width: 350px;

  margin: 18px 0 0;

  color: #705f57;

  font-size: 0.88rem;
  line-height: 1.6;
}

/* ERROR */

.auth-error {
  margin-bottom: 18px;
  padding: 13px 14px;

  border: 1px solid rgba(181, 74, 58, 0.12);
  border-radius: 14px;

  color: #8e3428;
  background: #f6ded9;

  font-size: 0.8rem;
  line-height: 1.5;
}

/* FORM */

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.auth-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.auth-field label {
  color: #33140c;

  font-size: 0.76rem;
  font-weight: 800;
}

.auth-field input {
  width: 100%;
  height: 51px;

  padding: 0 15px;

  border: 1px solid rgba(51, 20, 12, 0.11);
  border-radius: 15px;

  outline: none;

  color: #33140c;
  background: #f9f7f0;

  font-size: 0.84rem;

  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;
}

.auth-field input::placeholder {
  color: #a69b94;
}

.auth-field input:focus {
  border-color: #146c84;
  background: #fffefc;
  box-shadow: 0 0 0 4px rgba(20, 108, 132, 0.09);
}

.auth-submit {
  width: 100%;
  height: 52px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11px;

  margin-top: 7px;

  border: 0;
  border-radius: 50px;

  color: #fff;
  background: #146c84;

  font-size: 0.84rem;
  font-weight: 800;

  box-shadow: 0 10px 25px rgba(20, 108, 132, 0.2);

  transition:
    transform 180ms ease,
    background 180ms ease;
}

.auth-submit span {
  font-size: 1.1rem;
}

.auth-submit:hover:not(:disabled) {
  background: #0c5366;
  transform: translateY(-2px);
}

.auth-submit:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.auth-switch {
  margin: 25px 0 0;

  color: #8f8179;

  text-align: center;

  font-size: 0.78rem;
}

.auth-switch a {
  color: #146c84;
  font-weight: 800;
}

.auth-switch a:hover {
  text-decoration: underline;
}

/* RESPONSIVE */

@media (max-width: 900px) {
  .auth-layout {
    grid-template-columns: 1fr;
  }

  .auth-showcase {
    display: none;
  }

  .auth-form-panel {
    min-height: 100vh;
    padding: 30px 24px;
  }

  .auth-mobile-brand {
    display: flex;
    align-items: center;
    gap: 10px;

    width: fit-content;

    margin-bottom: 55px;

    color: #33140c;

    font-family: "DM Serif Display", serif;
    font-size: 1.4rem;
  }
}

@media (max-width: 430px) {
  .auth-form-panel {
    padding: 25px 18px;
  }

  .auth-mobile-brand {
    margin-bottom: 42px;
  }

  .auth-heading h2 {
    font-size: 3rem;
  }
}
`;

document.head.appendChild(style);