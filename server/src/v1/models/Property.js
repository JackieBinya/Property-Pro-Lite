import uuid from 'uuid';

class Property {
  constructor() {
    this.Properties = [];
  }

  //  Fetch all properties
  findAll() {
    return this.Properties;
  }

  // Create and save a property
  create({
    status = 'available', price, location, city, address, type, imageUrl, description, title,
  }) {
    const newProperty = {
      id: uuid.v4(),
      createdOn: new Date(),
      status,
      price,
      location,
      city,
      address,
      type,
      description,
      title,
      imageUrl,
    };

    this.Properties.push(newProperty);

    return newProperty;
  }

  // Get a property by id
  findOne(id) {
    return this.users.find(user => user.id === id);
  }

  // Delete a property
  delete(id) {
    const property = this.findOne(id);
    const index = this.propertiess.indexOf(property);
    this.properties.splice(index, 1);
    return {};
  }

  // Update a property
  update(id, data) {
    const property = this.findOne(id);
    const index = this.properties.indexOf(property);
    this.properties[index].status = data.status || property.status;
    this.properties[index].price = data.price || property.price;
    this.properties[index].location = data.location || property.location;
    this.properties[index].city = data.city || property.city;
    this.properties[index].address = data.address || property.address;
    this.properties[index].type = data.type || property.type;
    this.properties[index].description = data.description || property.description;
    this.properties[index].title = data.title || property.title;
    this.properties[index].imageUrl = data.imageUrl || property.imageUrl;

    return this.properties[index];
  }
}

export default new Property();
