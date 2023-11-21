import jwt from 'jsonwebtoken';

const generateToken = (res, userid) => {
  const token = jwt.sign({ userid }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  // Now we need to save it in a cookie
  res.cookie('jwt', token, {
  
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60*60,  // Set maxAge to match the expiration time in seconds
    },
  )
};

export default generateToken;
