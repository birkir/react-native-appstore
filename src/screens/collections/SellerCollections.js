import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList } from 'react-native';
import get from 'lodash/get';
import sellerWithProps from 'graphql/queries/seller';
import Divider from 'components/divider';
import Collection from './components/collection';

@sellerWithProps
export default class SellerCollections extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }

  static navigatorStyle = {
    drawUnderTabBar: true,
    prefersLargeTitles: true,
  }

  keyExtractor(item) {
    return item.key;
  }

  groupApps(apps) {
    const latestApp = apps
      .reduce((a, b) => (new Date(get(a, 'versions[0].date')) > new Date(get(b, 'versions[0].date')) ? a : b));
    const latestRelease = {
      id: 'latest-releases',
      apps: [latestApp],
      type: 'SMALL_TITLE',
      rows: 1,
      title: 'Latest Release',
    };
    const appsAndGames = {
      id: 'apps-and-games',
      apps,
      type: 'SMALL_TITLE',
      rows: 3,
      title: 'Apps & Games',
    };
    return [latestRelease, appsAndGames];
  }

  renderItem({ item }) {
    return item;
  }

  render() {
    const { Seller: seller, loading } = this.props.data;

    if (loading) {
      return null;
    }

    const collections = this.groupApps(get(seller, 'apps', []));

    return (
      <FlatList
        style={styles.host}
        data={[
          <Divider />,
          ...collections.map(collection => (
            <Collection
              key={collection.id}
              backTitle={seller.name}
              navigator={this.props.navigator}
              collection={collection}
            />
          )),
        ]}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
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
});
