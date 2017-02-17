/* eslint-disable no-console */
const exec = require('child_process').exec;
const fs = require('fs');

const config = {
  build: {},
};

function writeConfigFile() {
  fs.writeFile('build/public/config.json', JSON.stringify(config), (err) => {
    if (err) {
      return console.error(err);
    }
    return console.log('Config file saved');
  });
}

exec('git log -n 1 --pretty=format:"%H"', (err, stdout) => {
  if (stdout) {
    config.build.hash = stdout;
    config.build.time = new Date();
    writeConfigFile();
  }
});
