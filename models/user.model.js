const db = require('../utils/db');

var bcrypt = require("bcryptjs");

module.exports = {
  findUserByName(username) { return db.load("SELECT * FROM user WHERE username = '"+username+"'")},
  findUserById(id) { return db.load("SELECT * FROM user WHERE username = '"+id+"'")},
  insertUser(username, password) {return db.load("INSERT INTO user ( username, password ) values ('"+username+"','"+password+"')")}
};
