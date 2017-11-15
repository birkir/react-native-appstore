import React, { Component } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { inject } from 'mobx-react/native';
import Button from 'components/button';
import PropTypes from 'prop-types';

@inject('ui')
export default class AppButton extends Component {

  static propTypes = {
    ui: PropTypes.object.isRequired,
  }

  static defaultProps = {
  }

  render() {
    const opacity = this.props.ui.appScreenHeaderOpacity;
    const transform = [{
      translateY: opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [5, 0],
      }),
    }];

    return (
      <Animated.View style={[styles.host, { opacity, transform }]}>
        <Button blue horizontal align="right" subtitle="In-App Purchases">FREE</Button>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    marginRight: -10,
    width: 150,
    alignItems: 'flex-end',
  },
});
