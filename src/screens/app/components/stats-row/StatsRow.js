import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Item from './Item';

export default class StatsRow extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: undefined,
  }

  static Item = Item;

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

});
