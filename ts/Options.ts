import * as log4js from 'log4js';

class Options {

  public logger: log4js.Logger = log4js.getLogger('sails-persistence-logger');
  public level: string = 'info';
}

export default Options;
