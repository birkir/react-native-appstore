import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

export default class Developer extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: undefined,
  }

  static navigatorStyle = {
    prefersLargeTitles: true,
    navBarBackgroundColor: 'white',
    screenBackgroundColor: 'white',
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
    flex: 1,
  },
});
