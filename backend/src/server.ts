import app from './app';
import { initDb } from './db';

const port = Number(process.env.PORT || 9090);

async function start() {
  await initDb();
  app.listen(port, () => {
    console.log(`Quiz Builder running on http://0.0.0.0:${port}`);
  });
}

start().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
