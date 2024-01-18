const mongoose = require("mongoose");
// const { v4: uuidv4 } = require('uuid');

// const fixedUUID = uuidv4();

// messageId: {
//   type: String,
//   unique: true,
//   default: fixedUUID,
//   required: true,
// },
const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Mongoose middleware to generate a UUID before saving the document
// messageSchema.pre('save', function (next) {
//   // Only generate a new UUID if the document is new (not being updated)
//   if (this.isNew && !this.messageId) {
//     this.messageId = uuidv4();
//   }

//   next();
// });

const chatSchema = new mongoose.Schema(
  {
    chatId: { type: String },
    messages: [messageSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
