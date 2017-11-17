import React, { Component } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import AppItemRow from 'components/app-item-row';
import Heading from 'components/heading';
import CollapsedText from 'components/collapsed-text';
// import PropTypes from 'prop-types';

const DATA = [{
  key: 1,
  imageUrl: `https://placeimg.com/198/198/any?${Math.random()}`,
  title: 'Slack',
  subtitle: 'Today',
}, {
  key: 2,
  imageUrl: `https://placeimg.com/198/198/any?${Math.random()}`,
  title: 'Twitter',
  subtitle: 'Yesterday',
}, {
  key: 3,
  imageUrl: `https://placeimg.com/198/198/any?${Math.random()}`,
  title: 'Facebook',
  subtitle: 'Yesterday',
}];

export default class Updates extends Component {

  static propTypes = {
    // children: PropTypes.node,
  }

  static defaultProps = {
    // children: undefined,
  }

  static navigatorStyle = {
    navBarNoBorder: true,
    drawUnderTabBar: true,
    prefersLargeTitles: true,
  }

  render() {
    return (
      <ScrollView style={styles.host}>
        <Heading action="Update All">
          Pending
        </Heading>
        {DATA.slice(0, 1).map(item => (
          <View style={styles.item} key={item.key}>
            <AppItemRow {...item} action="UPDATE" actionWidth={92} border={false} />
            <View style={styles.spacing} />
            <CollapsedText numberOfLines={3}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent pretium mattis massa, non dictum leo imperdiet sed. Morbi vitae dolor
                luctus, dapibus dui a, elementum mi. Vivamus in commodo erat.{'\n\n'}
                luctus, dapibus dui a, elementum mi. Vivamus in commodo erat.
            </CollapsedText>
          </View>
        ))}
        <Heading>Updated recently</Heading>
        {DATA.slice(1).map(item => (
          <View style={styles.item} key={item.key}>
            <AppItemRow {...item} action="OPEN" border={false} />
          </View>
        ))}
        <View style={styles.gutter} />
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

  item: {
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CDCDCF',
  },

  spacing: {
    height: 8,
  },

  gutter: {
    height: 200,
  },
});
