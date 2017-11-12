import React, { Children, PureComponent } from 'react';
import { StyleSheet, ScrollView, View, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';

const { width, height } = Dimensions.get('window');
const itemWidth = width - 30;

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
    width: 0,
    minHeight: 0,
  }

  @autobind
  onLayout(e) {
    const { width } = e.nativeEvent.layout;
    this.setState({ width });
  }

  @autobind
  onPageLayout(e) {
    const { height } = e.nativeEvent.layout;
    this.setState({
      minHeight: Math.min(this.state.minHeight, height),
    });
  }

  renderItem({ item, index }) {
    return (
      <View style={styles.item}>
        {Children.toArray(item)}
      </View>
    );
  }

  render() {
    const { itemsPerPage, children } = this.props;
    const childs = Children.toArray(children);
    const groups = [];

    for (let i = 0; i < childs.length; i += itemsPerPage) {
      groups.push(childs.slice(i, i + itemsPerPage));
    }

    return (
      <View style={styles.host}>
        <Carousel
          data={groups}
          renderItem={this.renderItem}
          sliderWidth={width}
          itemWidth={width - 30}
          activeSlideAlignment="center"
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
        />
        <View style={styles.border} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    marginHorizontal: -20,
  },

  item: {
    width: width - 30,
    paddingHorizontal: 5,
    marginBottom: -16,
  },

  border: {
    marginTop: 35,
    backgroundColor: '#CDCDCD',
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
});
