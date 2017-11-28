import React, { Component } from 'react';
import { StyleSheet, ScrollView, Animated, Image, View, Text, NativeModules, TouchableOpacity } from 'react-native';
import { autobind } from 'core-decorators';
import { inject } from 'mobx-react/native';
import Heading from 'components/heading';
import ListItem from 'components/list-item';
import AppItemRow from 'components/app-item-row';
import PropTypes from 'prop-types';
import get from 'lodash/get';

const { RCCManager } = NativeModules;

const DATA = {
  trending: [
    'tasty',
    'friendo',
    'battle royale',
    'dunk shot',
    'spotify music',
    'secret santa generator',
    'microsoft authenticator',
    'spirit airline',
  ],
};

/**
 * Search screen
 * @todo Split the view code into more defined components.
 */
@inject('algolia')
export default class Search extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    algolia: PropTypes.object.isRequired,
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
    enforceResults: false,
    suggestions: [],
  };

  componentDidMount() {
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  @autobind
  onNavigatorEvent(e) {
    const { algolia } = this.props;
    const { enforceResults } = this.state;
    if (e.type === 'SearchChanged') {
      const { query, active } = e.payload;
      // Dont do anything if active untill change of query
      if (active && this.state.active && query === this.state.query) {
        return;
      }
      // Show or hide backdrop
      if (active) {
        Animated.spring(this.backdrop, { toValue: 1 }).start();
      } else if (this.state.query.length > 0) {
        this.backdrop.setValue(0);
      } else {
        Animated.spring(this.backdrop, { toValue: 0 }).start();
      }
      // Update active-ness and search query
      this.setState({ query, active, results: enforceResults });
      // Reset enforce results flag
      // Sometimes this event is repeated one or two times, hence the timeout.
      setTimeout(() => this.setState({ enforceResults: false }), 300);
      // Search query
      algolia.apps.search(query, (err, res) => {
        if (err) return;
        this.setState({
          suggestions: res.hits,
        });
      });
    }

    if (e.type === 'SearchSubmit') {
      // Search button on keyboard was pressed
      this.setState({
        active: true,
        results: true,
      });
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
    // Set search in-active
    const { navigatorID } = this.props.navigator;
    RCCManager.NavigationControllerIOS(navigatorID, 'setSearch', {
      active: false,
    });
  }

  @autobind
  searchByQuery(query) {
    // Enforce showing results after search is active
    this.setState({ enforceResults: true });
    // Set search query and active-ness
    const { navigatorID } = this.props.navigator;
    RCCManager.NavigationControllerIOS(navigatorID, 'setSearch', {
      active: true,
      blur: true,
      query,
    });
  }

  // Animated value for backdrop opacity
  backdrop = new Animated.Value(0);

  renderHighlights(str = '') {
    const re = /<em>.*?<\/em>/g;
    const highlights = str.match(re) || [];
    return (str.split(re) || []).reduce((acc, word, i) => [
      ...acc,
      <Text key={`w${i + 0}`}>{word}</Text>,
      highlights[i] && <Text style={styles.light} key={`h${i + 0}`}>{highlights[i].replace(/<\/?em>/g, '')}</Text>,
    ], []);
  }

  render() {
    const {
      active,
      query,
      trending,
      results,
    } = this.state;

    const fontStyle = {
      fontFamily: 'SFProText-Regular',
      fontSize: 21,
      letterSpacing: -0.4,
      color: this.backdrop.interpolate({
        inputRange: [0, 1],
        outputRange: ['#007AFF', '#555555'],
      }),
    };

    return (
      <View style={styles.host}>
        {trending && (
          <ScrollView style={styles.content}>
            <Heading>Trending</Heading>
            {DATA.trending.map((label, i, arr) => (
              <ListItem
                key={label}
                label={label}
                fontStyle={fontStyle}
                underlayColor="white"
                onPress={() => this.searchByQuery(label)}
                divider={(i + 1) < arr.length}
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
              {this.state.suggestions.map(suggestion => (
                <TouchableOpacity
                  style={styles.suggestion}
                  key={suggestion.id}
                  onPress={() => this.searchByQuery(get(suggestion, 'title'))}
                >
                  <Image
                    style={styles.suggestion__icon}
                    source={require('images/SearchIcon.png')}
                    resizeMode="contain"
                  />
                  <Text style={styles.suggestion__text}>
                    {this.renderHighlights(get(suggestion, '_highlightResult.title.value').toLowerCase())}
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
