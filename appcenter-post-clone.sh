#!/usr/bin/env bash

# Update NPM
brew update
brew doctor
brew upgrade node
# brew install nvm
# nvm install 8
node --version

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
