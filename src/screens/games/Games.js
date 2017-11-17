import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { SPLASH_SCREEN, pushAppScreen } from 'screens';
import AppItemRow from 'components/app-item-row';
import AppItemSlider from 'components/app-item-slider';
import Heading from 'components/heading';
import Divider from 'components/divider';
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
    pushAppScreen(this.props.navigator, {
      backTitle: 'Games',
      iconUrl: 'https://placeimg.com/198/198/any?1=2',
      action: 'FREE',
      onActionPress() {},
      isActionLoading: false,
    });
  }

  render() {
    return (
      <ScrollView style={styles.host}>
        <Divider />
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
    padding: 18,
    marginTop: -50,
    paddingTop: 50,
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
