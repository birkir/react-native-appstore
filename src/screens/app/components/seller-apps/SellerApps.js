import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Heading from 'components/heading';
import AppItemSlider from 'components/app-item-slider';
import AppItemRow from 'components/app-item-row';
import { autobind } from 'core-decorators';

export default class SellerApps extends PureComponent {

  static propTypes = {
    seller: PropTypes.object,
  }

  static defaultProps = {
    seller: undefined,
  }

  /**
   * Render app item in
   * @param {object} item
   */
  @autobind
  renderAppItem(item, index, arr) {
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
          white: true,
        }}
        divider={arr.length > 1 && index % 2 === 0}
      />
    );
  }

  render() {
    const {
      apps = [],
      name = 'seller',
    } = this.props.seller || {};

    if (apps.length === 0) {
      return null;
    }

    return (
      <View>
        <Heading action="See All">More by {name}</Heading>
        <AppItemSlider itemsPerPage={2}>
          {apps.map(this.renderAppItem)}
        </AppItemSlider>
      </View>
    );
  }
}
