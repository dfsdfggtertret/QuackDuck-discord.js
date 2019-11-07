const { MuteRoleName } = require("../../botconfig.json");
module.exports.run = async (bot, message, args) => {
  try {
    var rUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[0])
    );
    var role = message.guild.roles.find(r => r.name == MuteRoleName);
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription(
            "🚫 | **У вас недостаточно прав для выполнения этой команды!**"
          )
          .setColor("RED")
          .setFooter(message.author.username, message.author.displayAvatarURL)
          .setTimestamp()
      );

    if (!args[0])
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription(
            "⚠ | **Вы не указали пользователя которого надо размутить!**"
          )
          .setColor("RED")
          .setFooter(message.author.username, message.author.displayAvatarURL)
          .setTimestamp()
      );

    if (!rUser)
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription("⚠ | **Пользователь не найден!**")
          .setColor("RED")
          .setFooter(message.author.username, message.author.displayAvatarURL)
          .setTimestamp()
      );
    if (!role) return message.channel.send(`⚠ | **Нет роли ${MuteRoleName}.**`);
    if (!rUser.roles.has(role.id))
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription("✅ | **Этот пользователь уже может писать!**")
          .setColor(colors)
          .setFooter(message.author.username, message.author.displayAvatarURL)
          .setTimestamp()
      );
    db.collection("mutes").deleteOne(
      { UserId: rUser.id, GuildId: message.guild.id },
      function(err, result) {
        if (err) return console.log(err);
      }
    );
    message.channel.send(
      new Discord.RichEmbed()
        .setColor(colors)
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(
          `🔰 | **Модератор <@${message.author.id}> успешно размутил пользователя ${rUser} !**`
        )
    );
    rUser.send(
      new Discord.RichEmbed()
        .setDescription(
          `🔰 | **Вас размутили на сервере \`${rUser.guild}\` !**`
        )
        .setColor(colors)
        .addField("⚔ | **Модератор:**", `**${message.author}**`, true)
        .setFooter(bot.user.username, bot.user.avatarURL)
        .setTimestamp()
    );
    rUser.removeRole(role);
  } catch (err) {
    message.channel.send(
      new Discord.RichEmbed().setColor("RED").addField(ERROR, err.message)
    );
    console.log(err.stack);
  }
};
module.exports.command = {
  name: "unmute",
  DM: false
};
