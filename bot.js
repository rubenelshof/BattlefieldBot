var Discord = require("discord.js");
const mysql = require('mysql');
var bot = new Discord.Client();

//required modules
const http = require('http');
const request = require('request');
const getJSON = require('get-json');

//debug
const util = require('util')
console.log(util.inspect(Discord, false, null))

//db
var db = require('./db.js');

//console log
bot.on("ready", function() {
  console.log("Bot online and ready!");
});

//dbservercreate
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

//dbserverdelete
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

//currentserver
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

//bf4stats
bot.on("message", function(message) {
  if (!message.channel.isPrivate) {
    //get content
    var content = message.content;
    var name = content.split(" ");
    var playername = name[1];

    //api
    var bf4statsapi = "http://api.bf4stats.com/api/playerInfo" + "?plat=pc&name=" + playername + "&output=json";

    //url
    var bf4stats = "http://bf4stats.com/pc/";
    var url = bf4stats + playername;

    if (message.content === ("!bf4rank " + playername)) {getJSON(bf4statsapi, function(err, res, callback) {bot.sendMessage(message, "Your rank is **" + (res.stats.rank) + "**");});}
    if (message.content === ("!bf4skill " + playername)) {getJSON(bf4statsapi, function(err, res, callback) {bot.sendMessage(message, "Your skill score is **" + (res.stats.skill) + "**");});}
    if (message.content === ("!bf4kd " + playername)) {getJSON(bf4statsapi, function(err, res, callback) {bot.sendMessage(message, "Your K/D is **" + (res.stats.extra.kdr).toFixed(2) + "**");});}
  } else {
    if (message.content === "!stats") {
      bot.sendMessage(message, "Hello, Your on **PM**");
    }
  }
});

//overwatchstats
bot.on("message", function(message) {
  if (!message.channel.isPrivate) {
    //get content
    var content = message.content;
    var name = content.split(" ");
    var playername = name[1];

    //api
    var divisionapi = "https://2g.be/twitch/Division/command/action=" + playername + "?plat=pc&name=" + playername + "&output=json";

    //url
    var bf4stats = "http://bf4stats.com/pc/";
    var url = bf4stats + playername;

    if (message.content === ("!rank " + playername)) {getJSON(bf4statsapi, function(err, res, callback) {bot.sendMessage(message, "Your rank is **" + (res.stats.rank) + "**");});}
    if (message.content === ("!skill " + playername)) {getJSON(bf4statsapi, function(err, res, callback) {bot.sendMessage(message, "Your skill score is **" + (res.stats.skill) + "**");});}
    if (message.content === ("!kd " + playername)) {getJSON(bf4statsapi, function(err, res, callback) {bot.sendMessage(message, "Your K/D is **" + (res.stats.extra.kdr).toFixed(2) + "**");});}
  }
});


//user command. create by admin

// jokes
//var flickrphotos = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"
//cats
//bot.on("message", function(message) {
//  if (!message.channel.isPrivate) {

//    var catkeyword = "cats, cat, cute cat";

//    if (message.content === ("!cats ")) {getJSON(flickrphotos,{tags: catkeyword, tagmode: "any", format: "json"}, function(err, res, callback) {bot.sendMessage(message, "Your rank is **" + (res.stats.rank) + "**");});}
//  }
//});

//yomomma
//bot.on("message", function(message) {
//  if (!message.channel.isPrivate) {
//    if (message.content === ("!yomomma")) {getJSON("http://api.yomomma.info/", function(err, res, callback) {bot.sendMessage(message, (res.joke));});}
//  }
//});

//token
var token = require('./token.js');
bot.loginWithToken(token);
