import React, { PureComponent } from 'react';
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import Button from 'components/button';
import { autobind } from 'core-decorators';

export default class AppItemRow extends PureComponent {

  static propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    border: PropTypes.bool,
    action: PropTypes.string,
    onActionPress: PropTypes.func,
    isActionLoading: PropTypes.bool,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    imageUrl: undefined,
    title: undefined,
    subtitle: undefined,
    border: true,
    action: undefined,
    isActionLoading: false,
    onActionPress: undefined,
    onPress: undefined,
  }

  state = {
    isActionLoading: false,
  }

  componentWillReceiveProps(props) {
    if (props.isActionLoading !== this.props.isActionLoading) {
      this.setState({
        isActionLoading: props.isActionLoading,
      });
    }
  }

  @autobind
  onActionPress() {
    if (this.props.onActionPress) {
      this.props.onActionPress();
    } else {
      this.setState({
        isActionLoading: !this.state.isActionLoading,
      });
    }
  }

  render() {
    const {
      imageUrl,
      title,
      subtitle,
      border,
      action,
      onPress,
    } = this.props;
    const { isActionLoading } = this.state;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.host, border && styles.host__border]}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.content__title}>{title}</Text>
            <Text style={styles.content__subtitle}>{subtitle}</Text>
          </View>
          <Button onPress={this.onActionPress} loading={isActionLoading}>{action}</Button>
          {border && <View style={styles.border} />}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  host__border: {
    marginBottom: 16,
  },

  image: {
    width: 66,
    height: 66,
    borderRadius: 15,
    marginRight: 11,
  },

  content: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 11,
  },

  content__title: {
    fontSize: 18,
    color: '#000000',
    letterSpacing: -0.45,
  },

  content__subtitle: {
    fontSize: 14,
    color: '#999999',
    letterSpacing: -0.2,
    lineHeight: 17,
  },

  border: {
    position: 'absolute',
    bottom: -8,
    left: 77,
    right: 0,
    backgroundColor: '#CDCDCD',
    height: StyleSheet.hairlineWidth,
  },
});
