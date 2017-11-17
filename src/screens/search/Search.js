import React, { Component } from 'react';
import { StyleSheet, ScrollView, Animated, View, Keyboard, Text, TouchableOpacity } from 'react-native';
import { autobind } from 'core-decorators';
import Heading from 'components/heading';
import PropTypes from 'prop-types';

export default class Search extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  static defaultProps = {
  }

  static navigatorStyle = {
    drawUnderTabBar: true,
    navBarBackgroundColor: 'white',
    navBarNoBorder: true,
    prefersLargeTitles: true,
    navBarSearch: true,
    navBarSearchPlaceholder: 'App Store',
  }

  state = {
    query: '',
    active: false,
    trending: false,
    results: false,
  };

  componentDidMount() {
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    // TODO: Receive event from search input field.
    // Currently 250ms delay.
    this.keyboardHide = Keyboard.addListener('keyboardDidHide', this.onKeyboardHide);
    this.keyboardShow = Keyboard.addListener('keyboardDidShow', this.onKeyboardShow);
  }

  componentWillUnmount() {
    this.keyboardHide.remove();
    this.keyboardShow.remove();
  }

  @autobind
  onNavigatorEvent(e) {
    if (e.type === 'SearchChanged') {
      const { query, active } = e.payload;
      // Show or hide backdrop
      if (active) {
        Animated.spring(this.backdrop, { toValue: 1 }).start();
      } else if (this.state.query.length > 0) {
        this.backdrop.setValue(0);
      } else {
        Animated.spring(this.backdrop, { toValue: 0 }).start();
      }
      // Update active-ness and search query
      this.setState({ query, active, results: false });
    }

    if (e.id === 'didAppear') {
      // Hack to make ScrollView not interact with search
      // We want it to be always visible.
      this.setState({
        trending: true,
      });
    }
  }

  @autobind
  onBackdropPress() {
    this.props.navigator.setStyle({
      navBarSearchActive: false,
    });
  }

  @autobind
  onKeyboardHide() {
    const { active, query } = this.state;
    this.setState({ results: active && query !== '' });
  }

  @autobind
  onKeyboardShow() {
    this.setState({ results: false });
  }

  backdrop = new Animated.Value(0);

  render() {
    const {
      active,
      query,
      trending,
      results,
    } = this.state;
    return (
      <View style={styles.host}>
        {trending && (
          <ScrollView style={styles.content}>
            <Heading>Trending</Heading>
          </ScrollView>
        )}
        <TouchableOpacity
          activeOpacity={1}
          style={StyleSheet.absoluteFill}
          onPress={this.onBackdropPress}
          disabled={!active}
        >
          <Animated.View style={[styles.backdrop, { opacity: this.backdrop }]} />
        </TouchableOpacity>
        {active && query !== '' && (
          <View style={[StyleSheet.absoluteFill, styles.results]}>
            <ScrollView style={StyleSheet.absoluteFill} contentContainerStyle={styles.content}>
              <Text>Suggestions based on {query}</Text>
            </ScrollView>
          </View>
        )}
        {active && results && (
          <View style={[StyleSheet.absoluteFill, styles.results]}>
            <ScrollView style={StyleSheet.absoluteFill} contentContainerStyle={styles.content}>
              <Text>Search results</Text>
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
  },

  content: {
    flex: 1,
    padding: 18,
  },

  results: {
    top: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#BCBBC1',
  },

  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
