const { version } = require("discord.js");
module.exports.run = async (bot, message, args) => {
  try {
    message.channel.send(
      new Discord.RichEmbed()
        .setAuthor("Информация о боте!")
        .setColor("#a7f442")
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .addField(
          "⭕ | Использование памяти",
          `${(process.memoryUsage().heapUsed / (1000 * 1000)).toFixed(2)} MB`,
          true
        )
        .addField(
          "👥 | Пользователей",
          `${bot.users.size.toLocaleString()}`,
          true
        )
        .addField("🌐 | Серверов", `${bot.guilds.size.toLocaleString()}`, true)
        .addField("🗨 | Каналов", `${bot.channels.size.toLocaleString()}`, true)
        .addField(
          "⚙ | Количество команд",
          `${commands.size.toLocaleString()}`,
          true
        )
        .addField("💡 | Discord.Js", `v${version}`, true)
        .addField("📆 | Создан:", `22 марта 2019 года.`, true)
        .addField("📞 | Ping:", Math.floor(bot.ping), true)
        .setFooter(bot.user.username, bot.user.avatarURL)
    );
  } catch (err) {
    message.channel.send(
      new Discord.RichEmbed().setColor("RED").addField(ERROR, err.message)
    );
    console.log(err.stack);
  }
};
module.exports.command = {
  name: "botinfo"
};
