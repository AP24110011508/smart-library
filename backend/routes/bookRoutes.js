const express = require("express");
const router = express.Router();

const Book = require("../models/Book");

// ➤ ADD BOOK
router.post("/add", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.json(newBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ GET ALL BOOKS
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ SEARCH BOOKS
router.get("/search", async (req, res) => {
  try {
    const { title, author, category } = req.query;

    const query = {};

    if (title) query.title = new RegExp(title, "i");
    if (author) query.author = new RegExp(author, "i");
    if (category) query.category = new RegExp(category, "i");

    const books = await Book.find(query);

    res.json(books);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ SEED BOOKS (Insert sample books)
router.post("/seed", async (req, res) => {
  try {
    const sampleBooks = [
      // Comedy (5)
      { title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", category: "Comedy", availabilityStatus: true },
      { title: "Good Omens", author: "Neil Gaiman & Terry Pratchett", category: "Comedy", availabilityStatus: true },
      { title: "Catch-22", author: "Joseph Heller", category: "Comedy", availabilityStatus: true },
      { title: "Bossypants", author: "Tina Fey", category: "Comedy", availabilityStatus: true },
      { title: "Me Talk Pretty One Day", author: "David Sedaris", category: "Comedy", availabilityStatus: true },

      // Study/Education (5)
      { title: "Database System Concepts", author: "Silberschatz, Korth, Sudarshan", category: "Study/Education", availabilityStatus: true },
      { title: "Operating System Concepts", author: "Silberschatz, Galvin, Gagne", category: "Study/Education", availabilityStatus: true },
      { title: "Computer Networks", author: "Andrew S. Tanenbaum", category: "Study/Education", availabilityStatus: true },
      { title: "Introduction to Algorithms", author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein", category: "Study/Education", availabilityStatus: true },
      { title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell & Peter Norvig", category: "Study/Education", availabilityStatus: true },

      // Fiction (5)
      { title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", availabilityStatus: true },
      { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", category: "Fiction", availabilityStatus: true },
      { title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fiction", availabilityStatus: true },
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", availabilityStatus: true },
      { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", availabilityStatus: true },

      // Mixed/Real-world (5)
      { title: "Atomic Habits", author: "James Clear", category: "Self-Help", availabilityStatus: true },
      { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Finance", availabilityStatus: true },
      { title: "The Diary of a Young Girl", author: "Anne Frank", category: "Memoir", availabilityStatus: true },
      { title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", category: "History", availabilityStatus: true },
      { title: "Wings of Fire", author: "A.P.J. Abdul Kalam", category: "Biography", availabilityStatus: true }
    ];

    // Optional: Clear existing books first
    // await Book.deleteMany({});

    const insertedBooks = await Book.insertMany(sampleBooks);
    res.json({
      message: `Successfully inserted ${insertedBooks.length} books`,
      books: insertedBooks
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;