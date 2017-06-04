import * as extend from 'extend';
import * as log4js from 'log4js';

class Options {

  public logger: log4js.Logger = log4js.getLogger('sails-persistence-logger');
  public level: string = 'info';

  constructor(params = {}) {
    extend(this, params);
  }

  private exclude: { [key:string]: (boolean | Array<string>) } = {};

  public isActive(clazz: string, method: string): boolean {
    if (!this.exclude[clazz]) {
      return true;
    }
    if (this.exclude[clazz] === true) {
      return false;
    }
    return (<Array<string>> this.exclude[clazz]).indexOf(method) === -1;
  }
}

export default Options;
