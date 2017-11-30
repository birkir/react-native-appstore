import React, { PureComponent } from 'react';
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import Button from 'components/button';
import Divider from 'components/divider';
import { autobind } from 'core-decorators';

/**
 * App Item Row
 * Very complex but robust component that displays a row of app item.
 * @todo Use object for action proptype
 */
export default class AppItemRow extends PureComponent {

  static propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    action: PropTypes.shape({
      label: PropTypes.string,
      width: PropTypes.number,
      onPress: PropTypes.func,
      loading: PropTypes.bool,
    }),
    onPress: PropTypes.func,
  }

  static defaultProps = {
    imageUrl: undefined,
    title: undefined,
    subtitle: undefined,
    action: undefined,
    onPress: undefined,
  }

  @autobind
  onPress() {
    if (this.props.onPress) {
      this.props.onPress(this.props);
    }
  }

  render() {
    const {
      imageUrl,
      title,
      subtitle,
      action,
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={styles.host}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
          />
          <View style={styles.content}>
            <View style={styles.content__summary}>
              <Text style={styles.content__title} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.content__subtitle} numberOfLines={1}>
                {subtitle}
              </Text>
              <View style={styles.content__button}>
                <Button {...action} horizontal>
                  {action.label}
                </Button>
              </View>
            </View>
          </View>
          <View style={styles.divider}>
            <Divider />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 32,
  },

  image: {
    width: 88,
    height: 88,
    borderRadius: 14,
    marginRight: 10,
  },

  content: {
    flex: 1,
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  content__summary: {
    flexDirection: 'column',
    flex: 1,
    height: 88,
  },

  content__title: {
    fontFamily: 'SFProText-Regular',
    fontSize: 17,
    color: '#000000',
    letterSpacing: -0.41,
    lineHeight: 22,
    paddingBottom: 3,
  },

  content__subtitle: {
    fontFamily: 'SFProText-Regular',
    fontSize: 13,
    color: '#8A8A8F',
    letterSpacing: -0.08,
  },

  content__button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },

  divider: {
    position: 'absolute',
    bottom: -16,
    left: 98,
    right: 0,
  },
});
