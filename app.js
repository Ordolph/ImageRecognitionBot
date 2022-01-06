require("dotenv").config();
const Tesseract = require("tesseract.js");
const Snoowrap = require("snoowrap");
const Snoostorm = require("snoostorm");

const ParseImage = function (img) {
  Tesseract.recognize(img, "eng", { logger: (m) => console.log(m) }).then(
    ({ data: { text } }) => {
      console.log(text);
      return text;
    }
  );
};

// Build Snoowrap and Snoostorm clients
const r = new Snoowrap({
  userAgent: process.env.USER_AGENT,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS,
});

const client = new Snoowrap(r);

//Set options for comment stream
const streamOpts = {
  subreddit: "BotTestSubreddit1",
  limit: 1,
};

//Create comment stream
const comments = new Snoostorm.CommentStream(client, streamOpts);

//Recieve new comment and parse linked image
let imgLink = "";

comments.on("end", (end) => {});

const start = function () {
  comments.on("item", (item) => {
    console.log(item);
    if (item.body.toLowerCase().includes("!tweettranscribe_bot")) {
      console.log("I have been summoned!");
      imgLink = item.link_url;
      if (imgLink.includes(".jpg")) {
        ParseImage(imgLink);
      }
    }
    //comments.end();
  });
};

start();
