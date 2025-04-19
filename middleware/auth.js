// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded",decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Authentication failed', status: false });
  }
};

module.exports = auth;