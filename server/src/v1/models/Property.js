import uuid from 'uuid';

class Property {
  constructor() {
    this.Properties = [];
  }

  //  Fetch all properties
  findAll() {
    return this.Properties;
  }

  findAllMyAds(agentId) {
    return this.Properties.filter(property => property.agentId === agentId); 
  }

  findAdsOfSpecificType(type) {
    return this.Properties.filter(property => property.type === type);
  }

  // Create and save a property
  create({
    status = 'available', price, location, city, address, type, imageUrl, description, title, agentId,
  }) {
    const newProperty = {
      id: uuid.v4(),
      status,
      price,
      location,
      city,
      address,
      type,
      description,
      title,
      imageUrl,
      agentId,
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
    this.Properties[index].price = data.price || property.price;
    this.Properties[index].location = data.location || property.location;
    this.Properties[index].city = data.city || property.city;
    this.Properties[index].address = data.address || property.address;
    this.Properties[index].type = data.type || property.type;
    this.Properties[index].description = data.description || property.description;
    this.Properties[index].title = data.title || property.title;
    this.Properties[index].imageUrl = data.imageUrl || property.imageUrl;

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
