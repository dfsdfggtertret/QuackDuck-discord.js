module.exports.run = async (bot, message, args) => {
  try {
    let botmessage = args.join(" ");
    message
      .delete()
      .catch()
      .then(o_O => message.channel.send(botmessage));
  } catch (err) {
    message.channel.send(
      new Discord.RichEmbed()
        .setColor("RED")
        .addField("Произошла ошибка.", err.message)
    );
    console.log(err.stack);
  }
};
module.exports.command = {
  name: "say",
  owner: true,
  DM: false,
  bot: false
};
