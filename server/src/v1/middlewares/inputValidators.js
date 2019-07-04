const emailRE = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;

const signUpValidator = (req, res, next) => {
  const {
    firstName, lastName, email, password,
  } = req.body;

  // Check that all input fields have been filled in
  if (!firstName || !lastName || !email || !password) return res.status(400).json({ msg: 'Please fill in all fields.' });

  // Validate input
  if (!emailRE.test(email)) return res.status(400).json({ msg: 'Enter a valid email.' });
  if (password.length < 6) return res.status(400).json({ msg: 'Password should be no less than 6 characters long.' });
  next();
};

const loginValidator = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ msg: 'Please fill in all fields.' });
  if (!emailRE.test(email)) return res.status(400).json({ msg: 'Enter a valid email.' });
  if (password.length < 6) return res.status(400).json({ msg: 'Password should be no less than 6 characters long.' });
  next();
};

const postPropertyAdValiadator = (req, res, next) => {
  const {
    title, address, state, city, type, price, description,
  } = req.body;

  if (!title || !address || !state || !city || !type || !price || !description) return res.status(400).json({ msg: 'Please fill in all fields, to continue...' });
  if (title.length > 40) return res.status(400).json({ msg: 'The title is too long,  make sure its no more than 45 characters long!' });
  if (description.length > 400) return res.status(400).json({ msg: 'The description is too long, make sure its no more than 150 charactes long!' });
  next();
};

const updatePropertyAdValidator = (req, res, next) => {
  const { price } = req.body;
  if (!price) res.status(400).json({ msg: 'Please enter price of your property' });
  next();
};

export {
  signUpValidator, loginValidator, postPropertyAdValiadator, updatePropertyAdValidator,
};
