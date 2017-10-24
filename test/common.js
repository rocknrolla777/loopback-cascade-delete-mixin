
/* exported global */
var chai = require('chai');
chai.use(require('sinon-chai'));

global.loopback = require('loopback');

// auto attach data sources to models
// global.loopback.autoAttach();
chai.config.includeStack = true;

global.expect = chai.expect;
global.sinon = require('sinon');
