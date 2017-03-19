var log4js = require('log4js');
var logger = log4js.getLogger('sails-persistence-logger');

var extend = require('extend');

var defaultOptions = {
  logger: logger
};

module.exports = function(overrides) {
  var options = extend(true, {}, defaultOptions, overrides || {});
  return {
    afterCreate: function(record, cb) {
      options.logger.info('Created ' + this.identity + ' ' + record[this.primaryKey]);
      if (options.afterCreate) {
        options.afterCreate(record, cb);
      } else {
        cb();
      }
    },

    afterUpdate: function(record, cb) {
      options.logger.info('Updated ' + this.identity + ' ' + record[this.primaryKey]);
      if (options.afterUpdate) {
        options.afterUpdate(record, cb);
      } else {
        cb();
      }
    },

    afterDestroy: function(records, cb) {
      records.forEach(record => {
        options.logger.info('Destroyed ' + this.identity + ' ' + record[this.primaryKey]);
      });
      if (options.afterDestroy) {
        options.afterDestroy(record, cb);
      } else {
        cb();
      }
    }
  };
};
