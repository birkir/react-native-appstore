/* global device element by */
describe('Today screen', () => {

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have today screen host view', async () => {
    await expect(element(by.id('TODAY_HOST_VIEW'))).toBeVisible();
  });

});
