import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, RefreshControl } from 'react-native';
import AppItemRow from 'components/app-item-row';
import Heading from 'components/heading';
import Divider from 'components/divider';
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
    navBarTransparent: true,
    drawUnderTabBar: true,
    prefersLargeTitles: true,
  }

  render() {
    return (
      <ScrollView
        style={styles.host}
        refreshControl={
          <RefreshControl
            style={styles.refresh}
            refreshing={false}
            onRefresh={() => {}}
          />
        }
      >
        <Divider />
        <Heading action="Update All">
          Pending
        </Heading>
        {DATA.slice(0, 1).map(item => (
          <View style={styles.item} key={item.key}>
            <AppItemRow {...item} action="UPDATE" actionWidth={92} divider={false} />
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
            <AppItemRow {...item} action="OPEN" divider={false} />
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
    padding: 18,
    paddingTop: 0,
    marginTop: -50,
  },

  refresh: {
    marginTop: 50,
  },

  item: {
    paddingBottom: 13.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CFCFCF',
    marginBottom: 14,
  },

  spacing: {
    height: 8,
  },

  gutter: {
    height: 200,
  },
});
