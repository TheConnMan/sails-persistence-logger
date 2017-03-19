var log4js = require('log4js');
var logger = log4js.getLogger('sails-persistence-logger');

module.exports = {
  afterCreate: function(record, cb) {
    logger.info('Created');
    cb();
  },

  afterUpdate: function(record, cb) {
    logger.info('Updated');
    cb();
  },

  afterDestroy: function(records, cb) {
    records.forEach(record => {
      logger.info('Destroyed');
    });
    cb();
  }
};
