#!/usr/bin/env bash

# Generate ios/AppStoreClone/GoogleService-Info.plist
if [ ! -z "$GEN_GOOGLESERVICE_INFO_PLIST" ]; then
  echo $GEN_GOOGLESERVICE_INFO_PLIST | base64 --decode > ios/AppStoreClone/GoogleService-Info.plist
fi

# Generate ios/sentry.properties
if [ ! -z "$GEN_SENTRY_PROPERTIES" ]; then
  echo $GEN_SENTRY_PROPERTIES | base64 --decode > sentry.properties
fi
