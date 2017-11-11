import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

export default class Strong extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: undefined,
  }

  render() {
    return (
      <View style={styles.host}>
        {this.props.children}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  host: {
    fontWeight: '500',
    color: '#000',
  },
});
