// getAlbum
// getAlbums
// getAlbumsTracks

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { getAlbum, getAlbums, getAlbumsTracks } from '../src/albums';
import { API_URL } from '../src/config';

chai.use(sinonChai);
global.fetch = require('node-fetch');

describe('Album', () => {
  let stubedFetch;
  let promise;
  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.resolves({ json: () => ({ body: 'json' }) });
  });
  afterEach(() => {
    stubedFetch.restore();
  });

  describe('smoke tests', () => {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have getAlbumsTracks method', () => {
      expect(getAlbumsTracks).to.exist;
    });
  });
  describe('getAlbum', () => {
    it('should call fetch function', () => {
      const album = getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });
    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const album = getAlbum('0lw68yx3MhKflWFqCsGkIs');
        expect(stubedFetch)
          .to
          .have
          .been
          .calledWith('https://api.spotify.com/v1/albums/0lw68yx3MhKflWFqCsGkIs');

        const album2 = getAlbum('0lw68yx3MhKflWFqCsGkIy');
        expect(stubedFetch)
          .to
          .have
          .been
          .calledWith('https://api.spotify.com/v1/albums/0lw68yx3MhKflWFqCsGkIy');
      });
    });

    it('Should return JSON data from promise', () => {
      promise.resolves({ album: 'name' });
      const album = getAlbum('0lw68yx3MhKflWFqCsGkIs');
      return album.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });
  describe('getAlbums', () => {
    it('should call fetch function', () => {
      const albums = getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });
    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const albums = getAlbums(['0lw68yx3MhKflWFqCsGkIs', '0lw68yx3MhKflWFqCsGkIy']);
        expect(stubedFetch)
          .to
          .have
          .been
          .calledWith('https://api.spotify.com/v1/albums?ids=0lw68yx3MhKflWFqCsGkIs,0lw68yx3MhKflWFqCsGkIy');
      });
    });
    it('Should return JSON data from promise', () => {
      promise.resolves({ album: 'name' });
      const album = getAlbums('0lw68yx3MhKflWFqCsGkIs');
      return album.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });
  describe('getAlbumsTracks', () => {
    it('should call fetch function', () => {
      const album = getAlbumsTracks('Incubos');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const album = getAlbumsTracks('0lw68yx3MhKflWFqCsGkIs');
        expect(stubedFetch)
          .to
          .have
          .been
          .calledWith('https://api.spotify.com/v1/albums?ids=0lw68yx3MhKflWFqCsGkIs');

        const album2 = getAlbumsTracks('0lw68yx3MhKflWFqCsGkIy');
        expect(stubedFetch)
          .to
          .have
          .been
          .calledWith('https://api.spotify.com/v1/albums?ids=0lw68yx3MhKflWFqCsGkIy');
      });
    });
  });
});
