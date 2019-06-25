import models from '../models';

const verifyNewUser = (req, res, next) => {
  const { email } = req.body;

  const result = models.User.findByEmail(email);
  if (result) return res.status(400).json({ msg: 'Your email is already registered in the app, you are only allowed to have one account.' });
  next();
};

const verifyExistingUser = (req, res, next) => {
  const { email } = req.body;

  const result = models.User.findByEmail(email);
  if (!result) return res.status(400).json({ msg: 'Please sign up to continue, if already signed up email you provided is incorrect. Please try again.' });
  next();
};

export { verifyNewUser, verifyExistingUser };
