const fs = require('fs');
const emoji = require("node-emoji");
const moment = require("moment");
const { max } = require('moment');

const chirpViews = JSON.parse(fs.readFileSync(`${__dirname}/chirpViews.json`));

const truncateOutput = (msg) => {
};

const formatDate = (date) => {
    return moment(date).format('MM/DD/YYYY');
};

const hasEmoji = (views) => {
  return parseInt(views) > 100000  ? true : false;
}

const formatChirpView = (chirpView) => {
  const msg = chirpView.message;
  const author = chirpView.author;
  const viewCount = chirpView.views;
  const date = chirpView.date;

  let output = msg + " " + formatDate(date) + " " + viewCount + " " + author;

  if(output.length > 140){
    output = truncateOutput(msg) + " " + formatDate(date) + " " + viewCount + " " + author;
  }

  if(hasEmoji(viewCount)){
    const fireEmoji = " " + emoji.get("fire");
    output += fireEmoji;
  }
  
  return output;
  
};

chirpViews.map((chirpView) => console.log(formatChirpView(chirpView)));


module.exports = {
  formatChirpView,
};
