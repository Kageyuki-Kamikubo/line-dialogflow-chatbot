# LINE Bot

An example LINE bot using Dialogflow.

## How to use

Install deps:

```bash
$ npm install
```

Configuration:

``` bash
$ export CHANNEL_SECRET=YOUR_CHANNEL_SECRET
$ export CHANNEL_ACCESS_TOKEN=YOUR_CHANNEL_ACCESS_TOKEN
$ export APIAI_TOKEN=<Your Dialogflow Token>
$ export APIAI_LANG=<Your Agent Language>
$ export PORT=1234
```
If you deploy to Heroku app, you can use the following command to set variables:

```bash
heroku config:set VAR_NAME=VAR_VAL 
```

Run:

``` bash
$ node .
```
