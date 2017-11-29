import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { SPLASH_SCREEN, pushAppScreen } from 'screens';
import AppItemRow from 'components/app-item-row';
import AppItemSlider from 'components/app-item-slider';
import AppItemFeatured from 'components/app-item-featured';
import AppItemLargeTile from 'components/app-item-large-tile';
import Heading from 'components/heading';
import CategoriesList from 'components/categories-list';
import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';
import collectionsWithProps from 'graphql/queries/collections';

@collectionsWithProps
export default class Games extends Component {

  static propTypes = {
    navigator: PropTypes.object,
    data: PropTypes.object,
    title: PropTypes.string,
  }

  static defaultProps = {
    navigator: undefined,
    data: undefined,
    title: undefined,
  }

  static navigatorStyle = {
    navBarNoBorder: true,
    drawUnderTabBar: true,
    prefersLargeTitles: true,
    navBarBackgroundColor: 'white',
  }

  @autobind
  onAppGroupPress() {
    this.props.navigator.push({
      screen: SPLASH_SCREEN,
      title: 'Best New Updates',
    });
  }

  @autobind
  onAppPress({ id, action }) {
    const { title } = this.props;
    pushAppScreen(this.props.navigator, {
      backTitle: title,
      action,
      id,
    });
  }

  keyExtractor(item) {
    return item.key || item.id;
  }

  @autobind
  renderItem({ item }) {
    if (typeof item.type === 'function') {
      return item;
    }
    return this.renderCollection(item);
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
        id: item.id,
        imageUrl: item.iconUrl,
        title: item.title,
        subtitle: item.subtitle,
        action: {
          label: item.price ? `$${item.price}` : 'GET',
          subtitle: item.hasInAppPurchases ? 'In-App Purchases' : undefined,
        },
        onPress: this.onAppPress,
      };

      if (type === 'FEATURED') {
        // Switch to Featured Component
        ComposedComponent = AppItemFeatured;
        props.legend = 'NEW GAME';
      }

      if (type === 'LARGE_TILE') {
        // Switch to Large Tile Component
        ComposedComponent = AppItemLargeTile;
      }

      if (type === 'PROMO_TOP' || type === 'PROMO_BOTTOM') {
        props.legend = 'Interperet visions, solve mysteries';
        props.screenshotUrl = item.iconUrl;
      }

      return <ComposedComponent {...props} />;
    };

    // Content of the collection section
    let content = (
      <AppItemSlider
        itemsPerPage={rows}
        condensed={type === 'LARGE_TILE'}
      >
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

    if (type === 'TOP_CATEGORIES') {
      content = <CategoriesList type="GAME" top={5} />;
    }

    // Show heading?
    const isHeadingShown = (type !== 'FEATURED');

    // Dont show empty collections
    if (apps.length === 0) {
      return null;
    }

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
      error,
      allCollections = [],
    } = this.props.data;

    if (error) {
      console.log('Error while fetching data %o', error);
    }

    return (
      <FlatList
        style={styles.host}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        data={[
          ...allCollections,
          <View key="gutter" style={styles.gutter} />,
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    padding: 18,
    paddingTop: 0,
  },

  gutter: {
    height: 40,
    backgroundColor: 'white',
    marginTop: -2,
  },
});
