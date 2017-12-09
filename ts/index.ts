import * as extend from 'extend';

import Options from './Options';

class SailsPersistenceLogger {

  private options: Options;

  constructor(overrides) {
    this.options = new Options(overrides);
  }

  public async afterCreate(record: object, clazz): Promise<void> {
    return this.after([record], clazz, 'CREATE', 'Created');
  }

  public afterUpdate(record: object, clazz): Promise<void> {
    return this.after([record], clazz, 'UPDATE', 'Updated');
  }

  public async afterDestroy(records: object[], clazz): Promise<void> {
    return this.after(records, clazz, 'DESTROY', 'Destroyed');
  }

  private async after(records: object[], clazz, action: string, message: string): Promise<void> {
    if (this.options.isActive(clazz.identity, action)) {
      records.forEach((record) => {
        this.options.logger[this.options.level](`${message} ${clazz.identity} ${record[clazz.primaryKey]}`);
      });
    }
    return Promise.resolve();
  }
}

export = SailsPersistenceLogger;
