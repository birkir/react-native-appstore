import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Divider from 'components/divider';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import { SCREENSHOT_SCREEN } from 'screens';

export default class Screenshots extends PureComponent {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    data: PropTypes.array,
  }

  static defaultProps = {
    data: {},
  }

  state = {
    width: Dimensions.get('window').width,
  }

  @autobind
  onLayout() {
    this.setState({
      width: Dimensions.get('window').width,
    });
  }

  @autobind
  onScreenshotPress(index) {
    // Make the navbar transparent to hide the border
    this.props.navigator.setStyle({ navBarTransparent: true });
    // Fire up an modal with correct screenshot selected
    this.props.navigator.showModal({
      screen: SCREENSHOT_SCREEN,
      passProps: {
        index,
        screenshots: this.props.data[0].screenshots,
      },
    });
  }

  @autobind
  renderItem({ index }) {
    const paddingLeft = index === 0 ? 20 : 5;
    return (
      <TouchableWithoutFeedback onPress={() => this.onScreenshotPress(index)}>
        <View style={[styles.screenshot, { paddingLeft }]}>
          <View style={styles.screenshot__mock}>
            <Text style={styles.screenshot__text}>{index}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { width } = this.state;
    return (
      <View style={styles.host} onLayout={this.onLayout}>
        <View style={styles.slider}>
          <Carousel
            data={this.props.data[0].screenshots}
            renderItem={this.renderItem}
            sliderWidth={width}
            itemWidth={234}
            activeSlideAlignment="start"
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
          />
        </View>
        <Text style={styles.offering}>Offers iPhone App</Text>
        <Divider />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
  },

  slider: {
    marginHorizontal: -20,
  },

  screenshot: {
    paddingHorizontal: 5,
  },

  screenshot__mock: {
    height: 415,
    width: 225,
    borderRadius: 15,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  screenshot__text: {
    fontSize: 22,
    color: '#AAA',
  },

  offering: {
    fontFamily: 'SFProText-Regular',
    fontWeight: '500',
    fontSize: 13,
    color: '#8E8E93',
    letterSpacing: -0.1,
    paddingTop: 8,
    paddingBottom: 16,
  },
});
