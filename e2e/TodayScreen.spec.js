const detox = require('detox'); // eslint-disable-line
const config = require('../package.json').detox;

/* global device element by */
describe('Today screen', () => {

  beforeEach(async () => {
    await device.reloadReactNative();
    if (typeof device === 'undefined') {
      await detox.init(config);
    }
  });

  it('should have today screen host view', async () => {
    await expect(element(by.id('TODAY_HOST_VIEW'))).toBeVisible();
  });

});
