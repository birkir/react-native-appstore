import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class Versions extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: undefined,
  }

  static navigatorStyle = {
    navBarBackgroundColor: 'white',
    screenBackgroundColor: 'white',
  }

  render() {
    return (
      <View style={styles.host}>
        <Text>Version History</Text>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
  },
});
