import Slack from 'slack-node';
import { slack as slackCfg } from '../config';
import Rollbar from './rollbar';
import Settings from '../data/models/Settings';

const slack = new Slack();
slack.setWebhook(slackCfg.webhook);

// Debounce sending the slack message to avoid spamming
const slackTimers = {};

export const sendSlackMsg = function sendSlackMsg(text, channel) {
  Settings.findAll().then(data => {
    if (data[0].slack) {
      slack.webhook({
        channel,
        username: 'weddingbot',
        text,
      }, err => {
        if (err) {
          Rollbar.handleError(err);
        }
      });
    }
  }).catch(err => {
    Rollbar.handleError(err);
  });
};

export const sendSlackMsgWithDebounce = function sendSlackMsgWithDebounce(text, channel, key) {
  if (key) {
    // Stop previous msg
    clearTimeout(slackTimers[key]);
    slackTimers[key] = setTimeout(() => {
      sendSlackMsg(text, channel);
    }, slackCfg.debounce);
  }
};
