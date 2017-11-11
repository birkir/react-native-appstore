import React, { Component } from 'react';
import { StyleSheet, ScrollView, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import SectionHeader from 'components/section-header';
import Card from 'components/card';

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
  }

  render() {
    return (
      <ScrollView style={styles.host} scrollEnabled={this.state.isScrollEnabled}>
        <SectionHeader title="Today" label="Thursday, November 9" />
        {this.state.cards.map(card => (
          <Card
            {...card}
            key={card.id}
            onOpenChange={this.onCardOpenChange}
          />
        ))}
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
