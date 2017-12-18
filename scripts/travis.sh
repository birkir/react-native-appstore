export SENTRY_PROPERTIES=./ios/sentry.properties

TRAVIS_BUILD=0

if [[ "$TRAVIS_BRANCH" == "master" ]]; then

  # Foreach commit
  LAST_VERSION=$(git log -g --grep='\[travisbuild\]' -1 | grep -o -E -e "[0-9a-f]{40}")
  TRIGGER_IOS=$(git rev-list $LAST_VERSION..$TRAVIS_COMMIT | xargs -L1 git diff-tree --no-commit-id --name-only -r | grep "^ios")
  TRIGGER_BUILD="$(git rev-list $LAST_VERSION..$TRAVIS_COMMIT | xargs -L1 git rev-list --format=%B --max-count=1 | grep "\[skip ci\]")"

  if [[ "$TRIGGER_IOS" != "" ]]; then
    echo "Why? iOS folder did change in the past:"
    echo "$TRIGGER_IOS"
    echo ""
    TRAVIS_BUILD=1
  fi

  if [[ "$TRIGGER_BUILD" != "" ]]; then
    echo "Why? [BUILD] message in the past:"
    echo "$TRIGGER_BUILD"
    echo ""
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
