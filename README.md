# Sails Persistence Logger
[![NPM](https://nodei.co/npm/sails-persistence-logger.png)](https://nodei.co/npm/sails-persistence-logger/)

Automatically log all Sails model persistence events

## Install
`npm install --save sails-persistence-logger`

## Use
To use **Sails Persistence Logger** out of the box add the logger to `config/models.js` default persistence hooks so it looks like the following example:

```javascript
var sailsPersistenceLogger = require('sails-persistence-logger')();

module.exports.models = {
  afterCreate: sailsPersistenceLogger.afterCreate,
  afterUpdate: sailsPersistenceLogger.afterUpdate,
  afterDestroy: sailsPersistenceLogger.afterDestroy
};
```

And that's it! You'll now have Log4js logging of the form `[2017-03-19 15:03:27.608] [INFO] sails-persistence-logger - Created event 42` for all persistence events.

## API
### `require('sails-persistence-logger')(options: Object)`
Initializes **Sails Persistence Logger** with the given options. All options are optional.
- `options.logger`: Log4js compatible logger which **Sails Persistence Logger** will use
- `options.level`: (default: info) Log4js logging level ('debug', 'info', 'warn', 'error')
- `options.afterCreate`: Additional `afterCreate(record: Object, callback: Function)` method which is called after logging
- `options.afterUpdate`: Additional `afterUpdate(record: Object, callback: Function)` method which is called after logging
- `options.afterDestroy`: Additional `afterDestroy(records: Array, callback: Function)` method which is called after logging
