import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Divider from '../Divider';

test('renders correctly', () => {
  const tree = renderer.create(<Divider gutter />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('[gutter] adds style including marginVertical', () => {
  const divider = shallow(<Divider gutter />);
  expect(divider.prop('style').find(item => !!item.marginVertical)).toBeTruthy();
});
