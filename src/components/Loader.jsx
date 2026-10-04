function Loader({ text = "Loading..." }) {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <span />
        <span />
        <span />
      </div>

      {text && <p>{text}</p>}
    </div>
  );
}

export default Loader;

const style = document.createElement("style");

style.textContent = `
.loader-wrapper {
  min-height: 220px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #705f57;
}

.loader {
  display: flex;
  align-items: center;
  gap: 6px;

  height: 30px;
}

.loader span {
  width: 9px;
  height: 9px;

  border-radius: 50%;

  background: #146c84;

  animation: jobtrailLoader 1.15s infinite ease-in-out;
}

.loader span:nth-child(2) {
  animation-delay: 0.14s;
  background: #61929a;
}

.loader span:nth-child(3) {
  animation-delay: 0.28s;
  background: #c3d638;
}

.loader-wrapper p {
  margin: 8px 0 0;

  color: #8f8179;

  font-size: 0.78rem;
  font-weight: 600;
}

@keyframes jobtrailLoader {
  0%,
  60%,
  100% {
    opacity: 0.45;
    transform: translateY(0);
  }

  30% {
    opacity: 1;
    transform: translateY(-7px);
  }
}
`;

document.head.appendChild(style);