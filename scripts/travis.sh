export SENTRY_PROPERTIES=./ios/sentry.properties

TRAVIS_BUILD=0

if [[ "$TRAVIS_BRANCH" == "master" ]]; then

  # Check last commit hash that changed ./ios folder contents
  LAST_IOS_COMMIT=$(git log --name-status -1 ios | grep -o -E -e "[0-9a-f]{40}")

  if [[ "$TRAVIS_COMMIT" == "$LAST_IOS_COMMIT" ]]; then
    TRAVIS_BUILD=1
  fi

  if [[ "$TRAVIS_COMMIT_MESSAGE" == *"[NOBUILD]"* ]]; then
    TRAVIS_BUILD=0
  fi

  if [[ "$TRAVIS_COMMIT_MESSAGE" == *"[BUILD]"* ]]; then
    TRAVIS_BUILD=1
  fi
fi

if [[ "$TRAVIS_BUILD" == "1" ]]; then
  echo "Build? YES"
  (cd ios; fastlane travis; cd -)
else
  echo "Build? No"
  code-push login --accessKey $CODE_PUSH_ACCESS_KEY
  code-push release-react Ueno./AppStoreClone-iOS ios --outputDir build --plistFile ./ios/AppStoreClone/Info.plist --description "$TRAVIS_COMMIT_MESSAGE"
  sentry-cli react-native codepush Ueno./AppStoreClone-iOS ios ./build --bundle-id $BUNDLE_ID
fi
