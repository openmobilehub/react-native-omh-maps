PACKAGE_VERSION=$(jq -r .version < lerna.json)
git fetch --tags

echo "PACKAGE_VERSION=${PACKAGE_VERSION}" >> $GITHUB_OUTPUT

if git tag | grep -x "v${PACKAGE_VERSION}" > /dev/null; then
  echo "Version: ${PACKAGE_VERSION} already exists. Skipping..."

  echo "VERSION_CHANGED=false" >> $GITHUB_OUTPUT
else
  echo "New version detected: ${PACKAGE_VERSION}"

  echo "VERSION_CHANGED=true" >> $GITHUB_OUTPUT
fi