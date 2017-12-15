# Patch native modules
git apply --directory=node_modules/react-native-navigation ./scripts/patches/rnn-podspec.patch
git apply -v --directory=node_modules/react-native-navigation ./scripts/patches/rnn-search.patch --whitespace=fix
git apply -v --directory=node_modules/react-native-navigation ./scripts/patches/rnn-title-large.patch --whitespace=fix

# Setup environment
if [ ! -z "$TRAVIS" ]; then
  # Generate ios/AppStoreClone/GoogleService-Info.plist
  if [ ! -z "$GEN_GOOGLESERVICE_INFO_PLIST" ]; then
    echo $GEN_GOOGLESERVICE_INFO_PLIST | base64 --decode > ios/AppStoreClone/GoogleService-Info.plist
  fi

  # Generate ios/sentry.properties
  if [ ! -z "$GEN_SENTRY_PROPERTIES" ]; then
    echo $GEN_SENTRY_PROPERTIES | base64 --decode > ios/sentry.properties
  fi

  # Generate .env
  for KEY in $(cat .env_example | sed 's/\"/\\\"/g' | sed -n 's|\(.*\)=\(.*\)|\1|p'); do
    echo "$KEY=$(printf '%s\n' "${!KEY}")" >> .env
  done
fi

# Generate dotenv
touch ./ios/Config/GeneratedInfoPlistDotEnv.h
sh ./scripts/dotenv.sh

# Pod install
if [ ! -z "$TRAVIS" ]; then
  (cd ios; pod install --repo-update; cd -)
else
  (cd ios; pod install; cd -)
fi
