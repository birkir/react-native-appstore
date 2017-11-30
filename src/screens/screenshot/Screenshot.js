import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { inject } from 'mobx-react/native';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import { autobind } from 'core-decorators';

@inject('ui')
export default class Screenshot extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    screenshots: PropTypes.array,
    index: PropTypes.number,
    gutter: PropTypes.number,
  }

  static defaultProps = {
    screenshots: [],
    index: 0,
    gutter: 30,
  }

  static navigatorStyle = {
    navBarNoBorder: true,
  }

  static navigatorButtons = {
    rightButtons: [{
      id: 'close',
      title: 'Close',
    }],
  }

  constructor(props) {
    super(props);
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  state = {
    width: Dimensions.get('window').width,
  }

  @autobind
  onNavigatorEvent(e) {
    const { id, type } = e;

    if (type === 'NavBarButtonPress') {
      if (id === 'close') {
        // Hack to hide the navbar border
        this.props.navigator.setStyle({ navBarTransparent: false });
        this.props.navigator.dismissModal();
      }
    }

    if (id === 'willDisappear') {
      if (this.props.ui.appScreenHeaderVisible) {
        // Show the header again if it was previously visible.
        // TODO: this logic should be moved and maintained inside the App screen. Somehow.
        this.props.ui.appScreenHeaderOpacity.setValue(1);
      }
    }
  }

  @autobind
  onLayout() {
    this.setState({
      width: Dimensions.get('window').width,
    });
  }

  @autobind
  renderItem({ index }) {
    // const paddingLeft = index === 0 ? 20 : 5;
    const width = this.state.width - this.props.gutter;
    return (
      <View style={[styles.screenshot, { width }]}>
        <View style={styles.screenshot__mock}>
          <Text style={styles.screenshot__text}>{index}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { width } = this.state;
    const { index, screenshots, gutter } = this.props;
    return (
      <View style={styles.host}>
        <Carousel
          data={screenshots}
          renderItem={this.renderItem}
          sliderWidth={width}
          itemWidth={width - gutter}
          activeSlideAlignment="center"
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          firstItem={index}
          contentContainerCustomStyle={styles.content}
          apparitionDelay={0}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    paddingBottom: 64,
  },

  content: {
    alignItems: 'center',
  },

  screenshot: {
    paddingHorizontal: 5,
  },

  screenshot__mock: {
    aspectRatio: 0.88,
    borderRadius: 15,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  screenshot__text: {
    fontSize: 22,
    color: '#AAA',
  },

});
