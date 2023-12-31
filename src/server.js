require('dotenv').config();
const Hapi = require('@hapi/hapi');

// Song
const songs = require('./api/songs');
const SongsService = require('./services/postgres/SongsService.js');
const SongsValidator = require('./validator/songs');

// Album
const albums = require('./api/albums');
const AlbumsService = require('./services/postgres/AlbumsService.js');
const AlbumsValidator = require('./validator/albums');

const init = async () => {
  const songsService = new SongsService();
  const albumsService = new AlbumsService();
  
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register(
    [
      {
        plugin: songs,
        options: {
          service: songsService,
          validator: SongsValidator,
        },
      },
      {
        plugin: albums,
        options: {
          service: albumsService,
          validator: AlbumsValidator,
        },
      }
    ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
