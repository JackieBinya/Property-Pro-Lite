const emailRE = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;

const signUpValidator = (req, res, next) => {
  const {
    firstName, lastName, email, password,
  } = req.body;

  // Check that all input fields have been filled in
  if (!firstName) {
    return res.status(400).json({
      status: 'error',
      msg: 'Please enter your first name.',
    });
  }

  if (!lastName) {
    return res.status(400).json({
      status: 'error',
      msg: 'Please enter your last name.',
    });
  }

  if (!email) {
    return res.status(400).json({
      status: 'error',
      msg: 'Please enter your email.',
    });
  }

  if (!password) {
    return res.status(400).json({
      status: 'error',
      msg: 'Please enter your password.',
    });
  }

  // Validate input
  if (!emailRE.test(email)) {
    return res.status(400).json({
      status: 'error',
      msg: 'Email invalid!',
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      status: 'error',
      msg: 'Password should be no less than 6 characters long.',
    });
  }
  next();
};

const loginValidator = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      status: 'error',
      msg: 'Please enter your email.',
    });
  }

  if (!password) {
    return res.status(400).json({
      status: 'error',
      msg: 'Please enter your password.',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      status: 'error',
      msg: 'Password should be no less than 6 characters long.',
    });
  }

  if (!emailRE.test(email)) {
    return res.status(400).json({
      status: 'error',
      msg: 'Email invalid!',
    });
  }
  next();
};

const postPropertyAdValiadator = (req, res, next) => {
  const {
    title, address, state, city, type, price, description,
  } = req.body;

  if (!title) {
    return res.status(400).json({
      status: 'error',
      msg: 'Please provide a title for your property ad.',
    });
  }

  if (!address) {
    return res.status(400).json({
      status: 'error',
      msg: 'Please provide the address of your property.',
    });
  }

  if (!state) {
    return res.status(400).json({
      status: 'error',
      msg: 'Please provide the state in which your property is located.',
    });
  }

  if (!city) {
    return res.status(400).json({
      status: 'error',
      msg: 'Please provide the city where your property is located.',
    });
  }

  if (!description) {
    return res.status(400).json({
      status: 'error',
      msg: 'Please provide a description of your property.',
    });
  }

  if (!price) {
    return res.status(400).json({
      status: 'error',
      msg: 'Please provide a price of your property.',
    });
  }

  if (!type) {
    return res.status(400).json({
      status: 'error',
      msg: 'Please select a type that matches your property.',
    });
  }

  if (title.length > 40) {
    return res.status(400).json({
      status: 'error',
      msg: 'The title is too long, make sure its no more than 45 characters long!',
    });
  }

  if (description.length > 200) {
    return res.status(400).json({
      status: 'error',
      msg: 'The description is too long, make sure its no more than 150 characters long!',
    });
  }
  next();
};

const editPropertyAdPriceValidator = (req, res, next) => {
  const { price } = req.body;
  if (!price) {
    return res.status(400).json({
      status: 'error',
      msg: 'Please enter the price of your property.',
    });
  }
  next();
};

const editPropertyAdTitleValidator = (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({
      status: 'error',
      msg: 'Please enter a title of your property ad.',
    });
  }
  next();
};

export {
  signUpValidator,
  loginValidator,
  postPropertyAdValiadator,
  editPropertyAdPriceValidator,
  editPropertyAdTitleValidator,
};
