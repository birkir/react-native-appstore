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
    fontSize: 18,
    color: '#0075FF',
    letterSpacing: -0.55,

    // Making hit area a little bit bigger
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginBottom: -3,
  },

  host__title: {
    fontWeight: '600',
    fontSize: 23,
    color: '#000000',
    letterSpacing: -0.7,
    flex: 1,
  },
});
