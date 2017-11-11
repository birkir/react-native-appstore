import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class SectionHeader extends PureComponent {

  static propTypes = {
    label: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {
    label: undefined,
    title: undefined,
  }

  render() {
    const { label, title } = this.props;
    return (
      <View style={styles.host}>
        {!!label && <Text style={styles.label}>{String(label || '').toUpperCase()}</Text>}
        {!!title && <Text style={styles.title}>{title}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    marginBottom: 10,
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
});
