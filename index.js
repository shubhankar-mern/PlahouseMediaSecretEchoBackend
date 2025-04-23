const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  console.log(`Number of CPU cores: ${numCPUs}`);
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    
    cluster.fork();
  });

} else {

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const logger = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { Server } = require('socket.io');
const http = require('http');
const initializeSocket = require('./socket');
const router = require('./routes/index');
const { connectDB, closeDB } = require('./config/db');



dotenv.config();
const app = express();
const httpserver = http.createServer(app);



app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(logger('tiny'));
app.use(compression());
app.use('/api', router);



const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});
app.use(limiter);



const PORT = process.env.PORT || 5000;



const io = new Server(httpserver, {
    cors: {
      origin: "*",
      methods: ['GET', 'POST'],
      credentials: true
    }
  });
 

initializeSocket(io);


connectDB();



const gracefulShutdown = async () => {
  console.log('Graceful shutdown initiated...');
  
 
  httpserver.close(() => {
    console.log('HTTP server closed');
  });

  
  io.close(() => {
    console.log('Socket.IO server closed');
  });


  try {
    await closeDB();
    console.log('Database connection closed');
  } catch (err) {
    console.error('Error closing database:', err);
  }

  
  process.exit(0);
};


process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);  
process.on('SIGUSR2', gracefulShutdown);

httpserver.listen(3000); 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

};