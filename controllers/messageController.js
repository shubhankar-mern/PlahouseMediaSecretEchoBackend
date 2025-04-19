const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

exports.sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id; 

    
    const message = await Message.create({
      sender: userId,
      content,
      isAI: false
    });

    
    let conversation = await Conversation.findOne({ user: userId });
    
    if (!conversation) {
      conversation = await Conversation.create({
        user: userId,
        messages: [message._id],
        lastMessage: message._id
      });
    } else {
      conversation.messages.push(message._id);
      conversation.lastMessage = message._id;
      await conversation.save();
    }

    
    await message.populate('sender', 'name');

    res.status(201).json({ message, status: true });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', status: false });
  }
};


exports.getConversation = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;

    const conversation = await Conversation.findOne({ user: userId })
      .populate({
        path: 'messages',
        options: {
          sort: { timestamp: -1 },
          skip: (page - 1) * limit,
          limit: limit
        },
        populate: {
          path: 'sender',
          select: 'name'
        }
      });

    if (!conversation) {
      return res.status(404).json({ message: 'No conversation found', status: false });
    }

    res.json({
      messages: conversation.messages,
      hasMore: conversation.messages.length === limit
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching conversation', status: false });
  }
};


exports.deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user.id;

    const message = await Message.findOneAndDelete({
      _id: messageId,
      sender: userId
    });

    if (!message) {
      return res.status(404).json({ message: 'Message not found', status: false });
    }

    // Update conversation
    await Conversation.updateOne(
      { user: userId },
      { $pull: { messages: messageId } }
    );

    res.json({ message: 'Message deleted successfully', status: true });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', status: false });
  }
};


exports.createNewChat = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log("userId==>",userId);
    console.log("req.body==>",req.body);

    

    const newConversation = await Conversation.create({
      user: userId,
      messages: [],
      name: req.body.title,
      description: req.body.description
    });

    res.status(201).json({ conversation: newConversation, status: true });
  } catch (error) {
    res.status(500).json({ message: `Error creating new conversation ${error}`, status: false });
  }
};


exports.getChats = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userId",userId,req.user);
    

    const conversations = await Conversation.find({ user: userId });
    console.log("conversations",conversations);
    res.json({ conversations, status: true });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching conversations', status: false });
  }
};


exports.getChat = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    console.log("id==>",id,userId);
   
    const conversation = await Conversation.findOne({
      _id: id,
      user: userId
    }).populate('messages');

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found', status: false });
    }

    res.json({ conversation, status: true });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching conversation', status: false });
  }
};  

exports.deleteChat = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await Conversation.deleteOne({ _id: id, user: userId });
    await Message.deleteMany({ conversation: id });

    res.json({ message: 'Chat deleted successfully', status: true });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting chat', status: false });
  }
};
