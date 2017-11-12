import React, { Component } from 'react';
import { StyleSheet, Animated, View, Text } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { autorun } from 'mobx';
import PropTypes from 'prop-types';

@inject('ui')
@observer
export default class Navbar extends Component {
  static propTypes = {
    id: PropTypes.string,
    ui: PropTypes.object.isRequired,
  }

  static defaultProps = {
    id: undefined,
  }

  componentDidMount() {
    this.props.ui.navBar = this;
    autorun(() => {
      const toValue = Number(this.props.ui.navBarVisible);
      Animated.spring(this.opacity, { toValue }).start();
    })
  }

  componentWillUnmount() {
    this.props.ui.navBar = null;
  }

  close() {
    this.props.navigator.dismissLightBox();
  }

  opacity = new Animated.Value(1);

  render() {
    const { opacity } = this;
    return (
      <Animated.View style={[styles.host, { opacity }]} />
    );
  }
}

const styles = StyleSheet.create({
  host: {
    position: 'absolute',
    top: -420,
    left: -300,
    width: 500,
    height: 100,
    backgroundColor: '#FFFFFF',
  },
});
