import models from '../models';

const { Property } = models;

const createPropertyAd = async (req, res) => {
  const { imageUrl } = req;
  const owner = req.decoded.payload;

  const {
    title, address, state, city, type, price, description,
  } = req.body;


  try {
    const createdProperty = await Property.create({
      title: title.trim(),
      address: address.trim(),
      state: state.trim(),
      city: city.trim(),
      type: type.trim(),
      price: price.trim(),
      description: description.trim(),
      owner,
      imageUrl,
    });

    return res.status(201).json({
      status: '201',
      message: 'Sucessfully created a property ad',
      data: createdProperty,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
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
  const { propertyId } = req.params;
  const result = models.Property.findOne(propertyId);

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
  const { propertyId } = req.params;
  const result = models.Property.delete(propertyId);

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

const editPropertyAd = async (req, res) => {
  const { propertyId } = req.params;
  const { price } = req.body;
  try {
    const result = await Property.update(propertyId, price);
    res.status(200).json({
      status: '200',
      data: result[0],
    });
  } catch (err) {
    return res.status(500).json({
      status: '500',
      error: err.message,
    });
  }
};

const markPropertySold = (req, res) => {
  const { propertyId } = req.params;
  const result = models.Property.markPropertySold(propertyId);
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
  markPropertySold,
};
