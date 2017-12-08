import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import CategoryRow from 'components/category-row';
import Divider from 'components/divider';
import { CATEGORY_SCREEN } from 'screens';
import { topCategories } from 'graphql/queries/topCategories';
import { autobind } from 'core-decorators';

@topCategories
export default class CategoriesList extends PureComponent {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    data: PropTypes.object,
  }

  static defaultProps = {
    data: undefined,
  }

  @autobind
  onCategoryPress({ id }) {
    this.props.navigator.push({
      screen: CATEGORY_SCREEN,
      passProps: {
        categoryId: id,
      },
    });
  }

  render() {
    const items = get(this.props.data, 'allCategories', [])
      .slice(0)
      .sort((a, b) => a.title.localeCompare(b.title));

    return (
      <View>
        {items.map((item, i) => (
          <CategoryRow
            {...item}
            key={item.id}
            divider={(i + 1) < items.length}
            onPress={this.onCategoryPress}
          />
        ))}
        <View style={styles.spacing} />
        <Divider />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spacing: {
    height: 20,
  },
});
