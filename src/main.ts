import * as core from '@actions/core';
import { context } from '@actions/github';

import * as request from 'request-promise-native';
import { inspect } from 'util';
import { Context } from '@actions/github/lib/context';

async function run() {
  try {
    const botToken = core.getInput('botToken');
    const chatId = core.getInput('chatId');
    core.debug(`--- sending message to ${chatId} payload=${inspect(context.payload)}`);
    await _sendMessage(botToken, chatId)
    core.debug('--- message sent');
  } catch (error) {
    core.setFailed(error.message);
  }
}

/**
 * Implementation of Travis-CI result handler.
 * @param payloadJson CI result payload as a JSON string
 */
async function _sendMessage(
  botToken: String,
  chatId: String
) {
  const { repo, ref, sha, payload, workflow, action, actor } = context;
  const repoUrl = `https://github.com/${repo.owner}/${repo.repo}`;
  // const icon = status === 0 ? '✅' : '🔴';
  // const text = `${icon} [${repository.name} #${number}](${build_url}) *${status_message}* in ${duration}s.

  //   \`${branch}\` \`${commit.substr(0, 7)}\` by *${author_name}*

  //   _${message}_`;
  const uri = `https://api.telegram.org/bot${core.getInput('botToken')}/sendMessage`;
  const text = `🎸 [${repo.owner}/${repo.repo} ${workflow}/${action}](${repoUrl}/actions).

    \`${ref}\` \`${sha.substr(0, 7)}\` by *${actor}*

        ${JSON.stringify(payload)}
    `;
  request.post(uri, {
    body: {
      text,
      chat_id: chatId,
      parse_mode: 'Markdown',
    },
    json: true,
  });

  // , (e: any, res: request.Response, body: any) => {
  //   if (e || !res || res.statusCode >= 400) {
  //     const statusCode = (res || {}).statusCode;
  //     reject(new Error(`Failed to send message: [${statusCode}] ${e}: ${body}`));
  //   } else {
  //     resolve();
  //   }
  // });
}

run();
