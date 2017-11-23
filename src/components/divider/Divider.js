import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

export default class Divider extends PureComponent {

  static propTypes = {
    gutter: PropTypes.bool,
  }

  static defaultProps = {
    gutter: false,
  }

  render() {
    const {
      gutter,
    } = this.props;
    return (
      <View style={[styles.host, gutter && styles.gutter]} />
    );
  }
}

const styles = StyleSheet.create({
  host: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#CFCFCF',
  },

  gutter: {
    marginVertical: 16,
  },
});
