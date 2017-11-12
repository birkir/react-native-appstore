import React, { PureComponent } from 'react';
import { StyleSheet, Animated, View, Text, Dimensions, LayoutAnimation, TouchableWithoutFeedback } from 'react-native';
import { autobind } from 'core-decorators';
import Strong from 'components/strong';
import PropTypes from 'prop-types';
import AppItemRow from 'components/app-item-row';

// Transition helper method
const transition = (property, toValue, useNativeDriver = true) =>
  Animated.spring(property, { toValue, useNativeDriver });

// Layout animation config for width/height
const config = {
  ...LayoutAnimation.Presets.spring,
  duration: 700,
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.4,
  },
};

// Some static consts that may or may not be props.
const CARD_COLLAPSED_HEIGHT = 412;
const CARD_EXPANDED_HEIGHT = 492;

export default class Card extends PureComponent {

  static propTypes = {
    onOpenChange: PropTypes.func,
    imageUrl: PropTypes.string,
    legend: PropTypes.string,
    title: PropTypes.string,
    zIndex: PropTypes.number,
  }

  static defaultProps = {
    onOpenChange: undefined,
    imageUrl: undefined,
    legend: undefined,
    title: undefined,
    zIndex: 0,
  }

  state = {
    isOpen: false,
    host: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
  };

  @autobind
  onLayout() {
    if (!this.layout) {
      // Get initial width and height of card
      this.hostRef.measure((x, y, width, height) => {
        this.layout = {
          width,
          height,
        };
      });

      // Bug in React Native causes a scrollview to not
      // begin in it's Y position if contentInset.top is set.
      this.scrollRef._component.scrollTo({ // eslint-disable-line no-underscore-dangle
        y: -CARD_EXPANDED_HEIGHT,
        animated: false,
      });
    }
  }

  @autobind
  onPressIn() {
    if (this.state.isOpen) {
      return;
    }

    // Measure position of card in window
    this.hostRef.measureInWindow((x, y) => { // eslint-disable-line no-underscore-dangle
      const { width, height } = Dimensions.get('window');
      this.setState({
        host: { x, y, width, height },
      });
    });

    // Show a little bouncy animation
    transition(this.scale, 0.95).start();
  }

  @autobind
  onPressOut() {
    // Go back to original
    transition(this.scale, 1).start();
  }

  @autobind
  onPress() {
    // Extract properties from state
    const isOpen = !this.state.isOpen;
    // Configure next width/height layout animation
    LayoutAnimation.configureNext(config);
    // Update isOpen state
    this.setState({ isOpen });
    // Start main animation
    transition(this.cursorNative, Number(isOpen)).start();
    // Start border radius animation (Can't animate borderRadius on native driver)
    transition(this.borderRadius, isOpen ? 0 : 16, false).start();
    if (!isOpen) {
      // Scroll card to top
      this.scrollRef._component.scrollTo({ // eslint-disable-line no-underscore-dangle
        y: -CARD_EXPANDED_HEIGHT,
        animated: true,
      });
    }
    // Call onOpenChange function
    this.props.onOpenChange(this.props, isOpen);
  }

  // Animation values
  cursorNative = new Animated.Value(0);
  borderRadius = new Animated.Value(16);
  scrollY = new Animated.Value(0);
  scale = new Animated.Value(1);

  render() {
    // Extract needed properties from the class
    const { cursorNative, scale, state, props, layout } = this;
    const { imageUrl, legend, title, zIndex } = props;
    const { isOpen, host } = state;

    const animated = {
      host: {
        transform: [{
          translateY: cursorNative.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -host.y],
          }),
        }, {
          translateX: cursorNative.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -host.x],
          }),
        }, {
          scale,
        }],
      },

      card: {
        overflow: 'hidden',
        transform: [{
          translateY: this.scrollY.interpolate({
            inputRange: [-CARD_EXPANDED_HEIGHT, 0],
            outputRange: [0, -CARD_EXPANDED_HEIGHT],
            extrapolate: 'clamp',
          }),
        }],
      },

      image: {
        height: CARD_COLLAPSED_HEIGHT,
        borderRadius: this.borderRadius,
      },

      close: {
        opacity: cursorNative,
      },

      close__light: {
        opacity: 0.6,
      },

      close__dark: {
        opacity: this.scrollY.interpolate({
          inputRange: [-40, -30],
          outputRange: [0, 0.8],
          extrapolateRight: 'clamp',
        }),
      },

      content: {
        transform: [{
          translateY: cursorNative.interpolate({
            inputRange: [0, 1],
            outputRange: [-CARD_COLLAPSED_HEIGHT, 0],
          }),
        }, {
          scale: cursorNative.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1],
          }),
        }],
      },

    };

    if (layout) {
      // Wait until layout is calculated to set these dimensions
      animated.host.width = !isOpen ? layout.width : host.width;
      animated.host.height = !isOpen ? layout.height : host.height;
      animated.image.height = !isOpen ? CARD_COLLAPSED_HEIGHT : CARD_EXPANDED_HEIGHT;
    }

    return (
      <View
        style={[styles.root, { zIndex }]}
        ref={(ref) => { this.hostRef = ref; }}
      >
        <Animated.View
          style={[StyleSheet.absoluteFill, styles.host, animated.host]}
        >
          <Animated.ScrollView
            ref={(ref) => { this.scrollRef = ref; }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
              { useNativeDriver: true },
            )}
            contentInset={{ top: CARD_EXPANDED_HEIGHT }}
            scrollEventThrottle={16}
            scrollEnabled={this.state.isOpen}
            style={StyleSheet.absoluteFill}
          >
            <Animated.View style={[styles.content, animated.content]}>
              <Text style={styles.content__text}><Strong>Lorem ipsum dolor sit amet</Strong>, consectetur adipiscing elit. Praesent pretium mattis massa, non dictum leo imperdiet sed. Morbi vitae dolor luctus, dapibus dui a, elementum mi. Vivamus in commodo erat.</Text>
              <Text style={styles.content__text}>Praesent et volutpat erat, ac fermentum tortor. Sed id tristique enim. Ut eu odio lobortis, gravida justo in, pulvinar dolor. In eu ullamcorper leo. Phasellus faucibus lorem quis tristique gravida. Nulla efficitur libero at imperdiet iaculis. Morbi efficitur volutpat iaculis. Suspendisse laoreet condimentum lacinia. Maecenas eu justo euismod, porta turpis vitae, elementum est.</Text>
              <Text style={styles.content__text}>Nulla dignissim viverra lobortis. Nulla sollicitudin, justo et faucibus elementum, lectus nibh tristique ante, vel dapibus dui enim sit amet orci. Sed molestie ultricies varius. Proin risus justo, lacinia at suscipit in, commodo sed metus. Ut iaculis mi in ante accumsan, quis ultrices est tempor. Mauris eget iaculis augue, et iaculis magna. Sed congue neque consequat egestas imperdiet. Integer dictum tristique ante, eget volutpat odio gravida euismod. Nullam vel blandit nulla. Etiam imperdiet ut magna et varius. Duis porttitor consequat finibus. Vestibulum quis est at lacus venenatis ornare. Quisque nunc velit, pulvinar et eros elementum, ullamcorper viverra nulla. Nam efficitur ante purus, eget cursus magna dignissim sit amet. Morbi blandit dui pharetra magna tempor, et blandit libero interdum.</Text>
              <Text style={styles.content__text}>Etiam eleifend feugiat tortor, vel luctus massa. Aliquam lorem risus, dapibus ut luctus non, condimentum eget odio. Aenean venenatis arcu dapibus, blandit nunc eu, fringilla purus. Quisque dictum felis et orci eleifend, et ultricies diam ornare. Sed suscipit, neque quis semper malesuada, diam ex consectetur metus, vel hendrerit ex sapien eu justo. Nullam vehicula ex vel ipsum faucibus efficitur. Aenean magna metus, volutpat in laoreet et, ornare vestibulum neque. Nunc congue elit sed sapien dictum feugiat.</Text>
            </Animated.View>
          </Animated.ScrollView>
          <TouchableWithoutFeedback
            onPressIn={this.onPressIn}
            onPressOut={this.onPressOut}
            onPress={this.onPress}
            style={StyleSheet.absoluteFill}
          >
            <View pointerEvents={isOpen ? 'box-none' : 'auto'}>
              <Animated.View style={animated.card} pointerEvents="none">
                <Animated.Image
                  source={{ uri: imageUrl }}
                  resizeMode="cover"
                  style={[styles.image, animated.image]}
                  onLayout={this.onLayout}
                />
                <View style={[StyleSheet.absoluteFill, styles.image__content]}>
                  {legend && (
                    <Text style={styles.legend}>{String(legend || '').toLocaleUpperCase()}</Text>
                  )}
                  {title && (
                    <Text style={styles.title}>{title}</Text>
                  )}
                </View>
              </Animated.View>
              <TouchableWithoutFeedback onPress={this.onPress} pointerEvents="auto">
                <Animated.View style={[styles.close, animated.close]}>
                  <Animated.Image source={require('images/CloseIcon.png')} style={[StyleSheet.absoluteFill, animated.close__light]} />
                  <Animated.Image source={require('images/CloseIconBlack.png')} style={[StyleSheet.absoluteFill, animated.close__dark]} />
                </Animated.View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  root: {
    height: CARD_COLLAPSED_HEIGHT,
    marginBottom: 30,
  },

  host: {
    height: CARD_COLLAPSED_HEIGHT,
    marginBottom: 30,

    borderRadius: 16,

    shadowOffset: { width: 0, height: 10 },
    shadowColor: '#000',
    shadowRadius: 12,
    shadowOpacity: 0.25,
  },

  content: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  },

  content__text: {
    fontSize: 21,
    color: '#7E7E82',
    letterSpacing: -0.5,

    marginBottom: 30,
  },

  close: {
    position: 'absolute',
    top: 20,
    right: 20,

    width: 30,
    height: 30,

    opacity: 0.6,
  },

  image: {
    width: '100%',
    height: CARD_COLLAPSED_HEIGHT,
  },

  image__content: {
    padding: 20,
    paddingTop: 42,

    backgroundColor: 'transparent',
  },

  legend: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(246, 246, 246, 0.58)',
    letterSpacing: -0.8,

    marginBottom: 3,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#F6F6F6',
    letterSpacing: -0.3,

    maxWidth: 300,
  },

});
