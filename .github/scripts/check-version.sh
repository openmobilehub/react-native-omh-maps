PACKAGE_VERSION=$(jq -r .version < lerna.json)
git fetch --tags

if git tag | grep -x "v${PACKAGE_VERSION}" > /dev/null; then
  echo "Version ${PACKAGE_VERSION} already exists, no new tag created."
  echo "version_changed=false" >> $GITHUB_ENV
else
  echo "New version detected: ${PACKAGE_VERSION}"
  echo "version_changed=true" >> $GITHUB_ENV
  echo "PACKAGE_VERSION=${PACKAGE_VERSION}" >> $GITHUB_ENV
fi
