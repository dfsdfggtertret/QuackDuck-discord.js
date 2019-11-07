const { RichEmbed } = require("discord.js");
module.exports.run = (bot, msg, args) => {
  try {
    msg.channel.send("⏱ | **Подождите...**").then(newMsg =>
      newMsg.edit(
        new RichEmbed()
          .setColor(colors)
          .setTitle("⏱ | **Проверка закончена!**")
          .setDescription(
            `Задержка бота: \`${newMsg.createdTimestamp -
              msg.createdTimestamp} мс\`\nЗадержка API: \`${bot.ping} мс\``
          )
      )
    );
  } catch (err) {
    msg.channel.send(
      new Discord.RichEmbed().setColor("RED").addField(ERROR, err.message)
    );
    console.log(err.stack);
  }
};
module.exports.command = {
  name: "ping"
};
