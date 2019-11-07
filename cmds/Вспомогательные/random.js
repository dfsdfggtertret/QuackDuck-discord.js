const { RichEmbed } = require("discord.js");
exports.run = (bot, message, args) => {
  try {
    var result = Math.floor(Math.random() * args.join(" "));
    if (!args[0]) {
      let embed = new Discord.RichEmbed()
        .setDescription(
          "⚠ | **Укажите число до которого нужно произвести рандом!**"
        )
        .setColor("RED")
        .setTimestamp()
        .setFooter(
          `${message.author.username}`,
          message.author.displayAvatarURL
        );
      message.channel.send(embed);
      return;
    }
    if (isNaN(args.join(" ")))
      return message.channel.send(
        new RichEmbed()
          .setColor("RED")
          .setDescription(`⚠ | **Укажите валидное число!**`)
          .setTimestamp()
          .setFooter(message.author.username, message.author.displayAvatarURL)
      );
    var random = new Discord.RichEmbed()
      .setColor(colors)
      .setDescription(`🎲 | Random: **${result}**`);
    message.channel.send(random);
  } catch (err) {
    message.channel.send(
      new Discord.RichEmbed().setColor("RED").addField(ERROR, err.message)
    );
    console.log(err.stack);
  }
};
exports.command = {
  name: "random"
};
