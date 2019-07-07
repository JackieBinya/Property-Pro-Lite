import models from '../models';

const createPropertyAd = (req, res) => {
  const { imageUrl } = req;
  const owner = req.decoded.payload;

  const {
    title, address, state, city, type, price, description,
  } = req.body;

  title.trim();
  address.trim();
  state.trim();
  city.trim();
  type.trim();
  price.trim();
  description.trim();

  const data = {
    imageUrl,
    title,
    address,
    state,
    city,
    type,
    price,
    description,
    owner,
  };

  const result = models.Property.create(data);

  res.status(201).json({
    status: 'success',
    data: result,
  });
};

const fetchAllProperties = (req, res) => {
  const properties = models.Property.findAll();
  res.status(200).json({
    status: 'success',
    data: properties,
  });
};

const findAdsOfSpecificType = (req, res) => {
  let { type } = req.query;
  type = decodeURI(type);
  const properties = models.Property.findAdsOfSpecificType(type);
  res.status(200).json({
    status: 'success',
    data: properties,
  });
};

const fetchSpecificProperty = (req, res) => {
  const { id } = req.params;
  const result = models.Property.findOne(id);

  if (result) {
    return res.status(200).json({
      status: 'success',
      data: result,
    });
  }

  if (!result) {
    return res.status(400).json({
      status: 'error',
      msg: 'Property ad is not found!',
    });
  }
};

const deletePropertyAd = (req, res) => {
  const { id } = req.params;
  const result = models.Property.delete(id);

  if (result) {
    return res.status(200).json({
      status: 'success',
      msg: 'Property ad is sucessfully deleted',
    });
  }
};

const fetchMyads = (req, res) => {
  const id = req.decoded.payload;
  const properties = models.Property.findAllMyAds(id);

  if (properties.length) {
    return res.status(200).json({
      status: 'success',
      data: properties,
    });
  }

  if (!properties.length) {
    return res.status(400).json({
      status: 'error',
      msg: 'No properties found!',
    });
  }
};
const editPropertyAd = (req, res) => {
  const { id } = req.params;
  const { price, title } = req.body;
  const data = {
    title,
    price,
  };
  const result = models.Property.update(id, data);
  res.status(201).json({
    status: 'success',
    data: result,
  });
};

const editPropertyAdImage = (req, res) => {
  const { id } = req.params;
  const { imageUrl } = req;
  const data = {
    imageUrl,
  };
  const result = models.Property.update(id, data);
  res.status(201).json({
    status: 'success',
    data: result,
  });
};

const markPropertySold = (req, res) => {
  const { id } = req.params;
  const result = models.Property.markPropertySold(id);
  res.status(200).json({
    status: 'success',
    data: result,
  });
};

export {
  createPropertyAd,
  fetchAllProperties,
  fetchSpecificProperty,
  deletePropertyAd,
  fetchMyads,
  findAdsOfSpecificType,
  editPropertyAd,
  editPropertyAdImage,
  markPropertySold,
};
