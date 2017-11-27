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
    id: PropTypes.string,
    legend: PropTypes.string,
    imageUrl: PropTypes.string,
    screenshotUrl: PropTypes.string,
    index: PropTypes.number,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    divider: PropTypes.bool,
    compact: PropTypes.bool,
    action: PropTypes.shape({
      label: PropTypes.string,
      width: PropTypes.number,
      onPress: PropTypes.func,
      loading: PropTypes.bool,
    }),
    onPress: PropTypes.func,
  }

  static defaultProps = {
    id: undefined,
    legend: undefined,
    imageUrl: undefined,
    screenshotUrl: undefined,
    index: undefined,
    title: undefined,
    subtitle: undefined,
    divider: true,
    compact: false,
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
      legend,
      imageUrl,
      screenshotUrl,
      index,
      title,
      subtitle,
      divider,
      compact,
      action,
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View>
          {legend && (
            <Text style={styles.legend}>{legend}</Text>
          )}
          {screenshotUrl && (
            <Image source={{ uri: screenshotUrl }} style={styles.screenshot} />
          )}
          <View style={[styles.host, divider && styles.host__divider]}>
            <Image
              source={{ uri: imageUrl }}
              style={[styles.image, compact && styles.image__compact]}
            />
            <View style={styles.content}>
              {index && (
                <View style={styles.index}>
                  <Text style={styles.index__text}>{index}</Text>
                </View>
              )}
              <View style={styles.content__summary}>
                <Text
                  style={[styles.content__title, compact && styles.content__title__compact]}
                  numberOfLines={2}
                >
                  {title}
                </Text>
                <Text
                  style={[styles.content__subtitle, compact && styles.content__subtitle__compact]}
                  numberOfLines={compact ? 1 : 2}
                >
                  {subtitle}
                </Text>
              </View>
            </View>
            {action && (
              <View>
                <Button {...action}>
                  {action.label}
                </Button>
              </View>
            )}
            {divider && (
              <View style={[styles.divider, compact && styles.divider__compact]}>
                <Divider />
              </View>
            )}
          </View>
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

  legend: {
    fontFamily: 'SFProText-Regular',
    fontSize: 15,
    color: '#8A8A8F',
    letterSpacing: -0.08,
    marginBottom: 12,
  },

  screenshot: {
    width: '100%',
    height: 215,
    borderRadius: 5,
    marginBottom: 16,
  },

  image: {
    width: 62,
    height: 62,
    borderRadius: 14,
    marginRight: 10,
  },

  image__compact: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },

  index: {
    paddingRight: 10,
    paddingTop: 1,
  },

  index__text: {
    fontFamily: 'SFProText-Semibold',
    fontSize: 17,
    color: '#000000',
    letterSpacing: -0.41,
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
  },

  content__title: {
    fontFamily: 'SFProText-Regular',
    fontSize: 17,
    color: '#000000',
    letterSpacing: -0.41,
    lineHeight: 22,
    paddingBottom: 3,
  },

  content__title__compact: {
    letterSpacing: -0.22,
    fontSize: 14,
    lineHeight: 17,
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
    left: 72,
    right: 0,
  },

  divider__compact: {
    left: 54,
  },
});
