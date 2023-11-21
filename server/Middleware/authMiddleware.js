import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
const protect = async (req, res, next) => {
  try {
    let token = req.cookies.jwt;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  } catch (err) {
    next(err);
  }
};


export { protect };