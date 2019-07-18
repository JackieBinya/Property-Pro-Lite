import bcrypt from 'bcryptjs';
import generateToken from '../utils/authService';
import models from '../models';

const { User } = models;


const createNewUser = async (req, res) => {
  const {
    firstName, lastName, email, password,
  } = req.body;
  // salt and hash
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password.trim(), salt);


  try {
    const newUser = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password: hash,
    });
    return res.status(201).json({
      status: 201,
      message: 'Sucessfully created an account',
      data: {
        token: generateToken(newUser[0].id),
        user: {
          firstName: newUser[0].first_name,
          lastName: newUser[0].last_name,
          email: newUser[0].email,
          id: newUser[0].id,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err,
    });
  }
};


const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    const newUser = await User.findByEmail(email.trim());

    bcrypt.compare(password, newUser[0].password, (err, isMatch) => {
      // res === true
      if (err) throw err;

      if (isMatch) {
        return res.status(200).json({
          status: 200,
          message: 'Successfully logged in',
          data: {
            token: generateToken(newUser[0].id),
            user: {
              firstName: newUser[0].first_name,
              lastName: newUser[0].last_name,
              email: newUser[0].email,
            },
          },
        });
      }

      if (!isMatch) {
        return res.status(400).json({
          status: 400,
          msg: 'Authentification failed incorrect password!',
        });
      }
    });
  } catch (err) {
    res.status(500).json({ 
      status: 500,
      error: err,
    });
  }
};


export { createNewUser, authUser };
