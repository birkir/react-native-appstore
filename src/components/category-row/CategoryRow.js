import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import ListItem from 'components/list-item';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';

export default class CategoryRow extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    title: undefined,
    onPress: undefined,
  }

  @autobind
  onPress() {
    if (this.props.onPress) {
      this.props.onPress(this.props);
    }
  }

  render() {
    return (
      <ListItem
        {...this.props}
        onPress={this.onPress}
        label={this.props.title}
        fontStyle={styles.fontStyle}
      />
    );
  }
}

const styles = StyleSheet.create({
  fontStyle: {
    fontFamily: 'SFProText-Regular',
    fontSize: 19,
    color: '#007AFF',
    letterSpacing: -0.41,
    lineHeight: 24,
  },
});
