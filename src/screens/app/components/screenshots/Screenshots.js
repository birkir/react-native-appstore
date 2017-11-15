import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
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
        <Text>[] iPhone</Text>
        <Text>Summary here</Text>
        <View style={styles.border} />
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
});
