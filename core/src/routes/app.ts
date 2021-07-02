import parseHYGFile from '../utils/parseHYGFile';

const routes = async (app: any, _opts: any) => {
  app.get('/api', async (_req: any, reply: any) => {
    reply.send({
      message: 'Starnet API'
    });
  });

  app.get('/database/init', async (_req: any, reply: any) => {
    const client = await app.pg.connect();

    await client.query(
      `CREATE TABLE IF NOT EXISTS hygdata_v3 (
        id serial PRIMARY KEY,
        hip int,
        hd int,
        hr int,
        gl varchar(255),
        bf varchar(255),
        proper varchar(255),
        ra float8,
        dec float8,
        dist float8,
        pmra float8,
        pmdec float8,
        rv float8,
        mag float8,
        absmag float8,
        spect varchar(255),
        ci float8,
        x float8,
        y float8,
        z float8,
        vx float8,
        vy float8,
        vz float8,
        rarad float8,
        decrad float8,
        pmrarad float8,
        pmdecrad float8,
        bayer varchar(255),
        flam int,
        con varchar(255),
        comp int,
        comp_primary int,
        base varchar(255),
        lum float8,
        var varchar(255),
        var_min float8,
        var_max float8
      );`,
    );

    client.release();

    reply.send({
      message: 'Database Initialised',
    })
  });

  app.get('/database/stars', async (_req: any, reply: any) => {
    const stars = await parseHYGFile();
    const client = await app.pg.connect();

    for await (const star of stars) {
      await client.query(
        `INSERT INTO hygdata_v3 VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          $10,
          $11,
          $12,
          $13,
          $14,
          $15,
          $16,
          $17,
          $18,
          $19,
          $20,
          $21,
          $22,
          $23,
          $24,
          $25,
          $26,
          $27,
          $28,
          $29,
          $30,
          $31,
          $32,
          $33,
          $34,
          $35,
          $36,
          $37
        );`,
        [
          star.id,
          star.hip,
          star.hd,
          star.hr,
          star.gl,
          star.bf,
          star.proper,
          star.ra,
          star.dec,
          star.dist,
          star.pmra,
          star.pmdec,
          star.rv,
          star.mag,
          star.absmag,
          star.spect,
          star.ci,
          star.x,
          star.y,
          star.z,
          star.vx,
          star.vy,
          star.vz,
          star.rarad,
          star.decrad,
          star.pmrarad,
          star.pmdecrad,
          star.bayer,
          star.flam,
          star.con,
          star.comp,
          star.comp_primary,
          star.base,
          star.lum,
          star.var,
          star.var_min,
          star.var_max,
        ]
      )
    }

    client.release();

    reply.send({
      message: 'hygdata_v3.csv saved in database',
    });
  });
}

module.exports = routes;
