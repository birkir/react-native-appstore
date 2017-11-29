import React, { PureComponent } from 'react';
import { StyleSheet, View, Animated, PanResponder } from 'react-native';
import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';

export default class Carousel extends PureComponent {
  static propTypes = {
    itemWidth: PropTypes.number,
    children: PropTypes.node,
    onSwipe: PropTypes.func,
    onSwipeEnd: PropTypes.func,
  }

  static defaultProps = {
    itemWidth: 100,
    children: undefined,
    onSwipe() {},
    onSwipeEnd() {},
  }

  state = {
    index: 0,
    width: 0,
  }

  componentWillMount() {
    this.childCount = React.Children.toArray(this.props.children).length;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        this.props.onSwipe();
        this.x = this.panX._value; // eslint-disable-line no-underscore-dangle
      },
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease,
      onPanResponderTerminate: this.onPanResponderRelease,
      onPanResponderTerminationRequest: () => true,
    });
  }

  @autobind
  onLayout(e) {
    const { itemWidth } = this.props;
    const { width } = e.nativeEvent.layout;
    if (!width || this.state.width === width) {
      return;
    }
    const maxWidth = (this.childCount * itemWidth) - (width - 30);
    this.setState({ width, maxWidth });
  }

  @autobind
  onPanResponderMove(e, { dx }) {
    const { maxWidth } = this.state;
    const toValue = this.x + dx;
    if (toValue > 0) {
      this.panX.setValue(toValue ** 0.75);
    } else if (-toValue > maxWidth) {
      this.panX.setValue(-maxWidth - ((-toValue - maxWidth) ** 0.75));
    } else {
      this.panX.setValue(toValue);
    }
  }

  @autobind
  onPanResponderRelease(e, { dx, vx }) {
    const {
      itemWidth,
    } = this.props;
    const {
      max,
      min,
      abs,
      sign,
    } = Math;

    const [vxa, dxa] = [vx, dx].map(abs);
    let pages = 0;

    if (vxa > 2) {
      // More than 200% velocity
      pages += 2;
    } else if (dxa > 0.5 && vxa < 1) {
      // More than 50% scrolled and more than 100% velocity
      pages += 1;
    } else if (dxa < 0.5 && vxa > 1) {
      // Less than 50% scrolled, but more than 100% velocity
      pages += 1;
    }

    // Sum index to pages with a threshold
    const index = max(0, min(this.childCount, this.state.index + (pages * -sign(vx))));
    // Update state
    this.setState({ index });
    // Scroll slider
    Animated.spring(this.panX, { toValue: (index * -itemWidth) + 30 }).start(() => {
      this.props.onSwipeEnd();
    });
  }

  panX = new Animated.Value(0);

  render() {
    const containerStyles = {
      flexDirection: 'row',
      transform: [{
        translateX: this.panX,
      }],
    };
    return (
      <View
        style={styles.host}
        onLayout={this.onLayout}
        {...this.panResponder.panHandlers}
      >
        <Animated.View style={containerStyles}>
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
