import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import Button from 'components/button';
import PropTypes from 'prop-types';

export default class AppItemLargeTile extends PureComponent {

  static propTypes = {
    imageUrl: PropTypes.string,
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
    action: undefined,
    onPress: undefined,
  }

  render() {
    const {
      onPress,
      action,
      imageUrl,
    } = this.props;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.host}>
          <View style={styles.card}>
            <View style={styles.card__inner}>
              <Image source={{ uri: imageUrl }} style={styles.card__inner} />
            </View>
            <Image source={{ uri: imageUrl }} style={styles.card__overlay} />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>Starter pack for <Text style={styles.blue}>Candy Crush Saga</Text></Text>
            <Text style={styles.subtitle}>20 goldbars, 2 hours unlimited life & boosters</Text>
            <View style={styles.button}>
              <Button {...action}>
                {action.label}
              </Button>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 56,
  },

  card: {
    width: 124,
    height: 124,
    borderRadius: 4,
    marginRight: 16,
    backgroundColor: '#EEE',
    padding: 10,
  },

  card__inner: {
    flex: 1,
    backgroundColor: '#888',
    borderRadius: 4,
    borderTopRightRadius: 45,
    overflow: 'hidden',
  },

  card__overlay: {
    width: 44,
    height: 44,
    position: 'absolute',
    bottom: -8,
    left: -8,
    backgroundColor: '#AAA',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#EEE',
  },

  content: {
    flex: 1,
    marginTop: -2,
  },

  title: {
    fontFamily: 'SFProText-Regular',
    fontSize: 17,
    color: '#000000',
    letterSpacing: -0.41,
    lineHeight: 22,
    marginBottom: 5,
  },

  blue: {
    color: '#007AFF',
  },

  subtitle: {
    fontFamily: 'SFProText-Regular',
    fontSize: 13,
    color: '#8A8A8F',
    letterSpacing: -0.08,
    marginBottom: 10,
  },

  button: {
    position: 'absolute',
    bottom: 0,
  },
});
