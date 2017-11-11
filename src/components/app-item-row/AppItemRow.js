import React, { PureComponent } from 'react';
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import Button from 'components/button';

export default class AppItemRow extends PureComponent {
  static propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    action: PropTypes.string,
    onActionPress: PropTypes.func,
    isActionLoading: PropTypes.bool,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    imageUrl: undefined,
    title: undefined,
    subtitle: undefined,
    action: undefined,
    isActionLoading: false,
    onActionPress: undefined,
    onPress: undefined,
  }

  render() {
    const { imageUrl, title, subtitle, action, isActionLoading, onActionPress, onPress } = this.props;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.host}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.content__title}>{title}</Text>
            <Text style={styles.content__subtitle}>{subtitle}</Text>
          </View>
          <Button onPress={onActionPress} loading={isActionLoading}>{action}</Button>
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
});
