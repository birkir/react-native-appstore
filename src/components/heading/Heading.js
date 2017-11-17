import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class Heading extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    action: PropTypes.string,
    onActionPress: PropTypes.func,
  }

  static defaultProps = {
    children: undefined,
    action: undefined,
    onActionPress: undefined,
  }

  render() {
    const { children, action, onActionPress } = this.props;
    return (
      <View style={styles.host}>
        <Text style={styles.host__title}>{children}</Text>
        {!!action && (
          <TouchableOpacity onPress={onActionPress}>
            <Text style={styles.action}>{action}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    marginTop: 12,
    marginBottom: 12,
    marginRight: -6,
    flexDirection: 'row',
  },

  action: {
    fontFamily: 'SFProText-Regular',
    fontSize: 17,
    color: '#007AFF',
    letterSpacing: -0.41,

    // Making hit area a little bit bigger
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginBottom: -3,
  },

  host__title: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 22,
    color: '#000000',
    letterSpacing: -0.32,
    flex: 1,
  },
});
