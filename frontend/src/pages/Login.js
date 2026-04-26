import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log("Attempting login with email:", email);

      const res = await axios.post("http://localhost:5000/users/login", {
        email,
        password
      });

      console.log("Login response:", res);

      // store userId
      localStorage.setItem("userId", res.data.userId);

      alert("Login successful");

      // redirect to books page
      window.location.href = "/books";

    } catch (err) {
      // Log the full error for debugging
      console.error("Login error:", err);

      // Check if the error has a response (server responded with error)
      if (err.response) {
        // Server responded with an error status
        console.error("Error response data:", err.response.data);
        const errorMessage = err.response?.data?.message || "Login failed";
        alert(errorMessage);
      } else {
        // No response means server is not reachable
        alert("Server not reachable. Please check if the backend is running.");
      }
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fef3c7 0%, #fbcfe8 50%, #fda4af 100%)"
    }}>
      <div style={{
        maxWidth: "420px",
        width: "100%",
        padding: "45px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
        textAlign: "center",
        transition: "transform 0.3s ease",
        margin: "20px"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "10px"
        }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            backgroundColor: "#fbcfe8",
            color: "#be185d",
            fontSize: "18px",
            fontWeight: "800",
            letterSpacing: "0.5px",
            boxShadow: "0 4px 15px rgba(236, 72, 153, 0.15)"
          }}>SL</span>
          <span style={{
            fontSize: "36px",
            fontWeight: "bold",
            letterSpacing: "2px",
            color: "#1f2937",
            textShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>Smart Library</span>
        </div>
        <p style={{ marginBottom: "30px", color: "#6b7280", fontSize: "16px", fontWeight: "500" }}>Manage and borrow books easily</p>
        <h2 style={{
          marginBottom: "30px",
          fontSize: "28px",
          fontWeight: "bold",
          letterSpacing: "1px",
          color: "#1f2937",
          textShadow: "0 1px 2px rgba(0,0,0,0.1)"
        }}>Login</h2>

        <div style={{ marginBottom: "15px", textAlign: "left" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#1f2937" }}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ec4899",
              borderRadius: "8px",
              fontSize: "16px",
              boxSizing: "border-box",
              backgroundColor: "#ffffff",
              color: "#1f2937",
              transition: "border-color 0.3s, box-shadow 0.3s"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#ec4899";
              e.target.style.boxShadow = "0 0 8px rgba(236, 72, 153, 0.3)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ec4899";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <div style={{ marginBottom: "20px", textAlign: "left" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#1f2937" }}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ec4899",
              borderRadius: "8px",
              fontSize: "16px",
              boxSizing: "border-box",
              backgroundColor: "#ffffff",
              color: "#1f2937",
              transition: "border-color 0.3s, box-shadow 0.3s"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#ec4899";
              e.target.style.boxShadow = "0 0 8px rgba(236, 72, 153, 0.3)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ec4899";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px",
            background: "linear-gradient(135deg, #ec4899 0%, #f97316 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease",
            marginBottom: "20px",
            boxShadow: "0 4px 15px rgba(236, 72, 153, 0.3)"
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 20px rgba(236, 72, 153, 0.4)";
            e.target.style.filter = "brightness(1.1)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 15px rgba(236, 72, 153, 0.3)";
            e.target.style.filter = "brightness(1)";
          }}
          onMouseDown={(e) => e.target.style.transform = "translateY(0) scale(0.98)"}
          onMouseUp={(e) => e.target.style.transform = "translateY(-2px)"}
        >
          Login
        </button>

        <p style={{ color: "#1f2937" }}>
          New user? <Link to="/register" style={{ color: "#ec4899", textDecoration: "none", fontWeight: "bold" }}>Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;