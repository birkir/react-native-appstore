import React, { PureComponent } from 'react';
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Divider from 'components/divider';
import { autobind } from 'core-decorators';

export default class AppItemRow extends PureComponent {

  static propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    divider: PropTypes.bool,
    action: PropTypes.string,
    actionWidth: PropTypes.number,
    onActionPress: PropTypes.func,
    isActionLoading: PropTypes.bool,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    imageUrl: undefined,
    title: undefined,
    subtitle: undefined,
    divider: true,
    action: undefined,
    actionWidth: undefined,
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
      divider,
      action,
      actionWidth,
      onPress,
    } = this.props;
    const { isActionLoading } = this.state;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.host, divider && styles.host__divider]}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.content__title}>{title}</Text>
            <Text style={styles.content__subtitle}>{subtitle}</Text>
          </View>
          <Button onPress={this.onActionPress} width={actionWidth} loading={isActionLoading}>
            {action}
          </Button>
          {divider && (
            <View style={styles.divider}>
              <Divider />
            </View>
          )}
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

  host__divider: {
    marginBottom: 16,
  },

  image: {
    width: 62,
    height: 62,
    borderRadius: 15,
    marginRight: 10,
  },

  content: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 10,
  },

  content__title: {
    fontFamily: 'SFProText-Regular',
    fontSize: 17,
    color: '#000000',
    letterSpacing: -0.41,
    lineHeight: 22,
  },

  content__subtitle: {
    fontFamily: 'SFProText-Regular',
    fontSize: 13,
    color: '#8A8A8F',
    letterSpacing: -0.08,
  },

  divider: {
    position: 'absolute',
    bottom: -8,
    left: 77,
    right: 0,
  },
});
