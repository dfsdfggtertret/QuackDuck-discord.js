module.exports.run = async (bot, message, args) => {
  try {
    let Bans = await message.guild.fetchBans();
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription(
            "🚫 | **У вас недостаточно прав для выполнения этой команды!**"
          )
          .setColor("RED")
          .setFooter(
            `${message.author.username}`,
            message.author.displayAvatarURL
          )
          .setTimestamp()
      );
    let member = args.join(" ");
    if (!member)
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription(
            `⚠ | **Укажите ID или ник или тег пользователя которого надо разбанить!**`
          )
          .setColor("RED")
          .setFooter(
            `${message.author.username}`,
            message.author.displayAvatarURL
          )
          .setTimestamp()
      );
    function unban(ID, name) {
      message.guild.unban(ID);
      message.channel.send(
        new Discord.RichEmbed()
          .setDescription(
            `🔰 | **Модератор <@${message.author.id}> успешно разбанил пользователя с ID \`${ID}\` (\`${name}\`) !**`
          )
          .setColor(colors)
          .setFooter(message.author.username, message.author.displayAvatarURL)
          .setTimestamp()
      );
    }
    Bans.forEach(e => {
      if (e.id == member) {
        unban(e.id, e.username);
        return;
      }
      if (e.username == member) {
        unban(e.id, e.username);
        return;
      }
      if (`${e.username}#${e.discriminator}` == member) {
        unban(e.id, e.username);
        return;
      }
    });
  } catch (err) {
    message.channel.send(
      new Discord.RichEmbed().setColor("RED").addField(ERROR, err.message)
    );
    console.log(err.stack);
  }
};
module.exports.command = {
  name: "unban",
  DM: false
};
