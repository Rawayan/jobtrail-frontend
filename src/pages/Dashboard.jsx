import { useAuth } from "../auth/AuthContext";

function Dashboard() {
  const {
    username,
    isAuthenticated,
    loading,
    logout,
  } = useAuth();

  if (loading) {
    return <p>Loading authentication...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <p>
        Authenticated: {isAuthenticated ? "Yes" : "No"}
      </p>

      <p>
        Username: {username || "Not logged in"}
      </p>

      {isAuthenticated && (
        <button onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
}

export default Dashboard;