const dsoRoutes = async (app: any, _opts: any) => {

  // Page -> page number
  // Items -> number of items per page
  app.get('/dso/:page/:items', async (req: any, reply: any) => {
    const client = await app.pg.connect();

    const offset = (req.params.page) * req.params.items;

    const dso = await client.query(
      `SELECT * FROM dso LIMIT $1 OFFSET $2`,
      [req.params.items, offset]
    );

    client.release();

    reply.send({
      dso: dso.rows,
    });
  });

  app.get('/dso/search/:query', async (req: any, reply: any) => {
    const client = await app.pg.connect();

    const dso = await client.query(
      `SELECT * FROM dso WHERE
        to_tsvector('simple', f_concat_ws(' ', name, CAST(id1 as text), CAST(dupid as text)))
        @@ plainto_tsquery('simple', $1)`,
      [req.params.query]
    );

    client.release();

    reply.send({
      dso: dso.rows,
    });
  });

  app.get('/dso/brightest', async (_req: any, reply: any) => {
    const client = await app.pg.connect();

    // Limiting magnitude -> 6
    const dso = await client.query(
      `SELECT * FROM dso WHERE MAG <= 6`
    );

    client.release();

    reply.send({
      dso: dso.rows,
    })
  });
}

module.exports = dsoRoutes;
