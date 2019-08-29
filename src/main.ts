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
  // const {
  //   number, build_url, status, status_message, duration,
  //   repository, commit, branch, message, author_name,
  // } = payload;
  // const icon = status === 0 ? '✅' : '🔴';
  // const text = `${icon} [${repository.name} #${number}](${build_url}) *${status_message}* in ${duration}s.

  //   \`${branch}\` \`${commit.substr(0, 7)}\` by *${author_name}*

  //   _${message}_`;
  const uri = `https://api.telegram.org/bot${core.getInput('botToken')}/sendMessage`;
  const text = inspect(context.payload);
  return await request.post(uri, {
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
