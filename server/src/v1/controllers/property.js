import models from '../models';

const createPropertyAd = (req, res) => {
  const { imageUrl } = req;
  const agentId = req.decoded.payload;

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
    agentId,
  };

  const result = models.Property.create(data);

  res.status(201).json({ data: result });
};

const fetchAllProperties = (req, res) => {
  const properties = models.Property.findAll();
  res.status(200).json({ data: properties });
};

const findAdsOfSpecificType = (req, res) => {
  let { type } = req.query;
  type = decodeURI(type);
  const properties = models.Property.findAdsOfSpecificType(type);
  res.status(200).json({ data: properties });
};

const fetchSpecificProperty = (req, res) => {
  const { id } = req.query;
  const result = models.Property.findOne(id);
  if (result) return res.status(200).json({ data: result });
  if (!result) return res.status(404).json({ msg: `Property ID:${id} is not found!` });
};

const deletePropertyAd = (req, res) => {
  const { id } = req.params;
  const result = models.Property.delete(id);
  if (result) return res.status(200).json({ msg: `Property Ad Id:${id} is sucessfully deleted` });
};

const fetchMyads = (req, res) => {
  const id = req.decoded.payload;
  const properties = models.Property.findAllMyAds(id);
  if (properties.length) return res.status(200).json({ data: properties });
  if (!properties.length) return res.status(200).json({ data: properties });
};

export {
  createPropertyAd, fetchAllProperties, fetchSpecificProperty, deletePropertyAd, fetchMyads,
  findAdsOfSpecificType,
};
