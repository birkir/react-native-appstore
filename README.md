![Build status](https://travis-ci.com/ueno-llc/react-native-appstore.svg?token=Xb6NQT3VcNMAAkvfu4os&branch=master)

# App Store demo

This repository contains a sample react-native app with batteries-included. Re-creating the App Store app is a hard thing to do in react native and we wanted to make an attempt.

*Disclaimer: This is for demonstration purposes only. Not intended to cause user confusion. Will not be released, used or marketed in any way. Project's solely purpose is to experiment with the abilities and limitations of react native. Pictures in the screenshots below are property of Ueno and can be found on our [Dribble](https://dribbble.com/ueno) and [Instagram](instagram.com/uenodotco/?hl=en).*

![Today screen](https://media.giphy.com/media/xT0xeqCd7M7TJJI93i/giphy.gif)![App list to detail view](https://media.giphy.com/media/3o6fJ4TfZOgw9dy5OM/giphy.gif)![Screenshots](https://media.giphy.com/media/3o6fJdikzwcvl9VpE4/giphy.gif)![Search](https://media.giphy.com/media/3o6fJe1CPV06DrKg7K/giphy.gif)

## E2E Testing

This project uses detox to run end-to-end UI testing with jest as test runner under the hood. Some tooling is needed to get started, but the tests will also run on a CI.

### Setup tools

```bash
brew tap wix/brew
brew install --HEAD applesimutils
npm install -g detox-cli
```

### Run the tests

```bash
npm start
gem install xcpretty
detox build --configuration ios.sim.release
detox test --configuration ios.sim.release
```

## Integration, Unit and Code Quality Testing

Code is linted with eslint using airbnb's config and personal opinionated exceptions.

```bash
npm run lint
```

We use jest also for running unit tests with snapshots and enzyme for cases where we want more control.

```bash
npm run test
```

## Continuous Delivery

![Imgur](https://i.imgur.com/o91jUrQ.png)

The pipeline for continously deliver the app is actually two separate processes integrated seamlessly into one.

Contributors are responsible for running tests locally before pushing to GitHub. This creates smoother experience for both the contributors and the maintainers.

Tests are run automatically in a CI when a pull-request (PR) is created, the pull-request can only be merged when the tests do pass.

Every commit on the `master` branch will do one of the following after tests have passed:

### Native build (binary)
Check if any changes were made to the `./ios` folder or if a commit message includes the tag `[BUILD]`. Do a full native  build, sign it and upload it to TestFlight. Upload debug symbols to Sentry.

### CodePush build (assets)
Build and pack OTA update via CodePush (if native build was not made). Upload sourcemaps to Sentry.

The TestFlight version of the app is linked to staging code-push key and the AppStore version is linked to production code-push key. Manual promotion can be done after the TestFlight app has been approved for sale.
