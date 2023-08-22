import 'dotenv/config';
import app from './app';
import { printAppInfo } from './utils/print-app-info';
import appConfig from './config/app.config';
import environment from './lib/environment';

const { port, env, appUrl: _appUrl } = environment;

const server = app.express;
server
  .listen(process.env.PORT, () => {
    const {
      api: { basePath, version },
    } = appConfig;
    const appUrl = `${_appUrl}:${port}`;
    const apiUrl = `${appUrl}/${basePath}/${version}`;
    printAppInfo(port, env, appUrl, apiUrl);
  })
  .on('error', onError);

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${+port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
