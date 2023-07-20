import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { logger, errorlogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorlogger.error(error);
  // console.log('uncaught exception is detected ...')
  process.exit(1);
});
let server: Server;
async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Darabase is cunnected successfully');
    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    errorlogger.error('Failed to cunnect database', err);
  }
  process.on('unhandleRejection', error => {
    // console.log('unhandle Rejection is detected , we are closing our server...')
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
boostrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
