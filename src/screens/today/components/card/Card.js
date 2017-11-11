import React, { PureComponent } from 'react';
import { StyleSheet, Animated, View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';

const Strong = ({ children }) => (<Text style={styles.bold}>{children}</Text>);
Strong.propTypes = { children: PropTypes.node };
Strong.defaultProps = { children: undefined };

const CARD_COLLAPSED_HEIGHT = 400;
const CARD_EXPANDED_HEIGHT = 300;

export default class Card extends PureComponent {
  static propTypes = {
    onOpenChange: PropTypes.func,
    imageUrl: PropTypes.string,
    legend: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {
    onOpenChange: undefined,
    imageUrl: undefined,
    legend: undefined,
    title: undefined,
  }

  state = {
    isOpen: false,
    zIndex: 1,
    host: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
  };

  @autobind
  onLayout(e) {
    if (!this.layout) {
      this.layout = e.nativeEvent.layout;
      // Bug in React Native
      this.scrollRef._component.scrollTo({ y: -CARD_EXPANDED_HEIGHT, animated: false }); // eslint-disable-line no-underscore-dangle
    }
  }

  @autobind
  onPressIn() {
    if (this.state.isOpen) {
      return;
    }

    this.hostRef._component.measureInWindow((x, y) => { // eslint-disable-line no-underscore-dangle
      const { width, height } = Dimensions.get('window');
      this.setState({
        host: { x, y, width, height },
      });
    });

    // Show a little bouncy animation
    Animated.spring(this.scale, { toValue: 0.95 })
      .start();
  }

  @autobind
  onPressOut() {
    // Go back to original
    Animated.spring(this.scale, { toValue: 1 })
      .start();
  }

  @autobind
  onPress() {
    const { isOpen } = this.state;
    if (!isOpen) {
      this.setState({
        isOpen: !isOpen,
        zIndex: 3,
      });
      Animated.spring(this.cursor, { toValue: 1 }).start();
      // Animated.timing(this.cursor, { duration: 2500, toValue: 1 }).start();
    } else {
      this.setState({ isOpen: !isOpen, zIndex: 2 });
      this.scrollRef._component.scrollTo({ y: -CARD_EXPANDED_HEIGHT, animated: true }); // eslint-disable-line no-underscore-dangle
      Animated.spring(this.cursor, { toValue: 0 })
        .start(() => {
          this.setState({ zIndex: 1 });
        });
      // Animated.timing(this.cursor, { duration: 2500, toValue: 0 }).start();
    }
    this.props.onOpenChange(!isOpen);
  }

  scale = new Animated.Value(1);
  cursor = new Animated.Value(0);
  scrollY = new Animated.Value(0);

  render() {
    const { isOpen, zIndex } = this.state;
    const cursor = this.cursor;
    const animated = {
      host: {
        transform: [{
          translateY: cursor.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -this.state.host.y + 20],
          }),
        }, {
          translateX: cursor.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -this.state.host.x],
          }),
        }, {
          scale: this.scale,
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
        height: cursor.interpolate({
          inputRange: [0, 1],
          // TODO: Animate hero height
          outputRange: [CARD_COLLAPSED_HEIGHT, CARD_EXPANDED_HEIGHT],
        }),
        borderRadius: cursor.interpolate({
          inputRange: [0, 1],
          outputRange: [16, 0],
        }),
      },

      close: {
        opacity: cursor,
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
        backgroundColor: '#FFF',
        padding: 20,
        transform: [{
          translateY: cursor.interpolate({
            inputRange: [0, 1],
            outputRange: [-CARD_COLLAPSED_HEIGHT, 0],
          }),
        }, {
          scale: cursor.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1],
          }),
        }],
      },

    };

    if (this.layout) {
      animated.host.width = cursor.interpolate({
        inputRange: [0, 1],
        outputRange: [this.layout.width, this.state.host.width],
      });
      animated.host.height = cursor.interpolate({
        inputRange: [0, 1],
        outputRange: [this.layout.height, this.state.host.height],
      });
    }

    const { imageUrl, legend, title } = this.props;

    return (
      <View style={[styles.root, { zIndex }]}>
        <Animated.View
          ref={(ref) => { this.hostRef = ref; }}
          onLayout={this.onLayout}
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
            <Animated.View style={animated.content}>
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
                >
                  {legend && (
                    <Text style={styles.legend}>{String(legend || '').toLocaleUpperCase()}</Text>
                  )}
                  {title && (
                    <Text style={styles.title}>{title}</Text>
                  )}
                </Animated.Image>
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
    borderRadius: 16,
    height: CARD_COLLAPSED_HEIGHT,
    marginBottom: 30,

    shadowOffset: { width: 0, height: 15 },
    shadowColor: '#C5C5C5',
    shadowRadius: 30,
    shadowOpacity: 0.8,
  },

  content__text: {
    fontSize: 21,
    color: '#7E7E82',
    letterSpacing: -0.5,
    marginBottom: 30,
  },

  bold: {
    fontWeight: '500',
    color: '#000',
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
    backgroundColor: 'transparent',
    padding: 20,
    paddingTop: 42,
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
