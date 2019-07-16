const pool = require('./configDB');

const text = 'INSERT INTO properties(address, city, state, title, description, type, price, image_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
const values = ['4 De Waat Terraces', 'Capetown', 'Goodwood', 'Room to rent in Goodwood', 'Large room own cupboards and bathroom', '3 bedroom', '$150', 'myImage.com'];

pool.query(text, values)
  .then((res) => {
    console.log(res.rows[0]);
    
  })
  .catch(e => console.error(e.stack));
  