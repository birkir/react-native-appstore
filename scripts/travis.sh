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
  # match(
  #   type: "appstore",
  #   git_url: "git@github.com:ueno/ios-certs.git",
  #   readonly: true
  # )
  # ensure_git_branch(branch: "master")
  # git_stash
  # path = "ios/AppStoreClone.xcodeproj"
  # increment_build_number(xcodeproj: path)
  # version = get_version_number(xcodeproj: path)
  # build = get_build_number(xcodeproj: path)
  # commit_version_bump(message: "Version #{version} (build #{build}) [skip ci]")
  # add_git_tag(tag: "v#{version}-#{build}")
  # push_to_git_remote
  #
  # gym(
  #   scheme: "AppStoreClone",
  #   workspace: "ios/AppStoreClone.xcworkspace",
  #   output_directory: "ios/build",
  #   configuration: "Release",
  #   export_method: "app-store"
  # )
  # testflight(
  #   app_identifier: "com.ueno.appstoreclone",
  #   username: "ci@ueno.co",
  #   skip_waiting_for_build_processing: true
  # )
  # # Slack message
else
  echo "Build? No"
  # # Release codepush
  # code-push release-react AppStoreClone ios --outputDir build
  # # Upload sourcemaps to Sentry
  # sentry-cli react-native codepush AppStoreClone ios ./build
  # # Slack message
fi
