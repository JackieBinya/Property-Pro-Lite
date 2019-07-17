import bcrypt from 'bcryptjs';
import generateToken from '../utils/authService';
import pool from '../models/configDB';

const createNewUser = async (req, res) => {
  const {
    firstName, lastName, email, password,
  } = req.body;

  // salt and hash
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const text = 'INSERT INTO users(first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *';
  const values = [firstName.trim(), lastName.trim(), email.trim(), hash];

  try {
    const { rows } = await pool.query(text, values);
  
    res.status(201).json({
      status: 'success',
      data: {
        token: generateToken(rows[0].id),
        user: {
          firstName: rows[0].first_name,
          lastName: rows[0].last_name,
          email: rows[0].email,
          id: rows[0].id,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
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
        status: 'success',
        data: {
          token,
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
        },
      });
    }

    if (!isMatch) {
      return res.status(400).json({
        status: 'error',
        msg: 'Authentification failed incorrect password!',
      });
    }
  });
};


export { createNewUser, authUser };
