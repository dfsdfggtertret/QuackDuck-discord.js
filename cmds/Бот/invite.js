module.exports.run = (bot, message, args) => {
  try {
    message.channel.send("Ссылка на приглашение этого бота:\n" + config.BotURL);
  } catch (err) {
    message.channel.send(
      new Discord.RichEmbed().setColor("RED").addField(ERROR, err.message)
    );
    console.log(err.stack);
  }
};
module.exports.command = {
  name: "invite"
};
