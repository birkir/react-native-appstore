import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'mobx-react/native';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
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

export default class Store {

  ui = new UI();

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
      <Provider ui={store.ui} client={client}>
        <ApolloProvider client={client}>
          {children}
        </ApolloProvider>
      </Provider>
    );
  }
}
