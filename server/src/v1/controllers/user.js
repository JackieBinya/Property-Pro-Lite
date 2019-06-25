import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import models from '../models';
import generateToken from '../utils/authService';

const createNewUser = (req, res) => {
  const { username, email, password } = req.body;

  // Trim input
  username.trim();
  email.trim();
  password.trim();

  // salt and hash
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = models.User
    .create({
      username,
      email,
      password: hash,
    });

  const token = generateToken(user.username);
  res.status(201).json({
    token,
    user: {
      username: user.username,
      email: user.email,
    },
  });
};

export { createNewUser }