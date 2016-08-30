var Discord = require("discord.js");
const mysql = require('mysql');
var bot = new Discord.Client();

//debug
const util = require('util')
console.log(util.inspect(Discord, false, null))

var db = require('./db.js');

bot.on("ready", function() {
  console.log("Bot online and ready!");
});

bot.on("serverCreated", function(server) {
  console.log("Trying to insert server " + server.name + " into database");
  var info = {
    "servername": "'" + server.name + "'",
    "serverid": server.id,
    "ownerid": server.owner.id,
    "prefix": "&"
  }

  connection.query("INSERT INTO servers SET ?", info, function(error) {
    if (error) {
      console.log(error);
      return;
    }
    console.log("Server added successfully");
  })
});

bot.on("serverDeleted", function(server) {
  console.log("Trying to remove server " + server.name + " from database");
  connection.query("DELETE FROM servers WHERE serverid = '" + server.id + "'", function(error) {
    if (error) {
      console.log(error);
      return;
    }
    console.log("Server removed successfully");
  })
})

//server
bot.on("message", function(message) {
  if (!message.channel.isPrivate) {
    if (message.content === "!server") {
      bot.sendMessage(message, "Hello, Your on server **" + message.channel.server.name + "**");
    }
  } else {
    if (message.content === "!server") {
      bot.sendMessage(message, "Hello, Your on **PM**");
    }
  }
});

//bfstats
const http = require('http');
const request = require('request');
const getJSON = require('get-json');

bot.on("message", function(message) {
  if (!message.channel.isPrivate) {
    //get content
    var content = message.content;
    var name = content.split(" ");
    var playername = name[1];

    //apiurl
    var bf4statsapi = "http://api.bf4stats.com/api/playerInfo";
    var apiurl = bf4statsapi + "?plat=pc&name=" + playername + "&output=json";

    //url
    var bf4stats = "http://bf4stats.com/pc/";
    var url = bf4stats + playername;

    if (message.content === ("!rank " + playername)) {getJSON(apiurl, function(err, res, callback) {bot.sendMessage(message, (res.stats.rank));});}
    if (message.content === ("!skill " + playername)) {getJSON(apiurl, function(err, res, callback) {bot.sendMessage(message, (res.stats.skill));});}
    if (message.content === ("!kd " + playername)) {getJSON(apiurl, function(err, res, callback) {bot.sendMessage(message, (res.stats.extra.kdr).toFixed(2));});}
  } else {
    if (message.content === "!stats") {
      bot.sendMessage(message, "Hello, Your on **PM**");
    }
  }
});

//user command. create by admin

// jokes
//yomomma
bot.on("message", function(message) {
  if (!message.channel.isPrivate) {
    if (message.content === ("!yomomma")) {getJSON("http://api.yomomma.info/", function(err, res, callback) {bot.sendMessage(message, (res.joke));});}
  }
});

//token
bot.loginWithToken("MjIwMDY0ODQ1Mjg5MDk1MTY4.Cqa23g.xS-9LDyNYQiQczNN8AGNCTCavUw");
