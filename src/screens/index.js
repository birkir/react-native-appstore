import { Navigation } from 'react-native-navigation';
import SplashScreen from './splash';
import TodayScreen from './today';
import GamesScreen from './games';

export const Screens = new Map();

export const SPLASH_SCREEN = 'appStoreClone.SplashScreen';
export const TODAY_SCREEN = 'appStoreClone.TodayScreen';
export const GAMES_SCREEN = 'appStoreClone.GamesScreen';

// Splash screen
Screens.set(SPLASH_SCREEN, () => SplashScreen);
Screens.set(TODAY_SCREEN, () => TodayScreen);
Screens.set(GAMES_SCREEN, () => GamesScreen);

export const startApp = () => {
  Navigation.startTabBasedApp({
    tabs: [{
      label: 'Today',
      screen: TODAY_SCREEN,
      icon: require('images/TodayIcon.png'),
    }, {
      label: 'Games',
      screen: GAMES_SCREEN,
      icon: require('images/GamesIcon.png'),
    }, {
      label: 'Apps',
      screen: SPLASH_SCREEN,
      icon: require('images/AppsIcon.png'),
    }, {
      label: 'Updates',
      screen: SPLASH_SCREEN,
      icon: require('images/UpdatesIcon.png'),
    }, {
      label: 'Search',
      screen: SPLASH_SCREEN,
      icon: require('images/SearchIcon.png'),
    }],
    tabsStyle: {
      initialTabIndex: 0,
      tabBarTranslucent: true,
    },
  });
};
