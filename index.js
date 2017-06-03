var log4js = require('log4js');
var logger = log4js.getLogger('sails-persistence-logger');

var extend = require('extend');

var defaultOptions = {
  logger: logger,
  level: 'info'
};

module.exports = function(overrides) {
  var options = extend(true, {}, defaultOptions, overrides || {});
  return {
    afterCreate: function(record, me) {
      return new Promise((resolve, reject) => {
        options.logger[options.level]('Created ' + me.identity + ' ' + record[me.primaryKey]);
        resolve();
      });
    },

    afterUpdate: function(record, me) {
      return new Promise((resolve, reject) => {
        options.logger[options.level]('Updated ' + me.identity + ' ' + record[me.primaryKey]);
        resolve();
      });
    },

    afterDestroy: function(records, me) {
      return new Promise((resolve, reject) => {
        records.forEach(record => {
          options.logger[options.level]('Destroyed ' + me.identity + ' ' + record[me.primaryKey]);
        });
        resolve();
      });
    }
  };
};
