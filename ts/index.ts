import * as extend from 'extend';

import Options from './Options';

class SailsPersistenceLogger {

  private options: Options;

  constructor(overrides) {
    this.options = new Options(overrides);
  }

  public async afterCreate(record, clazz): Promise<void> {
    if (this.options.isActive(clazz.identity, 'CREATE')) {
      this.options.logger[this.options.level]('Created ' + clazz.identity + ' ' + record[clazz.primaryKey]);
    }
    return Promise.resolve();
  }

  public afterUpdate(record, clazz): Promise<void> {
    if (this.options.isActive(clazz.identity, 'UPDATE')) {
      this.options.logger[this.options.level]('Updated ' + clazz.identity + ' ' + record[clazz.primaryKey]);
    }
    return Promise.resolve();
  }

  public async afterDestroy(records, clazz): Promise<void> {
    if (this.options.isActive(clazz.identity, 'DESTROY')) {
      records.forEach((record) => {
        this.options.logger[this.options.level]('Destroyed ' + clazz.identity + ' ' + record[clazz.primaryKey]);
      });
    }
    return Promise.resolve();
  }
}

export = SailsPersistenceLogger;
