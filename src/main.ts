import * as core from '@actions/core';
import { context } from '@actions/github';
import * as request from 'request-promise-native';

/**
 * Checksuit result notification through Telegram
 */
(async function run() {
  try {
    const botToken = core.getInput('botToken');
    const chatId = core.getInput('chatId');
    const jobStatus = core.getInput('jobStatus');
    const skipSuccess = (core.getInput('skipSuccess') || 'true') === 'true';
    core.debug(`sending message, status=${jobStatus} skipSuccess=${skipSuccess} payload=${JSON.stringify(context.payload)}`);
    await _sendMessage(botToken, chatId, jobStatus, skipSuccess);
    core.debug('message sent');
  } catch (error) {
    core.setFailed(error.message);
  }
})()

/**
 * Send a Telegram message.
 * @param botToken the Telegram bot token to send the message
 * @param chatId id of targeted channel or group, to which the message will be sent
 * @param jobStatus status of the job
 */
async function _sendMessage(
  botToken: String,
  chatId: String,
  jobStatus: String = 'success',
  skipSuccess: Boolean = true,
) {
  const status = (jobStatus || '').toLowerCase();
  if (status === 'success' && skipSuccess) {
    core.debug('The successful task has been skipped~');
    return;
  }

  const { repo, ref, sha, workflow, actor } = context;
  const repoFullname = `${repo.owner}/${repo.repo}`;
  const repoUrl = `https://github.com/${repoFullname}`;
  let icon: String;
  switch (status) {
    case 'success': icon = '🎉🎉'; break;
    case 'failure': icon = '🎃❌'; break;
    default: icon = '⚠️'; break;
  }
  const uri = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const text = `${icon} [${repoFullname}](${repoUrl}/actions) ${workflow} *${jobStatus}*

  \`${ref}\` \`${sha.substr(0, 7)}\` by *${actor}*

  [View details](${repoUrl}/commit/${sha}/checks)`;
  return request.post(uri, {
    body: {
      text,
      chat_id: chatId,
      parse_mode: 'Markdown',
    },
    json: true,
  });
}
