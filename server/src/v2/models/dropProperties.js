const pool = require('./configDB');

const queryText = 'DROP TABLE IF EXISTS properties';
pool.query(queryText)
  .then((res) => {
    console.log(res);
    pool.end();
  })
  .catch((err) => {
    console.log(err);
    pool.end();
  });

