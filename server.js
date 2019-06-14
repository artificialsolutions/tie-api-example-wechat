/**
 * Copyright 2019 Artificial Solutions. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *    http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

require('dotenv').config();
const express = require('express');
const http = require('http');
const wechat = require('wechat');

const app = express();
const TIE = require('@artificialsolutions/tie-api-client');

const config = {
  token: process.env.TOKEN,
  appid: process.env.APP_ID,
  teneoURL: process.env.TENEO_ENGINE_URL
};

const teneoApi = TIE.init(config.teneoURL);

// initialise session handler, to store mapping between WeChat and engine session id
const sessionHandler = SessionHandler();

app.use(express.query());
app.use('/wechat', wechat(config, async function (req, res, next) {
  
  // All WeChat related info is in req.weixin
  var message = req.weixin;
  console.log(message);

  const wechatUserID = message.FromUserName;
  
  // check if we have stored an engine sessionid for this user
  const teneoSessionId = sessionHandler.getSession(wechatUserID);
  
  // get user's input
  let userInput = message.Content;
  
  // send input to engine using the stored sessionid and retreive response
  const teneoResponse = await teneoApi.sendInput(teneoSessionId, { 'text': userInput });
  
  // store engine sessionid for this user
  sessionHandler.setSession(wechatUserID, teneoResponse.sessionId);
  
  // Wechat expects you to respond, or else it will tell the user that the service is unavailable after three tries.
  res.reply(teneoResponse.output.text)
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

var port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

server.on('error', onError);
server.on('listening', onListening);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

/***
 * SESSION HANDLER
 ***/
function SessionHandler() {

  // Map the Webchat Sid id to the teneo engine session id. 
  // This code keeps the map in memory, which is ok for testing purposes
  // For production usage it is advised to make use of more resilient storage mechanisms like redis
  const sessionMap = new Map();

  return {
    getSession: (userId) => {
      if (sessionMap.size > 0) {
        return sessionMap.get(userId);
      }
      else {
        return "";
      }
    },
    setSession: (userId, sessionId) => {
      sessionMap.set(userId, sessionId)
    }
  };
}
