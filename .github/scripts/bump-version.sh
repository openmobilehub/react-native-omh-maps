#!/bin/bash

yarn lerna version --no-push --no-git-tag-version --no-changelog --no-private

PACKAGE_VERSION=$(awk -F: '/"version"/ { gsub(/[,"]/,"",$2); gsub(/^[ \t]+|[ \t]+$/, "", $2); print $2; exit }' lerna.json)

echo "Creating a release branch..."
git checkout -b "v$PACKAGE_VERSION"
git add -A
git commit -s -S -m "chore: release v$PACKAGE_VERSION"
git push origin "v$PACKAGE_VERSION"

echo ""
echo "Release branch created"
echo "Please create a pull request to merge the release branch into main"
echo "https://github.com/openmobilehub/react-native-omh-auth/pull/new/v${PACKAGE_VERSION}"