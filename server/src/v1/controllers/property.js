import models from '../models';

const createPropertyAd = (req, res) => {
  const { imageUrl } = req;
  const {
    title, address, location, city, type, price, description,
  } = req.body;

  title.trim();
  address.trim();
  location.trim();
  city.trim();
  type.trim();
  price.trim();
  description.trim(); 

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

  res.status(201).json({ data: result });
};

const fetchAllProperties = (req,res) => {
  const properties = models.Property.findAll();
  res.status(200).json({ data: properties });
};

export { createPropertyAd, fetchAllProperties };
