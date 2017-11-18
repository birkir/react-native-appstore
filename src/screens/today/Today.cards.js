import React from 'react';
import { Text } from 'react-native';
import Card from 'components/card';
import Strong from 'components/strong';

const appSubwaySurfers = {
  imageUrl: 'https://www.todoapk.net/wp-content/uploads/2017/06/csr-racing-2.png',
  title: 'CSR 2',
  subtitle: 'New exciting tournament game mode!',
  action: 'GET',
};

const appSnapChat = {
  imageUrl: 'https://lh4.ggpht.com/vdK_CsMSsJoYvJpYgaj91fiJ1T8rnSHHbXL0Em378kQaaf_BGyvUek2aU9z2qbxJCAFV=w300',
  title: 'Snapchat',
  subtitle: 'Life is more fun when you live in the moment :)',
  action: 'GET',
};

const app = appSubwaySurfers;

const text = [
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

const cards = [
  <Card
    legend="Try something new"
    title="Make Your Own Manga"
    imageUrl="https://cdn.dribbble.com/users/3856/screenshots/3426436/nylas.jpg"
    children={text} // eslint-disable-line
  />,
  <Card
    frosted
    legend="Play with friends"
    title="Board Games Gone Digital"
    imageUrl="https://cdn.dribbble.com/users/3856/screenshots/2995924/linda-zero-ueno.jpg"
    children={text} // eslint-disable-line
  />,
  <Card
    hero
    title="Game of the day"
    imageUrl="https://metrouk2.files.wordpress.com/2017/10/gran-turismo-sport-1.jpg?w=748&h=420&crop=1"
    app={appSubwaySurfers}
  />,
  <Card
    hero
    title="App of the day"
    imageUrl="https://cdn.dribbble.com/users/206558/screenshots/1478213/snapchat.jpg"
    app={appSnapChat}
  />,
  <Card
    legend="Pro tip"
    title="Book a Hotel Fast"
    imageUrl="https://d85wutc1n854v.cloudfront.net/live/products/600x375/WB0C71GLN.png?v=1.0"
    light
    app={app}
    children={text} // eslint-disable-line
  />,
  <Card
    legend="The daily list"
    title="Cooking Videos Galore"
    apps={[app, app, app, app, app, app, app, app]}
  />,
  <Card
    legend="Let's play"
    title="Train Games on the Right Track"
    imageUrl="https://cdn.dribbble.com/users/40433/screenshots/3709382/untitled-1.png"
    children={text} // eslint-disable-line
  />,
  <Card
    legend="Deep dive"
    title="Where Co-Op Is King"
    subtitle="Lineage 2's massively multiplayer battles will blow you away."
    imageUrl="https://icdn1.digitaltrends.com/image/zombiemode04-3840x2160.jpg"
    children={text} // eslint-disable-line
  />,
].map(card => ({ ...card, key: Math.random() }));

export default cards;
