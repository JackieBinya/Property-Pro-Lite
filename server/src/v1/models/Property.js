import uuid from 'uuid';
import moment from 'moment';

class Property {
  constructor() {
    this.Properties = [];
  }

  //  Fetch all properties
  findAll() {
    return this.Properties;
  }

  findAllMyAds(id) {
    return this.Properties.filter(property => property.owner === id);
  }

  findAdsOfSpecificType(type) {
    return this.Properties.filter(property => property.type === type);
  }

  // Create and save a property
  create({
    status = 'available', price, state, city, address, type, imageUrl, description, title, owner,
  }) {
    const newProperty = {
      id: uuid.v4(),
      status,
      price,
      state,
      city,
      address,
      type,
      description,
      title,
      imageUrl,
      owner,
      createdOn: moment(),
    };

    this.Properties.push(newProperty);

    return newProperty;
  }

  // Get a property by id
  findOne(id) {
    return this.Properties.find(user => user.id === id);
  }

  // Delete a property
  delete(id) {
    // const property = this.findOne(id);
    const newProperties = this.Properties.filter(property => property.id !== id);
    this.Properties = [...newProperties];
    return true;
  }

  // Update a property
  update(id, data) {
    const property = this.findOne(id);
    const index = this.Properties.indexOf(property);

    if (data.price) {
      this.Properties[index].price = data.price;
    }

    if (data.imageUrl) {
      this.Properties[index].imageUrl = data.imageUrl;
    }

    if (data.title) {
      this.Properties[index].title = data.title;
    }

    return this.Properties[index];
  }

  markPropertySold(id) {
    const property = this.findOne(id);
    const index = this.Properties.indexOf(property);
    this.Properties[index].status = 'sold';

    return this.Properties[index];
  }

  remove() {
    this.Properties = [];
  }
}

export default new Property();
