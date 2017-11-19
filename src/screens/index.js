import { Navigation } from 'react-native-navigation';
import SplashScreen from './splash';
import TodayScreen from './today';
import GamesScreen from './games';
import AppScreen from './app';
import AppToolbar from './app/components/toolbar';
import AppButton from './app/components/button';
import UpdatesScreen from './updates';
import SearchScreen from './search';

// Set screen constants
export const Screens = new Map();
export const SPLASH_SCREEN = 'appStoreClone.SplashScreen';
export const TODAY_SCREEN = 'appStoreClone.TodayScreen';
export const GAMES_SCREEN = 'appStoreClone.GamesScreen';
export const APP_SCREEN = 'appStoreClone.AppScreen';
export const APP_TOOLBAR = 'appStoreClone.AppToolbar';
export const APP_BUTTON = 'appStoreClone.AppButton';
export const UPDATES_SCREEN = 'appStoreClone.UpdatesScreen';
export const SEARCH_SCREEN = 'appStoreClone.SearchScreen';

// Resolve screen constants to imported class
Screens.set(SPLASH_SCREEN, () => SplashScreen);
Screens.set(TODAY_SCREEN, () => TodayScreen);
Screens.set(GAMES_SCREEN, () => GamesScreen);
Screens.set(APP_SCREEN, () => AppScreen);
Screens.set(APP_TOOLBAR, () => AppToolbar);
Screens.set(APP_BUTTON, () => AppButton);
Screens.set(UPDATES_SCREEN, () => UpdatesScreen);
Screens.set(SEARCH_SCREEN, () => SearchScreen);

export const startApp = () => {
  Navigation.startTabBasedApp({
    tabs: [{
      label: 'Today',
      screen: TODAY_SCREEN,
      icon: require('images/TodayIcon.png'),
    }, {
      label: 'Games',
      title: 'Games',
      screen: GAMES_SCREEN,
      icon: require('images/GamesIcon.png'),
    }, {
      label: 'Apps',
      title: 'Apps',
      screen: GAMES_SCREEN,
      icon: require('images/AppsIcon.png'),
    }, {
      label: 'Updates',
      title: 'Updates',
      screen: UPDATES_SCREEN,
      icon: require('images/UpdatesIcon.png'),
    }, {
      label: 'Search',
      title: 'Search',
      screen: SEARCH_SCREEN,
      icon: require('images/SearchIcon.png'),
    }],
    tabsStyle: {
      initialTabIndex: 0,
      tabBarTranslucent: true,
    },
  });
};

// Push app screen (helper function)
export const pushAppScreen = (navigator, app) => navigator.push({
  screen: APP_SCREEN,
  backButtonTitle: app.backTitle,
  backButtonHidden: false,
  navigatorStyle: {
    navBarCustomView: APP_TOOLBAR,
    navBarComponentAlignment: 'fill',
    navBarCustomViewInitialProps: {
      iconUrl: app.iconUrl,
    },
  },
  navigatorButtons: {
    rightButtons: [{
      id: 'action',
      component: APP_BUTTON,
      passProps: {
        action: app.action,
      },
    }],
  },
});
