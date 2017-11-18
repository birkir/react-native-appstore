import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { SPLASH_SCREEN, pushAppScreen } from 'screens';
import AppItemRow from 'components/app-item-row';
import AppItemSlider from 'components/app-item-slider';
import AppItemFeatured from 'components/app-item-featured';
import Heading from 'components/heading';
import ListItem from 'components/list-item';
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
        <View style={styles.user}>
          <Image source={require('images/UserIcon.png')} style={styles.user__image} />
        </View>
        <Divider />
        <AppItemSlider>
          {Array.from({ length: 10 }).map((_, i) => (
            <AppItemFeatured
              key={`x-${i + 0}`}
              imageUrl={`https://placeimg.com/198/198/any?${Math.random()}`}
              legend="NEW GAME"
              title="Injustice 2"
              subtitle="When iconic superheroes"
              action="FREE"
              onPress={this.onAppPress}
            />
          ))}
        </AppItemSlider>

        <Heading action="See All" onActionPress={this.onAppGroupPress}>
          Great on iPhone X
        </Heading>
        <AppItemSlider itemsPerPage={3}>
          {Array.from({ length: 10 }).map((_, i) => (
            <AppItemRow
              key={`x-${i + 0}`}
              imageUrl={`https://placeimg.com/198/198/any?${Math.random()}`}
              title="Spark Email"
              subtitle="New exciting tournament game mode!"
              action="GET"
              onPress={this.onAppPress}
            />
          ))}
        </AppItemSlider>

        <Heading action="See All" onActionPress={this.onTestPress}>
          New Games We Love
        </Heading>
        <AppItemSlider itemsPerPage={3}>
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

        <Heading action="See All">
          Great for Game Night
        </Heading>
        <AppItemSlider itemsPerPage={1}>
          {Array.from({ length: 10 }).map((_, i) => (
            <AppItemRow
              key={`x-${i + 0}`}
              legend="Interperet visions, solve mysteries"
              screenshotUrl={`https://placeimg.com/335/215/any?${Math.random()}`}
              imageUrl={`https://placeimg.com/198/198/any?${Math.random()}`}
              title="Spark Email"
              subtitle="New exciting tournament game mode!"
              action="FREE"
            />
          ))}
        </AppItemSlider>

        <Heading action="See All">
          Top Paid
        </Heading>
        <AppItemSlider itemsPerPage={3}>
          {Array.from({ length: 10 }).map((_, i) => (
            <AppItemRow
              key={`x-${i + 0}`}
              index={i + 1}
              imageUrl={`https://placeimg.com/198/198/any?${Math.random()}`}
              title="Spark Email"
              subtitle="New exciting game that will be cool"
              action={`$${(Math.random() * 2.99).toFixed(2)}`}
            />
          ))}
        </AppItemSlider>

        <Heading action="See All">
          Top Free
        </Heading>
        <AppItemSlider itemsPerPage={3}>
          {Array.from({ length: 10 }).map((_, i) => (
            <AppItemRow
              key={`x-${i + 0}`}
              index={i + 1}
              imageUrl={`https://placeimg.com/198/198/any?${Math.random()}`}
              title="Spark Email"
              subtitle="New exciting game that will be cool"
              action="GET"
            />
          ))}
        </AppItemSlider>

        <Heading action="See All">
          Top Categories
        </Heading>
        <View>
          <ListItem label="AR Games" onPress={() => {}} />
          <ListItem label="Action" />
          <ListItem label="Arcade" />
          <ListItem label="Indie" />
          <ListItem label="Puzzle" />
          <ListItem label="Kids" divider={false} />
        </View>

        <View style={styles.gutter} />
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
