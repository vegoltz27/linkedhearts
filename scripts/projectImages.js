'use strict';

var debug = require('debug')('metalsmith-paths'),
    path = require('path'),
    fs = require("fs"),
    matcher = require('minimatch'),
    _ = require('lodash');


// Expose `plugin`.
module.exports = plugin;
module.exports.isAuthorizedFile = isAuthorizedFile;
module.exports.normalizeOptions = normalizeOptions;
module.exports.getMatchingFiles = getMatchingFiles;

/**
 *
 * @param {Object} options
 *   @property {String} pattern
 *   @property {String} imagesDirectory - directory in which we will go looking for images
 *   @property {String} authorizedExts - images authorized image extensions
 * @return {Function}
 */
function plugin(options) {

  return function innerFunction(files, metalsmith, done) {
    setImmediate(done);

    // sane default
    var optionsArray = [];

    if (_.isArray(options)) {
      // multiple options objects
      optionsArray = options;
    } else if (_.isObject(options)) {
      // one options object
      optionsArray = [options];
    }
    _.each(optionsArray, function(optionsItem) {
      addImagesToFiles(files, metalsmith, done, optionsItem);
    })
  }

  function addImagesToFiles(files, metalsmith, done, options) {
    // set options
    options = normalizeOptions(options);

    var globalImages = [];

    // get matching files
    var matchingFiles = getMatchingFiles(files, options.pattern);

    _.each(matchingFiles, function(file) {
      var imagesPath, imagesInDir, fileObj;

      fileObj = files[file];

      if (_.isUndefined(fileObj)) return true;

      imagesPath = path.join(metalsmith.source(), path.dirname(file), options.imagesDirectory);
      imagesInDir = getImagesInDir(fileObj, imagesPath, options);
      

      if(!imagesInDir){
        console.log('ERROR!!!! NO IMAGES FOUND AT PATH: ' + imagesPath + ' for file: ' + file);
        return;
      }

      if(!fileObj[options.imagesKey]){
        fileObj[options.imagesKey] = [];
      }

      if(options.global) {
        globalImages = globalImages.concat(imagesInDir);
      } else {
        fileObj[options.imagesKey] = (fileObj[options.imagesKey]).concat(imagesInDir);
        fileObj[options.imagesKey] = _.uniq(fileObj[options.imagesKey]);
      }
    });

    if(options.global) {
      globalImages = _.uniq(globalImages);
      addGlobalImages(files, globalImages, options);
    }
  };

  function addGlobalImages(files, images, options) {
    var matchingFiles = getMatchingFiles(files, options.globalPattern);
    var fileObj;
    _.each(matchingFiles, function(file) {
      fileObj = files[file];
      if (_.isUndefined(fileObj)) return true;
      fileObj[options.imagesKey] = images;
    });
  }

  function getImagesInDir(fileObj, imagesPath, options) {
    var exist = fs.existsSync(imagesPath);

    // no access, skip the path
    if (!exist) return;

    var dirFiles = fs.readdirSync(imagesPath);
    var images = [];
    
    // add files as images metadata
    _.each(dirFiles, function(dirFile) {
      // check extension and remove thumbnails
      if (isAuthorizedFile(dirFile, options.authorizedExts)) {
        var imagePath = '/' + path.join(fileObj.path.dir, options.imagesDirectory, dirFile);

        console.log('[' + fileObj.path.dir + '] + img: ' + imagePath);

        images.push(imagePath);
      }
    });

    return images;
  }

}


/**
 * @param {Object} options
 * @param {Array} authorized extensions - e.g ['jpg', 'png', 'gif']
 * @return {Object}
 */
function normalizeOptions(options) {
  // define options
  var defaultOptions = {
    authorizedExts: ['jpg', 'jpeg', 'svg', 'png', 'gif', 'JPG', 'JPEG', 'SVG', 'PNG', 'GIF'],
    pattern: '**/*.md',
    imagesDirectory: 'images',
    imagesKey: 'images',
  };

  return _.extend(defaultOptions, options);
}


/**
 * @param {String} file
 * @param {Array} authorized extensions - e.g ['jpg', 'png', 'gif']
 * @return {Boolean}
 */
function isAuthorizedFile(file, authorizedExtensions) {
  // get extension
  var extension = file.split('.').pop();
  return _.includes(authorizedExtensions, extension);
}


/**
 * @param {Array} files
 * @param {String} pattern
 *
 */
function getMatchingFiles(files, pattern) {
  var keys = Object.keys(files);

  return _.filter(keys, function(file) {
    files[file].path = path.parse(file);

    // check if file is in the right path using regexp
    return matcher(file, pattern);
  });
}
