const db = require('../utils/db');

var bcrypt = require("bcryptjs");

module.exports = {
  findUserByName(username) { return db.load("SELECT id, username, password, name, role FROM user WHERE username = '"+username+"'")},
  findUserById(id) { return db.load("SELECT id, username FROM user WHERE id = "+ id)},
  insertUser(username, password, name, role) {return db.load("INSERT INTO user ( username, password, name, role ) values ('"+username+"','"+password+"','"+name+"',"+ role+")")}
};
