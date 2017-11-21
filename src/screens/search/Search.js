import React, { Component } from 'react';
import { StyleSheet, ScrollView, Animated, Image, View, Keyboard, Text, TouchableOpacity } from 'react-native';
import { autobind } from 'core-decorators';
import Strong from 'components/strong';
import Heading from 'components/heading';
import ListItem from 'components/list-item';
import AppItemRow from 'components/app-item-row';
import PropTypes from 'prop-types';

const DATA = {
  trending: [
    'friendo',
    'battle royale',
    'dunk shot',
    'spotify music',
    'secret santa generator',
    'microsoft authenticator',
    'spirit airline',
  ],
  suggestions: [
    'flight',
    'speed',
    'now',
    'demo',
    'goochie',
    'lorem',
    'ipsum',
  ],
};

/**
 * Search screen
 * @todo Split the view code into more defined components.
 */
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
    // Toggle search mode off
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

  // Animated value for backdrop opacity
  backdrop = new Animated.Value(0);

  render() {
    const {
      active,
      query,
      trending,
      results,
    } = this.state;

    // TODO: Remove this
    DATA.suggestions.sort(() => Math.random() - 0.5);

    return (
      <View style={styles.host}>
        {trending && (
          <ScrollView style={styles.content}>
            <Heading>Trending</Heading>
            {DATA.trending.map(label => (
              <ListItem
                key={label}
                label={label}
                color={this.backdrop.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['#007AFF', '#555555'],
                })}
                underlayColor="white"
                onPress={() => {}}
              />
            ))}
          </ScrollView>
        )}

        <View style={StyleSheet.absoluteFill} pointerEvents={!active ? 'none' : 'auto'}>
          <TouchableOpacity
            activeOpacity={1}
            style={StyleSheet.absoluteFill}
            onPress={this.onBackdropPress}
            disabled={!active}
          >
            <Animated.View
              style={[styles.backdrop, { opacity: this.backdrop }]}
            />
          </TouchableOpacity>
        </View>

        {active && query !== '' && (
          <View style={[StyleSheet.absoluteFill, styles.results]}>
            <ScrollView style={StyleSheet.absoluteFill} contentContainerStyle={styles.content}>
              {DATA.suggestions.map(label => (
                <TouchableOpacity style={styles.suggestion} key={label}>
                  <Image
                    style={styles.suggestion__icon}
                    source={require('images/SearchIcon.png')}
                  />
                  <Text style={styles.suggestion__text}>
                    <Strong>{query}</Strong>
                    <Text> {label}</Text>
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {active && results && (
          <View style={[StyleSheet.absoluteFill, styles.results]}>
            <ScrollView style={StyleSheet.absoluteFill} contentContainerStyle={styles.content}>
              <AppItemRow
                screenshotUrl={`https://placeimg.com/335/215/any?${Math.random()}`}
                imageUrl={`https://placeimg.com/198/198/any?${Math.random()}`}
                title="Spark Email"
                subtitle="New exciting tournament game mode!"
                action={{ label: 'FREE' }}
                divider={false}
              />
              <View style={styles.spacer} />
              <AppItemRow
                screenshotUrl={`https://placeimg.com/335/215/any?${Math.random()}`}
                imageUrl={`https://placeimg.com/198/198/any?${Math.random()}`}
                title="Spark Email"
                subtitle="New exciting tournament game mode!"
                action={{ label: 'FREE' }}
                divider={false}
              />
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
    padding: 18,
  },

  suggestion: {
    flexDirection: 'row',
    paddingVertical: 11,
    alignItems: 'center',
  },

  suggestion__icon: {
    width: 14,
    height: 14,
    marginRight: 8,
  },

  results: {
    top: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#BCBBC1',
  },

  spacer: {
    height: 32,
  },

  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
