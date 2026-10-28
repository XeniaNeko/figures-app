import pino from 'pino';

const LOG_FILE = 'logs/app.log';

const logger = pino(
  { level: 'info' },
  pino.multistream([
    { stream: process.stdout },
    { stream: pino.destination({ dest: LOG_FILE, mkdir: true, sync: true }) },
  ]),
);

export default logger;
