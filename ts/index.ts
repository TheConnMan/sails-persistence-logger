import * as extend from 'extend';

import * as log4js from 'log4js';

var logger = log4js.getLogger('sails-persistence-logger');

class SailsPersistenceLogger {

  private options;

  constructor(overrides) {
    this.options = extend(true, {}, {
      logger: logger,
      level: 'info'
    }, overrides || {});
  }

  public afterCreate(record, clazz): Promise<null> {
    var me = this;
    return new Promise((resolve, reject) => {
      me.options.logger[me.options.level]('Created ' + clazz.identity + ' ' + record[clazz.primaryKey]);
      resolve();
    });
  }

  public afterUpdate(record, clazz): Promise<null> {
    var me = this;
    return new Promise((resolve, reject) => {
      me.options.logger[me.options.level]('Updated ' + clazz.identity + ' ' + record[clazz.primaryKey]);
      resolve();
    });
  }

  public afterDestroy(records, clazz): Promise<null> {
    var me = this;
    return new Promise((resolve, reject) => {
      records.forEach(record => {
        me.options.logger[me.options.level]('Destroyed ' + clazz.identity + ' ' + record[clazz.primaryKey]);
      });
      resolve();
    });
  }
}

export = SailsPersistenceLogger;
