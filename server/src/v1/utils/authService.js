import '../../../env';
import jwt from 'jsonwebtoken';

const generateToken = (username) => {
  const token = jwt.sign({
    payload: username,
  },
  process.env.JWT_PRIVATE_KEY);

  return token;
};

export default generateToken;
