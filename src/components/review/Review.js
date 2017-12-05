import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import CollapsedText from 'components/collapsed-text';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import { autobind } from 'core-decorators';

const starImages = [
  require('images/StarEmptyIcon.png'),
  require('images/StarIcon.png'),
];

export default class Review extends PureComponent {

  static propTypes = {
    compact: PropTypes.bool,
    title: PropTypes.string,
    rating: PropTypes.number,
    createdAt: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    numberOfLines: PropTypes.number,
    onMorePress: PropTypes.func,
  }

  static defaultProps = {
    compact: false,
    title: undefined,
    rating: undefined,
    createdAt: undefined,
    name: undefined,
    description: undefined,
    numberOfLines: undefined,
    onMorePress: undefined,
  }

  @autobind
  onMorePress() {
    if (this.props.onMorePress) {
      this.props.onMorePress(this.props);
    }
  }

  render() {

    const {
      compact,
      title,
      rating,
      createdAt,
      name,
      description,
      numberOfLines,
      onMorePress,
    } = this.props;

    return (
      <View style={[styles.review, compact && styles.review__compact]}>
        <View style={styles.review__header}>
          <View style={styles.row}>
            {title && <Text style={styles.review__title}>{title}</Text>}
            {createdAt && (
              <Text style={styles.review__subtitle}>
                {distanceInWordsStrict(createdAt, new Date())}
              </Text>
            )}
          </View>
          <View style={styles.row}>
            {rating && (
              <View style={styles.review__stars}>
                {Array.from({ length: 5 }).map((star, i) => (
                  <Image
                    key={`star-${i + 0}`}
                    style={styles.review__star}
                    source={starImages[Number(i < rating)]}
                  />
                ))}
              </View>
            )}
            {name && <Text style={styles.review__subtitle}>{name}</Text>}
          </View>
        </View>
        {numberOfLines ? (
          <CollapsedText
            backgroundColor="#F0F0F8"
            numberOfLines={numberOfLines}
            onPress={onMorePress ? this.onMorePress : undefined}
          >
            {description}
          </CollapsedText>
        ) : (
          <Text style={styles.review__description}>
            {description}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  review: {
    backgroundColor: '#F0F0F8',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginBottom: 32,

    minHeight: 200,
  },

  review__compact: {
    minHeight: 'auto',
    marginBottom: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  review__header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 11,
  },

  review__title: {
    fontFamily: 'SFProText-Semibold',
    fontSize: 15,
    color: '#000000',
    letterSpacing: -0.24,
    marginBottom: 6,
  },

  review__subtitle: {
    fontFamily: 'SFProText-Regular',
    fontSize: 15,
    color: '#8A8A8F',
    letterSpacing: -0.24,
    marginBottom: 3,
  },

  review__stars: {
    flexDirection: 'row',
  },

  review__star: {
    width: 12,
    height: 12,
    tintColor: '#FD8206',
  },

  review__description: {
    fontFamily: 'SFProText-Regular',
    fontSize: 15,
    color: '#000000',
    letterSpacing: -0.24,
    lineHeight: 20,
  },
});
