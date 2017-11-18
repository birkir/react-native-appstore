import React, { PureComponent } from 'react';
import { StyleSheet, Animated, View, Text, Image, Dimensions, LayoutAnimation, TouchableWithoutFeedback } from 'react-native';
import { autobind } from 'core-decorators';
import Button from 'components/button';
import AppItemRow from 'components/app-item-row';
import { VibrancyView } from 'react-native-blur';
import PropTypes from 'prop-types';

// Transition helper method
const transition = (property, toValue, useNativeDriver = true) =>
  Animated.spring(property, { toValue, useNativeDriver, bounciness: 0 });

// Layout animation config for width/height
const config = {
  ...LayoutAnimation.Presets.spring,
  duration: 700,
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.8,
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
    subtitle: PropTypes.string,
    frosted: PropTypes.bool,
    hero: PropTypes.bool,
    app: PropTypes.object,
    apps: PropTypes.arrayOf(PropTypes.object),
    zIndex: PropTypes.number,
    children: PropTypes.node,
    light: PropTypes.bool,
  }

  static defaultProps = {
    onOpenChange: undefined,
    imageUrl: undefined,
    legend: undefined,
    frosted: false,
    hero: false,
    title: undefined,
    subtitle: undefined,
    app: undefined,
    apps: undefined,
    zIndex: 0,
    children: undefined,
    light: false,
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
      // TODO: Find out why onLayout doesn't give us any width or height
      // Hardcoded width for now.
      const { width } = Dimensions.get('window');
      this.layout = {
        width: width - 40,
        height: CARD_COLLAPSED_HEIGHT,
      };

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
        host: {
          x, y, width, height,
        },
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
    const {
      cursorNative,
      scale,
      state,
      layout,
    } = this;

    const {
      imageUrl,
      legend,
      frosted,
      hero,
      title,
      subtitle,
      app,
      apps,
      zIndex,
      children,
      light,
    } = this.props;

    const {
      isOpen,
      host,
    } = state;

    const dark = !imageUrl || frosted || light;

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

      apps__cover: {
        opacity: cursorNative.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0],
        }),
      },

    };

    if (layout) {
      // Wait until layout is calculated to set these dimensions
      animated.host.width = !isOpen ? layout.width : host.width;
      animated.host.height = !isOpen ? layout.height : host.height;
      animated.image.height = !isOpen ? CARD_COLLAPSED_HEIGHT : CARD_EXPANDED_HEIGHT;
    }

    const opacity = layout ? 1 : 0;
    const Frosted = frosted ? VibrancyView : View;

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
            style={[StyleSheet.absoluteFill, { opacity }]}
          >
            <Animated.View style={[styles.content, animated.content]}>
              {React.Children.map(children, child => React.cloneElement(child, {
                style: styles.content__text,
              }))}
            </Animated.View>
          </Animated.ScrollView>
          <TouchableWithoutFeedback
            onPressIn={this.onPressIn}
            onPressOut={this.onPressOut}
            onPress={this.onPress}
            style={StyleSheet.absoluteFill}
          >
            <View pointerEvents={isOpen ? 'box-none' : 'auto'}>
              <Animated.View style={[styles.card, animated.card]} pointerEvents="none">
                <Animated.Image
                  source={{ uri: imageUrl }}
                  resizeMode="cover"
                  style={[styles.image, animated.image]}
                  onLayout={this.onLayout}
                />
                <View
                  style={[
                    StyleSheet.absoluteFill,
                    styles.image__content,
                    isOpen && styles.image__content__open,
                  ]}
                >
                  {hero ? (
                    <View style={styles.hero}>
                      <Image source={{ uri: app.imageUrl }} style={styles.hero__icon} />
                      <Text style={styles.hero__text}>
                        {String(title || '').toLocaleUpperCase()}
                      </Text>
                    </View>
                  ) : (
                    <Frosted
                      style={[frosted && styles.frosted]}
                      blurAmount={15}
                      blurType="light"
                    >
                      {legend && (
                        <Text style={[styles.legend, dark && styles.dark]}>
                          {String(legend || '').toLocaleUpperCase()}
                        </Text>
                      )}
                      {title && (
                        <Text style={[styles.title, dark && styles.dark]}>
                          {title}
                        </Text>
                      )}
                    </Frosted>
                  )}
                  {apps ? (
                    <View style={styles.apps}>
                      {apps.map(appItem => (
                        <AppItemRow
                          key={Math.random()}
                          compact
                          {...appItem}
                        />
                      ))}
                    </View>
                  ) : (
                    <View style={styles.flex} />
                  )}
                  {app && (
                    <View style={styles.hero__app}>
                      <View style={styles.hero__appsummary}>
                        <Text
                          style={[styles.hero__apptitle, dark && styles.dark]}
                          numberOfLines={2}
                        >
                          {app.title}
                        </Text>
                        <Text
                          style={[styles.hero__appsubtitle, dark && styles.dark]}
                          numberOfLines={1}
                        >
                          {app.subtitle}
                        </Text>
                      </View>
                      <Button
                        onPress={app.onActionPress}
                        subtitle={app.actionSubtitle}
                        loading={app.isActionLoading}
                        align="right"
                      >
                        {app.action}
                      </Button>
                    </View>
                  )}

                  {subtitle && (
                    <Text style={styles.subtitle}>{subtitle}</Text>
                  )}

                  {apps && (
                    <Animated.View
                      style={[styles.apps__cover, animated.apps__cover]}
                      pointerEvents="none"
                    />
                  )}
                </View>
              </Animated.View>
              <TouchableWithoutFeedback onPress={this.onPress} pointerEvents="auto">
                <Animated.View style={[styles.close, animated.close]}>
                  <Animated.Image
                    source={require('images/CloseIcon.png')}
                    style={[StyleSheet.absoluteFill, animated.close__light]}
                  />
                  <Animated.Image
                    source={require('images/CloseIconBlack.png')}
                    style={[StyleSheet.absoluteFill, animated.close__dark]}
                  />
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

  flex: {
    flex: 1,
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
    fontFamily: 'SFProText-Regular',
    fontSize: 19,
    color: '#000000',
    letterSpacing: -0.49,
    marginBottom: 20,
  },

  close: {
    position: 'absolute',
    top: 20,
    right: 20,

    width: 30,
    height: 30,

    opacity: 0.6,
  },

  apps: {
    paddingTop: 32,
  },

  apps__cover: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    height: 44,
    backgroundColor: 'white',
  },

  image: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: CARD_COLLAPSED_HEIGHT,
  },

  image__content: {
    padding: 20,
    paddingTop: 25,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },

  image__content__open: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },

  legend: {
    fontFamily: 'SFProText-Semibold',
    fontSize: 15,
    color: '#FFFFFF',
    letterSpacing: -0.24,
    lineHeight: 14,
    backgroundColor: 'transparent',
    opacity: 0.7,
    marginBottom: 3,
  },

  title: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 28,
    color: '#FFFFFF',
    letterSpacing: 0.34,
    lineHeight: 34,
    maxWidth: 240,
    backgroundColor: 'transparent',
  },

  subtitle: {
    fontFamily: 'SFProText-Regular',
    fontSize: 15,
    color: '#FFFFFF',
    letterSpacing: -0.24,
    backgroundColor: 'transparent',
  },

  frosted: {
    backgroundColor: 'rgba(255, 255, 255, 0.33)',
    margin: -20,
    marginTop: -25,
    padding: 20,
  },

  dark: {
    color: '#000000',
  },

  hero: {
    flex: 1,
  },

  hero__text: {
    fontFamily: 'SFProDisplay-Heavy',
    fontSize: 54,
    color: '#FFFFFF',
    letterSpacing: 0.23,
    lineHeight: 44,
    maxWidth: 190,
    paddingTop: 10,
    backgroundColor: 'transparent',
  },

  hero__icon: {
    width: 88,
    height: 88,
    borderRadius: 16,
    marginBottom: 29,
  },

  hero__app: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  hero__appsummary: {
    flex: 1,
    paddingRight: 20,
  },

  hero__apptitle: {
    fontFamily: 'SFProText-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: -0.41,
    lineHeight: 22,
    backgroundColor: 'transparent',
  },

  hero__appsubtitle: {
    fontFamily: 'SFProText-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    letterSpacing: -0.24,
    backgroundColor: 'transparent',
  },
});
