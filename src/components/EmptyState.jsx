function EmptyState({
  title = "No applications yet",
  message = "Start tracking your job applications to see them here.",
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <span>✦</span>
      </div>

      <div className="empty-state-content">
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default EmptyState;

const style = document.createElement("style");

style.textContent = `
.empty-state {
  min-height: 260px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 40px 24px;

  border: 1px dashed rgba(51, 20, 12, 0.16);
  border-radius: 28px;

  background:
    radial-gradient(
      circle at 50% 0%,
      rgba(195, 214, 56, 0.11),
      transparent 48%
    ),
    rgba(255, 254, 252, 0.7);

  text-align: center;
}

.empty-state-icon {
  width: 64px;
  height: 64px;

  display: grid;
  place-items: center;

  margin-bottom: 18px;

  border-radius: 22px;

  color: #33140c;
  background: #eef2cf;

  font-size: 1.5rem;

  box-shadow: 0 8px 20px rgba(195, 214, 56, 0.15);
}

.empty-state-content h3 {
  margin: 0 0 7px;

  color: #33140c;

  font-family: "DM Serif Display", serif;
  font-size: 1.55rem;
  font-weight: 400;
}

.empty-state-content p {
  max-width: 430px;

  margin: 0;

  color: #705f57;

  font-size: 0.88rem;
  line-height: 1.6;
}
`;

document.head.appendChild(style);