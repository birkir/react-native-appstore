import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Button from 'components/button';
import PropTypes from 'prop-types';

export default class Header extends PureComponent {

  static propTypes = {
    iconUrl: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    action: PropTypes.shape({
      onPress: PropTypes.func,
      subtitle: PropTypes.string,
      loading: PropTypes.bool,
    }),
  }

  static defaultProps = {
    iconUrl: undefined,
    title: undefined,
    subtitle: undefined,
    action: undefined,
  }

  render() {
    const {
      iconUrl,
      title,
      subtitle,
      action,
    } = this.props;
    return (
      <View style={styles.host}>
        <Image source={{ uri: iconUrl }} style={styles.icon} />
        <View style={styles.content}>
          <Text style={styles.content__title} numberOfLines={2}>{title}</Text>
          <Text style={styles.content__subtitle} numberOfLines={1}>{subtitle}</Text>
          <View style={styles.content__actions}>
            <Button
              blue
              subtitle={action.subtitle}
              horizontal
              align="left"
              loading={action.loading}
              onPress={action.onPress}
            >
              {action.label}
            </Button>
            <Button blue>...</Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  host: {
    flexDirection: 'row',
    marginBottom: 34,
  },

  content: {
    flex: 1,
  },

  icon: {
    width: 125,
    height: 125,
    borderRadius: 28,
    marginRight: 16,
  },

  content__title: {
    fontWeight: '500',
    fontSize: 24,
    color: '#000000',
    letterSpacing: -1.1,
  },

  content__subtitle: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.45)',
    letterSpacing: -0.33,
  },

  content__actions: {
    position: 'absolute',
    bottom: 1,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

});
