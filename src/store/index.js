import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'mobx-react/native';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import algoliasearch from 'algoliasearch/reactnative';
import config from 'config';
import UI from './UI';

/* eslint-disable */
if (__DEV__) {
  // This becomes handy to debug network requests in Chrome DevTools
  XMLHttpRequest = GLOBAL.originalXMLHttpRequest
    ? GLOBAL.originalXMLHttpRequest
    : GLOBAL.XMLHttpRequest;
}
/* eslint-enable */

// Create new Apollo client
const client = new ApolloClient({
  link: new HttpLink({ uri: config.API_URL }),
  cache: new InMemoryCache(),
});

// Algolia client
const algolia = algoliasearch(config.ALGOLIA_APP_ID, config.ALGOLIA_API_KEY);

export default class Store {

  ui = new UI();

  algolia = {
    client: algolia,
    apps: algolia.initIndex('apps'),
  };

  async setup() {
    return true;
  }
}

/**
 * Store Provider wraps all neccesery providers.
 * @uses MobxProvider
 * @uses ApolloProvider
 */
export class StoreProvider extends PureComponent {

  static propTypes = {
    store: PropTypes.object,
    children: PropTypes.node,
  };

  static defaultProps = {
    store: {},
    children: undefined,
  };

  render() {
    const {
      store,
      children,
    } = this.props;
    return (
      <Provider ui={store.ui} client={client} algolia={store.algolia}>
        <ApolloProvider client={client}>
          {children}
        </ApolloProvider>
      </Provider>
    );
  }
}
