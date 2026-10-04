import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  createApplication,
  getApplication,
  updateApplication,
} from "../api/applications";

import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

function ApplicationForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "WISHLIST",
    job_type: "ONSITE",
    applied_on: "",
    expected_salary: "",
    job_link: "",
    notes: "",
  });

  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditMode) {
      fetchApplication();
    }
  }, [id]);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getApplication(id);

      const data = response.data;

      setFormData({
        company: data.company || "",
        position: data.position || "",
        status: data.status || "WISHLIST",
        job_type: data.job_type || "ONSITE",
        applied_on: data.applied_on || "",
        expected_salary: data.expected_salary || "",
        job_link: data.job_link || "",
        notes: data.notes || "",
      });
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          "Unable to load this application."
      );
    } finally {
      setLoading(false);
    }
  };

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
      setSubmitting(true);
      setError("");

      const payload = {
        ...formData,
        expected_salary:
          formData.expected_salary === ""
            ? null
            : Number(formData.expected_salary),
        applied_on:
          formData.applied_on === ""
            ? null
            : formData.applied_on,
        job_link:
          formData.job_link === ""
            ? ""
            : formData.job_link,
      };

      if (isEditMode) {
        await updateApplication(id, payload);
      } else {
        await createApplication(payload);
      }

      navigate("/applications");
    } catch (err) {
      console.error(err);

      const data = err.response?.data;

      if (data && typeof data === "object") {
        const messages = Object.entries(data)
          .map(([field, value]) => {
            const message = Array.isArray(value)
              ? value.join(", ")
              : value;

            return `${field}: ${message}`;
          })
          .join(" | ");

        setError(messages || "Unable to save application.");
      } else {
        setError("Unable to save application.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="application-form-page">
        <div className="application-form-shell">
          <Loader text="Loading application..." />
        </div>
      </main>
    );
  }

  if (error && isEditMode && !formData.company) {
    return (
      <main className="application-form-page">
        <div className="application-form-shell">
          <ErrorState
            title="Application unavailable"
            message={error}
            onRetry={fetchApplication}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="application-form-page">
      <div className="application-form-shell">
        {/* HEADER */}

        <div className="form-page-header">
          <Link
            to="/applications"
            className="form-back-link"
          >
            ← Back to applications
          </Link>

          <span className="form-eyebrow">
            {isEditMode
              ? "EDIT APPLICATION"
              : "NEW APPLICATION"}
          </span>

          <h1>
            {isEditMode ? (
              <>
                Refine your
                <br />
                <em>opportunity.</em>
              </>
            ) : (
              <>
                Add a new
                <br />
                <em>opportunity.</em>
              </>
            )}
          </h1>

          <p>
            {isEditMode
              ? "Update the details of this opportunity and keep your pipeline accurate."
              : "Capture the details now so you can focus on what comes next."}
          </p>
        </div>

        {/* FORM */}

        <form
          className="application-form-card"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          {/* BASIC INFORMATION */}

          <div className="form-section">
            <div className="form-section-heading">
              <span>01</span>

              <div>
                <h2>Role details</h2>
                <p>
                  Start with the company and position.
                </p>
              </div>
            </div>

            <div className="form-grid two-columns">
              <div className="form-field">
                <label htmlFor="company">
                  Company *
                </label>

                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Brain Station 23"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="position">
                  Position *
                </label>

                <input
                  id="position"
                  name="position"
                  type="text"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer"
                  required
                />
              </div>
            </div>
          </div>

          {/* STATUS */}

          <div className="form-section">
            <div className="form-section-heading">
              <span>02</span>

              <div>
                <h2>Application status</h2>
                <p>
                  Where does this opportunity stand?
                </p>
              </div>
            </div>

            <div className="form-grid two-columns">
              <div className="form-field">
                <label htmlFor="status">
                  Status
                </label>

                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="WISHLIST">
                    Wishlist
                  </option>

                  <option value="APPLIED">
                    Applied
                  </option>

                  <option value="INTERVIEW">
                    Interview
                  </option>

                  <option value="OFFER">
                    Offer
                  </option>

                  <option value="REJECTED">
                    Rejected
                  </option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="job_type">
                  Job type
                </label>

                <select
                  id="job_type"
                  name="job_type"
                  value={formData.job_type}
                  onChange={handleChange}
                >
                  <option value="ONSITE">
                    Onsite
                  </option>

                  <option value="REMOTE">
                    Remote
                  </option>

                  <option value="HYBRID">
                    Hybrid
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* ADDITIONAL INFORMATION */}

          <div className="form-section">
            <div className="form-section-heading">
              <span>03</span>

              <div>
                <h2>More details</h2>
                <p>
                  Add information you'll want later.
                </p>
              </div>
            </div>

            <div className="form-grid two-columns">
              <div className="form-field">
                <label htmlFor="applied_on">
                  Applied on
                </label>

                <input
                  id="applied_on"
                  name="applied_on"
                  type="date"
                  value={formData.applied_on}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="expected_salary">
                  Expected salary
                </label>

                <input
                  id="expected_salary"
                  name="expected_salary"
                  type="number"
                  min="0"
                  value={formData.expected_salary}
                  onChange={handleChange}
                  placeholder="e.g. 60000"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="job_link">
                Job link
              </label>

              <input
                id="job_link"
                name="job_link"
                type="url"
                value={formData.job_link}
                onChange={handleChange}
                placeholder="https://example.com/jobs/..."
              />
            </div>

            <div className="form-field">
              <label htmlFor="notes">
                Notes
              </label>

              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Interview notes, recruiter details, follow-up reminders..."
                rows="5"
              />
            </div>
          </div>

          {/* ACTIONS */}

          <div className="form-actions">
            <Link
              to="/applications"
              className="form-cancel-button"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="form-submit-button"
              disabled={submitting}
            >
              {submitting
                ? "Saving..."
                : isEditMode
                ? "Save changes"
                : "Add application"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default ApplicationForm;

/* =========================
   STYLES
========================= */

const style = document.createElement("style");

style.textContent = `
.application-form-page {
  min-height: calc(100vh - 76px);
}

.application-form-shell {
  width: min(100% - 40px, 960px);
  margin: 0 auto;
  padding: 50px 0 90px;
}

/* HEADER */

.form-page-header {
  margin-bottom: 38px;
}

.form-back-link {
  display: inline-flex;
  align-items: center;

  margin-bottom: 34px;

  color: #705f57;

  font-size: 0.78rem;
  font-weight: 700;

  transition:
    color 180ms ease,
    transform 180ms ease;
}

.form-back-link:hover {
  color: #146c84;
  transform: translateX(-3px);
}

.form-eyebrow {
  display: block;

  margin-bottom: 11px;

  color: #146c84;

  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.form-page-header h1 {
  margin: 0;

  color: #33140c;

  font-size: clamp(3.3rem, 7vw, 5.7rem);
  line-height: 0.88;
}

.form-page-header h1 em {
  color: #146c84;
  font-style: italic;
}

.form-page-header p {
  max-width: 590px;

  margin: 22px 0 0;

  color: #705f57;

  font-size: 0.94rem;
  line-height: 1.65;
}

/* FORM CARD */

.application-form-card {
  padding: 38px;

  border: 1px solid rgba(51, 20, 12, 0.08);
  border-radius: 32px;

  background: rgba(255, 254, 252, 0.92);

  box-shadow: 0 14px 45px rgba(51, 20, 12, 0.065);
}

.form-error {
  margin-bottom: 28px;
  padding: 14px 16px;

  border: 1px solid rgba(181, 74, 58, 0.12);
  border-radius: 15px;

  color: #8e3428;
  background: #f6ded9;

  font-size: 0.82rem;
  line-height: 1.5;
}

/* FORM SECTION */

.form-section {
  padding: 7px 0 34px;
  margin-bottom: 34px;

  border-bottom: 1px solid rgba(51, 20, 12, 0.08);
}

.form-section-heading {
  display: flex;
  align-items: flex-start;
  gap: 14px;

  margin-bottom: 25px;
}

.form-section-heading > span {
  width: 31px;
  height: 31px;

  display: grid;
  place-items: center;

  flex-shrink: 0;

  border-radius: 10px;

  color: #146c84;
  background: #dcecef;

  font-size: 0.68rem;
  font-weight: 800;
}

.form-section-heading h2 {
  margin: 0 0 4px;

  color: #33140c;

  font-family: "DM Serif Display", serif;
  font-size: 1.65rem;
  font-weight: 400;
}

.form-section-heading p {
  margin: 0;

  color: #8f8179;

  font-size: 0.78rem;
}

/* FIELDS */

.form-grid {
  display: grid;
  gap: 17px;
}

.form-grid.two-columns {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;

  margin-bottom: 17px;
}

.form-field:last-child {
  margin-bottom: 0;
}

.form-field label {
  color: #33140c;

  font-size: 0.77rem;
  font-weight: 800;
}

.form-field input,
.form-field select,
.form-field textarea {
  width: 100%;

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

.form-field input,
.form-field select {
  height: 49px;
  padding: 0 14px;
}

.form-field textarea {
  min-height: 130px;
  padding: 13px 14px;
  resize: vertical;
  line-height: 1.6;
}

.form-field input::placeholder,
.form-field textarea::placeholder {
  color: #a69b94;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  border-color: #146c84;

  background: #fffefc;

  box-shadow: 0 0 0 4px rgba(20, 108, 132, 0.09);
}

/* ACTIONS */

.form-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

.form-cancel-button,
.form-submit-button {
  min-height: 48px;
  padding: 0 20px;

  border-radius: 50px;

  font-size: 0.82rem;
  font-weight: 700;
}

.form-cancel-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 1px solid rgba(51, 20, 12, 0.1);

  color: #705f57;
  background: #f1eee3;
}

.form-submit-button {
  border: 0;

  color: #fff;
  background: #146c84;

  box-shadow: 0 8px 20px rgba(20, 108, 132, 0.2);

  transition:
    background 180ms ease,
    transform 180ms ease;
}

.form-submit-button:hover:not(:disabled) {
  background: #0c5366;
  transform: translateY(-2px);
}

.form-submit-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

/* RESPONSIVE */

@media (max-width: 700px) {
  .application-form-shell {
    width: min(100% - 28px, 960px);
    padding-top: 32px;
  }

  .application-form-card {
    padding: 27px 23px;
    border-radius: 27px;
  }

  .form-grid.two-columns {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .form-page-header h1 {
    font-size: clamp(3rem, 13vw, 4.5rem);
  }
}

@media (max-width: 430px) {
  .application-form-shell {
    width: min(100% - 22px, 960px);
    padding-bottom: 55px;
  }

  .application-form-card {
    padding: 23px 17px;
    border-radius: 23px;
  }

  .form-page-header h1 {
    font-size: 3.05rem;
  }

  .form-section-heading h2 {
    font-size: 1.45rem;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .form-cancel-button,
  .form-submit-button {
    width: 100%;
  }
}
`;

document.head.appendChild(style);