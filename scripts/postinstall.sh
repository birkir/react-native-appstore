# Add podspecs
git apply --directory=node_modules/react-native-navigation ./scripts/patches/react-native-navigation.patch
git apply --directory=node_modules/react-native-navigation ./scripts/patches/0001-Allow-large-titles.patch
cp ./scripts/patches/lightbox-touchthrough-animated.patch ./node_modules/react-native-navigation/ios/RCCLightBox.m

# Generate dotenv
touch ./ios/Config/GeneratedInfoPlistDotEnv.h
sh ./scripts/dotenv.sh

# Pod install
(cd ios; pod install; cd -)
