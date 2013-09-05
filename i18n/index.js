'use strict';
var util = require('util');
var path = require('path');
var ScriptBase = require('../script-base.js');
var cat = require('shelljs').cat;
var mkdirp = require('mkdirp');

module.exports = Generator;

function Generator() {
  ScriptBase.apply(this, arguments);

}

util.inherits(Generator, ScriptBase);

Generator.prototype.createLocalizedAngular = function() {

  var localeFilePath = path.join(process.cwd(),
          '/app/bower_components/angular-i18n' + '/angular-locale_' + this.name + '.js'),

      ngFilePath = path.join(process.cwd(), '/app/bower_components/angular/angular.js'),

      that = this;

  mkdirp(path.join(process.cwd(), '/app/scripts/i18n'), function(err) {

    cat(ngFilePath, localeFilePath).to(path.join(process.cwd(), '/app/scripts/i18n/angular_' + that.name + '.js'));

  });

};


