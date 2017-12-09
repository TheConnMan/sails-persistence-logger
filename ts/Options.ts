import * as extend from 'extend';
import * as log4js from 'log4js';

export default class Options {

  public logger: log4js.Logger = log4js.getLogger('sails-persistence-logger');
  public level: string = 'info';

  private exclude: { [key: string]: (boolean | string[]) } = {};

  constructor(params = {}) {
    extend(this, params);
  }

  public isActive(clazz: string, method: string): boolean {
    if (!this.exclude[clazz]) {
      return true;
    }
    if (this.exclude[clazz] === true) {
      return false;
    }
    return (this.exclude[clazz] as string[]).indexOf(method) === -1;
  }
}
