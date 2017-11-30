import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Divider from 'components/divider';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';

export default class Screenshots extends PureComponent {

  static propTypes = {
    data: PropTypes.array,
  }

  static defaultProps = {
    data: {},
  }

  state = {
    width: Dimensions.get('window').width,
  }

  @autobind
  onLayout() {
    this.setState({
      width: Dimensions.get('window').width,
    });
  }

  renderItem({ index }) {
    const paddingLeft = index === 0 ? 20 : 5;
    return (
      <View style={[styles.screenshot, { paddingLeft }]}>
        <View style={styles.screenshot__mock} />
      </View>
    );
  }

  render() {
    const { width } = this.state;
    return (
      <View style={styles.host} onLayout={this.onLayout}>
        <View style={styles.slider}>
          <Carousel
            data={this.props.data[0].screenshots}
            renderItem={this.renderItem}
            sliderWidth={width}
            itemWidth={234}
            activeSlideAlignment="start"
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
          />
        </View>
        <Text style={styles.offering}>Offers iPhone App</Text>
        <Divider />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
  },

  slider: {
    marginHorizontal: -20,
  },

  screenshot: {
    paddingHorizontal: 5,
  },

  screenshot__mock: {
    height: 415,
    width: 225,
    borderRadius: 15,
    backgroundColor: '#EEE',
  },

  offering: {
    fontFamily: 'SFProText-Regular',
    fontWeight: '500',
    fontSize: 13,
    color: '#8E8E93',
    letterSpacing: -0.1,
    paddingTop: 8,
    paddingBottom: 16,
  },
});
