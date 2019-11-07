module.exports.run = async (bot, message, args) => {
  try {
    await message.channel.send("⚠ | **Бот перезапускается...**");
    process.exit(1);
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
  name: "restartbot",
  aliases: [],
  owner: true
};
