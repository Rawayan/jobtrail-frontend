import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getApplications } from "../api/applications";
import { getStats } from "../api/applications";

import StatCard from "../components/StatCard";
import ApplicationCard from "../components/ApplicationCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [statsResponse, applicationsResponse] = await Promise.all([
        getStats(),
        getApplications({
          ordering: "-created_at",
          page: 1,
        }),
      ]);

      setStats(statsResponse.data);

      const applicationData = applicationsResponse.data;

      if (Array.isArray(applicationData)) {
        setApplications(applicationData.slice(0, 5));
      } else {
        setApplications((applicationData.results || []).slice(0, 5));
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          "Unable to load your dashboard right now."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-shell">
          <Loader text="Preparing your dashboard..." />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-shell">
          <ErrorState
            title="Dashboard unavailable"
            message={error}
            onRetry={fetchDashboardData}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-shell">
        {/* =========================
            HERO
        ========================= */}

        <section className="dashboard-hero">
          <div className="dashboard-hero-copy">
            <span className="dashboard-eyebrow">
              YOUR CAREER COMMAND CENTER
            </span>

            <h1>
              Keep every
              <br />
              opportunity <em>moving.</em>
            </h1>

            <p>
              Track your applications, follow your progress, and stay
              focused on the next opportunity.
            </p>
          </div>

          <Link
            to="/applications/new"
            className="dashboard-add-button"
          >
            <span>+</span>
            Add application
          </Link>
        </section>

        {/* =========================
            STATS
        ========================= */}

        <section className="dashboard-stats-section">
          <div className="dashboard-section-heading">
            <div>
              <span className="section-kicker">OVERVIEW</span>
              <h2>Your application pulse</h2>
            </div>

            <span className="dashboard-count">
              {stats?.total || 0} total
            </span>
          </div>

          <div className="dashboard-stats-grid">
            <StatCard
              title="Total applications"
              value={stats?.total || 0}
              icon="◉"
              variant="teal"
            />

            <StatCard
              title="Wishlist"
              value={stats?.wishlist || 0}
              icon="✦"
              variant="lime"
            />

            <StatCard
              title="Applied"
              value={stats?.applied || 0}
              icon="↗"
              variant="gold"
            />

            <StatCard
              title="Interview"
              value={stats?.interview || 0}
              icon="◌"
              variant="sage"
            />

            <StatCard
              title="Offers"
              value={stats?.offer || 0}
              icon="✓"
              variant="lime"
            />

            <StatCard
              title="Rejected"
              value={stats?.rejected || 0}
              icon="×"
              variant="danger"
            />
          </div>
        </section>

        {/* =========================
            RECENT APPLICATIONS
        ========================= */}

        <section className="dashboard-recent-section">
          <div className="dashboard-section-heading">
            <div>
              <span className="section-kicker">RECENT ACTIVITY</span>
              <h2>Latest applications</h2>
            </div>

            <Link
              to="/applications"
              className="dashboard-view-all"
            >
              View all
              <span>→</span>
            </Link>
          </div>

          {applications.length === 0 ? (
            <EmptyState
              title="Your journey starts here"
              message="Add your first job application and start building your career pipeline."
            />
          ) : (
            <div className="dashboard-applications-grid">
              {applications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Dashboard;

/* =========================
   DASHBOARD STYLES
========================= */

const style = document.createElement("style");

style.textContent = `
.dashboard-page {
  min-height: calc(100vh - 76px);
}

.dashboard-shell {
  width: min(100% - 40px, 1200px);
  margin: 0 auto;
  padding: 54px 0 90px;
}

/* =========================
   HERO
========================= */

.dashboard-hero {
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;

  min-height: 355px;

  margin-bottom: 58px;
  padding: 48px;

  border-radius: 40px;

  background:
    radial-gradient(
      circle at 86% 22%,
      rgba(195, 214, 56, 0.45),
      transparent 24%
    ),
    radial-gradient(
      circle at 96% 100%,
      rgba(20, 108, 132, 0.3),
      transparent 31%
    ),
    #e9ead4;

  box-shadow: 0 18px 50px rgba(51, 20, 12, 0.07);
}

.dashboard-hero::before {
  content: "";

  position: absolute;

  width: 270px;
  height: 270px;

  right: 120px;
  top: -150px;

  border: 1px solid rgba(51, 20, 12, 0.08);
  border-radius: 50%;
}

.dashboard-hero::after {
  content: "";

  position: absolute;

  width: 430px;
  height: 430px;

  right: -190px;
  bottom: -260px;

  border: 1px solid rgba(51, 20, 12, 0.08);
  border-radius: 50%;
}

.dashboard-hero-copy {
  position: relative;
  z-index: 2;

  max-width: 690px;
}

.dashboard-eyebrow,
.section-kicker {
  display: inline-block;

  margin-bottom: 14px;

  color: #146c84;

  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.dashboard-hero h1 {
  margin: 0;

  color: #33140c;

  font-size: clamp(3.5rem, 7vw, 6.4rem);
  line-height: 0.87;
}

.dashboard-hero h1 em {
  color: #146c84;
  font-style: italic;
}

.dashboard-hero p {
  max-width: 540px;

  margin: 24px 0 0;

  color: #705f57;

  font-size: 0.98rem;
  line-height: 1.65;
}

.dashboard-add-button {
  position: relative;
  z-index: 3;

  display: inline-flex;
  align-items: center;
  gap: 9px;

  min-height: 50px;
  padding: 0 20px;

  border-radius: 50px;

  color: #fff;
  background: #146c84;

  font-size: 0.84rem;
  font-weight: 700;

  box-shadow: 0 10px 24px rgba(20, 108, 132, 0.22);

  transition:
    transform 180ms ease,
    background 180ms ease,
    box-shadow 180ms ease;
}

.dashboard-add-button span {
  font-size: 1.25rem;
  line-height: 1;
}

.dashboard-add-button:hover {
  background: #0c5366;
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(20, 108, 132, 0.27);
}

/* =========================
   SECTION HEADINGS
========================= */

.dashboard-stats-section,
.dashboard-recent-section {
  margin-bottom: 60px;
}

.dashboard-section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;

  margin-bottom: 22px;
}

.dashboard-section-heading h2 {
  margin: 0;

  color: #33140c;

  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1;
}

.section-kicker {
  margin-bottom: 7px;

  color: #61929a;
}

.dashboard-count {
  padding: 7px 12px;

  border-radius: 50px;

  color: #705f57;
  background: #f1eee3;

  font-size: 0.72rem;
  font-weight: 700;
}

/* =========================
   STATS GRID
========================= */

.dashboard-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 15px;
}

/* =========================
   RECENT APPLICATIONS
========================= */

.dashboard-view-all {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  color: #146c84;

  font-size: 0.82rem;
  font-weight: 800;

  transition:
    gap 180ms ease,
    color 180ms ease;
}

.dashboard-view-all span {
  font-size: 1rem;
}

.dashboard-view-all:hover {
  gap: 12px;
  color: #0c5366;
}

.dashboard-applications-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 900px) {
  .dashboard-shell {
    padding-top: 38px;
  }

  .dashboard-hero {
    min-height: auto;
    padding: 38px;
  }

  .dashboard-hero h1 {
    font-size: clamp(3rem, 8vw, 5rem);
  }

  .dashboard-stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .dashboard-shell {
    width: min(100% - 28px, 1200px);
    padding-bottom: 60px;
  }

  .dashboard-hero {
    flex-direction: column;
    align-items: flex-start;

    margin-bottom: 42px;
    padding: 32px;

    border-radius: 32px;
  }

  .dashboard-hero h1 {
    font-size: clamp(3rem, 13vw, 4.5rem);
  }

  .dashboard-add-button {
    width: 100%;
  }

  .dashboard-stats-section,
  .dashboard-recent-section {
    margin-bottom: 44px;
  }

  .dashboard-section-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .dashboard-applications-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 430px) {
  .dashboard-shell {
    width: min(100% - 22px, 1200px);
  }

  .dashboard-hero {
    padding: 27px 22px;
    border-radius: 27px;
  }

  .dashboard-hero h1 {
    font-size: 3.05rem;
  }

  .dashboard-hero p {
    font-size: 0.9rem;
  }

  .dashboard-stats-grid {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .dashboard-section-heading h2 {
    font-size: 2.15rem;
  }
}
`;

document.head.appendChild(style);