/* global device element by */
describe('Today screen', () => {

  beforeEach(async () => {
    await device.reloadReactNative();

    // Dismiss red screen of death
    const dismissLabel = element(by.text('Dismiss (ESC)'));
    if (dismissLabel) await dismissLabel.tap();
  });

  it('should have today screen host view', async () => {
    await expect(element(by.id('TODAY_HOST_VIEW'))).toBeVisible();
  });

});
