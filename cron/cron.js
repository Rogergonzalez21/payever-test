/* eslint no-console: off */
const fs = require('fs');
const axios = require('axios');

async function writeToJSON() {
  let times = 1;
  if (fs.existsSync('cron/times.txt')) {
    times = fs.readFileSync('cron/times.txt', 'utf8');
  }
  fs.writeFile('cron/times.txt', parseInt(times + 1, 10), 'utf8', err => {
    if (err) {
      console.log('An error occured while writing JSON Object to File.');
      return console.log(err);
    }
    return undefined;
  });
  const response = await axios.get(`https://reqres.in/api/users?page=${times}`);

  let old = [];
  if (fs.existsSync('cron/users.json')) {
    old = JSON.parse(fs.readFileSync('cron/users.json', 'utf8'));
  }
  const json = old.concat(response.data.data);

  fs.writeFile('cron/users.json', JSON.stringify(json), 'utf8', err => {
    if (err) {
      console.log('An error occured while writing JSON Object to File.');
      return console.log(err);
    }
    return console.log('JSON file has been saved.');
  });
}

writeToJSON();
