const fs = require('fs');
const emoji = require("node-emoji");
const moment = require("moment");
const { max } = require('moment');

const chirpViews = JSON.parse(fs.readFileSync(`${__dirname}/chirpViews.json`));

const truncateMsg = (msg, len) => {
  const maxLen = 140;
  const suffix = '...';
  const diff = len - msg.length;
  return msg.substring(0, maxLen - (diff + suffix.length)) + suffix;
};

const formatDate = (date) => moment.parseZone(date).format('MM/DD/YYYY');;

const deserveEmoji = (views) => {
  return parseInt(views) > 100000  ? true : false;
};

const formatChirpView = (chirpView) => {
  const msg = chirpView.message;
  const author = chirpView.author;
  const viewCount = chirpView.views;
  const date = chirpView.date;

  let output = msg + " " + formatDate(date) + " " + viewCount + " " + author;

  if(deserveEmoji(viewCount)){
    const fireEmoji = " " + emoji.get("fire");
    output += fireEmoji;
  }

  const outputLen = output.length;

  if(outputLen > 140){
    output = truncateMsg(msg, outputLen) + " " + formatDate(date) + " " + viewCount + " " + author;
    if(deserveEmoji(viewCount)){
      const fireEmoji = " " + emoji.get("fire");
      output += fireEmoji;
    }
  }
  
  return output;
  
};

chirpViews.map((chirpView) => console.log(formatChirpView(chirpView)));


module.exports = {
  formatChirpView,
};
