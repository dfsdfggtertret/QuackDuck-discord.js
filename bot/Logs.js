try {
  const { RichEmbed } = require("discord.js");
  const ChannelLogsID = config2.bot.Logs.Channel
  bot.on("messageUpdate", async (oldm, newm) => {
    if(config2.bot.Logs.Status.Update != true) return
    if (config2.bot.Logs.AuthorBot.Update == false) {
    if(oldm.author.bot) return
  }
    if (oldm.author.bot) return;
    var d = new Date();
    if (oldm.channel.type == "dm") {
      console.log(
        `Изменено(ЛС) | ${strftime("%Y-%m-%d", d)} | ${strftime(
          "%H:%M:%S",
          d
        )} | ${oldm.author.username}\n"${oldm.content}" => "${newm.content}"`
      );
      return;
    }
    if (oldm.guild.id !== ServerID) return;
    bot.channels.get(ChannelLogsID).send(
      new RichEmbed()
        .setAuthor(`${oldm.author.username}`, oldm.author.avatarURL)
        .setFooter(
          `ID сообщения: ${oldm.id} || ID Участника: ${oldm.author.id}`
        )
        .setColor(colors)
        .setTimestamp()
        .addField(`Старое содержимое`, `\`${oldm.content}\``)
        .addField(`Новое содержимое`, `\`${newm.content}\``)
        .setDescription(
          `⚠ | Пользователь ${oldm.author} (\`${oldm.author.id}\`) изменил своё сообщение в канале <#${oldm.channel.id}>!`
        )
    );
  });
  bot.on("messageDelete", async message => {
    if(config2.bot.Logs.Status.Delete != true) return
    if (config2.bot.Logs.AuthorBot.Delete == false) {
    if(message.author.bot) return
  }
    if (message.guild.id !== ServerID) return;
    bot.channels.get(ChannelLogsID).send(
      new RichEmbed()
        .setAuthor(`${message.author.username}`, message.author.avatarURL)
        .setFooter(`ID Участника: ${message.author.id}`)
        .setColor(colors)
        .setTimestamp()
        .setDescription(
          `⚠ | Пользователь ${message.author} (\`${message.author.id}\`) удалил своё сообщение в канале <#${message.channel.id}>: \n\n\`${message.content}\``
        )
    );
    console.log(
      `Удалён | ${message.channel.name} | ${message.author.username} | ${message.content}`
    );
  });
} catch (err) {
  console.log(err.stack);
}
