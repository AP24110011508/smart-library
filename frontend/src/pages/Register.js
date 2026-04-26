import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/users/register", {
        name,
        email,
        password
      });
      alert("Registered successfully");
    } catch (err) {
      alert("Error");
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
        <h1 style={{
          marginBottom: "10px",
          fontSize: "36px",
          fontWeight: "bold",
          letterSpacing: "2px",
          background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>📚 Smart Library</h1>
        <p style={{ marginBottom: "30px", color: "#6b7280", fontSize: "16px", fontWeight: "500" }}>Create your account to get started</p>
        <h2 style={{
          marginBottom: "30px",
          fontSize: "28px",
          fontWeight: "bold",
          letterSpacing: "1px",
          color: "#1f2937",
          textShadow: "0 1px 2px rgba(0,0,0,0.1)"
        }}>Register</h2>

        <div style={{ marginBottom: "15px", textAlign: "left" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#1f2937" }}>Name</label>
          <input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "14px",
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease",
            marginBottom: "20px",
            boxShadow: "0 4px 15px rgba(34, 197, 94, 0.3)"
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 20px rgba(34, 197, 94, 0.4)";
            e.target.style.filter = "brightness(1.1)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 15px rgba(34, 197, 94, 0.3)";
            e.target.style.filter = "brightness(1)";
          }}
          onMouseDown={(e) => e.target.style.transform = "translateY(0) scale(0.98)"}
          onMouseUp={(e) => e.target.style.transform = "translateY(-2px)"}
        >
          Register
        </button>

        <p style={{ color: "#1f2937" }}>
          Already have an account? <Link to="/" style={{ color: "#ec4899", textDecoration: "none", fontWeight: "bold" }}>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;