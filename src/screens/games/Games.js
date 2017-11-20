import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image, ActivityIndicator } from 'react-native';
import { SPLASH_SCREEN, pushAppScreen } from 'screens';
import AppItemRow from 'components/app-item-row';
import AppItemSlider from 'components/app-item-slider';
import AppItemFeatured from 'components/app-item-featured';
import Heading from 'components/heading';
import ListItem from 'components/list-item';
import Divider from 'components/divider';
import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';
import collections from 'graphql/queries/collections';

@collections({ appType: 'GAME' })
export default class Games extends Component {

  static propTypes = {
    navigator: PropTypes.object,
    data: PropTypes.object,
  }

  static defaultProps = {
    navigator: undefined,
    data: undefined,
  }

  static navigatorStyle = {
    navBarNoBorder: true,
    navBarTransparent: true,
    drawUnderTabBar: true,
    prefersLargeTitles: true,
  }

  @autobind
  onAppGroupPress() {
    this.props.navigator.push({
      screen: SPLASH_SCREEN,
      title: 'Best New Updates',
    });
  }

  @autobind
  onAppPress() {
    pushAppScreen(this.props.navigator, {
      backTitle: 'Games',
      iconUrl: 'https://placeimg.com/198/198/any?1=2',
      action: 'FREE',
      onActionPress() {},
      isActionLoading: false,
    });
  }

  @autobind
  renderCollection(collection) {

    // Get needed props from collection
    const {
      apps = [],
      type,
      rows,
      title,
    } = collection;

    // Render app item
    const renderAppItem = (item) => {
      // Most likely will be AppItemRow
      let ComposedComponent = AppItemRow;

      // Setup props
      const props = {
        key: item.id,
        imageUrl: item.iconUrl,
        title: item.title,
        subtitle: item.subtitle,
        action: item.price ? `$${item.price}` : 'GET',
        onPress: this.onAppPress,
      };

      if (type === 'FEATURED') {
        // Switch component to render
        ComposedComponent = AppItemFeatured;
        props.legend = 'NEW GAME';
      }

      if (type === 'PROMO_TOP' || type === 'PROMO_BOTTOM') {
        props.legend = 'Interperet visions, solve mysteries';
        props.screenshotUrl = item.iconUrl;
      }

      return <ComposedComponent {...props} />;
    };

    // Content of the collection section
    let content = (
      <AppItemSlider itemsPerPage={rows}>
        {apps.map(renderAppItem)}
      </AppItemSlider>
    );

    // TODO: Use a component `<TopApps type="APP|GAME" free size={16} />` here
    if (type === 'TOP_FREE') {
      return null;
    }

    // TODO: Use a component `<TopApps type="APP|GAME" paid size={16} />` here
    if (type === 'TOP_PAID') {
      return null;
    }

    // TODO: Use a component `<TopCategories type="APP|GAME" size={4} />` here
    if (type === 'TOP_CATEGORIES') {
      const categories = ['Category 1', 'Category 2'];
      content = categories.map(category => (
        <ListItem key={category} label={category} />
      ));
    }

    // Show heading?
    const isHeadingShown = (type !== 'FEATURED');

    return (
      <View key={collection.id}>
        {isHeadingShown && (
          <Heading action="See All" onActionPress={this.onAppGroupPress}>
            {title}
          </Heading>
        )}
        {content}
      </View>
    );
  }

  render() {
    const {
      loading,
      error,
      allCollections = [],
    } = this.props.data;

    if (error) {
      console.log('Error while fetching data %o', error);
    }

    return (
      <ScrollView style={styles.host}>
        <View style={styles.user}>
          <Image source={require('images/UserIcon.png')} style={styles.user__image} />
        </View>
        <Divider />
        {loading && <ActivityIndicator />}
        {allCollections.map(this.renderCollection)}
        <View style={styles.gutter} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    padding: 18,
    marginTop: -50,
    paddingTop: 50,
  },

  gutter: {
    height: 200,
  },

  user: {
    position: 'absolute',
    top: -50,
    right: 0,
    width: 42,
    height: 42,
  },

  user__image: {
    tintColor: '#0077FD',
  },
});
