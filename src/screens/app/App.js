import React, { Component } from 'react';
import { StyleSheet, Animated, View, Text } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';
import Heading from 'components/heading';
import Header from './components/header';
import StatsRow from './components/stats-row';
import Screenshots from './components/screenshots';

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

@inject('ui')
@observer
export default class App extends Component {

  static propTypes = {
    ui: PropTypes.object.isRequired,
    // children: PropTypes.node,
  }

  static defaultProps = {
    // children: undefined,
  }

  static navigatorStyle = {
    prefersLargeTitles: false,
    // Make sure those are set from the previous screen
  }

  static navigatorButtons = {
    // Make sure those are set from the previous screen
  }

  state = {
    loading: true,
  }

  @autobind
  onActionPress() {
    this.setState({ loading: !this.state.loading });
  }

  @autobind
  onScroll(e) {
    const isHeaderVisible = e.nativeEvent.contentOffset.y < 110;
    if (isHeaderVisible !== this.isHeaderVisible) {
      Animated.spring(this.props.ui.appScreenHeaderOpacity, {
        toValue: Number(!isHeaderVisible),
        bounciness: 0,
      }).start();
      this.isHeaderVisible = isHeaderVisible;
    }
  }

  render() {
    const opacity = this.props.ui.appScreenHeaderOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
    return (
      <Animated.ScrollView
        style={styles.host}
        scrollEventThrottle={16}
        onScroll={this.onScroll}
      >
        <Animated.View style={{ opacity }}>
          <Header
            iconUrl={DATA.iconUrl}
            title={DATA.title}
            subtitle={DATA.subtitle}
            action="FREE"
            actionSubtitle="In-App Purchases"
            isActionLoading={this.state.loading}
            onActionPress={this.onActionPress}
          />
        </Animated.View>
        <StatsRow>
          <StatsRow.Item title="4.5" value="8.36K Ratings" />
          <StatsRow.Item title="4+" value="Age" />
        </StatsRow>
        <Screenshots
          data={[{
            title: 'iPhone',
            screenshots: [1, 2, 3, 4, 5],
          }, {
            title: 'Apple Watch',
            screenshots: [1, 2, 3, 4, 5],
          }]}
        />
        <View>
          <Heading action="See All">Ratings & Reviews</Heading>
        </View>
        <View>
          <Heading action="Version History">What{'\''}s New</Heading>
        </View>
        <View>
          <Heading>Information</Heading>
          {/* <InfoRow label="Seller" value="Some seller name" />
          <InfoRow label="Category" value="Games: Puzzle" />
          <InfoRow label="Compatibility" value="Works on this iPhone" />
          <InfoRow label="Languages" value="English" />
          <InfoRow label="Age Rating" value="4+" />
          <InfoRow label="In-App Purchases" value="Yes">
            <Row label="No ads" value="$0.99" />
            <Row label="300 Diamonds" value="$0.99" />
            <Row label="All levels" value="$1.99" />
          </InfoRow>
          <InfoRow label="Developer Website" icon="safari" onPress={() => {}} />
          <InfoRow label="Privacy Policy" icon="hand" onPress={() => {}} /> */}
        </View>
        <View>
          <Heading>Supports</Heading>
          {/* <SupportItem
            icon="cloud-family"
            title="Family Sharing"
            description="Up to six family members will be able to use this app with Family Sharing enabled."
          /> */}
        </View>
        <View>
          <Heading>More by Some seller name</Heading>
          <Heading>You may also like</Heading>
        </View>
        <View>
          <Text>© Some seller name</Text>
        </View>
        <View style={styles.gutter} />
      </Animated.ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    padding: 16,
  },

  gutter: {
    height: 100,
  },
});
