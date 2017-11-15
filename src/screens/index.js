import { Navigation } from 'react-native-navigation';
import SplashScreen from './splash';
import TodayScreen from './today';
import GamesScreen from './games';
import AppScreen from './app';
import UpdatesScreen from './updates';
import AppToolbar from './app/components/toolbar';

export const Screens = new Map();

export const SPLASH_SCREEN = 'appStoreClone.SplashScreen';
export const TODAY_SCREEN = 'appStoreClone.TodayScreen';
export const GAMES_SCREEN = 'appStoreClone.GamesScreen';
export const APP_SCREEN = 'appStoreClone.AppScreen';
export const APP_TOOLBAR = 'appStoreClone.AppToolbar';
export const UPDATES_SCREEN = 'appStoreClone.UpdatesScreen';

Screens.set(SPLASH_SCREEN, () => SplashScreen);
Screens.set(TODAY_SCREEN, () => TodayScreen);
Screens.set(GAMES_SCREEN, () => GamesScreen);
Screens.set(APP_SCREEN, () => AppScreen);
Screens.set(APP_TOOLBAR, () => AppToolbar);
Screens.set(UPDATES_SCREEN, () => UpdatesScreen);

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
      screen: SPLASH_SCREEN,
      icon: require('images/AppsIcon.png'),
    }, {
      label: 'Updates',
      title: 'Updates',
      screen: UPDATES_SCREEN,
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
