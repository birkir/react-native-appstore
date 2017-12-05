import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Heading from 'components/heading';
import Divider from 'components/divider';
import RatingRow from 'components/rating-row';
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
    onReviewPress: PropTypes.func,
  }

  static defaultProps = {
    reviews: undefined,
    rating: 0,
    votes: 0,
    title: 'Reviews & Ratings',
    onActionPress: undefined,
    onReviewPress: undefined,
  }

  @autobind
  onReviewPress({ id }) {
    if (this.props.onReviewPress) {
      this.props.onReviewPress({ id });
    }
  }

  @autobind
  renderReview(review) {
    return (
      <Review
        key={get(review, 'id')}
        id={get(review, 'id')}
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
        <RatingRow
          rating={rating}
          votes={votes}
        />
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
});
