const strftime = require("strftime");
module.exports.run = async (bot, message, args) => {
  try {
    let day = 1000 * 60 * 60 * 24;
    let date1 = new Date(message.createdTimestamp);
    let date3 = new Date(message.guild.member(message.author).joinedTimestamp);
    let diff2 = Math.round(Math.abs((date1.getTime() - date3.getTime()) / day));
    const verifilv = [
      "Отсутствует",
      "Низкая",
      "Средняя",
      "Высокая",
      "Очень высокая"
    ];
    message.channel.send(
      new Discord.RichEmbed()
        .setDescription("🦆 **Информация о сервере!**")
        .setColor(colors)
        .setAuthor(message.guild.name, message.guild.iconURL)
        .addField(
          "📆 Дата создания сервера:",
          `${strftime(
            "%d.%m.%Y в %H:%M",
            new Date(message.guild.createdAt)
          )}\n(${diff2} дней назад)`
        )
        .addField("👑 Создатель сервера:", message.guild.owner)
        .addField(
          "<:Great22:553500800681377793> Участники:",
          `> Ботов: **${
            message.guild.members.filter(mem => mem.user.bot === true).size
          }**\n> В сети: **${
            message.guild.presences.size
          }**\n> Не в сети: **${message.guild.memberCount -
            message.guild.presences.size}**\n> Не активен: **${
            message.guild.members.filter(
              member => member.presence.status === "idle"
            ).size
          }**\n> Не беспокоить: **${
            message.guild.members.filter(
              member => member.presence.status === "dnd"
            ).size
          }**\n> Общее количество: **${message.guild.memberCount}**`,
          true
        )
        .addField(
          "<:Attention:641904977387716608> Каналы:",
          `> Голосовой онлайн: **${
            message.guild.members.filter(m => m.voiceChannel).size
          }**\n> Текстовых: **${
            message.guild.channels.filter(c => c.type == "text").size
          }**\n> Голосовых: **${
            message.guild.channels.filter(c => c.type == "voice").size
          }**`,
          true
        )
        .addField("📞 ID сервера:", message.guild.id, true)
        .addField("🌟 Роли:", message.guild.roles.size, true)
        .addField("🎉 Эмоджи:", message.guild.emojis.size, true)
        .setFooter(bot.user.username, bot.user.avatarURL)
        .addField("🔰 Защита:", verifilv[message.guild.verificationLevel], true)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL)
    );
  } catch (err) {
    message.channel.send(
      new Discord.RichEmbed().setColor("RED").addField(ERROR, err.message)
    );
    console.log(err);
  }
};
module.exports.command = {
  name: "serverinfo",
  DM: false
};
