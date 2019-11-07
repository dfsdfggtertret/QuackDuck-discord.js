global.bot = new (require("discord.js")).Client();
global.fs = require("fs");
const { Core, Mongo } = require("discore.js");
global.env = require("dotenv").config(); //Модуль для работы с .env файлом.
global.MongoDB = new Mongo(process.env.MongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
global.config = require("./botconfig.json");
global.config2 = require('./botconfig.js')
global.Discord = require("discord.js");
global.ServerID = config2.index.ServerID;
global.colors = config2.index.colors;
global.commands = new Map();
global.DefaultPrefix = config2.index.DefaultPrefix;
global.ERROR = config2.index.ERROR
const MessageData = {
  GuildId: { type: Mongo.Types.String, default: undefined },
  message: { type: Mongo.Types.Number, default: "???" }
};
global.MongoDB.addModel("message", MessageData);
const LevelData = {
  UserId: { type: Mongo.Types.String, default: undefined },
  GuildId: { type: Mongo.Types.String, default: undefined },
  level: { type: Mongo.Types.Number, default: undefined },
  xp: { type: Mongo.Types.Number, default: undefined },
  maxs: { type: Mongo.Types.Number, default: undefined }
};
global.MongoDB.addModel("levels", LevelData);
const CoinsData = {
  UserId: { type: Mongo.Types.String, default: undefined },
  DuckCoins: { type: Mongo.Types.String, default: undefined }
};
global.MongoDB.addModel("duckcoins", CoinsData);
const AfkData = {
  UserId: { type: Mongo.Types.String, default: undefined },
  GuildId: { type: Mongo.Types.String, default: undefined },
  reason: { type: Mongo.Types.String, default: undefined }
};
global.MongoDB.addModel("afk", AfkData);
const InfoData = {
  UserId: { type: Mongo.Types.String, default: undefined },
  Info: { type: Mongo.Types.String, default: undefined }
};
global.MongoDB.addModel("info", InfoData);
try {
  require("fs")
    .readdirSync("./bot/")
    .filter(file => file.endsWith(".js"))
    .map(i => require("./bot/" + i));
} catch (e) {
  console.error(e.stack);
}
