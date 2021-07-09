const starRoutes = async (app: any, _opts: any) => {

  // Page -> page number
  // Items -> number of items per page
  app.get('/stars/:page/:items', async (req: any, reply: any) => {
    const client = await app.pg.connect();

    const offset = (req.params.page) * req.params.items;

    const stars = await client.query(
      `SELECT * FROM hygdata_v3 LIMIT $1 OFFSET $2`,
      [req.params.items, offset]
    );

    client.release();

    reply.send({
      data: stars.rows,
    });
  });

  app.get('/stars/search/:query', async (req: any, reply: any) => {
    const client = await app.pg.connect();

    const stars = await client.query(
      `SELECT * FROM hygdata_v3 WHERE
        to_tsvector('simple', f_concat_ws(' ', proper, CAST(hip as text), CAST(hd as text), CAST(hr as text)))
        @@ plainto_tsquery('simple', $1)`,
      [req.params.query]
    );

    client.release();

    reply.send({
      data: stars.rows,
    });
  });

  app.get('/stars/brightest', async (_req: any, reply: any) => {
    const client = await app.pg.connect();

    // Limiting magnitude -> 5.3
    const stars = await client.query(
      `SELECT * FROM hygdata_v3 WHERE MAG <= 5.3`
    );

    client.release();

    reply.send({
      data: stars.rows,
    })
  });

  app.get('/stars/top', async (_req: any, reply: any) => {
    const client = await app.pg.connect();

    // Limiting magnitude -> 5.3
    const stars = await client.query(
      `SELECT * FROM hygdata_v3 WHERE PROPER IS NOT NULL`
    );

    client.release();

    reply.send({
      data: stars.rows,
    })
  });
}

module.exports = starRoutes;
