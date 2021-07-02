import fastify from 'fastify';

/**
 * Create the application
 */
const app = fastify({
  logger: true,
  ignoreTrailingSlash: true,
});

/**
 * Return the application as a ready Fastify module
 */
const ready = async () => {
  return app.ready();
}

module.exports = ready;
