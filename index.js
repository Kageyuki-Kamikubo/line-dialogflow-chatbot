'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  apiaiRequest.on('response', (response) => {
    let responseText = response.result.fulfillment.speech;
    // create a echoing text message
    const reply = { type: 'text', text: responseText };
    // use reply API
    return client.replyMessage(event.replyToken, reply);
  });

  apiaiRequest.on('error', (error) => console.error(error));
  apiaiRequest.end();

}

function getChatId(source) {
  if (source.type === 'user') {
    return source.userId;
  }

  if (source.type === 'group') {
    return source.groupId;
  }

  if (source.type === 'room') {
    return source.roomId;
  }
  return null;
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
