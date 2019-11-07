module.exports.run = async (bot, message, args) => {
  try {
    if (message.guild.id !== config.ServerID) return;
    let user1 = args[0];
    let user2 = args.slice(1).join(" ");
    if (!user1)
      return message.channel.send(
        ":heart: | **Вы не указали 1 цель для шипинга!**"
      );
    if (!user2)
      return message.channel.send(
        ":heart: | **Вы не указали 2 цель для шипинга!**"
      );
    var ship = Math.floor(Math.random() * 100) + 1;
    if (ship <= 50) {
      message.channel.send(
        new Discord.RichEmbed()
          .setColor(`#9100ff`)
          .setDescription(user1 + " и " + user2 + " не выглядят хорошо вместе!")
          .setTitle(":broken_heart: " + ship + "% :broken_heart:")
      );
    } else if (ship == 100) {
      message.channel.send(
        new Discord.RichEmbed()
          .setColor(`#9100ff`)
          .setDescription(user1 + " и " + user2 + " подходят друг другу!")
          .setTitle(":heart: " + ship + "% :heart:")
      );
    } else {
      message.channel.send(
        new Discord.RichEmbed()
          .setColor(`#9100ff`)
          .setDescription(user1 + " и " + user2 + " это нечто!")
          .setTitle(":heart: " + ship + "% :heart:")
      );
    }
  } catch (err) {
    message.channel.send(
      new Discord.RichEmbed().setColor("RED").addField(ERROR, err.message)
    );
    console.log(err);
  }
};

module.exports.command = {
  name: "ship"
};
