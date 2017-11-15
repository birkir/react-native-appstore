import React, { Component } from 'react';
import { StyleSheet, Dimensions, Animated, Image } from 'react-native';
import { inject } from 'mobx-react/native';
import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';

console.ignoredYellowBox = ['RCTBatchedBridge is deprecated'];

@inject('ui')
export default class Toolbar extends Component {

  static propTypes = {
    ui: PropTypes.object.isRequired,
    iconUrl: PropTypes.string,
  }

  static defaultProps = {
    iconUrl: undefined,
  }

  state = {
    containerWidth: 0,
    deviceWidth: 0,
  }

  @autobind
  onLayout(e) {
    const { nativeEvent } = e;
    const containerWidth = nativeEvent.layout.width;
    const deviceWidth = Dimensions.get('window').width;
    this.setState({
      containerWidth,
      deviceWidth,
    });
  }

  render() {
    const { iconUrl } = this.props;
    const { containerWidth, deviceWidth } = this.state;
    const rightWidth = 150 + 5;

    // What will the offset be...
    const leftWidth = (deviceWidth - containerWidth - rightWidth);
    const paddingLeft = rightWidth - leftWidth;

    // Animated opacity
    const opacity = this.props.ui.appScreenHeaderOpacity;
    const transform = [{
      translateY: opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [5, 0],
      }),
    }];

    return (
      <Animated.View
        style={[styles.host, { paddingLeft, opacity, transform }]}
        onLayout={this.onLayout}
      >
        <Image source={{ uri: iconUrl }} style={styles.icon} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    height: 30,
    width: 30,
    borderRadius: 8,
    backgroundColor: '#EEE',
  },
});
