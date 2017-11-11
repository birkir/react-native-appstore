import React, { PureComponent } from 'react';
import { StyleSheet, Text } from 'react-native';
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
      <Text style={styles.host}>
        {this.props.children}
      </Text>

    );
  }
}

const styles = StyleSheet.create({
  host: {
    fontWeight: '500',
    color: '#000',
  },
});
