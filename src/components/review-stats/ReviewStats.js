import React, { PureComponent } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import PropTypes from 'prop-types';

export default class ReviewStats extends PureComponent {
  static propTypes = {
    votes: PropTypes.array,
  }

  static defaultProps = {
    votes: undefined,
  }

  render() {
    const { floor } = Math;
    const { votes } = this.props;
    const total = votes.reduce((a, b) => a + b, 0);
    return (
      <View style={styles.host}>
        {this.props.votes.map((count, i) => (
          <View key={`row-${i + 0}`} style={styles.row}>
            <View style={styles.stars}>
              {Array.from({ length: 5 - i }).map((_, j) => (
                <Image
                  key={`star-${i + 0}-${j + 0}`}
                  source={require('images/StarIcon.png')}
                  style={styles.star}
                />
              ))}
            </View>
            <View style={styles.bar}>
              <View style={[styles.bar__content, { width: `${floor((count / total) * 100)}%` }]} />
            </View>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    marginLeft: 16,
    marginTop: 2,
    flexDirection: 'column',
  },

  row: {
    flexDirection: 'row',
  },

  stars: {
    width: 60,
    marginRight: 11,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  star: {
    width: 7,
    height: 7,
    tintColor: '#8A8A8C',
    marginBottom: 1,
  },

  bar: {
    marginTop: 2,
    marginBottom: 1,
    height: 4,
    flex: 1,
    backgroundColor: '#E8E8E8',
    borderRadius: 1,
    overflow: 'hidden',
  },

  bar__content: {
    height: 4,
    backgroundColor: '#8A8A8C',
  },
});
