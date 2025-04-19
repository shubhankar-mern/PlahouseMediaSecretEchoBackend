// socket/index.js
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

const sampleResponse = [
  "This is a sample response",
   "This is another sample response",
    "This is a third sample response",
    "This is a fourth sample response",
    "This is a fifth sample response",
    "This is a sixth sample response",
    "This is a seventh sample response",
    "This is a eighth sample response",
    "This is a ninth sample response",
    "This is a tenth sample response"
  ];
const initializeSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);

    
    socket.on('message:send', async (data) => {
      try {
        console.log("data==>",data);
        const { content, sender, activeChat} = data;
        
        
        const message = await Message.create({
          sender,
          content,
          conversation: activeChat,
          isAI: false
        });
        
        let randomIndex = Math.floor(Math.random() * sampleResponse.length);
        
        const aiResponse = await Message.create({
          sender: sender,
          content: sampleResponse[randomIndex],
          conversation: activeChat,
          isAI: true
        });

        
        await Conversation.findOneAndUpdate(
          { _id: activeChat },
          { 
            $push: { messages: [message._id, aiResponse._id] },
            $set: { lastMessage: aiResponse._id }
          },
          { upsert: true }
        );

       
        socket.emit('message:received', {
          userMessage: message,
          aiResponse: aiResponse
        });

      } catch (error) {
        console.error('Message handling error:', error);
        socket.emit('error', {
          message: 'Failed to process message'
        });
      }
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

module.exports = initializeSocket;