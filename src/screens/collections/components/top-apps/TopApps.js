import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import AppItemRow from 'components/app-item-row';
import AppItemSlider from 'components/app-item-slider';
import topAppsWithProps from 'graphql/queries/topApps';
import { autobind } from 'core-decorators';

@topAppsWithProps
export default class TopApps extends PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired,
    onAppPress: PropTypes.func,
    onAppPressIn: PropTypes.func,
  }

  static defaultProps = {
    onAppPress: undefined,
    onAppPressIn: undefined,
  }

  @autobind
  renderAppItem(item, i) {
    return (
      <AppItemRow
        {...item}
        index={i + 1}
        key={item.id}
        imageUrl={item.iconUrl}
        action={{
          label: item.price ? `$${item.price}` : 'GET',
          subtitle: item.hasInAppPurchases ? 'In-App Purchases' : undefined,
        }}
        divider={(i + 1) % 3 !== 0}
        onPress={this.props.onAppPress}
        onPressIn={this.props.onAppPressIn}
      />
    );
  }

  render() {
    const apps = get(this.props.data, 'allApps', []);
    return (
      <AppItemSlider
        itemsPerPage={3}
      >
        {apps.map(this.renderAppItem)}
      </AppItemSlider>
    );
  }
}
