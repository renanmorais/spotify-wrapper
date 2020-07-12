global.fetch = require('node-fetch');

import { searchAlbuns } from '../src/search';

const albums = searchAlbuns('Inclubus');

albums.then(data => console.log(data));

// albums.then(data => console.log(data.albums.items.map(item => console.log(item.name))));
