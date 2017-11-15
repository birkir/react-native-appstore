import React, { Component } from 'react';
import { StyleSheet, Animated, View, ScrollView, Image } from 'react-native';
import { SPLASH_SCREEN, APP_SCREEN } from 'screens';
import AppItemRow from 'components/app-item-row';
import AppItemSlider from 'components/app-item-slider';
import Heading from 'components/heading';
import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';

export default class Games extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  static defaultProps = {
  }

  static navigatorStyle = {
    navBarNoBorder: true,
    navBarTransparent: true,
    drawUnderTabBar: true,
    prefersLargeTitles: true,
  }

  @autobind
  onAppGroupPress() {
    this.props.navigator.push({
      screen: SPLASH_SCREEN,
      title: 'Best New Updates',
    });
  }

  @autobind
  onAppPress() {
    this.props.navigator.push({
      screen: APP_SCREEN,
    });
  }

  scrollY = new Animated.Value(0);

  render() {
    return (
      <ScrollView style={styles.host} removeClippedSubviews={false}>
        <View style={styles.border} />
        <Heading action="See All" onActionPress={this.onAppGroupPress}>
          Best New Updates
        </Heading>
        <AppItemSlider>
          {Array.from({ length: 10 }).map((_, i) => (
            <AppItemRow
              key={`x-${i + 0}`}
              imageUrl={`https://placeimg.com/198/198/any?${Math.random()}`}
              title="Spark Email"
              subtitle="New exciting tournament game mode!"
              action="FREE"
              onPress={this.onAppPress}
            />
          ))}
        </AppItemSlider>

        <Heading action="See All" onActionPress={this.onTestPress}>In-App Purchases</Heading>
        <AppItemSlider itemsPerPage={2}>
          {Array.from({ length: 10 }).map((_, i) => (
            <AppItemRow
              key={`x-${i + 0}`}
              imageUrl={`https://placeimg.com/198/198/any?${Math.random()}`}
              title="Spark Email"
              subtitle="New exciting tournament game mode!"
              action="FREE"
            />
          ))}
        </AppItemSlider>

        <Heading action="See All">In-App Purchases</Heading>
        <AppItemSlider itemsPerPage={2}>
          {Array.from({ length: 10 }).map((_, i) => (
            <AppItemRow
              key={`x-${i + 0}`}
              imageUrl={`https://placeimg.com/198/198/any?${Math.random()}`}
              title="Spark Email"
              subtitle="New exciting tournament game mode!"
              action="FREE"
            />
          ))}
        </AppItemSlider>
        <View style={styles.gutter} />
        <View style={styles.user}>
          <Image source={require('images/UserIcon.png')} style={styles.user__image} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    padding: 16,
    marginTop: -50,
    paddingTop: 50,
  },

  border: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#CDCDCF',
  },

  gutter: {
    height: 200,
  },

  user: {
    position: 'absolute',
    top: -50,
    right: 0,
    width: 42,
    height: 42,
  },

  user__image: {
    tintColor: '#0077FD',
  },
});
