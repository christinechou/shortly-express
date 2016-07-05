var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');



var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      var password = model.get('password');
      model.set('hash', bcrypt.hashSync(password));
      model.unset('password');
    });
  }
}, {
  authenticate: function(username, password) {
    return new User({username: username})
    .fetch()
    .then(function (userObj) {
      return new Promise((resolve, reject) => {
        if (!userObj) {
          reject('Incorrect username');
        } else {
          if (bcrypt.compareSync(password, userObj.get('hash'))) {
            resolve(userObj.get('username'));
          } else {
            reject('Incorrect password');
          }
        }
      });
    });
  } 
});

module.exports = User;
