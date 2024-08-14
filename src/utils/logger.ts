import pino from 'pino';

const isBrowser = typeof window !== 'undefined';

const logger = pino({
  browser: {
    asObject: true,
    transmit: {
      level: 'info',
      send: (level, logEvent) => {
        if (isBrowser) {
          console.log(logEvent.messages[0]); // Log to the browser console
        }
      },
    },
  },
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  transport: !isBrowser
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      }
    : undefined,
});

export default logger;

// src/utils/logger.ts
