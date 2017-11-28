import React, { Component } from 'react';
import { StyleSheet, View, Animated, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';

/**
 * Collapsed Text
 * Shows text in collapsed state with one-time expanding button.
 * @todo Currently does not use nativeDriver as we're animating height.
 */
export default class CollapsedText extends Component {

  static propTypes = {
    children: PropTypes.node,
    numberOfLines: PropTypes.number,
    style: PropTypes.any,
    backgroundColor: PropTypes.string,
  }

  static defaultProps = {
    children: undefined,
    numberOfLines: 2,
    style: undefined,
    backgroundColor: 'white',
  }

  state = {
    isExpanded: false,
    maxHeight: 0,
    minHeight: 0,
  };

  @autobind
  onExpandedLayout(e) {
    this.setState({
      maxHeight: e.nativeEvent.layout.height,
    });
  }

  @autobind
  onCollapsedLayout(e) {
    const { height } = e.nativeEvent.layout;
    this.setState({
      minHeight: height,
    });
    this.height.setValue(height);
  }

  @autobind
  onPress() {
    const {
      maxHeight,
      minHeight,
    } = this.state;

    // Set expanded to true (or toggle)
    const isExpanded = !this.state.isExpanded;

    // Update state
    this.setState({ isExpanded });

    // Animate height
    Animated.spring(this.height, {
      toValue: isExpanded ? maxHeight : minHeight,
      bounciness: 0,
    }).start();
  }

  // Height animated value
  height = new Animated.Value(0);

  render() {
    const { isExpanded } = this.state;
    const {
      children,
      numberOfLines,
      style,
      backgroundColor,
    } = this.props;
    const hidden = { opacity: 0 };

    return (
      <View style={styles.host}>
        <Animated.View style={[styles.container, { height: this.height }]}>
          <Text
            style={[
              styles.allLines,
              styles.text,
              style,
              !isExpanded && hidden,
            ]}
            onLayout={this.onExpandedLayout}
          >
            {children}
          </Text>
          <Text
            style={[style, styles.text, isExpanded && hidden]}
            numberOfLines={numberOfLines}
            onLayout={this.onCollapsedLayout}
          >
            {children}
          </Text>
          {!isExpanded && (
            <View>
              <View style={styles.fadeHost}>
                <View
                  style={[
                    styles.fade,
                    { backgroundColor, shadowColor: backgroundColor },
                  ]}
                />
              </View>
              <TouchableOpacity onPress={this.onPress}>
                <Text style={styles.button}>more</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flexDirection: 'column',
  },

  container: {
    overflow: 'hidden',
    marginBottom: 2,
  },

  text: {
    fontFamily: 'SFProText-Regular',
    fontSize: 15,
    color: '#000000',
    letterSpacing: -0.24,
    lineHeight: 20,
  },

  allLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  fadeHost: {
    position: 'absolute',
    bottom: 0,
    right: -40,
    width: 140,
    height: 18,
    overflow: 'hidden',
  },

  fade: {
    position: 'absolute',
    right: 0,
    bottom: -20,
    width: 100,
    height: 70,
    shadowOffset: { width: -20, height: 0 },
    shadowColor: 'white',
    shadowRadius: 15,
    shadowOpacity: 1,
    backgroundColor: 'white',
  },

  button: {
    position: 'absolute',
    bottom: 1,
    right: 0,
    fontWeight: '500',
    fontSize: 15,
    color: '#0077FD',
    backgroundColor: 'transparent',
  },
});
