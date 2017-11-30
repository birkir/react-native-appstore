import React, { Children, PureComponent } from 'react';
import { StyleSheet, View, Dimensions, InteractionManager } from 'react-native';
import Divider from 'components/divider';
// import PerformanceCarousel from 'components/carousel';
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

  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
      slides: 1,
      groups: this.getGroups(props),
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      groups: this.getGroups(props),
    });
  }

  @autobind
  onLayout() {
    this.setState({
      width: Dimensions.get('window').width,
    }, this.showAllSlides);
  }

  getGroups({ children, itemsPerPage }) {
    // Setup groups (or pages)
    const childs = Children.toArray(children);
    const groups = [];

    for (let i = 0; i < childs.length; i += itemsPerPage) {
      // Add item to it's group
      groups.push(childs.slice(i, i + itemsPerPage));
    }

    return groups;
  }

  @autobind
  showAllSlides() {
    const { children, itemsPerPage } = this.props;
    InteractionManager.runAfterInteractions(() => {
      const slides = Math.ceil(Children.toArray(children).length / itemsPerPage) + 1;
      this.setState({ slides });
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
    const { slides, width, groups } = this.state;
    const { condensed } = this.props;

    return (
      <View>
        <View style={[styles.host, condensed && styles.host__condensed]} onLayout={this.onLayout}>
          <Carousel
            data={groups.slice(0, slides)}
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
    marginBottom: 16,
  },

  host__condensed: {
    marginBottom: 0,
  },

  item: {
    paddingHorizontal: 5,
  },
});
