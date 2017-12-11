import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

export default class RenderCell extends PureComponent {

  static propTypes = {
    item: PropTypes.object,
    parentProps: PropTypes.object,
    children: PropTypes.node,
  }

  static defaultProps = {
    item: {},
    parentProps: {},
    children: null,
  }

  render() {
    const { item, parentProps, children } = this.props;
    const zIndex = item.id === parentProps.activeCardId ? 10 : 0;
    return (
      <View style={{ zIndex }}>
        {children}
      </View>
    );
  }
}
