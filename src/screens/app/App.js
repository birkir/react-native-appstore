import React, { Component } from 'react';
import { StyleSheet, ScrollView, Dimensions, View, Image, Text } from 'react-native';
import Button from 'components/button';
import Carousel from 'react-native-snap-carousel';
// import PropTypes from 'prop-types';

const { width: initialWidth } = Dimensions.get('window');

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
    // children: PropTypes.node,
  }

  static defaultProps = {
    // children: undefined,
  }

  state = {
    loading: true,
    width: initialWidth,
  }

  renderScreenshot({ index }) {
    const cardStyles = {
      paddingHorizontal: 5,
      paddingLeft: index === 0 ? 20 : 5,
    };
    return (
      <View style={cardStyles}>
        <View style={styles.screenshot} />
      </View>
    );
  }

  render() {
    const { width } = this.state;
    return (
      <ScrollView style={styles.host}>
        <View style={styles.header}>
          <Image source={{ uri: DATA.iconUrl }} style={styles.header__icon} />
          <View style={styles.header__content}>
            <Text style={styles.header__title} numberOfLines={2}>{DATA.title}</Text>
            <Text style={styles.header__subtitle} numberOfLines={1}>{DATA.subtitle}</Text>
            <View style={styles.header__actions}>
              <Button
                blue
                subtitle="In-App Purchases"
                horizontal
                align="left"
                loading={this.state.loading}
                onPress={() => this.setState({ loading: !this.state.loading })}
              >
                GET
              </Button>
              <View style={styles.flex} />
              <Button blue>...</Button>
            </View>
          </View>
        </View>
        <View style={styles.inforow}>
          <View style={[styles.inforow__item, styles.flex]}>
            <Text style={styles.inforow__title}>4.5 ****</Text>
            <Text style={styles.inforow__subtitle}>8.36K Ratings</Text>
          </View>
          <View style={styles.inforow__item}>
            <Text style={styles.inforow__title}>4+</Text>
            <Text style={styles.inforow__subtitle}>Age</Text>
          </View>
        </View>
        <View style={styles.carousel}>
          <Carousel
            data={[1, 2, 3]}
            renderItem={this.renderScreenshot}
            sliderWidth={width}
            itemWidth={234}
            activeSlideAlignment="start"
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
          />
        </View>
        <View>
          <Text>[] iPhone</Text>
          <View style={styles.border} />
        </View>
        <View style={styles.gutter} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    padding: 16,
  },

  flex: {
    flex: 1,
  },

  gutter: {
    height: 100,
  },

  header: {
    flexDirection: 'row',
    marginBottom: 34,
  },

  header__content: {
    flex: 1,
  },

  header__icon: {
    width: 125,
    height: 125,
    borderRadius: 28,
    marginRight: 16,
  },

  header__title: {
    fontWeight: '500',
    fontSize: 24,
    color: '#000000',
    letterSpacing: -1.1,
  },

  header__subtitle: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.45)',
    letterSpacing: -0.33,
  },

  header__actions: {
    position: 'absolute',
    bottom: 1,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },

  inforow: {
    flexDirection: 'row',
    marginBottom: 15,
  },

  inforow__item: {
    flexDirection: 'column',
  },

  inforow__title: {
    fontWeight: '600',
    fontSize: 23,
    color: 'rgba(0, 0, 0, 0.45)',
    letterSpacing: -0.08,
  },

  inforow__subtitle: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.25)',
    letterSpacing: -0.08,
  },

  carousel: {
    marginHorizontal: -20,
  },

  screenshot: {
    height: 415,
    width: 225,
    borderRadius: 15,
    backgroundColor: '#EEE',
  },

});
