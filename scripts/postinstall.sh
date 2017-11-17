# Patch native modules
git apply --directory=node_modules/react-native-navigation ./scripts/patches/rnn-podspec.patch
git apply --directory=node_modules/react-native-navigation ./scripts/patches/rnn-title-large.patch
git apply --directory=node_modules/react-native-navigation ./scripts/patches/rnn-search.patch


# Generate dotenv
touch ./ios/Config/GeneratedInfoPlistDotEnv.h
sh ./scripts/dotenv.sh

# Pod install
(cd ios; pod install; cd -)
