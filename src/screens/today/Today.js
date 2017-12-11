import React, { Component } from 'react';
import { StyleSheet, SectionList, SafeAreaView, StatusBar, Text, Animated, View } from 'react-native';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import format from 'date-fns/format';
import isToday from 'date-fns/is_today';
import { autobind } from 'core-decorators';
import SectionHeader from 'components/section-header';
import Card from 'components/card';
import Strong from 'components/strong';
import storiesQuery from 'graphql/queries/stories';
import RenderCell from './components/render-cell';

@storiesQuery
export default class Today extends Component {

  static navigatorStyle = {
    drawUnderTabBar: true,
    navBarHidden: true,
  }

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }

  state = {
    isScrollEnabled: true,
    top: 20,
    left: 0,
    bottom: 200,
    activeCardId: null,
    stories: [],
  }

  componentWillMount() {
    this.state.stories = this.makeStories(this.props);
  }

  componentWillReceiveProps(props) {
    this.setState({
      stories: this.makeStories(props),
    });
  }

  @autobind
  onCardOpenChange(item, isOpen) {
    this.setState({
      // Disable scroll to be extra safe if JS thread hangs.
      isScrollEnabled: !isOpen,
    });

    // AppStore hides the status bar and bottom tabs.
    StatusBar.setHidden(isOpen, 'slide');
    this.props.navigator.toggleTabs({ to: isOpen ? 'hidden' : 'shown', animated: true });
    // Remove Safe area
    Animated.timing(this.top, { toValue: isOpen ? -this.state.top : 0, duration: 330 }).start();
    this.setState({
      activeCardId: item.id,
    });
  }

  @autobind
  onLayout(e) {
    const { layout } = e.nativeEvent;
    this.setState({
      top: layout.y,
      left: layout.x,
    });
  }

  groupStoriesByDay(story) {
    return new Date(story.date).toISOString().substr(0, 10);
  }

  keyExtractor(item) {
    return item.id;
  }

  makeStories(props) {
    const stories = get(props.data, 'allStories', []);
    const days = groupBy(stories, this.groupStoriesByDay);
    return Object.entries(days).map(([date, data]) => ({
      data,
      date: new Date(date),
    }));
  }

  top = new Animated.Value(0);

  @autobind
  renderItem({ item }) {
    const { top, left } = this.state;
    const light = (item.apps.length > 0);
    const backgroundColor = light ? '#fff' : item.backgroundColor;
    return (
      <Card
        {...item}
        backgroundColor={backgroundColor}
        light={light}
        onOpenChange={this.onCardOpenChange}
        onAppPress={this.onAppPress}
        onAppPressIn={this.onAppPressIn}
        top={top}
        left={left}
      >
        {lipsum}
      </Card>
    );
  }

  renderSectionHeader({ section }) {
    if (isToday(section.date)) {
      return (
        <SectionHeader
          title="Today"
          label={format(section.date, 'dddd, MMMM D')}
        />
      );
    }

    return (
      <SectionHeader
        title={format(section.date, 'dddd')}
        label={format(section.date, 'MMMM D')}
      />
    );
  }

  render() {
    const {
      stories,
      top,
      bottom,
      isScrollEnabled,
      activeCardId,
    } = this.state;

    return (
      <View style={styles.flex} testID="TODAY_HOST_VIEW">
        <SafeAreaView style={StyleSheet.absoluteFill}>
          <View onLayout={this.onLayout} />
        </SafeAreaView>

        <SectionList
          style={styles.host}
          scrollEnabled={isScrollEnabled}
          contentContainerStyle={[styles.content, { paddingTop: top, paddingBottom: bottom }]}
          sections={stories}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          keyExtractor={this.keyExtractor}
          stickySectionHeadersEnabled={false}
          extraData={this.state}
          CellRendererComponent={RenderCell}
          activeCardId={activeCardId}
        />

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

  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
});

const lipsum = [
  <Text>
    <Strong>Lorem ipsum dolor sit amet</Strong>, consectetur adipiscing elit.
    Praesent pretium mattis massa, non dictum leo imperdiet sed. Morbi vitae dolor
    luctus, dapibus dui a, elementum mi. Vivamus in commodo erat.
  </Text>,
  <Text>
    Praesent et volutpat erat, ac fermentum tortor. Sed id tristique enim.
    Ut eu odio lobortis, gravida justo in, pulvinar dolor. In eu ullamcorper leo.
    Phasellus faucibus lorem quis tristique gravida. Nulla efficitur libero at imperdiet
    iaculis. Morbi efficitur volutpat iaculis. Suspendisse laoreet condimentum lacinia.
    Maecenas eu justo euismod, porta turpis vitae, elementum est.
  </Text>,
  <Text>
    Nulla dignissim viverra lobortis. Nulla sollicitudin, justo et faucibus elementum,
    lectus nibh tristique ante, vel dapibus dui enim sit amet orci. Sed molestie
    ultricies varius. Proin risus justo, lacinia at suscipit in, commodo sed metus.
    Ut iaculis mi in ante accumsan, quis ultrices est tempor. Mauris eget iaculis augue,
    t iaculis magna. Sed congue neque consequat egestas imperdiet. Integer dictum
    tristique ante, eget volutpat odio gravida euismod. Nullam vel blandit nulla.
    Etiam imperdiet ut magna et varius. Duis porttitor consequat finibus. Vestibulum
    quis est at lacus venenatis ornare. Quisque nunc velit, pulvinar et eros elementum,
    ullamcorper viverra nulla. Nam efficitur ante purus, eget cursus magna dignissim
    sit amet. Morbi blandit dui pharetra magna tempor, et blandit libero interdum.
  </Text>,
  <Text>
    Etiam eleifend feugiat tortor, vel luctus massa. Aliquam lorem risus, dapibus ut
    luctus non, condimentum eget odio. Aenean venenatis arcu dapibus, blandit nunc eu,
    fringilla purus. Quisque dictum felis et orci eleifend, et ultricies diam ornare.
    Sed suscipit, neque quis semper malesuada, diam ex consectetur metus, vel hendrerit
    ex sapien eu justo. Nullam vehicula ex vel ipsum faucibus efficitur. Aenean
    magna metus, volutpat in laoreet et, ornare vestibulum neque. Nunc congue elit
    sed sapien dictum feugiat.
  </Text>,
].map((sentence, i) => React.cloneElement(sentence, { key: `${i + 0}` }));
