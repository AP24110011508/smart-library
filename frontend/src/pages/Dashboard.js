import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function Dashboard() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      const res = await axios.get(`http://localhost:5000/borrow/user/${userId}`);
      setRecords(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const returnBook = async (borrowId) => {
    await axios.post("http://localhost:5000/borrow/return", { borrowId });
    fetchData();
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, #fef3c7 0%, #fbcfe8 50%, #fda4af 100%)",
      minHeight: "100vh"
    }}>
      <Navbar />
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px"
      }}>
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <button
            onClick={() => window.location.href = "/books"}
            style={{
              padding: "12px 24px",
              background: "linear-gradient(135deg, #ec4899 0%, #f97316 100%)",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "all 0.3s ease",
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
            ← Back to Books
          </button>
        </div>

        <h1 style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "32px",
          fontWeight: "bold",
          letterSpacing: "2px",
          color: "#1f2937",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>My Borrowed Books</h1>

        {loading ? (
          <p style={{ textAlign: "center", fontSize: "18px", color: "#1f2937" }}>Loading your books...</p>
        ) : records.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "18px", color: "#1f2937" }}>You have no borrowed books</p>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "20px"
          }}>
            {records.map((r) => (
              <div key={r._id} style={{
                backgroundColor: "#ffffff",
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                padding: "20px",
                textAlign: "center",
                transition: "transform 0.3s, box-shadow 0.3s"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
              }}
              >
                <h3 style={{ marginBottom: "10px", color: "#1f2937" }}>{r.bookId?.title}</h3>
                <p style={{
                  margin: "5px 0",
                  color: r.status === "borrowed" ? "#f472b6" : "#22c55e",
                  fontWeight: "bold"
                }}>Status: {r.status}</p>
                <p style={{
                  margin: "5px 0",
                  color: isOverdue(r.dueDate) ? "#ef4444" : "#6b7280",
                  fontWeight: isOverdue(r.dueDate) ? "bold" : "normal"
                }}>Due: {new Date(r.dueDate).toDateString()}</p>

                {r.status === "borrowed" && (
                  <button
                    onClick={() => returnBook(r._id)}
                    style={{
                      padding: "12px 24px",
                      background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "bold",
                      transition: "all 0.3s ease",
                      marginTop: "15px",
                      boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)"
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 6px 20px rgba(239, 68, 68, 0.4)";
                      e.target.style.filter = "brightness(1.1)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 15px rgba(239, 68, 68, 0.3)";
                      e.target.style.filter = "brightness(1)";
                    }}
                    onMouseDown={(e) => e.target.style.transform = "translateY(0) scale(0.98)"}
                    onMouseUp={(e) => e.target.style.transform = "translateY(-2px)"}
                  >
                    Return Book
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;