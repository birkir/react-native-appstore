import React, { Component } from 'react';
import { StyleSheet, ScrollView, Animated, View } from 'react-native';
import { SPLASH_SCREEN } from 'screens';
import AppItemRow from 'components/app-item-row';
import AppItemSlider from 'components/app-item-slider';
import SectionHeader from 'components/section-header';
import Heading from 'components/heading';
import { inject, observer } from 'mobx-react/native';
import { observable } from 'mobx';
import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';

@inject('ui')
@observer
export default class Games extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
  }

  static defaultProps = {
  }

  static navigatorStyle = {
    navBarNoBorder: true,
    drawUnderTabBar: true,
  }

  state = {
    loading: true,
  };

  componentWillMount() {
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  componentDidMount() {
    this.props.navigator.showLightBox({ screen: 'navbar' });
    this.scrollY.addListener(this.onScroll);
  }

  componentWillUnmount() {
    this.scrollY.removeAllListeners();
  }

  @autobind
  onNavigatorEvent(e) {
    const { navigator } = this.props;
    const { type, id } = e;

    if (id === 'willDisappear') {
      if (this.props.ui.navBar) {
        this.props.ui.navBar.close();
      }
    }

    if (id === 'willAppear') {
      this.props.navigator.showLightBox({ screen: 'navbar' });
    }
  }

  @autobind
  onScroll({ value }) {
    this.props.ui.navBarVisible = (value <= 55);
  }

  @autobind
  onTestPress() {
    this.props.navigator.push({
      screen: SPLASH_SCREEN,
      title: 'Best New Updates'
    });
  }

  scrollY = new Animated.Value(0);

  render() {
    return (
      <Animated.ScrollView
        style={styles.host}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
      >
        <SectionHeader title="Games" />
        <Heading action="See All" onActionPress={this.onTestPress}>
          Best New Updates
        </Heading>
        <AppItemSlider>
          {Array.from({ length: 10 }).map((_, i) => (
            <AppItemRow
              key={`x-${i + 0}`}
              imageUrl="https://cdn.dribbble.com/users/40433/screenshots/3709382/untitled-1.png"
              title="Spark Email"
              subtitle="New exciting tournament game mode!"
              action="FREE"
            />
          ))}
        </AppItemSlider>

        <Heading action="See All" onActionPress={this.onTestPress}>In-App Purchases</Heading>
        <AppItemSlider itemsPerPage={2}>
          {Array.from({ length: 10 }).map((_, i) => (
            <AppItemRow
              key={`x-${i + 0}`}
              imageUrl="https://cdn.dribbble.com/users/40433/screenshots/3709382/untitled-1.png"
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
              imageUrl="https://cdn.dribbble.com/users/40433/screenshots/3709382/untitled-1.png"
              title="Spark Email"
              subtitle="New exciting tournament game mode!"
              action="FREE"
            />
          ))}
        </AppItemSlider>
        <View style={styles.gutter} />
      </Animated.ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    padding: 20,
  },

  gutter: {
    height: 200,
  },
});
