import pool from '../../db/models/configDB';

class User {
  static async create({
    firstName, lastName, email, password,
  }) {
    const text = 'INSERT INTO users(first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [firstName, lastName, email, password];
    const { rows } = await pool.query(text, values);
    return rows;
  }

  static async findByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows;
  }

  findById(id) {
    return this.users.find(user => user.id === id);
}

  remove() {
    this.users = [];
  }
}

export default User;
