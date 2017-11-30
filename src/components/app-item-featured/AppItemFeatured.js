import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, findNodeHandle } from 'react-native';
import Divider from 'components/divider';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';

/**
 * Featured App Item
 * Usually used in the far top of Apps and Games screen.
 */
export default class AppItemFeatured extends PureComponent {

  static propTypes = {
    legend: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    onPress: PropTypes.func,
    onPressIn: PropTypes.func,
  }

  static defaultProps = {
    legend: undefined,
    imageUrl: undefined,
    title: undefined,
    subtitle: undefined,
    onPress: undefined,
    onPressIn: undefined,
  }

  @autobind
  onPress() {
    if (this.props.onPress) {
      this.props.onPress(this.props);
    }
  }

  @autobind
  onPressIn() {
    if (this.props.onPressIn) {
      this.props.onPressIn(this.props, findNodeHandle(this.hostRef));
    }
  }

  @autobind
  onRef(ref) {
    this.hostRef = ref;
  }

  render() {
    const {
      legend,
      imageUrl,
      title,
      subtitle,
    } = this.props;
    return (
      <View>
        <Divider />
        <TouchableWithoutFeedback onPress={this.onPress} onPressIn={this.onPressIn}>
          <View style={styles.host} ref={this.onRef}>
            <Text style={styles.legend}>{legend}</Text>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
            <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
          </View>
        </TouchableWithoutFeedback>
      </View>
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
    backgroundColor: 'transparent',
  },

  title: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 22,
    color: '#000000',
    letterSpacing: 0.36,
    backgroundColor: 'transparent',
  },

  subtitle: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 22,
    color: '#8A8A8F',
    letterSpacing: 0.36,
    marginBottom: 11,
    backgroundColor: 'transparent',
  },

  image: {
    width: '100%',
    height: 215,
    borderRadius: 5,
    marginBottom: 16,
  },

});
