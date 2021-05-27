require("dotenv").config();
const _ = require("moralfibre");
const fetch = require("node-fetch");
const request = require("request");
let options = { json: true };

const discord = require("discord.js");
const client = new discord.Client();
const PREFIX = "!";
client.on("ready", () => {
  console.log(`${client.user.tag} has logged in!!!!!!`);
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
    if (CMD === "math") {
      if (args.length === 0) {
        message.channel.send(
          `Dear ${message.author.username}, you need to name a person to kick! you blithering idiot!`
        );
      } else {
        let ans = [];
        for (let i = 0; i < args.length; ++i) {
          asn1 = eval(args[i]);
          ans.push(asn1);
        }
        message.channel.send(`Your answers are ${ans}`);
      }
    } else if (CMD === "quote") {
      message.reply(
        `Getting a random quote for you dear ${message.author.username}`
      );
      fetch("https://animechan.vercel.app/api/random")
        .then((response) => response.json())
        .then((body) => {
          message.channel.send(
            `Quote from anime: "${body.anime}" : ${body.quote} `
          );
        });
    } else if (CMD === "covidInfo") {
      fetch("https://api.covid19india.org/v4/min/data.min.json")
        .then((response) => response.json())
        .then((body) => {
          let ans = _.findObjectValue(body, args[0]);
          if (ans === null) {
            message.channel.send("Please enter a valid city or district!");
            return;
          }
          message.channel.send(
            `The confirmed cases in ${args[0]} today are: ${_.findObjectValue(
              ans,
              "confirmed"
            )}`
          );
          message.channel.send(
            `The deceased cases in ${args[0]} today are: ${_.findObjectValue(
              ans,
              "deceased"
            )}`
          );
          message.channel.send(
            `The recovered cases in ${args[0]} today are: ${_.findObjectValue(
              ans,
              "recovered"
            )}`
          );
          message.channel.send(
            `The total tested cases today in ${
              args[0]
            } are: ${_.findObjectValue(ans["delta"], "tested")}`
          );
          console.log(_.findObjectValue(body, args[0]));
        });
    } else if (CMD === "Sad") {
      message.channel.send(`banned the loser ${args.toString()} `);
    }
  } else {
    return;
  }
});
client.login(process.env.DISCORD_TOKEN);
