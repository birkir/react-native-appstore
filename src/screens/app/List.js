import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList, View } from 'react-native';
import { autobind } from 'core-decorators';
import { pushAppScreen } from 'screens';
import AppItemRow from 'components/app-item-row';

export default class List extends PureComponent {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    apps: PropTypes.array,
  }

  static defaultProps = {
    apps: [],
  }

  @autobind
  onAppPress(props) {
    const { navigator } = this.props;
    pushAppScreen({
      navigator,
      backTitle: 'You May Also Like',
      app: props,
    });
  }

  @autobind
  onAppPressIn(props, previewView) {
    const { navigator } = this.props;
    pushAppScreen({
      navigator,
      backTitle: 'You May Also Like',
      app: props,
      previewView,
    });
  }

  keyExtractor(item) {
    return item.id;
  }

  @autobind
  renderItem({ item }) {
    const {
      id,
      iconUrl,
      price,
      hasInAppPurchases,
    } = item;

    return (
      <AppItemRow
        {...item}
        key={id}
        id={id}
        imageUrl={iconUrl}
        action={{
          label: price ? `$${price}` : 'GET',
          subtitle: hasInAppPurchases ? 'In-App Purchases' : undefined,
        }}
        onPress={this.onAppPress}
        onPressIn={this.onAppPressIn}
      />
    );
  }

  render() {
    const { apps } = this.props;

    return (
      <FlatList
        style={styles.host}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        data={apps}
        ListFooterComponent={() => (
          <View key="gutter" style={styles.gutter} />
        )}
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
