import uuid from 'uuid';

class User {
  constructor() {
    this.users = [];
  }

  create({ username, email, password }) {
    const newUser = {
      username,
      email,
      password,
      id: uuid.v4(),
    };
    this.users.push(newUser);
    return newUser;
  }

  find(prop) {
    const result = this.users.find(user => user.prop === prop);
    return result;
  }
}

export default new User();
