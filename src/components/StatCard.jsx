function StatCard({ title, value, icon, variant = "teal" }) {
  return (
    <div className={`stat-card stat-card-${variant}`}>
      <div className="stat-card-top">
        <div className="stat-card-icon">{icon}</div>

        <span className="stat-card-label">{title}</span>
      </div>

      <div className="stat-card-value">{value}</div>

      <div className="stat-card-decoration" />
    </div>
  );
}

export default StatCard;

/* =========================
   STAT CARD STYLES
========================= */

const style = document.createElement("style");

style.textContent = `
.stat-card {
  position: relative;
  overflow: hidden;

  min-height: 158px;
  padding: 22px;

  border: 1px solid rgba(51, 20, 12, 0.08);
  border-radius: 24px;

  background: #fffefc;

  box-shadow: 0 7px 24px rgba(51, 20, 12, 0.055);

  transition:
    transform 200ms ease,
    box-shadow 200ms ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 35px rgba(51, 20, 12, 0.09);
}

.stat-card-top {
  position: relative;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.stat-card-icon {
  width: 42px;
  height: 42px;

  display: grid;
  place-items: center;

  border-radius: 14px;

  font-size: 1.1rem;
}

.stat-card-label {
  color: #705f57;

  font-size: 0.78rem;
  font-weight: 700;

  text-align: right;
}

.stat-card-value {
  position: relative;
  z-index: 2;

  margin-top: 20px;

  color: #33140c;

  font-family: "DM Serif Display", serif;
  font-size: 3rem;
  line-height: 1;
  letter-spacing: -0.035em;
}

.stat-card-decoration {
  position: absolute;
  right: -34px;
  bottom: -42px;

  width: 125px;
  height: 125px;

  border-radius: 50%;

  opacity: 0.55;
}

/* TEAL */

.stat-card-teal .stat-card-icon {
  color: #146c84;
  background: #dcecef;
}

.stat-card-teal .stat-card-decoration {
  background: #dcecef;
}

/* LIME */

.stat-card-lime .stat-card-icon {
  color: #5f641b;
  background: #eef2cf;
}

.stat-card-lime .stat-card-decoration {
  background: #eef2cf;
}

/* GOLD */

.stat-card-gold .stat-card-icon {
  color: #775016;
  background: #fae8c7;
}

.stat-card-gold .stat-card-decoration {
  background: #fae8c7;
}

/* SAGE */

.stat-card-sage .stat-card-icon {
  color: #315e4e;
  background: #dce8e6;
}

.stat-card-sage .stat-card-decoration {
  background: #dce8e6;
}

/* DANGER */

.stat-card-danger .stat-card-icon {
  color: #8e3428;
  background: #f6ded9;
}

.stat-card-danger .stat-card-decoration {
  background: #f6ded9;
}

@media (max-width: 700px) {
  .stat-card {
    min-height: 145px;
    padding: 19px;
  }

  .stat-card-value {
    font-size: 2.6rem;
  }
}

@media (max-width: 430px) {
  .stat-card {
    min-height: 135px;
    padding: 17px;
  }

  .stat-card-icon {
    width: 38px;
    height: 38px;
  }

  .stat-card-value {
    margin-top: 16px;
    font-size: 2.35rem;
  }

  .stat-card-label {
    font-size: 0.72rem;
  }
}
`;

document.head.appendChild(style);