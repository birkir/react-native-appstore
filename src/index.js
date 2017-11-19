import { Navigation } from 'react-native-navigation';
import { Screens, startApp } from 'screens';
import codePush from 'react-native-code-push';
import config from 'config';
import Store, { StoreProvider } from 'store';

// Create new instance of the Store
const store = new Store(config.SECRET_TOKEN);

// Register screens
Array.from(Screens.entries()).forEach(([screenConst, screenModule]) =>
  Navigation.registerComponent(
    screenConst,
    screenModule,
    store,
    codePush(StoreProvider),
  ));

// Setup store and start app
store
  .setup()
  .then(() => startApp());
