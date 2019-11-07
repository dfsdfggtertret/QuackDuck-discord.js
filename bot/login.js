try {
  const MongoClient = require("mongodb").MongoClient;
  const mongoClient = new MongoClient(process.env.MongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  bot.on("ready", async () => {
    console.log(bot.user.username);
    console.info(`Подключён к аккаунту ${bot.user.tag} | ${bot.user.id}`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link => {
      if (config2.bot.Login.Status.StatusBot == true) config2.bot.Login.SetPresence()
      console.log(`Ссылка для приглашения бота: ${link}`);
    });
    if (config2.bot.Login.Status.Base == true) {
    await MongoDB.open();
    mongoClient.connect(function(err, client) {
      bot.client = client;
      global.db = bot.client.db(config2.bot.Login.BaseName);
      return db;
    });
  }
  });
  if (config2.bot.Login.Status.Bot == true) bot.login(process.env.TOKEN);
} catch (err) {
  console.log(err.stack);
}
