import Rollbar from 'rollbar';
import { analytics } from '../config';

const serverToken = analytics.rollbar.serverToken;

export default {
  errorHandler() {
    return Rollbar.errorHandler(serverToken);
  },
  handleError(err) {
    return Rollbar.handleError(err);
  },
  init() {
    Rollbar.init(serverToken);
    Rollbar.handleUncaughtExceptionsAndRejections(serverToken, {
      exitOnUncaughtException: true,
    });
  },
};
