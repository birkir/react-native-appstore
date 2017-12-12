import React, { PureComponent } from 'react';
import ListItem from 'components/list-item';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';

export default class Trending extends PureComponent {

  static propTypes = {
    label: PropTypes.string,
    color: PropTypes.any,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    label: undefined,
    color: undefined,
    onPress: undefined,
  }

  @autobind
  onPress() {
    const { onPress, label } = this.props;
    if (onPress) {
      onPress(label);
    }
  }

  render() {
    const { color } = this.props;
    const styles = {
      fontFamily: 'SFProText-Regular',
      fontSize: 21,
      letterSpacing: -0.4,
      color,
    };

    return (
      <ListItem
        {...this.props}
        fontStyle={styles}
        underlayColor="white"
        onPress={this.onPress}
      />
    );
  }
}
