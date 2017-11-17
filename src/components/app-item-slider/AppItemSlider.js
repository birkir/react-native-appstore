import React, { Children, PureComponent } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Divider from 'components/divider';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';

const { width: initialWidth } = Dimensions.get('window');

export default class AppItemSlider extends PureComponent {

  static propTypes = {
    itemsPerPage: PropTypes.number,
    children: PropTypes.node,
  }

  static defaultProps = {
    itemsPerPage: 3,
    children: undefined,
  }

  state = {
    width: initialWidth,
  }

  @autobind
  onLayout() {
    const { width } = Dimensions.get('window');
    this.setState({
      width,
    });
  }

  @autobind
  renderItem({ item }) {
    return (
      <View style={[styles.item, { width: this.state.width - 30 }]}>
        {Children.toArray(item)}
      </View>
    );
  }

  render() {
    const { width } = this.state;
    const { itemsPerPage, children } = this.props;
    const childs = Children.toArray(children);
    const groups = [];

    for (let i = 0; i < childs.length; i += itemsPerPage) {
      groups.push(childs.slice(i, i + itemsPerPage));
    }

    return (
      <View>
        <View style={styles.host} onLayout={this.onLayout}>
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
    marginBottom: 24,
  },

  item: {
    paddingHorizontal: 5,
    marginBottom: -16,
  },
});
