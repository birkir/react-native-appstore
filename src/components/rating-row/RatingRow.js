import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ReviewStats from 'components/review-stats';

export default class RatingRow extends PureComponent {

  static propTypes = {
    rating: PropTypes.number,
    votes: PropTypes.number,
  }

  static defaultProps = {
    rating: 5,
    votes: 16000,
  }

  render() {
    const { rating, votes } = this.props;
    return (
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
