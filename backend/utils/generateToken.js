import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';

const generateToken = (userId) => {
   if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET env var not set');
   }

   return jwt.sign(
      { userId, jti: randomUUID() },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
   );
};

export default generateToken;