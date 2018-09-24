# netgear-aircard-sms

A Node script that sends a SMS on a Netgear Aircard. This uses Google Chrome Puppeteer to emulate a browser.

## Installation

```
npm install
```

## Usage

```
NETGEAR_URL=http://192.168.1.1/index.html NETGEAR_PASSWORD=password SMS_RECEIVER=06123456 SMS_MESSAGE="hello" node index.js
```
