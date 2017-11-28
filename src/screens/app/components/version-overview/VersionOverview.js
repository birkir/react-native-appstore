import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import Heading from 'components/heading';
import Divider from 'components/divider';
import CollapsedText from 'components/collapsed-text';

export default class VersionOverview extends PureComponent {
  static propTypes = {
    version: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
  }

  static defaultProps = {
    version: undefined,
    date: undefined,
    description: undefined,
  }

  render() {
    const {
      version,
      date,
      description,
    } = this.props;

    return (
      <View style={styles.host}>
        <Heading action="Version History">What{'\''}s New</Heading>
        <View style={styles.row}>
          <Text style={styles.subtitle}>Version {version}</Text>
          <Text style={styles.subtitle}>
            {distanceInWordsStrict(date, new Date())} ago
          </Text>
        </View>
        <CollapsedText numberOfLines={3}>
          {description}
        </CollapsedText>
        <View style={styles.spacer} />
        <Divider />
      </View>
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
    marginBottom: 10,
  },

  subtitle: {
    fontFamily: 'SFProText-Regular',
    fontSize: 15,
    color: '#8A8A8F',
    letterSpacing: -0.24,
  },

  spacer: {
    height: 32,
  },
});
