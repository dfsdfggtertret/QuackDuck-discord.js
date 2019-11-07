const { RichEmbed } = require("discord.js");
module.exports.run = (bot, message, args) => {
  try {
    const collection = db.collection("prefix");
    collection
      .find({ GuildId: message.guild.id })
      .toArray(function(err, results) {
        let prefix =
          results[0] == undefined ? DefaultPrefix : results[0].Prefix;
        if (!message.guild.me.permissions.has("KICK_MEMBERS"))
          return message.channel.send(
            new RichEmbed()
              .setDescription(
                "🚫 | **У меня недостаточно прав для выполнения этой операции!**"
              )
              .setColor("RED")
              .setTimestamp()
              .setFooter(
                message.author.username,
                message.author.displayAvatarURL
              )
          );
        if (!message.member.permissions.has("KICK_MEMBERS"))
          return message.channel.send(
            new RichEmbed()
              .setDescription(
                "🚫 | **У вас недостаточно прав для выполнения этой команды!**"
              )
              .setColor("RED")
              .setTimestamp()
              .setFooter(
                message.author.username,
                message.author.displayAvatarURL
              )
          );
        if (!args[0])
          return message.channel.send(
            new Discord.RichEmbed()
              .setDescription("⚠ | **Укажите пользователя!**")
              .setColor("RED")
              .setTimestamp()
              .setFooter(
                message.author.username,
                message.author.displayAvatarURL
              )
          );

        var kickmember = message.guild.member(
          message.mentions.users.first() || message.guild.members.get(args[0])
        );
        if (!kickmember)
          return message.channel.send(
            new RichEmbed()
              .setColor("RED")
              .setAuthor("Не найден пользователь!")
              .setDescription(
                `⚠ | **Правильный синтаксис команды: \`${prefix}kick <Участник> <Причина>\`**`
              )
              .setFooter(bot.user.username, bot.user.displayAvatarURL)
              .setTimestamp()
          );
        if (message.author.id == kickmember.id)
          return message.channel.send(
            new RichEmbed()
              .setColor("RED")
              .setAuthor("Нельзя кинуть самого себя!")
              .setDescription(
                `🚫 | **Пример использования команды: \`${prefix}kick <Участник> <Причина>\`**`
              )
              .setFooter(bot.user.username, bot.user.avatarURL)
              .setTimestamp()
          );
        if (message.guild.owner.id == kickmember.id)
          return message.channel.send(
            new RichEmbed()
              .setColor("RED")
              .setDescription(`🚫 | **Нельзя кикнуть создателя сервера!**`)
              .setFooter(bot.user.username, bot.user.avatarURL)
              .setTimestamp()
          );
          if(kickmember.kickable == false) return message.channel.send(
            new RichEmbed()
              .setColor("RED")
              .setDescription(
                `🚫 | **Я не могу кикнуть этого человека, ${
                  kickmember.permissions.has("ADMINISTRATOR")
                    ? "ведь у него права Администратора."
                    : "возможно он выше меня."
                }**`
              )
              .setFooter(bot.user.username, bot.user.displayAvatarURL)
              .setTimestamp()
            )
          if (message.guild.owner.id != kickmember.id) {
          if(message.member.highestRole.position < kickmember.highestRole.position) return message.channel.send(
            new RichEmbed()
              .setColor("RED")
              .setDescription(
                `🚫 | **Этот человек выше вас, пожалуйста попросите кого-нибуть другого, кто выше него.**`
              )
              .setFooter(bot.user.username, bot.user.displayAvatarURL)
              .setTimestamp()
          );
        }
        var reason = args.slice(1).join(" ");
        kickmember.send(
          new RichEmbed()
            .setDescription(
              `🔰 | **Вас кикнули на сервере \`${kickmember.guild}\` !**`
            )
            .setColor(colors)
            .addField("⚔ | **Модератор:**", `**${message.author.tag}**`, true)
            .addField(
              "📄 | **Причина:**",
              `**${!reason ? "Не указана." : reason}**`
            )
            .setFooter(bot.user.username, bot.user.displayAvatarURL)
            .setTimestamp()
        );
        message.guild.members
          .get(kickmember.id)
          .kick(!reason ? "Не указана." : reason);
        if (!reason) return message.channel.send(
          new RichEmbed()
            .setDescription(
              `🔰 | **Модератор ${message.author} успешно кикнул пользователя \`${kickmember.user.tag}\` !**`
            )
            .setColor(colors)
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setTimestamp()
        )
        message.channel.send(
          new Discord.RichEmbed()
            .setDescription(
              `🔰 | **Модератор ${message.author} успешно кикнул пользователя \`${kickmember.user.tag}\` по причине \`${reason}\` !**`
            )
            .setColor(colors)
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setTimestamp()
        );
      });
  } catch (err) {
    message.channel.send(
      new Discord.RichEmbed().setColor("RED").addField(ERROR, err.message)
    );
    console.log(err.stack);
  }
};
module.exports.command = {
  name: "kick",
  DM: false
};
