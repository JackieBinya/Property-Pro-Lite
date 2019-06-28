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

  const token = generateToken(user.id);
  res.status(201).json({
    data:{ token,
    user: {
      username: user.username,
      email: user.email,
    },}
  });
};

const authUser = (req, res) => {
  const { email, password } = req.body;

  // Trim input
  email.trim();
  password.trim();

  const user = models.User.findByEmail(email);

  bcrypt.compare(password, user.password, (err, isMatch) => {
    // res === true
    if (err) throw err;

    if (isMatch) {
      const token = generateToken(user.id);
      return res.status(200).json({
        token,
        user: {
          username: user.username,
          email: user.email,
        },
      });
    }

    if (!isMatch) return res.status(401).json({ msg: 'Authentification failed incorrect password!' });
  });
};


export { createNewUser, authUser }