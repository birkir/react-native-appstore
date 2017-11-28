import React, { PureComponent } from 'react';
import { StyleSheet, View, Animated, PanResponder } from 'react-native';
import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';

export default class Carousel extends PureComponent {
  static propTypes = {
    itemWidth: PropTypes.number,
    children: PropTypes.node,
  }

  static defaultProps = {
    itemWidth: 100,
    children: undefined,
  }

  state = {
    x: 0,
    width: 0,
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
      onPanResponderRelease: this.onPanResponderRelease,
      onPanResponderTerminate: this.onPanResponderRelease,
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderMove: this.onPanResponderMove,
    });
  }

  @autobind
  onLayout(e) {
    const { width } = e.nativeEvent.layout;
    if (!width || this.state.width === width) {
      return;
    }
    this.setState({ width });
  }

  onMoveShouldSetPanResponder(e, { dx, dy }) {
    return Math.abs(dx * 4) > Math.abs(dy);
  }

  @autobind
  onPanResponderRelease(e, { dx }) {
    const { itemWidth, children } = this.props;
    const { x, width } = this.state;
    const { round, max, min } = Math;
    const offsetX = round(-(dx + x) / itemWidth) * itemWidth;
    const toValue = -max(0, min(((React.Children.toArray(children).length * itemWidth) - (width - 30)), offsetX));
    Animated.spring(this.scrollX, { toValue }).start();
  }

  @autobind
  onPanResponderGrant() {
    this.setState({ x: this.scrollX._value }); // eslint-disable-line no-underscore-dangle
  }

  @autobind
  onPanResponderMove(e, { dx }) {
    const { itemWidth, children } = this.props;
    const { x, width } = this.state;
    const maxWidth = (React.Children.toArray(children).length * itemWidth) - (width - 30);
    const toValue = x + dx;
    if (toValue > 0) {
      this.scrollX.setValue(toValue ** 0.75);
    } else if (-toValue > maxWidth) {
      this.scrollX.setValue(-maxWidth - ((-toValue - maxWidth) ** 0.75));
    } else {
      this.scrollX.setValue(toValue);
    }
  }

  scrollX = new Animated.Value(0);

  render() {
    return (
      <View
        style={styles.host}
        onLayout={this.onLayout}
        {...this.panResponder.panHandlers}
      >
        <Animated.View style={{ flexDirection: 'row', transform: [{ translateX: this.scrollX }] }}>
          {this.props.children}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
