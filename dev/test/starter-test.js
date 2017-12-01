/*
 var client = require('webdriverio').remote({
    user: "YOUR_SAUCE_USERNAME",
    key: "YOUR_SAUCE_ACCESS_KEY",
    host: "ondemand.saucelabs.com",
    port: 80,
    logLevel: "silent",
    desiredCapabilities: {  
        browserName: 'chrome',
        platform: 'Windows 7',
        version: '43.0'
    }
});
 
client
    .init()
    .url('http://saucelabs.com/test/guinea-pig')
    .getTitle().then(function (title) {
        console.log("title is: " + title);
    })
    .end();
*/


let webdriverio = require('webdriverio');

let options = {
  desiredCapabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        '--headless'
      ]
    }
  }
};


webdriverio
  .remote(options)
  .init()
  .url('http://www.google.com')
  .getTitle().then(function(title) {
    console.log('Title was: ' + title);
  })
  .end()
  .catch(function(err) {
    console.log(err);
  });
