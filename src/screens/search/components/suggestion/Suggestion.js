import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';

const MATCH_RE = /<em>.*?<\/em>/g;

export default class Suggestion extends PureComponent {

  static propTypes = {
    suggestion: PropTypes.string,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    suggestion: undefined,
    onPress: undefined,
  }

  constructor(props) {
    super(props);
    this.calculate(props.suggestion);
  }

  componentWillReceiveProps(props) {
    this.calculate(props.suggestion);
  }

  @autobind
  onPress() {
    const { suggestion, onPress } = this.props;
    if (onPress) {
      onPress(suggestion);
    }
  }

  calculate(suggestion) {
    this.parts = suggestion.split(MATCH_RE) || [];
    this.highlights = suggestion.match(MATCH_RE) || [];
  }

  @autobind
  part(acc, word, i) {
    return [
      ...acc,
      <Text key={`w${i + 0}`}>{word}</Text>,
      this.highlights[i] && (
        <Text style={styles.light} key={`h${i + 0}`}>
          {this.highlights[i].replace(/<\/?em>/g, '')}
        </Text>
      ),
    ];
  }

  render() {
    const highlighted = this.parts.reduce(this.part, []);
    return (
      <TouchableOpacity
        key={this.props.suggestion}
        style={styles.suggestion}
        onPress={this.onPress}
      >
        <Image
          style={styles.suggestion__icon}
          source={require('images/SearchIcon.png')}
          resizeMode="contain"
        />
        <Text style={styles.suggestion__text}>
          {highlighted}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  light: {
    color: '#7E7E80',
  },

  suggestion: {
    flexDirection: 'row',
    paddingVertical: 14,
    alignItems: 'center',
  },

  suggestion__text: {
    fontFamily: 'SFProText-Regular',
    fontSize: 21,
    letterSpacing: -0.4,
  },

  suggestion__icon: {
    width: 16,
    height: 16,
    marginRight: 5,
    marginTop: 1,
  },

});
