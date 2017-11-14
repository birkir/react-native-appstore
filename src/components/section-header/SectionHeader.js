import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

export default class SectionHeader extends PureComponent {

  static propTypes = {
    label: PropTypes.string,
    title: PropTypes.string,
    border: PropTypes.bool,
    icon: PropTypes.bool,
  }

  static defaultProps = {
    label: undefined,
    title: undefined,
    border: false,
    icon: false,
  }

  render() {
    const {
      label,
      title,
      border,
      icon,
    } = this.props;
    return (
      <View style={[styles.host, border && styles.host__border]}>
        {!!label && <Text style={styles.label}>{String(label || '').toUpperCase()}</Text>}
        {!!title && <Text style={styles.title}>{title}</Text>}
        {icon && (
          <Image source={require('images/UserIcon.png')} style={styles.icon} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    marginBottom: 10,
  },

  host__border: {
    marginBottom: 0,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CDCDCF',
  },

  label: {
    fontWeight: '500',
    fontSize: 13,
    color: '#8F8E94',
    letterSpacing: -0.075,
    marginBottom: 3,
  },

  title: {
    fontWeight: '700',
    fontSize: 34,
    color: 'black',
    letterSpacing: -0.2,
  },

  icon: {
    position: 'absolute',
    bottom: 5,
    right: 0,
    tintColor: '#0077FD',
  },

});
