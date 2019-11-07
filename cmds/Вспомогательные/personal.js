const { RichEmbed } = require("discord.js");
exports.run = async (bot, message, args) => {
  try {
    if (!args[0])
      return message.channel.send(`🛠 | **Укажите о себе информацию!**`);
    if (args.join(" ").length > 500)
      return message.channel.send(
        "⚠ | **Информация не может быть больше 500 символов!**"
      );
    message.channel.send(
      new RichEmbed()
        .setColor(colors)
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .setTimestamp()
        .addField(
          `🛠 | **Вы успешно указали о себе информацию!**`,
          args.join(" ")
        )
    );
    await MongoDB.info._toCollection();
    let res = MongoDB.info.findOne({ UserId: message.author.id });
    if (res.UserId == undefined) {
      MongoDB.info.insertOne({
        UserId: message.author.id,
        Info: args.join(" ")
      });
      return;
    }
    await MongoDB.info.updateOne(
      { UserId: message.author.id },
      { Info: args.join(" ") }
    );
  } catch (err) {
    message.channel.send(
      new Discord.RichEmbed().setColor("RED").addField(ERROR, err.message)
    );
    console.log(err.stack);
  }
};
module.exports.command = {
  name: "personal",
};
