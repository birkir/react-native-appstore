import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import get from 'lodash/get';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import PropTypes from 'prop-types';
import SectionHeader from 'components/section-header';
import Divider from 'components/divider';
import CollapsedText from 'components/collapsed-text';
import versionWithProps from 'graphql/queries/versions';

const dateAgo = date => distanceInWordsStrict(date, new Date())
  .replace(/\s(year|day|minute|second)s?/, n => n.substr(1, 1))
  .replace(/\smonths?/, 'mo');

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
            {dateAgo(version.date)} ago
          </Text>
        </View>
        <CollapsedText numberOfLines={3}>
          {version.changelog}
        </CollapsedText>
        <Divider gutter />
      </View>
    );
  }

  render() {
    const { data } = this.props;
    const versions = get(data, 'App.versions', get(this.props, 'versions', []));

    return (
      <ScrollView style={styles.host}>
        <SectionHeader title="Version History" />
        <Divider />
        <View style={styles.gutter} />
        {versions.map(this.renderVersion)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },

  gutter: {
    height: 20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
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
