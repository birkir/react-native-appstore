![Build status](https://travis-ci.com/ueno-llc/react-native-appstore.svg?token=Xb6NQT3VcNMAAkvfu4os&branch=master)

![Today screen](https://media.giphy.com/media/xT0xeqCd7M7TJJI93i/giphy.gif) ![App list to detail view](https://media.giphy.com/media/3o6fJ4TfZOgw9dy5OM/giphy.gif) ![Screenshots](https://media.giphy.com/media/3o6fJdikzwcvl9VpE4/giphy.gif) ![Search](https://media.giphy.com/media/3o6fJe1CPV06DrKg7K/giphy.gif)

# E2E Testing

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

# Integration, Unit and Code Quality Testing

Code is linted with eslint using airbnb's config and personal opinionated exceptions.

```bash
npm run lint
```

We use jest also for running unit tests with snapshots and enzyme for cases where we want more control.

```bash
npm run test
```

# Continuous Delivery

The pipeline for continously deliver the app is actually two separate processes integrated seamlessly into one.

Contributors are responsible for running tests locally before pushing to GitHub. This creates smoother experience for both the contributors and the maintainers.

Tests are run automatically in a CI when a pull-request (PR) is created, the pull-request can only be merged when the tests do pass.

Every commit on the `master` branch will do one of the following after tests have passed:

### Native build (binary)
Check if any changes were made to the `./ios` folder or if a commit message includes the tag `[BUILD]`. Do a full native  build, sign it and upload it to TestFlight. Upload debug symbols to Sentry.

### CodePush build (assets)
Build and pack OTA update via CodePush (if native build was not made). Upload sourcemaps to Sentry.

The TestFlight version of the app is linked to staging code-push key and the AppStore version is linked to production code-push key. Manual promotion can be done after the TestFlight app has been approved for sale.

# App Store clone in react-native

This sample project was intended to demonstrate the possibilities with react-native.

 - [x] TabBar
 - [x] Today list headings
 - [x] Card Shared Element transition
 - [x] Card list of apps
 - [x] Card app components (GET button, etc.)
 - [ ] Card detail lazy loading
 - [x] Search list
 - [x] Search input field focus transition
 - [x] Navigation title transition (ex. Games to App detail)
 - [x] App list horizontal scroll
 - [x] App detail horizontal scroll
 - [ ] Categories view
 - [x] Updates list of apps

## Hard Problems

 - Navbar title fade away when scrolled.
 - Allow shared elements to transition outside Safe Area constraints.
 - Animate width and height properally in an controlled animated environment.
 - Horizontal scroll view with next and previous slides peeking through.
 - Animated spinner
 - Native search
 - Link Header and screen Hero scroll reveal

## Unsolved problems

 - Large titles flicker on scrollview while scrolling or pulling to refresh.
 - ~~Set search query dynamically (when tapping suggested keyword).~~
 - BlurView is flickering when transitioning back.
 - ~~3D Touch navigation Peek'n'Pop.~~
 - Search safe area not working.

## Goal

Have a sample app on the AppStore that replicates Apple's AppStore. Apple will probably never allow this unless we change the app content to something that will be clearly distinguishable from Apple's own AppStore.
