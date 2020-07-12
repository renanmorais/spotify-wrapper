'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlbumsTracks = exports.getAlbums = exports.getAlbum = undefined;

var _config = require('./config');

var getAlbum = exports.getAlbum = function getAlbum(id) {
  return fetch(_config.API_URL + '/albums/' + id);
};

var getAlbums = exports.getAlbums = function getAlbums(ids) {
  return fetch(_config.API_URL + '/albums?ids=' + ids);
};

var getAlbumsTracks = exports.getAlbumsTracks = function getAlbumsTracks(id) {
  return fetch(_config.API_URL + '/albums?ids=' + id);
};