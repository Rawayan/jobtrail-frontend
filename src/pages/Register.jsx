import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../api/auth";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFieldErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setFieldErrors({});

    const errors = {};

    if (!formData.username.trim()) {
      errors.username = "Username is required.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password =
        "Password must be at least 6 characters.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      setLoading(true);

      await registerUser(formData);

      navigate("/login", {
        replace: true,
        state: {
          message:
            "Registration successful. Please login.",
        },
      });
    } catch (error) {
      const responseData = error.response?.data;

      if (responseData) {
        setFieldErrors(responseData);
      } else {
        setError(
          "Unable to connect to the server."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Register</h1>

        <p className="auth-subtitle">
          Create your account to get started
        </p>

        {error && (
          <p className="auth-error">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
            />

            {fieldErrors.username && (
              <p className="field-error">
                {fieldErrors.username}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />

            {fieldErrors.email && (
              <p className="field-error">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
            />

            {fieldErrors.password && (
              <p className="field-error">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary auth-submit"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;