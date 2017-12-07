import React, { Component } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, StatusBar, Animated, View } from 'react-native';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import SectionHeader from 'components/section-header';
import cards from './Today.cards';

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
    openIndex: -1,
  }

  @autobind
  onCardOpenChange(item, isOpen) {
    this.setState({
      // Disable scroll to be extra safe if JS thread hangs.
      isScrollEnabled: !isOpen,
      openIndex: item.index,
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
    const { top, isScrollEnabled, openIndex } = this.state;
    return (
      <View style={styles.flex} testID="TODAY_HOST_VIEW">
        <SafeAreaView style={StyleSheet.absoluteFill}>
          <View onLayout={this.onLayout} />
        </SafeAreaView>

        <ScrollView
          style={styles.host}
          scrollEnabled={isScrollEnabled}
          contentContainerStyle={[styles.content, { paddingTop: top }]}
        >
          <SectionHeader title="Today" label="Thursday, November 9" />
          {cards.map((card, index) => React.cloneElement(card, {
            key: card.label,
            onOpenChange: this.onCardOpenChange,
            zIndex: openIndex === index ? 10 : 0,
            index,
          }))}
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
    padding: 18,
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
