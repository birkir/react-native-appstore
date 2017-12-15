export SENTRY_PROPERTIES=./ios/sentry.properties

TRAVIS_BUILD=0

if [[ "$TRAVIS_BRANCH" == "master" ]]; then

  # Find last commit hash that changed ./ios folder contents or had [BUILD] flag in it.
  # Find last commit that was successfully built
  IOS_COMMIT=$(git log --name-status -1 ios | grep -o -E -e "[0-9a-f]{40}")
  BUILD_COMMIT=$(git log -g --grep='\[BUILD\]' -1 | grep -o -E -e "[0-9a-f]{40}")
  VERSION_COMMIT=$(git log -g --grep='\[travisbuild\]' -1 | grep -o -E -e "[0-9a-f]{40}")
  IOS_OLDER=$(git rev-list --boundary $IOS_COMMIT..$VERSION_COMMIT)
  BUILD_OLDER=$(git rev-list --boundary $BUILD_COMMIT..$VERSION_COMMIT)

  echo "[ios] commit $IOS_COMMIT"
  echo "[build] commit $BUILD_COMMIT"
  echo "[version] commit $VERSION_COMMIT"

  if [[ "$IOS_OLDER" == "" ]]; then
    echo "Why? iOS folder did change in the past"
    TRAVIS_BUILD=1
  fi

  if [[ "$BUILD_OLDER" == "" ]]; then
    echo "Why? [BUILD] message in the past"
    TRAVIS_BUILD=1
  fi

  if [[ "$TRAVIS_COMMIT" == "$IOS_COMMIT" ]]; then
    echo "Why? iOS folder changed now"
    TRAVIS_BUILD=1
  fi

  if [[ "$TRAVIS_COMMIT_MESSAGE" == *"[BUILD]"* ]]; then
    echo "Why? [BUILD] message now"
    TRAVIS_BUILD=1
  fi

  if [[ "$TRAVIS_COMMIT_MESSAGE" == *"[NOBUILD]"* ]]; then
  echo "Why? [NOBUILD] message now"
    TRAVIS_BUILD=0
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
