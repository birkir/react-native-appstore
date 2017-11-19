import React, { PureComponent } from 'react';
import { StyleSheet, View, Animated, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import Divider from 'components/divider';

export default class ListItem extends PureComponent {

  static propTypes = {
    label: PropTypes.string,
    color: PropTypes.object,
    underlayColor: PropTypes.string,
    onPress: PropTypes.func,
    divider: PropTypes.bool,
  }

  static defaultProps = {
    label: undefined,
    color: undefined,
    underlayColor: '#BCBBC1',
    onPress: undefined,
    divider: true,
  }

  render() {
    const {
      label,
      color,
      underlayColor,
      onPress,
      divider,
    } = this.props;

    return (
      <View style={styles.host}>
        <TouchableHighlight
          onPress={onPress}
          disabled={!onPress}
          underlayColor={underlayColor}
          style={styles.touchable}
        >
          <Animated.Text style={[styles.text, { color }]}>
            {label}
          </Animated.Text>
        </TouchableHighlight>
        {divider && <Divider />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
  },

  touchable: {
    flex: 1,
    marginHorizontal: -20,
    marginBottom: -1,
  },

  text: {
    fontFamily: 'SFProText-Regular',
    fontSize: 17,
    color: '#000000',
    letterSpacing: -0.41,
    lineHeight: 22,
    paddingVertical: 11,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
  },
});
