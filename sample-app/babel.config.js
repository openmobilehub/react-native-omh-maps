const path = require('path');
const fs = require('fs');

const alias = {};

const packagesPath = path.join(__dirname, '..', 'packages');
for (const file of fs.readdirSync(packagesPath)) {
  const packageDirPath = path.join(packagesPath, file);
  const packageJsonPath = path.join(packageDirPath, 'package.json');
  const pak = require(packageJsonPath);

  alias[pak.name] = path.join(packageDirPath, pak.source);
}

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias,
      },
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
