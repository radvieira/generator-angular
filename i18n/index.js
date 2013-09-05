'use strict';
var util = require('util');
var path = require('path');
var ScriptBase = require('../script-base.js');
var cat = require('shelljs').cat;
var mkdirp = require('mkdirp');
var fs = require('fs');

var ngFilePath = path.join(process.cwd(), '/app/bower_components/angular/angular.js');

module.exports = Generator;

function Generator() {
  ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createLocalizedAngular = function() {

  var localeFilePath = path.join(process.cwd(),
          '/app/bower_components/angular-i18n' + '/angular-locale_' + this.name + '.js'),
      localizedAngularJSPath = path.join(process.cwd(), '/app/scripts/i18n/angular_' + this.name + '.js'),
      that = this;


  fs.exists(localeFilePath, function(exists) {

    if(!exists) {
      console.error('Sorry "%s" isn\'t a locale supported in this version angular', that.name);
    } else {
      mkdirp(path.join(process.cwd(), '/app/scripts/i18n'), function(err) {
        if(err) {
          console.error('Sorry something unexpected happened.');
          throw err;
        } else {
          cat(ngFilePath, localeFilePath).to(localizedAngularJSPath);
        }
      });
    }

  });


};


