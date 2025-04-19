// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  isAI: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  
}, {
  timestamps: true 
});


messageSchema.index({ sender: 1, timestamp: -1 });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;