import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import CategoryRow from 'components/category-row';
import get from 'lodash/get';
import { COLLECTIONS_SCREEN } from 'screens';
import { autobind } from 'core-decorators';
import categoriesWithProps from 'graphql/queries/categories';

@categoriesWithProps
export default class Categories extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }

  static navigatorStyle = {
    prefersLargeTitles: false,
  }

  @autobind
  onCategoryPress({ id }) {
    this.props.navigator.push({
      screen: COLLECTIONS_SCREEN,
      passProps: {
        categoryId: id,
      },
    });
  }

  renderCategory(category, i, categories) {
    return (
      <CategoryRow
        {...category}
        key={category.id}
        divider={(i + 1) < categories.length}
        onPress={this.onCategoryPress}
      />
    );
  }

  render() {
    const { data } = this.props;
    const categories = get(data, 'allCategories', get(this.props, 'categories', []));
    return (
      <ScrollView style={styles.host}>
        {categories.map(this.renderCategory)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
