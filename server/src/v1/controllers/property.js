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
      status: 201,
      message: 'Sucessfully created a property ad',
      data: createdProperty,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err,
    });
  }
};

const fetchAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    if (properties.length) {
      return res.status(200).json({
        status: 200,
        data: properties,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'No property ads have been found.',
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};

const findAdsOfSpecificType = async (req, res) => {
  let { type } = req.query;
  type = decodeURI(type);
  try {
    const properties = await Property.findAdsOfSpecificType(type);
    if (properties.length) {
      return res.status(200).json({
        status: 200,
        data: properties,
      });
    }
    return res.status(404).json({
      status: 404,
      error: `No property ads of type '${type}' have been found.`,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err,
    });
  }
};

const fetchSpecificProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { rows } = await Property.findOne(propertyId);

    if (rows[0]) {
      return res.status(200).json({
        status: 200,
        data: rows[0],
      });
    }

    if (!rows[0]) {
      return res.status(400).json({
        status: 400,
        msg: 'Property ad is not found!',
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err,
    });
  }
};

const deletePropertyAd = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const result = await Property.delete(propertyId);

    if (result.length === 0) {
      return res.status(200).json({
        status: 200,
        msg: 'Property ad is sucessfully deleted',
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err,
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
      error: 'No properties found!',
    });
  }
};

const editPropertyAd = async (req, res) => {
  const { propertyId } = req.params;
  const { price } = req.body;
  try {
    const result = await Property.update(propertyId, price);
    res.status(200).json({
      status: 200,
      data: result[0],
    });
  } catch (err) {
    return res.status(500).json({
      status: '500',
      error: err,
    });
  }
};

const markPropertySold = async (req, res) => {
  const { propertyId } = req.params;
  
  try {
    const result = await Property.markPropertySold(propertyId);
    res.status(200).json({
      status: 200,
      data: result[0],
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err,
    });
  }
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
