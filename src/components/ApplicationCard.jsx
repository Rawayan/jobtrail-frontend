import { Link } from "react-router-dom";

function ApplicationCard({ application, onDelete }) {
  const {
    id,
    company,
    position,
    status,
    job_type,
    applied_on,
    expected_salary,
  } = application;

  const statusClass = `status-${status?.toLowerCase()}`;

  return (
    <article className="application-card">
      <div className="application-card-top">
        <div className="application-company-mark">
          {company?.charAt(0).toUpperCase()}
        </div>

        <div className="application-card-actions">
          <Link
            to={`/applications/${id}/edit`}
            className="application-action edit"
          >
            Edit
          </Link>

          {onDelete && (
            <button
              type="button"
              className="application-action delete"
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="application-main">
        <span className={`status-badge ${statusClass}`}>{status}</span>

        <h3>{position}</h3>

        <p className="application-company">{company}</p>
      </div>

      <div className="application-meta">
        <div className="application-meta-item">
          <span className="application-meta-label">Type</span>
          <span className="application-meta-value">
            {job_type || "—"}
          </span>
        </div>

        <div className="application-meta-item">
          <span className="application-meta-label">Applied</span>
          <span className="application-meta-value">
            {applied_on || "Not set"}
          </span>
        </div>

        <div className="application-meta-item">
          <span className="application-meta-label">Salary</span>
          <span className="application-meta-value">
            {expected_salary ? `৳${expected_salary}` : "Not set"}
          </span>
        </div>
      </div>
    </article>
  );
}

export default ApplicationCard;

/* =========================
   APPLICATION CARD STYLES
========================= */

const style = document.createElement("style");

style.textContent = `
.application-card {
  position: relative;

  padding: 23px;

  border: 1px solid rgba(51, 20, 12, 0.09);
  border-radius: 25px;

  background: rgba(255, 254, 252, 0.95);

  box-shadow: 0 7px 25px rgba(51, 20, 12, 0.055);

  transition:
    transform 200ms ease,
    box-shadow 200ms ease,
    border-color 200ms ease;
}

.application-card:hover {
  transform: translateY(-4px);

  border-color: rgba(20, 108, 132, 0.16);

  box-shadow: 0 17px 40px rgba(51, 20, 12, 0.09);
}

.application-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.application-company-mark {
  width: 48px;
  height: 48px;

  display: grid;
  place-items: center;

  flex-shrink: 0;

  border-radius: 16px;

  color: #33140c;
  background: #eef2cf;

  font-family: "DM Serif Display", serif;
  font-size: 1.35rem;
}

.application-card-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.application-action {
  min-height: 32px;
  padding: 0 10px;

  border: 0;
  border-radius: 50px;

  background: transparent;

  font-size: 0.74rem;
  font-weight: 700;

  transition:
    background 180ms ease,
    color 180ms ease;
}

.application-action.edit {
  color: #146c84;
}

.application-action.edit:hover {
  background: #dcecef;
}

.application-action.delete {
  color: #b54a3a;
}

.application-action.delete:hover {
  background: #f6ded9;
}

.application-main {
  margin-top: 24px;
}

.application-main h3 {
  margin: 14px 0 4px;

  color: #33140c;

  font-family: "DM Serif Display", serif;
  font-size: 1.55rem;
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -0.02em;
}

.application-company {
  margin-bottom: 0;

  color: #705f57;

  font-size: 0.88rem;
  font-weight: 600;
}

.application-meta {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  margin-top: 25px;
  padding-top: 18px;

  border-top: 1px solid rgba(51, 20, 12, 0.08);
}

.application-meta-item {
  min-width: 0;
}

.application-meta-label {
  display: block;

  margin-bottom: 5px;

  color: #9a8d85;

  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.application-meta-value {
  display: block;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: #33140c;

  font-size: 0.8rem;
  font-weight: 700;
}

@media (max-width: 500px) {
  .application-card {
    padding: 19px;
    border-radius: 21px;
  }

  .application-company-mark {
    width: 43px;
    height: 43px;
  }

  .application-main {
    margin-top: 20px;
  }

  .application-main h3 {
    font-size: 1.4rem;
  }

  .application-meta {
    gap: 8px;
  }

  .application-meta-label {
    font-size: 0.62rem;
  }

  .application-meta-value {
    font-size: 0.74rem;
  }
}
`;

document.head.appendChild(style);