import express from 'express';
import next from 'next';
import expressLogging from 'express-logging';
import logger from 'logops';
import graphqlHTTP from 'express-graphql';
import schema from '!/server/schema';
import '!/server/db';

const dev = process.env.NODE_ENV !== 'production'; // eslint-disable-line
const port = process.env.PORT || 3000; // eslint-disable-line
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
.then(() => {
  const server = express();
  // server.use(expressLogging(logger));

  // TODO separate server routes

  server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }));

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
