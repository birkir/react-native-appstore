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
    fontWeight: '600',
    fontSize: 23,
    color: 'rgba(0, 0, 0, 0.45)',
    letterSpacing: -0.08,
  },

  value: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.25)',
    letterSpacing: -0.08,
  },
});
