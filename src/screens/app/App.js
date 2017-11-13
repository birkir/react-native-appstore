import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const DATA = {
  iconUrl: `https://placeimg.com/198/198/any?${Math.random()}`,
  title: 'Spark Email',
  subtitle: 'New exciting tournament game mode!',
  action: 'FREE',
  rating: {
    value: 4.5,
    votes: 8360,
  },
  ageRestriction: '4+',
  versionHistory: [{
    version: '3.0',
    date: new Date(),
    changelog: 'Refreshed design and better navigation.',
  }],
  previews: [''],
};

/**
 * App detail screen
 */
export default class App extends Component {
  
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
    flex: 1,
  },
});
