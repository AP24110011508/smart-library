const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book"
  },
  borrowDate: {
    type: Date,
    default: Date.now
  },
  dueDate: Date,
  returnDate: Date,
  status: String
});

module.exports = mongoose.model("BorrowRecord", borrowSchema);