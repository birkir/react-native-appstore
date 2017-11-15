import React, { PureComponent } from 'react';
import { StyleSheet, View, Animated, Text, MaskedViewIOS, TouchableWithoutFeedback, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';

const WIDTH = 80;
const HEIGHT = 30;

export default class Button extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    onPress: PropTypes.func,
    subtitle: PropTypes.string,
    loading: PropTypes.bool,
    blue: PropTypes.bool,
    horizontal: PropTypes.bool,
    align: PropTypes.oneOf(['left', 'center', 'right']),
  };

  static defaultProps = {
    children: undefined,
    onPress: undefined,
    subtitle: undefined,
    loading: false,
    blue: false,
    horizontal: false,
    align: 'center',
  };

  componentWillReceiveProps(props) {
    if (this.props.loading !== props.loading) {
      this.loading(props.loading);
    }
  }

  @autobind
  onRotationEnd({ finished }) {
    if (!this.props.loading || !finished) {
      return;
    }
    // Update iteration counter
    this.rotationIteration += 1;
    // Animate spinner rotation
    Animated.timing(this.rotation, {
      toValue: this.rotationIteration,
      duration: 500,
      easing: Easing.linear,
    }).start(this.onRotationEnd);
  }

  get containerTranslateX() {
    const { align } = this.props;
    if (align === 'center') {
      return 25;
    } else if (align === 'right') {
      return 50;
    }
    return 0;
  }

  get contentTranslateX() {
    const { align } = this.props;
    if (align === 'right') {
      return 25;
    } else if (align === 'left') {
      return -25;
    }
    return 0;
  }

  @autobind
  loading(isLoading) {
    // Reset rotation iteration count
    this.rotationIteration = 0;
    // Set animation to-value.
    const toValue = Number(isLoading);
    // Create parallel animation object
    const animation = Animated.parallel([
      Animated.timing(this.cursor, { toValue, duration: 260 }),
      Animated.timing(this.spinner, { toValue, duration: 260 }),
    ]);
    if (isLoading) {
      // Start animation with callback for spinner
      animation.start(this.onRotationEnd);
    } else {
      // Reset spinner rotation
      this.rotation.setValue(0);
      this.rotation.stopAnimation();
      // Start animation
      animation.start();
    }
  }

  // Animation values
  cursor = new Animated.Value(0);
  rotation = new Animated.Value(0);
  spinner = new Animated.Value(0);

  // Rotation iteration count
  rotationIteration = 0;

  render() {
    const {
      children,
      blue,
      subtitle,
      horizontal,
      align,
    } = this.props;

    const circle = (typeof children === 'string' && children === '...');

    const animated = {
      spinner: {
        transform: [{
          translateY: this.spinner.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0],
          }),
        }, {
          translateX: this.spinner.interpolate({
            inputRange: [0, 1],
            outputRange: [0, HEIGHT / 2],
          }),
        }],
      },
      rotate: {
        opacity: this.spinner.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
      mask: {
        transform: [{
          rotate: this.rotation.interpolate({
            inputRange: [0, 1.5],
            outputRange: ['0deg', '360deg'],
          }),
        }],
      },
      container: {
        transform: [{
          translateX: this.cursor.interpolate({
            inputRange: [0, 1],
            outputRange: [0, this.containerTranslateX],
          }),
        }],
        width: this.cursor.interpolate({
          inputRange: [0, 1],
          outputRange: [circle ? HEIGHT : WIDTH, HEIGHT],
        }),
      },
      background: {
        opacity: this.cursor.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0],
        }),
      },
      content: {
        opacity: this.cursor.interpolate({
          inputRange: [0.5, 1],
          outputRange: [1, 0],
        }),
        transform: [{
          translateX: this.cursor.interpolate({
            inputRange: [0, 1],
            outputRange: [0, this.contentTranslateX],
          }),
        }],
      },
    };

    // Spinner mask
    const spinnerMask = (
      <Animated.View style={[animated.mask, styles.flex]}>
        <Animated.View style={[animated.spinner, styles.spinner__mask]} />
        <View style={styles.spinner__left} />
        <View style={styles.spinner__center} />
        <View style={styles.spinner__right} />
      </Animated.View>
    );

    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={[styles.host, circle && styles.host__circle]}>
          <Animated.View style={[styles.container, animated.container]}>
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                styles.background, blue && styles.background__blue,
                animated.background,
              ]}
            />
            <Animated.View style={[styles.flex, animated.rotate]}>
              <MaskedViewIOS style={styles.flex} maskElement={spinnerMask}>
                <View style={styles.spinner} />
              </MaskedViewIOS>
            </Animated.View>
          </Animated.View>
          <Animated.View style={[StyleSheet.absoluteFill, styles.content, animated.content]}>
            <Text
              style={[
                styles.content__text,
                blue && styles.content__text__blue,
                animated.text,
              ]}
            >
              {children}
            </Text>
            {subtitle && (
              <Text
                style={[
                  styles.content__subtitle,
                  horizontal && styles.content__subtitle__horizontal,
                  align === 'right' && styles.content__subtitle__right,
                ]}
              >
                {subtitle}
              </Text>
            )}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    width: WIDTH,
    height: HEIGHT,
  },

  host__circle: {
    width: HEIGHT,
  },

  flex: {
    flex: 1,
  },

  spinner: {
    flex: 1,
    borderRadius: HEIGHT / 2,
    borderWidth: 2,
    borderColor: '#EAE9EF',
  },

  spinner__mask: {
    position: 'absolute',
    top: -HEIGHT / 2,
    left: HEIGHT / 2,

    width: HEIGHT / 2,
    height: HEIGHT,

    backgroundColor: 'black',
  },

  spinner__left: {
    width: HEIGHT / 2,
    height: WIDTH,

    backgroundColor: 'black',
  },

  spinner__center: {
    position: 'absolute',

    width: HEIGHT / 2,
    height: WIDTH - (HEIGHT / 2),

    top: HEIGHT / 2,
    left: HEIGHT / 2,

    backgroundColor: 'black',
  },

  spinner__right: {
    position: 'absolute',

    top: 0,
    left: HEIGHT,

    height: WIDTH,
    width: WIDTH,

    backgroundColor: 'black',
  },

  container: {
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
  },

  background: {
    borderRadius: HEIGHT / 2,
    backgroundColor: '#F1F0F7',
  },

  background__blue: {
    backgroundColor: '#0077FD',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content__text: {
    fontWeight: '600',
    fontSize: 16,
    color: '#0077FD',
    letterSpacing: -0.4,
    backgroundColor: 'transparent',
  },

  content__text__blue: {
    color: '#FFFFFF',
  },

  // Arbitary numbers... sorry
  content__subtitle: {
    position: 'absolute',
    top: 34,
    fontSize: 9,
    color: 'rgba(0, 0, 0, 0.4)',
    letterSpacing: 0,
    lineHeight: 10,
    backgroundColor: 'transparent',
  },

  // Arbitary numbers... sorry
  content__subtitle__horizontal: {
    left: 86,
    top: 4,
    width: 50,
  },

  content__subtitle__right: {
    textAlign: 'right',
    left: 'auto',
    right: 86,
  },
});
