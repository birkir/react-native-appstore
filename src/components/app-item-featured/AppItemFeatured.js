import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import Divider from 'components/divider';
import PropTypes from 'prop-types';

export default class AppItemFeatured extends PureComponent {
  static propTypes = {
    legend: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    legend: undefined,
    imageUrl: undefined,
    title: undefined,
    subtitle: undefined,
    onPress: undefined,
  }

  render() {
    const {
      legend,
      imageUrl,
      title,
      subtitle,
      onPress,
    } = this.props;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.host}>
          <Text style={styles.legend}>{legend}</Text>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
          <Divider />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({

  host: {
    flex: 1,
    paddingTop: 10,
  },

  legend: {
    fontFamily: 'SFProText-Semibold',
    fontSize: 11,
    color: '#007AFF',
    letterSpacing: 0.06,
    marginBottom: 2,
  },

  title: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 22,
    color: '#000000',
    letterSpacing: 0.36,
  },

  subtitle: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 22,
    color: '#8A8A8F',
    letterSpacing: 0.36,
    marginBottom: 11,
  },

  image: {
    width: '100%',
    height: 215,
    borderRadius: 5,
    marginBottom: 16,
  },

});
