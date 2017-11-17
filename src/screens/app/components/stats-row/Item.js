import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class Item extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    // stars: PropTypes.number,
  }

  static defaultProps = {
    title: undefined,
    value: undefined,
    // stars: undefined,
  }

  render() {
    const { title, value } = this.props;
    return (
      <View style={styles.host}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flexDirection: 'column',
  },

  title: {
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 22,
    color: '#858E98',
    letterSpacing: 0,
  },

  value: {
    fontFamily: 'SFProText-Regular',
    fontSize: 12,
    color: '#C8C7CC',
    letterSpacing: 0,
  },
});
