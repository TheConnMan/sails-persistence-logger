import * as extend from 'extend';

import Options from './Options';

class SailsPersistenceLogger {

  private options: Options;

  constructor(overrides) {
    this.options = new Options(overrides);
  }

  public afterCreate(record, clazz): Promise<null> {
    var me = this;
    return new Promise((resolve, reject) => {
      if (me.options.isActive(clazz.identity, 'CREATE')) {
        me.options.logger[me.options.level]('Created ' + clazz.identity + ' ' + record[clazz.primaryKey]);
      }
      resolve();
    });
  }

  public afterUpdate(record, clazz): Promise<null> {
    var me = this;
    return new Promise((resolve, reject) => {
      if (me.options.isActive(clazz.identity, 'UPDATE')) {
        me.options.logger[me.options.level]('Updated ' + clazz.identity + ' ' + record[clazz.primaryKey]);
      }
      resolve();
    });
  }

  public afterDestroy(records, clazz): Promise<null> {
    var me = this;
    return new Promise((resolve, reject) => {
      if (me.options.isActive(clazz.identity, 'DESTROY')) {
        records.forEach(record => {
          me.options.logger[me.options.level]('Destroyed ' + clazz.identity + ' ' + record[clazz.primaryKey]);
        });
      }
      resolve();
    });
  }
}

export = SailsPersistenceLogger;
