# Patch native modules
git apply --directory=node_modules/react-native-navigation ./scripts/patches/rnn-podspec.patch
git apply -v --directory=node_modules/react-native-navigation ./scripts/patches/rnn-search.patch --whitespace=fix
git apply -v --directory=node_modules/react-native-navigation ./scripts/patches/rnn-title-large.patch --whitespace=fix


# Generate dotenv
touch ./ios/Config/GeneratedInfoPlistDotEnv.h
sh ./scripts/dotenv.sh

# Pod install
# if [ -z "$TRAVIS" ]; then
  (cd ios; pod install; cd -)
# fi
