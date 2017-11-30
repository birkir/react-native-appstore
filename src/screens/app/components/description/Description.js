import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import CollapsedText from 'components/collapsed-text';
import Divider from 'components/divider';
import { autobind } from 'core-decorators';

export default class Description extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    seller: PropTypes.object,
    onDeveloperPress: PropTypes.func,
  }

  static defaultProps = {
    children: undefined,
    seller: undefined,
    onDeveloperPress() {},
  }

  @autobind
  onDeveloperPress() {
    this.props.onDeveloperPress(this.props.seller);
  }

  render() {
    const { children, seller } = this.props;
    return (
      <View style={styles.host}>
        <View style={styles.description}>
          <CollapsedText numberOfLines={3}>{children}</CollapsedText>
        </View>
        <TouchableWithoutFeedback onPress={this.onDeveloperPress}>
          <View style={styles.developer}>
            <Text style={styles.label}>Developer</Text>
            <Text style={styles.seller}>{seller.name}</Text>
            <View style={styles.arrow} />
          </View>
        </TouchableWithoutFeedback>
        <Divider />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    paddingTop: 16,
  },

  developer: {
    paddingVertical: 8,
    marginBottom: 16,
  },

  description: {
    marginBottom: 16,
  },

  label: {
    fontFamily: 'SFProText-Regular',
    fontSize: 13,
    color: '#8E8E93',
    letterSpacing: -0.1,
    marginBottom: 2,
  },

  seller: {
    fontFamily: 'SFProText-Regular',
    fontSize: 15,
    color: '#007AFF',
    letterSpacing: -0.22,
  },

  arrow: {
    position: 'absolute',
    top: 26,
    right: 0,
    width: 8,
    height: 8,
    borderColor: '#8A8A8F',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    transform: [{
      rotate: '-135deg',
    }],
  },
});
