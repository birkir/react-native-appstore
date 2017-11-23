import React, { Children, PureComponent } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Divider from 'components/divider';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';

/**
 * App Item Slider
 * Groups a list of components into `Pages` that are slidable.
 * @todo Better general naming for the component?
 */
export default class AppItemSlider extends PureComponent {

  static propTypes = {
    itemsPerPage: PropTypes.number,
    condensed: PropTypes.bool,
    children: PropTypes.node,
  }

  static defaultProps = {
    itemsPerPage: 1,
    condensed: false,
    children: undefined,
  }

  state = {
    width: Dimensions.get('window').width,
  }

  // Fired when layout changes
  @autobind
  onLayout() {
    this.setState({
      width: Dimensions.get('window').width,
    });
  }

  @autobind
  renderItem({ item }) {
    const { width } = this.state;
    return (
      <View style={[styles.item, { width: (width - 30) }]}>
        {Children.toArray(item)}
      </View>
    );
  }

  render() {
    const { width } = this.state;
    const { itemsPerPage, children, condensed } = this.props;

    // Setup groups (or pages)
    const childs = Children.toArray(children);
    const groups = [];

    for (let i = 0; i < childs.length; i += itemsPerPage) {
      // Add item to it's group
      groups.push(childs.slice(i, i + itemsPerPage));
    }

    return (
      <View>
        <View style={[styles.host, condensed && styles.host__condensed]} onLayout={this.onLayout}>
          <Carousel
            data={groups}
            renderItem={this.renderItem}
            sliderWidth={width}
            itemWidth={width - 30}
            activeSlideAlignment="center"
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
          />
        </View>
        <Divider />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    marginHorizontal: -20,
    marginBottom: 32,
  },

  host__condensed: {
    marginBottom: 0,
  },

  item: {
    paddingHorizontal: 5,
    marginBottom: -16,
  },
});
