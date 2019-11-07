try {
  if(config2.bot.CommandHandler.Status.Status != true) return
  bot.on("message", async message => {
    const collection = db.collection("prefix");
    collection
      .find({ GuildId: !message.guild ? 0 : message.guild.id })
      .toArray(function(err, results) {
        let prefix =
          results[0] == undefined ? DefaultPrefix : results[0].Prefix;
        if (message.content == `<@${global.bot.user.id}>`) {
          if(config2.bot.CommandHandler.Status.Ping.AuthorBot == true) {
          if (message.author.bot) return;
        }
        if(config2.bot.CommandHandler.Status.Ping.Status == true) {
          message.channel.send(`Мой префикс: \`${prefix}\`\nЧтобы узнать все мои команды: \`${prefix}helpDuck\``);
        }
      }
        let args = message.content
          .slice(prefix.length)
          .trim()
          .split(" ");
        let command = args.shift().toLowerCase();
        if (!message.content.startsWith(prefix)) return;
        let cmd = commands.get(command);
        if(!cmd) return
        let DM = commands.get(command, commands);
        let ЧС = DM.command.ЧС;
        if(config2.bot.CommandHandler.Status.ЧС == true) {
        if (ЧС) {
          if (ЧС.includes(message.author.id)) return;
        }
      }
      if(config2.bot.CommandHandler.Status.DM == true) {
        if (DM.command.DM == false) {
          if (message.channel.type == "dm")
            return message.author.send(config2.bot.CommandHandler.MessageContent)
        }
      }
      if(config2.bot.CommandHandler.Status.Owner == true) {
        if (DM.command.owner == true) {
          if (config2.index.BotOwnersID.some(e => message.author.id == e)){
          if (cmd) cmd.run(bot, message, args);
          return
          }
          return
        }
      }
        if (cmd) cmd.run(bot, message, args);
      });
  });
} catch (err) {
  console.log(err.stack);
}
