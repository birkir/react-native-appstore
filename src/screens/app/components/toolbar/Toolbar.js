import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { inject, observer } from 'mobx-react/native';
// import PropTypes from 'prop-types';

console.ignoredYellowBox = ['RCTBatchedBridge is deprecated'];

@inject('ui')
@observer
export default class Toolbar extends Component {

  static propTypes = {
  }

  static defaultProps = {
  }

  render() {
    return (
      <View style={styles.host}>
        <Text>HELLO WORLD</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    // flex: 1,
    backgroundColor: '#ECA',
    width: 100,
    height: 30,
  },
});
