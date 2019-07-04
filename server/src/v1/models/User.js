import uuid from 'uuid';

class User {
  constructor() {
    this.users = [];
  }

  create({
    firstName, lastName, address, email, password,
  }) {
    const newUser = {
      firstName,
      lastName,
      address,
      isAdmin: true,
      email,
      password,
      id: uuid.v4(),
    };
    this.users.push(newUser);
    return newUser;
  }

  findByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  findById(id) {
    return this.users.find(user => user.id === id);
  }

  remove() {
    this.users = [];
  }
}

export default new User();
