import React, { Component } from 'react';
import { StyleSheet, Animated, View, Text } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';
import Heading from 'components/heading';
import Divider from 'components/divider';
import CollapsedText from 'components/collapsed-text';
import { appWithProps } from 'graphql/queries/app';
import get from 'lodash/get';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import Header from './components/header';
import StatsRow from './components/stats-row';
import Screenshots from './components/screenshots';

const formatReviewsCount = (count) => {
  if (count > 1000) {
    return `${(count / 1000).toFixed(2)}K`;
  }
  return count;
};

/**
 * App detail screen
 * Can be showed with initial data that will be used to render some parts of the screen while
 * data needed further down the screen is being loaded.
 */
@appWithProps
@inject('ui')
@observer
export default class App extends Component {

  static propTypes = {
    ui: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }

  static defaultProps = {}

  static navigatorStyle = {
    prefersLargeTitles: false,
    // Make sure those are set from the previous screen
  }

  static navigatorButtons = {
    // Make sure those are set from the previous screen
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

    const { App: app, loading, error } = this.props.data;

    if (loading || error) {
      return null;
    }

    const action = {
      label: app.price ? `$${app.price}` : 'GET',
      onPress: () => this.props.navigator.pop(),
    };

    // Find all count for each rating score (1 - 5)
    const ratings = Array.from({ length: 6 })
      .map((_, i) => get(app, `star${i}.count`, 0));

    // Sum them together
    const ratingsCount = ratings.reduce((a, b) => (a + b), 0);

    // Multiply each count with how many stars they were given and divide by total count
    const ratingsScore = ratings.map((n, i) => n * (i + 1))
      .reduce((a, b) => (a + b), 0) / ratingsCount;

    return (
      <Animated.ScrollView
        style={styles.host}
        scrollEventThrottle={16}
        onScroll={this.onScroll}
      >
        <Animated.View style={{ opacity }}>
          <Header
            iconUrl={app.iconUrl}
            title={app.title}
            subtitle={app.subtitle}
            action={action}
          />
        </Animated.View>

        <StatsRow>
          <StatsRow.Item
            title={ratingsScore.toFixed(1)}
            value={`${formatReviewsCount(ratingsCount)} Ratings`}
          />
          <StatsRow.Item title={`${app.age}+`} value="Age" />
        </StatsRow>

        <Screenshots
          data={[{
            title: 'iPhone',
            screenshots: get(app, 'previews'),
          }]}
        />

        <View>
          <CollapsedText>{get(app, 'description')}</CollapsedText>
          <Text>Developer{'\n'}{get(app, 'seller.name')}</Text>
          <Divider />
        </View>

        <View>
          <Heading action="See All">Ratings & Reviews</Heading>
          <Text>{ratingsScore.toFixed(1)} out of 5</Text>
          <Text>{ratingsCount.toLocaleString()} Ratings</Text>
          <View>
            <Text>{get(app, 'reviews.0.title')}</Text>
            <Text>{get(app, 'reviews.0.createdAt')}</Text>
            <Text>{get(app, 'reviews.0.rating')} / 5</Text>
            <CollapsedText>{get(app, 'reviews.0.description')}</CollapsedText>
          </View>
        </View>

        <View>
          <Heading action="Version History">What{'\''}s New</Heading>
          <View style={styles.columns}>
            <Text style={styles.grayText}>Version {get(app, 'versions.0.version')}</Text>
            <Text style={styles.grayText}>{distanceInWordsToNow(get(app, 'versions.0.date'))} ago</Text>
          </View>
          <CollapsedText numberOfLines={3}>
            {get(app, 'versions.0.changelog')}
          </CollapsedText>
        </View>

        <View>
          <Heading>Information</Heading>
          <Text>Category: {}</Text>
          {/* <InfoRow label="Seller" value="Some seller name" />
          <InfoRow label="Category" value=`${get(app, 'type')}: ${get(app, 'categories.0.title')}` />
          <InfoRow label="Compatibility" value="Works on this iPhone" />
          <InfoRow label="Languages" value="English" />
          <InfoRow label="Age Rating" value="4+" />
          <InfoRow label="In-App Purchases" value={get(app, 'hasInAppPurchases') ? 'Yes' : 'No'}>
            <Row label="No ads" value="$0.99" />
            <Row label="300 Diamonds" value="$0.99" />
            <Row label="All levels" value="$1.99" />
          </InfoRow>
          <InfoRow label="Developer Website" icon="safari" onPress={() => {}} />
          <InfoRow label="Privacy Policy" icon="hand" onPress={() => {}} /> */}
        </View>

        <View style={styles.bottom}>
          <View>
            <Heading>More by Some seller name</Heading>
            <Heading>You may also like</Heading>
          </View>
          <View>
            <Text>© {get(app, 'seller.name')}</Text>
          </View>
        </View>
      </Animated.ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    padding: 18,
  },

  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  grayText: {
    fontFamily: 'SFProText-Regular',
    fontSize: 15,
    color: '#818181',
    letterSpacing: -0.25,
  },

  bottom: {
    backgroundColor: '#F0F0F8',
    margin: -20,
    padding: 20,
    paddingBottom: 300,
    marginBottom: -200,
  },
});
