function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this information. Please try again.",
  onRetry,
}) {
  return (
    <div className="error-state">
      <div className="error-state-icon">
        !
      </div>

      <div className="error-state-content">
        <h3>{title}</h3>

        <p>{message}</p>

        {onRetry && (
          <button
            type="button"
            className="error-state-button"
            onClick={onRetry}
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorState;

const style = document.createElement("style");

style.textContent = `
.error-state {
  min-height: 250px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 38px 24px;

  border: 1px solid rgba(181, 74, 58, 0.13);
  border-radius: 28px;

  background:
    radial-gradient(
      circle at 50% 0%,
      rgba(246, 222, 217, 0.65),
      transparent 48%
    ),
    #fffefc;

  text-align: center;
}

.error-state-icon {
  width: 58px;
  height: 58px;

  display: grid;
  place-items: center;

  margin-bottom: 17px;

  border-radius: 19px;

  color: #8e3428;
  background: #f6ded9;

  font-size: 1.25rem;
  font-weight: 800;
}

.error-state-content h3 {
  margin: 0 0 7px;

  color: #33140c;

  font-family: "DM Serif Display", serif;
  font-size: 1.5rem;
  font-weight: 400;
}

.error-state-content p {
  max-width: 460px;

  margin: 0 auto;

  color: #705f57;

  font-size: 0.88rem;
  line-height: 1.6;
}

.error-state-button {
  min-height: 42px;

  margin-top: 20px;
  padding: 0 17px;

  border: 0;
  border-radius: 50px;

  color: #fff;
  background: #146c84;

  font-size: 0.82rem;
  font-weight: 700;

  box-shadow: 0 7px 18px rgba(20, 108, 132, 0.16);

  transition:
    background 180ms ease,
    transform 180ms ease;
}

.error-state-button:hover {
  background: #0c5366;
  transform: translateY(-2px);
}
`;

document.head.appendChild(style);