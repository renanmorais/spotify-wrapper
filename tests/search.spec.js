import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { search, searchAlbuns, searchArtists, searchTracks, searchPlaylists } from '../src/search';

chai.use(sinonChai);
global.fetch = require('node-fetch');

describe('Search', () => {
  let fetchedStub;
  let promise;
  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.resolves({ json: () => ({ body: 'json' }) });
  });
  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => {
    // search generico + de um tipo
    // searchAlbuns
    // searchArtists
    // searchTracks
    // searchPlaylists

    it('should exist the search method', () => {
      expect(search).to.be.exist;
    });

    it('should exist the searchAlbuns method', () => {
      expect(searchAlbuns).to.be.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.be.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.be.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.be.exist;
    });
  });
  describe('Generic Search', () => {
    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const artists = search('Incubus', 'artist');
        expect(fetchedStub)
          .to
          .have
          .been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

        const albums = search('Incubus', 'album');
        expect(fetchedStub)
          .to
          .have
          .been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
      });
      context('passing more than one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album']);
        expect(fetchedStub)
          .to
          .have
          .been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
      });
    });
    it('Should return JSON data from the promise', () => {
      promise.resolves({ body: 'json' });
      const artists = search('araketu', 'artist');
      return artists.then((data) => {
        expect(data).to.be.eql({ body: 'json' });
      });
    });
  });
  describe('searchArtists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Incubos');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const artists = searchArtists('Incubus');
        expect(fetchedStub)
          .to
          .have
          .been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

        const artists2 = searchArtists('Muse');
        expect(fetchedStub)
          .to
          .have
          .been
          .calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
      });
    });
  });
  describe('searchAlbuns', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Incubos');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const album = searchAlbuns('Incubus');
        expect(fetchedStub)
          .to
          .have
          .been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

        const album2 = searchAlbuns('Muse');
        expect(fetchedStub)
          .to
          .have
          .been
          .calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
      });
    });
  });
  describe('searchAlbuns', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Incubos');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const track = searchAlbuns('Incubus');
        expect(fetchedStub)
          .to
          .have
          .been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

        const track2 = searchAlbuns('Muse');
        expect(fetchedStub)
          .to
          .have
          .been
          .calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
      });
    });
  });
  describe('searchTracks', () => {
    it('should call fetch function', () => {
      const artists = searchTracks('Incubos');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const track = searchTracks('Incubus');
        expect(fetchedStub)
          .to
          .have
          .been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=tracks');

        const track2 = searchTracks('Muse');
        expect(fetchedStub)
          .to
          .have
          .been
          .calledWith('https://api.spotify.com/v1/search?q=Muse&type=tracks');
      });
    });
  });
  describe('searchPlaylists', () => {
    it('should call fetch function', () => {
      const artists = searchPlaylists('Incubos');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const track = searchPlaylists('Incubus');
        expect(fetchedStub)
          .to
          .have
          .been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');

        const track2 = searchPlaylists('Muse');
        expect(fetchedStub)
          .to
          .have
          .been
          .calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
      });
    });
  });
});
