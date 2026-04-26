import { Link } from "react-router-dom";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (
    <nav style={{
      background: "linear-gradient(90deg, #ec4899 0%, #f472b6 100%)",
      color: "#ffffff",
      padding: "15px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          backgroundColor: "#fbcfe8",
          color: "#be185d",
          fontSize: "18px",
          fontWeight: "800",
          letterSpacing: "0.5px"
        }}>SL</span>
        <span style={{ fontSize: "24px", fontWeight: "bold", letterSpacing: "1px" }}>Smart Library</span>
      </div>
      <div>
        <Link to="/books" style={{
          color: "#ffffff",
          margin: "0 15px",
          textDecoration: "none",
          fontWeight: "bold",
          transition: "color 0.3s"
        }}>Books</Link>
        <Link to="/dashboard" style={{
          color: "#ffffff",
          margin: "0 15px",
          textDecoration: "none",
          fontWeight: "bold",
          transition: "color 0.3s"
        }}>My Books</Link>
        <button onClick={handleLogout} style={{
          background: "none",
          border: "none",
          color: "#ffffff",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "color 0.3s"
        }}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;