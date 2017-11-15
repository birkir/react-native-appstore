import React, { Component } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, StatusBar, Animated, View } from 'react-native';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import SectionHeader from 'components/section-header';
import Card from 'components/card';

export default class Today extends Component {

  static navigatorStyle = {
    drawUnderTabBar: true,
    navBarHidden: true,
  }

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  static defaultProps = {
  }

  state = {
    isScrollEnabled: true,
    top: 20,
    cards: [{
      id: '1',
      legend: 'What we\'re playing',
      title: 'Words Without Friends',
      imageUrl: 'https://petapixel.com/assets/uploads/2017/01/Official_portrait_of_Barack_Obama.jpg',
    }, {
      id: '2',
      legend: 'What we\'re playing',
      title: 'Words Without Friends',
      imageUrl: 'https://cdn.dribbble.com/users/40433/screenshots/3709382/untitled-1.png',
    }, {
      id: '3',
      legend: 'What we\'re playing',
      title: 'Words Without Friends',
      imageUrl: 'https://cdn.dribbble.com/users/40433/screenshots/3891558/dr4.png',
    }],
  }

  @autobind
  onCardOpenChange(item, isOpen) {
    this.setState({
      // Disable scroll to be extra safe if JS thread hangs.
      isScrollEnabled: !isOpen,
      // Remap cards with correct zIndex (for visible stacking)
      cards: this.state.cards.map(card => ({
        ...card,
        zIndex: (card.id === item.id) ? 10 : 0,
      })),
    });

    // AppStore hides the status bar and bottom tabs.
    StatusBar.setHidden(isOpen, 'slide');
    this.props.navigator.toggleTabs({ to: isOpen ? 'hidden' : 'shown', animated: true });
    // Remove Safe area
    Animated.timing(this.top, { toValue: isOpen ? -this.state.top : 0, duration: 330 }).start();
  }

  @autobind
  onLayout(e) {
    this.setState({
      top: e.nativeEvent.layout.y,
    });
  }

  top = new Animated.Value(0);

  render() {
    const { top, cards, isScrollEnabled } = this.state;
    return (
      <View style={styles.flex}>
        <SafeAreaView style={StyleSheet.absoluteFill}>
          <View onLayout={this.onLayout} />
        </SafeAreaView>

        <ScrollView
          style={styles.host}
          scrollEnabled={isScrollEnabled}
          contentContainerStyle={[styles.content, { paddingTop: top }]}
        >
          <SectionHeader title="Today" label="Thursday, November 9" />
          {cards.map(card => (
            <Card
              {...card}
              key={card.id}
              onOpenChange={this.onCardOpenChange}
            />
          ))}
          <View style={styles.gutter} />
        </ScrollView>

        <Animated.View
          style={[styles.top, { height: top, transform: [{ translateY: this.top }] }]}
          pointerEvents="none"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  host: {
    flex: 1,
    padding: 16,
    marginBottom: -100,
  },

  gutter: {
    height: 200,
  },

  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
});
