import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, MaskedViewIOS, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class Button extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    children: undefined,
    onPress: undefined,
  };

  state = {
    loading: false,
  };

  onPress() {
    this.setState({
      loading: !this.state.loading,
    });
    this.props.onPress();
  }

  render() {
    const { children, onPress } = this.props;
    return (
      <TouchableOpacity
        onPress={this.onPress}
        disabled={!onPress}
        style={styles.host}
      >
        {/* Loading */}
        <MaskedViewIOS
          maskedElement={<View />}
        >
          <View />
        </MaskedViewIOS>
        {/* <Text style={styles.text}>{children}</Text> */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    width: 80,
    height: 30,
    backgroundColor: '#F1F0F7',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 2,
  },

  text: {
    fontWeight: '600',
    fontSize: 16,
    color: '#0077FD',
    letterSpacing: -0.4,
  },
});
