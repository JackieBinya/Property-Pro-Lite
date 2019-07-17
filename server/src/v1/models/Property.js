import uuid from 'uuid';
import moment from 'moment';

class Property {
  constructor() {
    this.properties = [];
  }

  //  Fetch all properties
  findAll() {
    return this.properties;
  }

  findAllMyAds(id) {
    return this.properties.filter(prop => prop.owner === id);
  }

  findAdsOfSpecificType(type) {
    return this.properties.filter(property => property.type === type);
  }

  // Create and save a property
  create({
    price, state, city, address, type, imageUrl, description, title, owner,
  }) {
    
    const text = 'INSERT INTO users(price, state, city, address, type,) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [firstName.trim(), lastName.trim(), email.trim(), hash];
    

    return newProperty;
  }

  // Get a property by id
  findOne(id) {
    return this.properties.find(user => user.id === id);
  }

  // Delete a property
  delete(id) {
    // const property = this.findOne(id);
    const newProperties = this.properties.filter(property => property.id !== id);
    this.properties = [...newProperties];
    return true;
  }

  // Update a property
  update(id, data) {
    const property = this.findOne(id);
    const index = this.properties.indexOf(property);
    Object.assign(this.properties[index], data);
    return this.properties[index];
  }

  markPropertySold(id) {
    const property = this.findOne(id);
    const index = this.properties.indexOf(property);
    this.properties[index].status = 'sold';

    return this.properties[index];
  }

  remove() {
    this.properties = [];
  }
}

export default new Property();
