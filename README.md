# Real-time Chat Application Backend

A scalable Node.js backend for a real-time chat application with simulated AI responses. Built with Express, MongoDB, Socket.IO, and JWT authentication.

## 🏗️ Architecture Overview

### Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Real-time Communication**: Socket.IO
- **Authentication**: JWT (JSON Web Tokens)
- **Process Management**: Node.js Cluster for scalability

### Core Features
- JWT-based Authentication (Login/Signup)
- Real-time messaging with Socket.IO
- Simulated AI responses
- Chat history management
- Clustered deployment for better performance

### Directory Structure
```bash
backend/
├── config/
│   ├── db.js             # Database configuration
│             # JWT configuration
├── controllers/
│   ├── authController.js # Authentication logic
│   └── messageController.js
├── middleware/
│   ├── auth.js           # JWT verification
│   
│   
├── models/
│   ├── User.js
│   ├── Message.js
│   └── Conversation.js
├── routes/
│   ├── index.js
│   
├── socket/
│   └── index.js          # Socket.IO logic
├── utils/
│   └── constants.js      # AI response templates
├── .env.example
├── index.js              # Entry point
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Environment Setup
Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/chat_app
MONGODB_URI_TEST=mongodb://localhost:27017/chat_app_test

# JWT Configuration
JWT_SECRET=your_jwt_secret_key


# CLIENT Configuration
CLIENT_URL=http://localhost:5173

```

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Start the server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📡 API Endpoints

### Authentication

POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout


### Messages

GET /api/messages/:conversationId
POST /api/messages
GET /api/conversations
POST /api/conversations



## 🔌 Socket.IO Events

### Client -> Server
```javascript
'connection'        // Initial connection
'message:send'      // Send new message
'user:typing'       // User typing status
```

### Server -> Client
```javascript
'message:received'  // New message received
'user:status'      // User online/offline status
```

## 🏗️ Architecture Decisions

### 1. Node.js Cluster
- Utilizes all available CPU cores
- Improves application performance under load
- Automatic worker replacement on failure

### 2. Socket.IO Implementation
- Real-time bidirectional communication
- Automatic reconnection handling
- Room-based message broadcasting

### 3. Database Schema
- Separate collections for Users, Messages, and Conversations
- Indexed fields for optimized queries
- Referential integrity using MongoDB references

### 4. Security Measures
- JWT-based authentication
- Rate limiting to prevent abuse
- CORS protection
- Helmet.js for security headers

## ⚠️ Known Limitations & Trade-offs

1. **Simulated AI Responses**
   - Currently uses predefined responses
   - No natural language processing
   - Limited context awareness

2. **Scalability Considerations**
   - Vertical scaling with cluster module
   - Might need Redis for multi-server deployment
   - Socket.IO sticky sessions required for clustering

3. **Message History**
   - No message pagination implemented yet
   - All messages loaded at once
   - Could be memory-intensive for long conversations

4. **Authentication**
   - Simple JWT implementation
   - No refresh token mechanism
   - Token invalidation not implemented

## 🔄 Future Improvements

1. Implement message pagination
2. Add Redis for session management
3. Integrate real AI service
4. Add refresh token mechanism
5. Implement message search
6. Add file sharing capabilities

## 📝 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

1. Set up environment variables
2. Build the application
```bash
npm run build
```

3. Start in production mode
```bash
npm start
```

## 📄 License

MIT

## 👥 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request


