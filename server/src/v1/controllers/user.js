import bcrypt from 'bcryptjs';
import generateToken from '../utils/authService';
import pool from '../../v2/models/configDB';

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

    return res.status(201).json({
      status: '200',
      message: 'Sucessfully created an account',
      data: {
        token: generateToken(rows[0].id),
        user: {
          firstName: rows[0].first_name,
          lastName: rows[0].last_name,
          email: rows[0].email,
          id: rows[0].id
        },
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};


const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    bcrypt.compare(password, rows[0].password, (err, isMatch) => {
      // res === true
      if (err) throw err;

      if (isMatch) {
        return res.status(200).json({
          status: '200',
          message: 'Successfully logged in',
          data: {
            token: generateToken(rows[0].id),
            user: {
              firstName: rows[0].first_name,
              lastName: rows[0].last_name,
              email: rows[0].email,
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
  } catch (err) {
    res.status(500).json({ error: err });
  }
};


export { createNewUser, authUser };
