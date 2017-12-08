import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import get from 'lodash/get';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import PropTypes from 'prop-types';
import Heading from 'components/heading';
import Divider from 'components/divider';
import CollapsedText from 'components/collapsed-text';
import versionWithProps from 'graphql/queries/versions';

@versionWithProps
export default class Versions extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  static navigatorStyle = {
    navBarBackgroundColor: 'white',
    screenBackgroundColor: 'white',
  }

  renderVersion(version) {
    return (
      <View>
        <View style={styles.row}>
          <Text style={styles.version}>{version.version}</Text>
          <Text style={styles.date}>
            {distanceInWordsStrict(version.date, new Date())} ago
          </Text>
        </View>
        <CollapsedText numberOfLines={3}>
          {version.description}
        </CollapsedText>
        <Divider gutter />
      </View>
    );
  }

  render() {
    const { data } = this.props;
    const versions = get(data, 'App.versions', get(this.props, 'versions'));

    return (
      <ScrollView style={styles.host}>
        <Heading>Version History</Heading>
        {versions.map(this.renderVersion)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  date: {
    fontFamily: 'SFProText-Regular',
    fontSize: 15,
    color: '#8A8A8F',
    letterSpacing: -0.24,
  },

  version: {
    fontFamily: 'SFProText-Bold',
    fontSize: 15,
    color: '#000000',
    letterSpacing: -0.24,
  },
});
