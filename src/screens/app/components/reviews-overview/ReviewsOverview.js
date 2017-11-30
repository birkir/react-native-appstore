import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Heading from 'components/heading';
import Divider from 'components/divider';
import ReviewStats from 'components/review-stats';
import AppItemSlider from 'components/app-item-slider';
import Review from 'components/review';
import { autobind } from 'core-decorators';

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

  @autobind
  onReviewPress(/* review */) {
    // Open review screen
    // this.props.navigator.push({
    //   screen: REVIEW_SCREEN,
    //   passProps: {
    //     id: review.id,
    //     review,
    //   },
    // });
  }

  @autobind
  renderReview(review) {
    return (
      <Review
        key={get(review, 'id')}
        name={get(review, 'name')}
        title={get(review, 'title')}
        rating={get(review, 'rating')}
        createdAt={get(review, 'createdAt')}
        description={get(review, 'description')}
        numberOfLines={5}
        onMorePress={this.onReviewPress}
      />
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
          <View style={styles.flex}>
            <ReviewStats votes={[16, 32, 199, 45, 8]} />
            <View style={styles.flex} />
            <Text style={styles.rating__votes}>{votes.toLocaleString()} Ratings</Text>
          </View>
        </View>
        <AppItemSlider itemsPerPage={1}>
          {reviews.map(this.renderReview)}
        </AppItemSlider>
        <Divider />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
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
    textAlign: 'right',
  },
});
