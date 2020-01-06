const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
  connectionLimit: 50,
  host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'ba0d6bf79f6ab3',
  password: '5e9fd300',
  database: 'heroku_db602d5617b4c0c'
});

const mysql_query = util.promisify(pool.query).bind(pool);

module.exports = {
  load: sql => mysql_query(sql)
};
