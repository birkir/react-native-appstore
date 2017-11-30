import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { pushAppScreen } from 'screens';
import AppItemRowLarge from 'components/app-item-row-large';
import collectionWithProps from 'graphql/queries/collection';
import { autobind } from 'core-decorators';

@collectionWithProps
export default class Collection extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }

  static defaultProps = {
    // children: undefined,
  }

  static navigatorStyle = {
    navBarNoBorder: true,
    drawUnderTabBar: true,
    prefersLargeTitles: false,
    navBarBackgroundColor: 'white',
  }

  @autobind
  onPress(props) {
    const { navigator, data } = this.props;
    pushAppScreen({
      navigator,
      backTitle: data.Collection.title,
      app: props,
    });
  }

  @autobind
  keyExtractor(item) {
    return item.id;
  }

  @autobind
  renderItem({ item }) {
    return (
      <AppItemRowLarge
        {...item}
        key={item.id}
        id={item.id}
        imageUrl={item.iconUrl}
        action={{
          label: item.price ? `$${item.price}` : 'GET',
          subtitle: item.hasInAppPurchases ? 'In-App Purchases' : undefined,
        }}
        onPress={this.onPress}
      />
    );
  }

  render() {
    const { Collection: collection } = this.props.data;
    return (
      <FlatList
        style={styles.host}
        data={collection.apps || []}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    padding: 20,
  },
});
