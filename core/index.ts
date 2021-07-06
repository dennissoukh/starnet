import fastify from 'fastify';
import postgres from 'fastify-postgres';

/**
 * Create the application
 */
const app = fastify({
  logger: true,
  ignoreTrailingSlash: true,
});

/**
 * Add the database to the application
 */
app.register(postgres, {
  connectionString: 'postgres://postgres:123456@localhost/capella',
});

/**
 * Bind routes to the application
 */
const routes = [
  require('./src/routes/app'),
  require('./src/routes/stars'),
];

routes.forEach((route: any) => {
  app.register(route, { ...route });
});

/**
 * Return the application as a ready Fastify module
 */
const ready = async () => {
  return app.ready();
}

module.exports = ready;
