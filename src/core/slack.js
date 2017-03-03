import Slack from 'slack-node';
import { slackWebhook } from '../config';
import { handleError } from '../core/rollbar';

const slack = new Slack();
slack.setWebhook(slackWebhook);

// Debounce sending the slack message to avoid spamming
const slackTimers = {};

export const sendSlackMsg = function sendSlackMsg(text, channel) {
  slack.webhook({
    channel,
    username: 'weddingbot',
    text,
  }, err => {
    if (err) {
      handleError(err);
    }
  });
};

export const sendSlackMsgWithDebounce = function sendSlackMsgWithDebounce(text, channel, key) {
  if (key) {
    // Stop previous msg
    clearTimeout(slackTimers[key]);
    slackTimers[key] = setTimeout(() => {
      sendSlackMsg(text, channel);
    }, 60000);
  }
};
