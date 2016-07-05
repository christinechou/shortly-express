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
});

module.exports = User;