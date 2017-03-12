module.exports = function() {

  'use strict';

  var fs = require('fs');

  fs.readdir('./controllers', loadControllers);

  function loadControllers(error, files) {
    if (error) {
      throw error;
    } else {
      files.forEach(requireController);
    }
  }

  function requireController(file) {
    // remove the file extension
    var controller = file.substr(0, file.lastIndexOf('.'));
    // do not require index.js (this file)
    if (controller !== 'index') {
      // require the controller
      require('./' + controller);
    }
  }

};