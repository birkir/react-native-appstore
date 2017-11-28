import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Animated, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import Divider from 'components/divider';
import { autobind } from 'core-decorators';

export default class InfoRow extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    label: PropTypes.string,
    value: PropTypes.string,
    icon: PropTypes.any,
    onPress: PropTypes.func,
    link: PropTypes.bool,
    divider: PropTypes.bool,
  }

  static defaultProps = {
    children: undefined,
    label: undefined,
    value: undefined,
    icon: undefined,
    onPress: undefined,
    link: false,
    divider: true,
  }

  state = {
    height: 0,
    valueWidth: 0,
    valueOverflowWidth: 0,
  }

  @autobind
  onPress() {
    const { valueWidth, valueOverflowWidth } = this.state;
    const { onPress, children } = this.props;
    const isExpandable = children || valueWidth > valueOverflowWidth;
    if (isExpandable) {
      Animated.spring(this.cursor, { toValue: 1 }).start();
    }
    if (onPress) {
      onPress(this.props);
    }
  }

  @autobind
  onValueLayout(e) {
    this.setState({
      valueWidth: e.nativeEvent.layout.width,
    });
  }

  @autobind
  onValueOverflowLayout(e) {
    this.setState({
      valueOverflowWidth: e.nativeEvent.layout.width,
    });
  }

  @autobind
  onContentLayout(e) {
    this.setState({
      height: e.nativeEvent.layout.height,
    });
  }

  cursor = new Animated.Value(0);

  render() {
    const {
      children,
      label,
      value,
      icon,
      link,
      divider,
    } = this.props;

    const {
      height,
      valueWidth,
      valueOverflowWidth,
    } = this.state;

    const isExpandable = children || valueWidth > valueOverflowWidth;
    const animated = {
      value: {
        opacity: this.cursor.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0],
        }),
      },
      content: {
        height: this.cursor.interpolate({
          inputRange: [0, 1],
          outputRange: [0, height],
        }),
      },
    };
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={styles.host}>
          <View style={styles.row}>
            <Text style={[styles.label, link && styles.label__link]}>{label}</Text>
            <Animated.Text
              style={[styles.value, animated.value]}
              numberOfLines={1}
              onLayout={this.onValueOverflowLayout}
            >
              {value}
            </Animated.Text>
            {isExpandable && (
              <Animated.View style={[styles.dropdown, animated.value]}>
                <View style={styles.dropdown__arrow} />
              </Animated.View>
            )}
            {!children && (
              <Text
                style={[styles.value, styles.value__calculated]}
                onLayout={this.onValueLayout}
              >
                {value}
              </Text>
            )}
            {icon}
          </View>
          <Animated.View style={[styles.content, animated.content]}>
            <View onLayout={this.onContentLayout} style={styles.content__inner}>
              {children || (
                <Text>{value}</Text>
              )}
            </View>
          </Animated.View>
          {divider && <Divider />}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

// Simple InfoRow key,value item
InfoRow.Item = ({ label, value }) => <Text>{label}: {value}</Text>;
InfoRow.Item.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};
InfoRow.Item.defaultProps = {
  label: undefined,
  value: undefined,
};


const styles = StyleSheet.create({
  host: {
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },

  label: {
    fontFamily: 'SFProText-Regular',
    fontSize: 15,
    color: '#8A8A8F',
    letterSpacing: -0.24,
    lineHeight: 20,
    marginRight: 30,
  },

  label__link: {
    color: '#007AFF',
  },

  value: {
    flex: 1,
    fontFamily: 'SFProText-Regular',
    fontSize: 15,
    color: '#000000',
    letterSpacing: -0.24,
    lineHeight: 20,
    textAlign: 'right',
  },

  value__calculated: {
    position: 'absolute',
    opacity: 0,
  },

  content: {
    overflow: 'hidden',
  },

  content__inner: {
    position: 'absolute',
    paddingBottom: 16,
  },

  dropdown: {
    paddingTop: 5,
    paddingLeft: 10,
  },

  dropdown__arrow: {
    width: 8,
    height: 8,
    borderColor: '#8A8A8F',
    borderTopWidth: 2,
    borderLeftWidth: 2,
    transform: [{
      rotate: '-135deg',
    }],
  },
});
