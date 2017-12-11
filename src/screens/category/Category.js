import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
// import PropTypes from 'prop-types';
import Heading from 'components/heading';

export default class Category extends Component {

  static propTypes = {
    // children: PropTypes.node,
  }

  static defaultProps = {
    // children: undefined,
  }

  render() {
    const category = 'Kids';
    return (
      <View style={styles.host}>
        {/* Featured slider */}
        <Heading>{category.title} Apps We Love</Heading>
        <Heading>Top Paid</Heading>
        <Heading>Top Free</Heading>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
  },
});
