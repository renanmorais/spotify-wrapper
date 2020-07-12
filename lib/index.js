'use strict';

var _search = require('./search');

var _albums = require('./albums');

module.exports = {
  search: _search.search,
  searchArtists: _search.searchArtists,
  searchAlbuns: _search.searchAlbuns,
  searchPlaylists: _search.searchPlaylists,
  searchTracks: _search.searchTracks,
  getAlbum: _albums.getAlbum,
  getAlbums: _albums.getAlbums,
  getAlbumsTracks: _albums.getAlbumsTracks
};