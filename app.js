require("dotenv").config();
const Tesseract = require("tesseract.js");
const Snoowrap = require("snoowrap");
const Snoostorm = require("snoostorm");

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
  subreddit: "WhitePeopleTwitter",
  results: 25,
  pollingTime: 2000,
};

//Create comment stream
const comments = new Snoostorm.CommentStream(client, streamOpts)

//Print comment on reception
comments.on("comment", (comment) => {
  console.log(comment);
});

// const input = process.argv[2];

// const run = function (input) {
//   Tesseract.recognize(input, "eng", { logger: (m) => console.log(m) }).then(
//     ({ data: { text } }) => {
//       console.log(text);
//       return text;
//     }
//   );
// };

// run(input);
