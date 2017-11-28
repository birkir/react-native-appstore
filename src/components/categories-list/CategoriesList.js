import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import ListItem from 'components/list-item';
import Divider from 'components/divider';
import { topCategories } from 'graphql/queries/topCategories';

@topCategories
export default class CategoriesList extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
  }

  static defaultProps = {
    data: undefined,
  }

  render() {
    const items = get(this.props.data, 'allCategories', [])
      .slice(0)
      .sort((a, b) => a.title.localeCompare(b.title));

    return (
      <View>
        {items.map((item, i) => (
          <ListItem
            key={item.id}
            label={item.title}
            fontStyle={styles.fontStyle}
            divider={(i + 1) < items.length}
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

  fontStyle: {
    fontFamily: 'SFProText-Regular',
    fontSize: 17,
    color: '#007AFF',
    letterSpacing: -0.41,
    lineHeight: 22,
  },
});
