// An example configuration file.
exports.config = {

  baseUrl: 'http://127.0.0.1:9000/',

  // Choose one of the following

  // A: Do not start a Selenium Standalone sever - only run this using chrome.
  // chromeOnly: true,
  // chromeDriver: './node_modules/protractor/selenium/chromedriver',

  // B: Do start a Selenium Standalone server:
  seleniumAddress: 'http://0.0.0.0:4444/wd/hub',

  // --------------------------------------------

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['test/e2e/**/*_spec.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
