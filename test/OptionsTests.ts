import Options from '../ts/Options';

import * as assert from 'assert';

describe('Options', () => {
  it('should not excluded any models by default', () => {

    const options: Options = new Options();

    assert.ok(options.isActive('model', 'CREATE'));
    assert.ok(options.isActive('model', 'UPDATE'));
    assert.ok(options.isActive('model', 'DESTROY'));
  });

  it('should exclude all methods when set to false', () => {

    const options: Options = new Options({
      exclude: {
        model: true
      }
    });

    assert.ok(!options.isActive('model', 'CREATE'));
    assert.ok(!options.isActive('model', 'UPDATE'));
    assert.ok(!options.isActive('model', 'DESTROY'));
  });

  it('should exclude single method when set as an array', () => {

    const options: Options = new Options({
      exclude: {
        model: ['CREATE']
      }
    });

    assert.ok(!options.isActive('model', 'CREATE'));
    assert.ok(options.isActive('model', 'UPDATE'));
    assert.ok(options.isActive('model', 'DESTROY'));
  });
});
