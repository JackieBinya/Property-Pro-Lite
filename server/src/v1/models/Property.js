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
    return this.Properties.find(user => user.id === id);
  }

  // Delete a property
  delete(id) {
    const property = this.findOne(id);
    const index = this.Properties.indexOf(property);
    this.Properties.splice(index, 1);
    return {};
  }

  // Update a property
  update(id, data) {
    const property = this.findOne(id);
    const index = this.properties.indexOf(property);
    this.Properties[index].status = data.status || property.status;
    this.Properties[index].price = data.price || property.price;
    this.Properties[index].location = data.location || property.location;
    this.Properties[index].city = data.city || property.city;
    this.Properties[index].address = data.address || property.address;
    this.Properties[index].type = data.type || property.type;
    this.Properties[index].description = data.description || property.description;
    this.Properties[index].title = data.title || property.title;
    this.Properties[index].imageUrl = data.imageUrl || property.imageUrl;

    return this.properties[index];
  }
}

export default new Property();
