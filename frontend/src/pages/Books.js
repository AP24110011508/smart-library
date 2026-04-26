import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // fetch books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/books");
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // borrow book
  const borrowBook = async (bookId) => {
    try {
      const userId = localStorage.getItem("userId");

      await axios.post("http://localhost:5000/borrow/borrow", {
        userId,
        bookId
      });

      alert("Book borrowed");
      fetchBooks();
    } catch (err) {
      alert("Cannot borrow");
    }
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
        <h1 style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "32px",
          fontWeight: "bold",
          letterSpacing: "2px",
          color: "#1f2937",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>Library Books</h1>

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "50%",
              padding: "10px",
              border: "1px solid #ec4899",
              borderRadius: "8px",
              fontSize: "16px",
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

        {loading ? (
          <p style={{ textAlign: "center", fontSize: "18px", color: "#1f2937" }}>Loading books...</p>
        ) : books.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "18px", color: "#1f2937" }}>No books found</p>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "20px"
          }}>
            {books.map((book) => (
              <div key={book._id} style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
                padding: "25px",
                textAlign: "center",
                transition: "all 0.3s ease",
                border: "1px solid rgba(255,255,255,0.8)"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px) scale(1.03)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.12)";
              }}
              >
                <h3 style={{ marginBottom: "10px", color: "#1f2937" }}>{book.title}</h3>
                <p style={{ margin: "5px 0", color: "#6b7280" }}>Author: {book.author}</p>
                <div style={{
                  display: "inline-block",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#92400e",
                  backgroundColor: "#fef3c7",
                  border: "1px solid #f59e0b",
                  margin: "10px 0"
                }}>
                  {book.category}
                </div>
                <br />
                <span style={{
                  display: "inline-block",
                  padding: "5px 10px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: book.availabilityStatus === true ? "#22c55e" : "#ef4444",
                  margin: "10px 0"
                }}>
                  {book.availabilityStatus === true ? "Available" : "Not Available"}
                </span>

                {book.availabilityStatus === true && (
                  <button
                    onClick={() => borrowBook(book._id)}
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
                      marginTop: "15px",
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
                    Borrow
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

export default Books;