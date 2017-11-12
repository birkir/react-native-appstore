import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import { Provider } from 'mobx-react/native';
import UI from './UI';

/* eslint-disable */
if (__DEV__) {
  XMLHttpRequest = GLOBAL.originalXMLHttpRequest
    ? GLOBAL.originalXMLHttpRequest
    : GLOBAL.XMLHttpRequest;
}
/* eslint-enable */

export default class Store {

  ui = new UI();

  async setup() {
    return true;
  }
}

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
    const { store, children } = this.props;
    return (
      <Provider ui={store.ui}>
        {children}
      </Provider>
    );
  }
}
