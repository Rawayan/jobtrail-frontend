import { useEffect } from "react";

function ConfirmModal({
  isOpen,
  title = "Delete application?",
  message = "This action cannot be undone.",
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      className="confirm-overlay"
      onMouseDown={handleBackdropClick}
      role="presentation"
    >
      <div
        className="confirm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        <div className="confirm-icon">
          !
        </div>

        <div className="confirm-content">
          <h2 id="confirm-modal-title">{title}</h2>

          <p>{message}</p>
        </div>

        <div className="confirm-actions">
          <button
            type="button"
            className="confirm-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="confirm-delete"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;

/* =========================
   CONFIRM MODAL STYLES
========================= */

const style = document.createElement("style");

style.textContent = `
.confirm-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: grid;
  place-items: center;

  padding: 20px;

  background: rgba(51, 20, 12, 0.32);

  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);

  animation: confirmOverlayIn 180ms ease;
}

.confirm-modal {
  width: min(100%, 430px);

  padding: 30px;

  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 30px;

  background: #fffefc;

  box-shadow: 0 30px 80px rgba(51, 20, 12, 0.2);

  animation: confirmModalIn 220ms ease;
}

.confirm-icon {
  width: 50px;
  height: 50px;

  display: grid;
  place-items: center;

  margin-bottom: 21px;

  border-radius: 16px;

  color: #8e3428;
  background: #f6ded9;

  font-size: 1.25rem;
  font-weight: 800;
}

.confirm-content h2 {
  margin-bottom: 8px;

  color: #33140c;

  font-family: "DM Serif Display", serif;
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.05;
}

.confirm-content p {
  margin-bottom: 0;

  color: #705f57;

  font-size: 0.9rem;
  line-height: 1.6;
}

.confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 9px;

  margin-top: 28px;
}

.confirm-cancel,
.confirm-delete {
  min-height: 44px;
  padding: 0 17px;

  border-radius: 50px;

  font-size: 0.84rem;
  font-weight: 700;

  transition:
    transform 180ms ease,
    background 180ms ease;
}

.confirm-cancel {
  border: 1px solid rgba(51, 20, 12, 0.1);

  color: #705f57;
  background: #f5f2e9;
}

.confirm-cancel:hover {
  color: #33140c;
  background: #ebe7dc;
  transform: translateY(-1px);
}

.confirm-delete {
  border: 0;

  color: #fff;
  background: #b54a3a;

  box-shadow: 0 7px 17px rgba(181, 74, 58, 0.18);
}

.confirm-delete:hover {
  background: #9e3f32;
  transform: translateY(-1px);
}

@keyframes confirmOverlayIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes confirmModalIn {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.97);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 430px) {
  .confirm-overlay {
    padding: 14px;
  }

  .confirm-modal {
    padding: 23px;
    border-radius: 25px;
  }

  .confirm-content h2 {
    font-size: 1.75rem;
  }

  .confirm-actions {
    flex-direction: column-reverse;
  }

  .confirm-cancel,
  .confirm-delete {
    width: 100%;
  }
}
`;

document.head.appendChild(style);