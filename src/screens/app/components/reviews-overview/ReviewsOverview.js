import React, { PureComponent } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import Heading from 'components/heading';
import Divider from 'components/divider';
import CollapsedText from 'components/collapsed-text';

export default class ReviewsOverview extends PureComponent {
  static propTypes = {
    reviews: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      createdAt: PropTypes.string,
      rating: PropTypes.number,
      description: PropTypes.string,
    })),
    rating: PropTypes.number,
    votes: PropTypes.number,
    title: PropTypes.string,
    onActionPress: PropTypes.func,
  }

  static defaultProps = {
    reviews: undefined,
    rating: 0,
    votes: 0,
    title: 'Reviews & Ratings',
    onActionPress: undefined,
  }

  renderReview(review) {
    const stars = Array.from({ length: 5 })
      .map((_, i) => i < get(review, 'rating'));
    const starImages = [
      require('images/StarEmptyIcon.png'),
      require('images/StarIcon.png'),
    ];

    return (
      <View style={styles.review} key={review.id}>
        <View style={styles.review__header}>
          <View>
            <Text style={styles.review__title}>{get(review, 'title')}</Text>
            <View style={styles.stars}>
              {stars.map((star, i) => (
                <Image
                  key={`star-${i + 0}`}
                  style={styles.star}
                  source={starImages[Number(star)]}
                />
              ))}
            </View>
          </View>
          <View style={styles.right}>
            <Text style={styles.review__subtitle}>
              {distanceInWordsStrict(get(review, 'createdAt'), new Date())}
            </Text>
            <Text style={styles.review__subtitle}>{get(review, 'name')}</Text>
          </View>
        </View>
        <CollapsedText
          backgroundColor="#F0F0F8"
          numberOfLines={5}
        >
          {get(review, 'description')}
        </CollapsedText>
      </View>
    );
  }

  render() {
    const {
      reviews,
      rating,
      votes,
      title,
      onActionPress,
    } = this.props;
    return (
      <View style={styles.flex}>
        <Heading action="See All" onActionPress={onActionPress}>
          {title}
        </Heading>
        <View style={styles.rating}>
          <View>
            <Text style={styles.rating__score}>{rating.toFixed(1)}</Text>
            <Text style={styles.rating__of}>out of 5</Text>
          </View>
          <View style={styles.flex} />
          <View>
            <Text style={styles.rating__votes}>{votes.toLocaleString()} Ratings</Text>
          </View>
        </View>
        {this.renderReview(get(reviews, '0'))}
        <Divider />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  flex: {
    flex: 1,
  },

  right: {
    alignItems: 'flex-end',
  },

  rating: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-end',
  },

  rating__score: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 60,
    color: '#4B4A50',
    letterSpacing: -0.7,
    lineHeight: 60,
    marginBottom: -6,
  },

  rating__of: {
    fontFamily: 'SFProText-Bold',
    fontSize: 15,
    color: '#4B4A50',
    letterSpacing: -0.24,
    textAlign: 'center',
  },

  rating__votes: {
    fontFamily: 'SFProText-Regular',
    fontSize: 15,
    color: '#8A8A8F',
    letterSpacing: -0.24,
  },

  review: {
    backgroundColor: '#F0F0F8',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginBottom: 32,
  },

  review__header: {
    flexDirection: 'row',
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

  stars: {
    flexDirection: 'row',
  },

  star: {
    width: 12,
    height: 12,
    tintColor: '#FD8206',
  },

});
