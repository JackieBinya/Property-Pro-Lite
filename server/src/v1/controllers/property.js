import models from '../models';

const createPropertyAd = (req, res) => {
  const { imageUrl } = req;
  const {
    title, address, location, city, type, price, description,
  } = req.body;

  const data = {
    imageUrl,
    title,
    address,
    location,
    city,
    type,
    price,
    description,
  };

  const result = models.Property.create(data);

  res.status(201).json({ propertyAd: result });
};

export { createPropertyAd };
