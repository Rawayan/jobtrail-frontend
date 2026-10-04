import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
  getApplications,
  deleteApplication,
} from "../api/applications";

import ApplicationCard from "../components/ApplicationCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import ConfirmModal from "../components/ConfirmModal";

function ApplicationList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [applications, setApplications] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState(null);

  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const page = Number(searchParams.get("page") || 1);

  useEffect(() => {
    fetchApplications();
  }, [search, status, page]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getApplications({
        search,
        status,
        page,
      });

      const data = response.data;

      if (Array.isArray(data)) {
        setApplications(data);
        setNextPage(null);
        setPreviousPage(null);
      } else {
        setApplications(data.results || []);
        setNextPage(data.next);
        setPreviousPage(data.previous);
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          "Unable to load your applications."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateSearch = (value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    params.delete("page");

    setSearchParams(params);
  };

  const updateStatus = (value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("status", value);
    } else {
      params.delete("status");
    }

    params.delete("page");

    setSearchParams(params);
  };

  const goToPage = (newPage) => {
    const params = new URLSearchParams(searchParams);

    if (newPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", newPage);
    }

    setSearchParams(params);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteApplication(deleteTarget);

      setDeleteTarget(null);

      await fetchApplications();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          "Unable to delete this application."
      );

      setDeleteTarget(null);
    }
  };

  const hasFilters = search || status;

  return (
    <>
      <main className="applications-page">
        <div className="applications-shell">
          {/* =========================
              PAGE HEADER
          ========================= */}

          <section className="applications-header">
            <div>
              <span className="applications-eyebrow">
                CAREER PIPELINE
              </span>

              <h1>
                Your
                <br />
                <em>applications.</em>
              </h1>

              <p>
                Keep every opportunity organized and know exactly
                where your job search stands.
              </p>
            </div>

            <Link
              to="/applications/new"
              className="applications-add-button"
            >
              <span>+</span>
              New application
            </Link>
          </section>

          {/* =========================
              FILTER BAR
          ========================= */}

          <section className="applications-toolbar">
            <div className="applications-search">
              <span className="search-icon">⌕</span>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  updateSearch(event.target.value)
                }
                placeholder="Search company or position..."
              />
            </div>

            <div className="applications-filter">
              <select
                value={status}
                onChange={(event) =>
                  updateStatus(event.target.value)
                }
              >
                <option value="">All statuses</option>
                <option value="WISHLIST">Wishlist</option>
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEW">Interview</option>
                <option value="OFFER">Offer</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            {hasFilters && (
              <button
                type="button"
                className="applications-clear"
                onClick={() => setSearchParams({})}
              >
                Clear filters
              </button>
            )}
          </section>

          {/* =========================
              CONTENT
          ========================= */}

          <section className="applications-content">
            <div className="applications-content-header">
              <div>
                <span className="applications-kicker">
                  TRACKING
                </span>

                <h2>
                  {hasFilters
                    ? "Filtered results"
                    : "All applications"}
                </h2>
              </div>

              {!loading && (
                <span className="applications-result-count">
                  {applications.length} shown
                </span>
              )}
            </div>

            {loading ? (
              <Loader text="Loading applications..." />
            ) : error ? (
              <ErrorState
                title="Applications unavailable"
                message={error}
                onRetry={fetchApplications}
              />
            ) : applications.length === 0 ? (
              <EmptyState
                title={
                  hasFilters
                    ? "Nothing matched your search"
                    : "No applications yet"
                }
                message={
                  hasFilters
                    ? "Try changing your search or status filter."
                    : "Add your first application and start building your career pipeline."
                }
              />
            ) : (
              <>
                <div className="applications-grid">
                  {applications.map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      onDelete={setDeleteTarget}
                    />
                  ))}
                </div>

                {/* =========================
                    PAGINATION
                ========================= */}

                {(previousPage || nextPage) && (
                  <div className="applications-pagination">
                    <button
                      type="button"
                      disabled={!previousPage}
                      onClick={() => goToPage(page - 1)}
                      className="pagination-button"
                    >
                      ← Previous
                    </button>

                    <div className="pagination-current">
                      Page <strong>{page}</strong>
                    </div>

                    <button
                      type="button"
                      disabled={!nextPage}
                      onClick={() => goToPage(page + 1)}
                      className="pagination-button"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </main>

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete application?"
        message="This application will be permanently removed from your tracker."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}

export default ApplicationList;

/* =========================
   STYLES
========================= */

const style = document.createElement("style");

style.textContent = `
.applications-page {
  min-height: calc(100vh - 76px);
}

.applications-shell {
  width: min(100% - 40px, 1200px);
  margin: 0 auto;
  padding: 54px 0 90px;
}

/* HEADER */

.applications-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;

  margin-bottom: 44px;
}

.applications-header > div:first-child {
  max-width: 720px;
}

.applications-eyebrow,
.applications-kicker {
  display: inline-block;

  margin-bottom: 12px;

  color: #146c84;

  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.applications-header h1 {
  margin: 0;

  color: #33140c;

  font-size: clamp(3.5rem, 7vw, 6rem);
  line-height: 0.87;
}

.applications-header h1 em {
  color: #146c84;
  font-style: italic;
}

.applications-header p {
  max-width: 560px;

  margin: 24px 0 0;

  color: #705f57;

  font-size: 0.96rem;
  line-height: 1.65;
}

.applications-add-button {
  display: inline-flex;
  align-items: center;
  gap: 9px;

  min-height: 50px;
  padding: 0 20px;

  flex-shrink: 0;

  border-radius: 50px;

  color: #fff;
  background: #146c84;

  font-size: 0.84rem;
  font-weight: 700;

  box-shadow: 0 10px 24px rgba(20, 108, 132, 0.2);

  transition:
    transform 180ms ease,
    background 180ms ease;
}

.applications-add-button span {
  font-size: 1.2rem;
}

.applications-add-button:hover {
  background: #0c5366;
  transform: translateY(-3px);
}

/* TOOLBAR */

.applications-toolbar {
  display: flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 48px;
  padding: 10px;

  border: 1px solid rgba(51, 20, 12, 0.08);
  border-radius: 22px;

  background: rgba(255, 254, 252, 0.85);

  box-shadow: 0 7px 22px rgba(51, 20, 12, 0.045);
}

.applications-search {
  display: flex;
  align-items: center;
  gap: 9px;

  flex: 1;

  min-height: 46px;
  padding: 0 14px;

  border-radius: 15px;

  background: #f5f2e9;
}

.search-icon {
  color: #8f8179;

  font-size: 1.25rem;
  line-height: 1;
}

.applications-search input {
  width: 100%;

  border: 0;
  outline: 0;

  color: #33140c;
  background: transparent;

  font-size: 0.84rem;
}

.applications-search input::placeholder {
  color: #9a8d85;
}

.applications-filter select {
  min-width: 155px;
  min-height: 46px;

  padding: 0 35px 0 14px;

  border: 1px solid rgba(51, 20, 12, 0.08);
  border-radius: 15px;

  outline: none;

  color: #33140c;
  background: #fffefc;

  font-size: 0.8rem;
  font-weight: 700;
}

.applications-clear {
  min-height: 42px;
  padding: 0 13px;

  border: 0;
  border-radius: 50px;

  color: #b54a3a;
  background: #f6ded9;

  font-size: 0.75rem;
  font-weight: 700;
}

/* CONTENT HEADER */

.applications-content-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;

  margin-bottom: 20px;
}

.applications-kicker {
  margin-bottom: 5px;
  color: #61929a;
}

.applications-content-header h2 {
  margin: 0;

  color: #33140c;

  font-family: "DM Serif Display", serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  line-height: 1;
}

.applications-result-count {
  padding: 7px 12px;

  border-radius: 50px;

  color: #705f57;
  background: #f1eee3;

  font-size: 0.72rem;
  font-weight: 700;
}

/* GRID */

.applications-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

/* PAGINATION */

.applications-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  margin-top: 34px;
}

.pagination-button {
  min-height: 42px;
  padding: 0 16px;

  border: 1px solid rgba(51, 20, 12, 0.09);
  border-radius: 50px;

  color: #33140c;
  background: #fffefc;

  font-size: 0.78rem;
  font-weight: 700;

  transition:
    background 180ms ease,
    transform 180ms ease;
}

.pagination-button:hover:not(:disabled) {
  background: #f1eee3;
  transform: translateY(-2px);
}

.pagination-button:disabled {
  cursor: not-allowed;

  opacity: 0.35;
}

.pagination-current {
  min-width: 80px;

  text-align: center;

  color: #705f57;

  font-size: 0.78rem;
}

.pagination-current strong {
  color: #33140c;
}

/* RESPONSIVE */

@media (max-width: 900px) {
  .applications-shell {
    padding-top: 38px;
  }

  .applications-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .applications-shell {
    width: min(100% - 28px, 1200px);
    padding-bottom: 60px;
  }

  .applications-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 24px;
  }

  .applications-header h1 {
    font-size: clamp(3rem, 13vw, 4.5rem);
  }

  .applications-add-button {
    width: 100%;
  }

  .applications-toolbar {
    align-items: stretch;
    flex-direction: column;
    padding: 8px;
  }

  .applications-filter select {
    width: 100%;
  }

  .applications-clear {
    width: 100%;
  }
}

@media (max-width: 430px) {
  .applications-shell {
    width: min(100% - 22px, 1200px);
  }

  .applications-header h1 {
    font-size: 3.05rem;
  }

  .applications-header p {
    font-size: 0.88rem;
  }

  .applications-content-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .applications-pagination {
    gap: 7px;
  }

  .pagination-button {
    padding: 0 12px;
  }
}
`;

document.head.appendChild(style);