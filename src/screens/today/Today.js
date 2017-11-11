import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import SectionHeader from './components/section-header';
import Card from './components/card';

export default class Today extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    drawUnderTabBar: true,
  }

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  static defaultProps = {
  }

  state = {
    isScrollEnabled: true,
  }

  @autobind
  onCardOpenChange(isOpen) {
    // this.props.navigator.toggleTabs({
    //   to: isOpen ? 'hidden' : 'shown',
    //   animated: false,
    // });
    StatusBar.setHidden(isOpen, true);
    this.setState({
      isScrollEnabled: !isOpen,
    });
  }

  render() {
    return (
      <ScrollView style={styles.host} scrollEnabled={this.state.isScrollEnabled}>
        <SectionHeader title="Today" label="Thursday, November 9" />
        <Card
          legend="What we're playing"
          title="Words Without Friends"
          onOpenChange={this.onCardOpenChange}
          imageUrl="https://petapixel.com/assets/uploads/2017/01/Official_portrait_of_Barack_Obama.jpg"
        />
        <Card
          legend="What we're playing"
          title="Words Without Friends"
          onOpenChange={this.onCardOpenChange}
          imageUrl="https://cdn.dribbble.com/users/40433/screenshots/3709382/untitled-1.png"
        />
        <Card
          onOpenChange={this.onCardOpenChange}
          imageUrl="https://cdn.dribbble.com/users/40433/screenshots/3891558/dr4.png"
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    padding: 20,
  },
});
