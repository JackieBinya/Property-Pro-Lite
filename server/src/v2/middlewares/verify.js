import jwt from 'jsonwebtoken';
import pool from '../models/configDB';

export default class Middleware {
  static async verifyNewUser(req, res, next) {
    const { email } = req.body;
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (rows[0]) {
        res.status(400).json({
          status: 'error',
          msg: 'Your email is already registered in the app, you are only allowed to have one account.',
        });
      }
    } catch (err) {
      res.status(500).json({ msg: err });
    }
    next();
  }

  /* static async verifyExistingUser(req, res, next) {
    const { email } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({
        status: 'error',
        msg: 'Please sign up to continue, if already signed up email you provided is incorrect. Please try again.',
      });
    }
    next();
  }

  static async verifyAuthUser(req, res, next) {
    // Note how you grab token from req.header();
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({
        status: 'error',
        msg: 'No token access denied',
      });
    }

    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
      if (err) {
        return res.status(400).json({
          status: 'error',
          msg: 'No authorisation, token invalid!',
        });
      }
      req.decoded = decoded;
      next();
    });
  }

  static async verifyExistingProperty(req, res, next) {
    const { propertyId: id } = req.params;
    // const result = models.Property.findOne(propertyId);
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(400).json({
        status: 'error',
        msg: 'Property does not exist!',
      });
    }
    next();
  }

  static async verifyPropertyBelongsToUser(req, res, next) {
    const id = req.decoded.payload;
    const { propertyId } = req.params;
    // const result = models.Property.findOne(propertyId);
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [propertyId]);
    if (result.rows[0].owner !== id) {
      return res.status(400).json({
        status: 'error',
        msg: 'Access denied! ',
      });
    }
    next();
  } */
}
