
const postPropertyAdValiadator = (req, res, next) => {
  const {
    title, address, location, city, type, price, description,
  } = req.body;

  if (!title || !address || !location || !city || !type || !price || !description) return res.status(400).json({ msg: 'Please fill in all fields, to continue...' });
  if (title.length > 40) return res.status(400).json({ msg: 'The title is too long,  make sure its no more than 45 characters long!' });
  if (title.description > 400) return res.status(400).json({ msg: 'The description is too long, make sure its no more than 150 charactes long!' });
  next();
};

export { postPropertyAdValiadator };
