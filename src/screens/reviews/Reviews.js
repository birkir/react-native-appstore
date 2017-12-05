import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Review from 'components/review';
import RatingRow from 'components/rating-row';
import reviewsWithProps from 'graphql/queries/reviews';
import { autobind } from 'core-decorators';

@reviewsWithProps
export default class Reviews extends Component {

  static propTypes = {
    data: PropTypes.object,
    rating: PropTypes.number,
    votes: PropTypes.number,
  }

  static defaultProps = {
    data: undefined,
    rating: 5,
    votes: 16000,
  }

  static navigatorStyle = {
    prefersLargeTitles: true,
    navBarBackgroundColor: 'white',
    screenBackgroundColor: 'white',
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
        compact
      />
    );
  }

  render() {
    const { data, rating, votes } = this.props;
    const review = get(data, 'Review', get(this.props, 'review'));
    const reviews = get(data, 'App.reviews', get(this.props, 'reviews', []));

    if (review) {
      return (
        <ScrollView style={styles.host}>
          <Review {...review} />
        </ScrollView>
      );
    }

    return (
      <ScrollView style={styles.host}>
        <RatingRow
          rating={rating}
          votes={votes}
        />
        {reviews.map(this.renderReview)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    paddingHorizontal: 18,
  },
});
