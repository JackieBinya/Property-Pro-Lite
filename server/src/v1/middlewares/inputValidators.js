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

  if (!email) {
    return res.status(400).json({
      status: 'error',
      error: 'Please enter your emmail',
    });
  }

  if (!password) {
    return res.status(400).json({
      status: 'error',
      error: 'Please  enter your password.',
    });
  }

  if (!emailRE.test(email)) {
    return res.status(400).json({
      status: 'error',
      error: 'Email invalid',
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      status: 'error',
      error: 'Password should be no less than 6 characters long.',
    });
  }
  next();
};

const postPropertyAdValiadator = (req, res, next) => {
  const {
    title, address, state, city, type, price, description,
  } = req.body;

  if (title.length > 40) {
    return res.status(400).json({
      status: 'error',
      error: 'The title is too long,  make sure its no more than 45 characters long!',
    });
  }

  if (description.length > 200) {
    return res.status(400).json({
      status: 'error',
      error: 'The description is too long,  make sure its no more than 150 characters long!',
    });
  }

  if (!title) {
    return res.status(400).json({
      status: 'error',
      error: 'Please provide the title.',
    });
  }

  if (!address) {
    return res.status(400).json({
      status: 'error',
      error: 'Please provide the address of your property.',
    });
  }

  if (!state) {
    return res.status(400).json({
      status: 'error',
      error: 'Please provide the state in which your property is located.',
    });
  }

  if (!city) {
    return res.status(400).json({
      status: 'error',
      error: 'Please provide the city where your property is located.',
    });
  }


  if (!description) {
    return res.status(400).json({
      status: 'error',
      error: 'Please provide a description of your property.',
    });
  }

  if (!price) {
    return res.status(400).json({
      status: 'error',
      error: 'Please provide a price of your property.',
    });
  }

  if (!type) {
    return res.status(400).json({
      status: 'error',
      error: 'Please select a type that matches your property.',
    });
  }

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
