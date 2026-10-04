import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getApplications } from "../api/applications";
import { useAuth } from "../auth/AuthContext";

import StatCard from "../components/StatCard";
import ApplicationCard from "../components/ApplicationCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";

import api from "../api/client";

function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    total: 0,
    wishlist: 0,
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
  });

  const [recentApplications, setRecentApplications] = useState([]);

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
        api.get("/stats/"),
        getApplications({ ordering: "-created_at" }),
      ]);

      setStats({
        total: statsResponse.data?.total ?? 0,
        wishlist: statsResponse.data?.wishlist ?? 0,
        applied: statsResponse.data?.applied ?? 0,
        interview: statsResponse.data?.interview ?? 0,
        offer: statsResponse.data?.offer ?? 0,
        rejected: statsResponse.data?.rejected ?? 0,
      });

      const applicationsData = applicationsResponse;

      const applications =
        applicationsData?.results ?? applicationsData ?? [];

      setRecentApplications(applications.slice(0, 5));
    } catch (err) {
      console.error("Dashboard error:", err);

      setError(
        err?.response?.data?.detail ||
          "Unable to load dashboard data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-loading">
          <Loader />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="dashboard-page">
        <ErrorState message={error} onRetry={fetchDashboardData} />
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <div className="dashboard-hero-content">
          <span className="dashboard-eyebrow">JOB APPLICATION TRACKER</span>

          <h1>
            Welcome back
            <br />
            <span>{user?.username || "there"}.</span>
          </h1>

          <p>
            Keep your applications organized, stay on top of opportunities,
            and move closer to your next role.
          </p>

          <div className="dashboard-actions">
            <Link to="/applications/new" className="primary-button">
              + Add Application
            </Link>

            <Link to="/applications" className="secondary-button">
              View Applications →
            </Link>
          </div>
        </div>

        <div className="dashboard-hero-card">
          <div className="hero-card-label">APPLICATION OVERVIEW</div>

          <div className="hero-card-number">{stats.total}</div>

          <div className="hero-card-text">
            {stats.total === 1 ? "active application" : "total applications"}
          </div>

          <div className="hero-card-line">
            <span />
          </div>

          <div className="hero-card-footer">
            <span>Keep applying.</span>
            <span>Keep moving.</span>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">YOUR PIPELINE</span>
            <h2>Application snapshot</h2>
          </div>

          <Link to="/applications" className="section-link">
            See all →
          </Link>
        </div>

        <div className="stats-grid">
          <StatCard
            title="Total"
            value={stats.total}
            className="stat-total"
          />

          <StatCard
            title="Wishlist"
            value={stats.wishlist}
            className="stat-wishlist"
          />

          <StatCard
            title="Applied"
            value={stats.applied}
            className="stat-applied"
          />

          <StatCard
            title="Interview"
            value={stats.interview}
            className="stat-interview"
          />

          <StatCard
            title="Offer"
            value={stats.offer}
            className="stat-offer"
          />

          <StatCard
            title="Rejected"
            value={stats.rejected}
            className="stat-rejected"
          />
        </div>
      </section>

      <section className="recent-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">LATEST ACTIVITY</span>
            <h2>Recent applications</h2>
          </div>

          <Link to="/applications" className="section-link">
            View all →
          </Link>
        </div>

        {recentApplications.length === 0 ? (
          <EmptyState
            title="No applications yet"
            message="Start tracking your job search by adding your first application."
          />
        ) : (
          <div className="recent-applications-grid">
            {recentApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
              />
            ))}
          </div>
        )}
      </section>

      <style>{`
        .dashboard-page {
          min-height: 100vh;
          padding: 40px 0 80px;
        }

        .dashboard-hero {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(300px, 0.65fr);
          gap: 28px;
          align-items: stretch;
          margin-bottom: 80px;
        }

        .dashboard-hero-content {
          position: relative;
          overflow: hidden;
          min-height: 430px;
          padding: 56px;
          border-radius: 40px;
          background:
            radial-gradient(
              circle at 85% 15%,
              rgba(195, 214, 56, 0.2),
              transparent 32%
            ),
            linear-gradient(
              135deg,
              #146c84 0%,
              #195f70 55%,
              #0d4d5d 100%
            );
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .dashboard-hero-content::after {
          content: "";
          position: absolute;
          width: 220px;
          height: 220px;
          right: -80px;
          bottom: -100px;
          border-radius: 50%;
          background: rgba(243, 179, 79, 0.35);
          filter: blur(2px);
        }

        .dashboard-eyebrow,
        .section-eyebrow,
        .hero-card-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .dashboard-eyebrow {
          margin-bottom: 18px;
          color: rgba(255, 255, 255, 0.72);
        }

        .dashboard-hero h1 {
          position: relative;
          z-index: 1;
          max-width: 760px;
          margin: 0;
          font-family: "GT Alpina", Georgia, serif;
          font-size: clamp(48px, 6vw, 86px);
          line-height: 0.94;
          font-weight: 400;
          letter-spacing: -0.04em;
        }

        .dashboard-hero h1 span {
          color: #c3d638;
        }

        .dashboard-hero-content p {
          position: relative;
          z-index: 1;
          max-width: 590px;
          margin: 28px 0 0;
          color: rgba(255, 255, 255, 0.78);
          font-size: 16px;
          line-height: 1.7;
        }

        .dashboard-actions {
          position: relative;
          z-index: 2;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 34px;
        }

        .primary-button,
        .secondary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 50px;
          padding: 0 22px;
          border-radius: 50px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .primary-button {
          background: #c3d638;
          color: #173d45;
        }

        .secondary-button {
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          backdrop-filter: blur(12px);
        }

        .primary-button:hover,
        .secondary-button:hover {
          transform: translateY(-2px);
        }

        .dashboard-hero-card {
          min-height: 430px;
          padding: 36px;
          border-radius: 40px;
          background: #cecca1;
          color: #173d45;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 20px 50px rgba(20, 108, 132, 0.1);
        }

        .hero-card-label {
          color: rgba(23, 61, 69, 0.62);
        }

        .hero-card-number {
          margin-top: auto;
          font-family: "GT Alpina", Georgia, serif;
          font-size: clamp(90px, 11vw, 150px);
          line-height: 0.8;
          letter-spacing: -0.06em;
        }

        .hero-card-text {
          margin-top: 18px;
          font-size: 15px;
          font-weight: 600;
        }

        .hero-card-line {
          height: 1px;
          margin: 28px 0 18px;
          background: rgba(23, 61, 69, 0.2);
        }

        .hero-card-line span {
          display: block;
          width: 42%;
          height: 3px;
          background: #146c84;
        }

        .hero-card-footer {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .stats-section,
        .recent-section {
          margin-bottom: 78px;
        }

        .section-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 28px;
        }

        .section-eyebrow {
          margin-bottom: 9px;
          color: #61929a;
        }

        .section-heading h2 {
          margin: 0;
          color: #173d45;
          font-family: "GT Alpina", Georgia, serif;
          font-size: clamp(34px, 4vw, 52px);
          line-height: 1;
          font-weight: 400;
          letter-spacing: -0.035em;
        }

        .section-link {
          color: #146c84;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .recent-applications-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .dashboard-loading {
          min-height: 70vh;
          display: grid;
          place-items: center;
        }

        @media (max-width: 900px) {
          .dashboard-hero {
            grid-template-columns: 1fr;
          }

          .dashboard-hero-content,
          .dashboard-hero-card {
            min-height: 380px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .dashboard-page {
            padding: 24px 0 60px;
          }

          .dashboard-hero {
            gap: 16px;
            margin-bottom: 55px;
          }

          .dashboard-hero-content {
            min-height: 480px;
            padding: 34px 26px;
            border-radius: 30px;
          }

          .dashboard-hero h1 {
            font-size: 52px;
          }

          .dashboard-hero-card {
            min-height: 330px;
            padding: 28px;
            border-radius: 30px;
          }

          .hero-card-number {
            font-size: 100px;
          }

          .dashboard-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .primary-button,
          .secondary-button {
            width: 100%;
          }

          .section-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .recent-applications-grid {
            grid-template-columns: 1fr;
          }

          .stats-section,
          .recent-section {
            margin-bottom: 55px;
          }
        }

        @media (max-width: 390px) {
          .dashboard-hero-content {
            padding: 28px 20px;
          }

          .dashboard-hero h1 {
            font-size: 46px;
          }

          .dashboard-hero-card {
            padding: 24px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}

export default Dashboard;