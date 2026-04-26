const express = require("express");
const router = express.Router();

const BorrowRecord = require("../models/BorrowRecord");
const Book = require("../models/Book");

// ➤ BORROW BOOK
router.post("/borrow", async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // check book availability
    const book = await Book.findById(bookId);
    if (!book || !book.availabilityStatus) {
      return res.status(400).json({ message: "Book not available" });
    }

    // create borrow record
    const borrow = new BorrowRecord({
      userId,
      bookId,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      status: "borrowed"
    });

    await borrow.save();

    // update book availability
    book.availabilityStatus = false;
    await book.save();

    res.json(borrow);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ RETURN BOOK
router.post("/return", async (req, res) => {
  try {
    const { borrowId } = req.body;

    const record = await BorrowRecord.findById(borrowId);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    record.returnDate = new Date();
    record.status = "returned";
    await record.save();

    // make book available again
    const book = await Book.findById(record.bookId);
    if (book) {
      book.availabilityStatus = true;
      await book.save();
    }

    res.json(record);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ GET BORROWED BOOKS BY USER
router.get("/user/:userId", async (req, res) => {
  try {
    const records = await BorrowRecord
      .find({ userId: req.params.userId })
      .populate("bookId"); // get book details

    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;