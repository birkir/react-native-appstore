import React, { Component } from 'react';
import { StyleSheet, ScrollView, Animated, View, Text, Dimensions, SafeAreaView, NativeModules, TouchableOpacity, ActivityIndicator } from 'react-native';
import { autobind, decorate } from 'core-decorators';
import { inject } from 'mobx-react/native';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import Heading from 'components/heading';
import AppItemRow from 'components/app-item-row';
import suggestionsQuery from 'graphql/queries/suggestions';
import searchQuery from 'graphql/queries/search';
import Suggestion from './components/suggestion';
import Trending from './components/trending';
import DATA from './Search.data';

/**
 * Search screen
 * @todo Split the view code into more defined components.
 */
@inject('client')
export default class Search extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
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
    isActive: false,
    isTrending: false,
    isResults: false,
    isEmpty: false,
    shouldEnforceResults: false,
    query: '',
    suggestions: [],
    results: [],
  };

  componentDidMount() {
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);

    // Hack to fix the previous hack.
    if (__DEV__) {
      setTimeout(() => this.setState({ isTrending: true }), 1000);
    }
  }

  @autobind
  onNavigatorEvent(e) {
    const { state } = this;
    if (e.type === 'SearchChanged') {
      const { query, active: isActive } = e.payload;
      // Dont do anything if active untill change of query
      if (isActive && state.isActive && query === state.query) {
        return;
      }
      // Show or hide backdrop
      if (isActive) {
        Animated.spring(this.backdrop, { toValue: 1 }).start();
      } else if (state.query.length > 0) {
        this.backdrop.setValue(0);
      } else {
        Animated.spring(this.backdrop, { toValue: 0 }).start();
      }
      // Update active-ness and search query
      this.setState({ query, isActive, isResults: state.shouldEnforceResults });
      // Reset enforce results flag
      // Sometimes this event is repeated one or two times, hence the timeout.
      setTimeout(() => this.setState({ shouldEnforceResults: false }), 300);
      // Search query
      this.suggestions(query);
    }

    if (e.type === 'SearchSubmit') {
      // Search button on keyboard was pressed
      this.setState({
        isActive: true,
        isResults: true,
        isEmpty: false,
        results: [],
      });
      this.search(this.state.query);
      this.backdrop.setValue(0);
    }

    if (e.id === 'didAppear') {
      // Hack to make ScrollView not interact with search
      // We want it to be always visible.
      this.setState({
        isTrending: true,
      });
    }
  }

  @autobind
  onBackdropPress() {
    // Set search in-active
    const { navigatorID } = this.props.navigator;
    NativeModules.RCCManager.NavigationControllerIOS(navigatorID, 'setSearch', {
      active: false,
    });
  }

  @autobind
  onSuggestionPress(query) {
    // Enforce showing results after search is active
    this.setState({
      shouldEnforceResults: true,
      isEmpty: false,
      results: [],
    });
    // Set search query and active-ness
    const { navigatorID } = this.props.navigator;
    NativeModules.RCCManager.NavigationControllerIOS(navigatorID, 'setSearch', {
      active: true,
      blur: true,
      query,
    });
    // Search
    this.search(query);
  }

  /**
   * Get suggestions for search query via custom resolver
   */
  @decorate(debounce, 750)
  async suggestions(term) {
    try {
      const res = await this.props.client.query({
        query: suggestionsQuery,
        variables: {
          term,
        },
      });
      this.setState({
        suggestions: get(res, 'data.searchSuggestions.suggestions', []),
      });
    } catch (err) {
      console.error('Could not suggest', err);
    }
  }

  /**
   * Get search results for query via custom resolver
   */
  async search(term) {
    try {
      const res = await this.props.client.query({
        query: searchQuery,
        variables: {
          term,
        },
      });
      const results = get(res, 'data.search.results');
      this.setState({
        results,
        isEmpty: results.length === 0,
      });
    } catch (err) {
      console.error('Could not search', err);
    }
  }

  // Animated value for backdrop opacity
  backdrop = new Animated.Value(0);

  /**
   * Convert `Some<em>thing</em>` to `<Text>Some</Text><Light>thing</Light>`.
   * @param {String} str Input string
   */
  @autobind
  renderSuggestion(suggestion) {
    return (
      <Suggestion
        key={suggestion}
        suggestion={suggestion.toLocaleLowerCase()}
        onPress={this.onSuggestionPress}
      />
    );
  }

  /**
   * Render search result item
   * @param {Object} item App item
   */
  renderSearchResult(item) {
    return (
      <View key={item.id}>
        <AppItemRow
          {...item}
          screenshotUrl={item.iconUrl}
          imageUrl={item.iconUrl}
          title={item.title}
          subtitle={item.subtitle}
          action={{
            label: item.price ? `$${item.price}` : 'GET',
            subtitle: item.hasInAppPurchases ? 'In-App Purchases' : undefined,
          }}
          divider={false}
        />
        <View style={styles.spacer} />
      </View>
    );
  }

  render() {
    const {
      isActive,
      isResults,
      isTrending,
      isEmpty,
      query,
      suggestions,
      results,
    } = this.state;

    const color = this.backdrop.interpolate({
      inputRange: [0, 1],
      outputRange: ['#007AFF', '#555555'],
    });

    // Small hack for top gutter
    const paddingTop = !isIPhoneX && !isActive ? 20 : 0;

    return (
      <SafeAreaView style={styles.safe}>
        <View style={[styles.host, { paddingTop }]}>
          {isTrending && (
            <ScrollView style={styles.content}>
              <Heading>Trending</Heading>
              {DATA.trending.map((label, i, arr) => (
                <Trending
                  key={label}
                  label={label}
                  color={color}
                  onPress={this.onSuggestionPress}
                  divider={(i + 1) < arr.length}
                />
              ))}
            </ScrollView>
          )}

          <View style={StyleSheet.absoluteFill} pointerEvents={!isActive ? 'none' : 'auto'}>
            <TouchableOpacity
              activeOpacity={1}
              style={StyleSheet.absoluteFill}
              onPress={this.onBackdropPress}
              disabled={!isActive}
            >
              <Animated.View
                style={[styles.backdrop, { opacity: this.backdrop }]}
              />
            </TouchableOpacity>
          </View>

          {isActive && query !== '' && (
            <View style={[StyleSheet.absoluteFill, styles.results]}>
              <ScrollView style={StyleSheet.absoluteFill} contentContainerStyle={styles.content}>
                {suggestions.map(this.renderSuggestion)}
              </ScrollView>
            </View>
          )}

          {isActive && isResults && (
            <View style={[StyleSheet.absoluteFill, styles.results]}>
              <ScrollView style={StyleSheet.absoluteFill} contentContainerStyle={styles.content}>
                {results.map(this.renderSearchResult)}
              </ScrollView>
              {results.length === 0 && !isEmpty && (
                <View style={[StyleSheet.absoluteFill, styles.empty]}>
                  <ActivityIndicator size="large" />
                </View>
              )}
              {isEmpty && (
                <View style={[StyleSheet.absoluteFill, styles.empty]}>
                  <Text style={styles.empty__title}>No Results</Text>
                  <Text style={styles.empty__subtitle}>for {'"'}{query}{'"'}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const { width, height } = Dimensions.get('window');
const isIPhoneX = (width === 812 || height === 812);
const styles = StyleSheet.create({
  safe: {
    marginTop: isIPhoneX ? -12 : -30,
    flex: 1,
  },

  host: {
    flex: 1,
  },

  content: {
    padding: 18,
  },

  results: {
    backgroundColor: '#FFFFFF',
  },

  empty: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  empty__title: {
    fontWeight: '700',
    fontSize: 34,
    color: 'black',
    letterSpacing: -0.2,
  },

  empty__subtitle: {
    fontFamily: 'SFProText-Regular',
    fontSize: 17,
    color: '#8A8A8F',
    letterSpacing: -0.49,
  },

  spacer: {
    height: 32,
  },

  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
