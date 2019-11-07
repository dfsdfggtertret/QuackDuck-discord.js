const { ReportsChannelID } = require("../../botconfig.json");
module.exports.run = async (bot, message, args) => {
  try {
    if (message.guild.id !== ServerID) return;
    var rUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[0])
    );
    var rreason = args.join(" ").slice(22);

    if (!args[0])
      return message.channel.send("⚠ | **Вы не указали пользователя!**");
    if (!rUser)
      return message.channel.send("⚠ | **Не удалось найти пользователя!**");
    if (!rreason) return message.channel.send("⚠ | **Введите причину!**");
    if (!ReportsChannelID) return "⚠ | **Не удалось найти канал для отчетов!**";
    bot.channels.get(ReportsChannelID).send(
      new Discord.RichEmbed()
        .setColor("#800080")
        .addField("📕 | Жалоба на:", `${rUser}\nID: ${rUser.id}`, true)
        .addField(
          "📝 | Жалоба от:",
          `${message.author}\nID: ${message.author.id}`,
          true
        )
        .addField("📢 | Канал:", `${message.channel}`, true)
        .addField("📄 | Причина:", `${rreason}`)
        .setFooter(bot.user.username, bot.user.displayAvatarURL)
    );
    message.author.send(
      new Discord.RichEmbed()
        .setColor("#800080")
        .setDescription(
          `🔰 | **Жалоба на \`${rUser.user.username}\` успешно отправлена!**`
        )
        .setFooter(bot.user.username, bot.user.avatarURL)
        .setTimestamp()
    );
  } catch (err) {
    message.channel.send(
      new Discord.RichEmbed().setColor("RED").addField(ERROR, err.message)
    );
    console.log(err.stack);
  }
};
module.exports.command = {
  name: "report",
  aliases: [],
  DM: false
};
