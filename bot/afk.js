try {
  if(config2.bot.Afk.Status != true) return
  bot.on("message", async msg => {
    if(config2.bot.Afk.AuthorBot == false) {
    if (msg.author.bot) return;
  }
    await MongoDB.afk._toCollection();
    let res = MongoDB.afk.findOne({
      UserId: !msg.mentions.users.first()
        ? undefined
        : msg.mentions.users.first().id
    });
    let res2 = MongoDB.afk.findOne({
      UserId: msg.author.id
    });
    if (
      res2.UserId == undefined &&
      (!msg.mentions.users.first() || res.UserId == undefined) //msg.mentions.users.first().id)
    )
      return;
    if (res2.UserId !== undefined) {
      console.log("Вышел.");
      MongoDB.afk.deleteOne({ UserId: msg.author.id });
    }

    if (msg.mentions.users.first() && res.UserId !== undefined) {
      msg.channel.send(
        new Discord.RichEmbed()
          .setColor(colors)
          .setDescription(
            `☪️ **Пользователь <@${res.UserId}> в AFK!**${
              res.reason !== null ? `\n\`Причина: ${res.reason}\`` : ""
            }`
          )
      );
    }
  });
} catch (err) {
  console.log(err.stack);
}
