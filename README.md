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
 - Set search query dynamically (when tapping suggested keyword).
 - BlurView is flickering when transitioning back.
 - 3D Touch navigation Peek'n'Pop.
 - Search safe area not working.

## Goal

Have a sample app on the AppStore that replicates Apple's AppStore. Apple will probably never allow this unless we change the app content to something that will be clearly distinguishable from Apple's own AppStore.
