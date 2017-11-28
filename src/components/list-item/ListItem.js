import React, { PureComponent } from 'react';
import { StyleSheet, View, Animated, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import Divider from 'components/divider';

export default class ListItem extends PureComponent {

  static propTypes = {
    label: PropTypes.string,
    fontStyle: PropTypes.any,
    underlayColor: PropTypes.string,
    onPress: PropTypes.func,
    divider: PropTypes.bool,
    leftComponent: PropTypes.node,
  }

  static defaultProps = {
    label: undefined,
    fontStyle: undefined,
    underlayColor: '#BCBBC1',
    onPress: undefined,
    divider: true,
    leftComponent: undefined,
  }

  render() {
    const {
      label,
      fontStyle,
      underlayColor,
      onPress,
      divider,
      leftComponent,
    } = this.props;

    return (
      <View style={styles.host}>
        <TouchableHighlight
          onPress={onPress}
          disabled={!onPress}
          underlayColor={underlayColor}
          style={styles.touchable}
        >
          <View style={styles.content}>
            {leftComponent}
            <Animated.Text style={[styles.text, fontStyle]}>
              {label}
            </Animated.Text>
          </View>
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

  content: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },

  text: {
    fontFamily: 'SFProText-Regular',
    fontSize: 17,
    color: '#000000',
    letterSpacing: -0.41,
    lineHeight: 22,
    paddingVertical: 11,
    backgroundColor: 'transparent',
  },
});
