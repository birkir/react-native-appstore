import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import AppItemRow from 'components/app-item-row';
// import PropTypes from 'prop-types';

export default class Games extends Component {

  static propTypes = {
    // children: PropTypes.node,
  }

  static defaultProps = {
    // children: undefined,
  }

  render() {
    return (
      <View style={styles.host}>
        <AppItemRow
          imageUrl="https://cdn.dribbble.com/users/40433/screenshots/3709382/untitled-1.png"
          title="Spark Email"
          subtitle="New exciting tournament game mode!"
          action="FREE"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    padding: 20,
  },
});
