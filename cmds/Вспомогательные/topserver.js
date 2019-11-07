const { RichEmbed } = require("discord.js");
exports.run = async (bot, message, args) => {
  try {
    const top = bot.guilds
      .sort((a, b) => a.memberCount - b.memberCount)
      .array()
      .reverse();
    let page = 1;
    let Страниц = 2;
    const embed = new RichEmbed()
      .setColor(colors)
      .setFooter(`Страница 1 из ${Страниц}`)
      .setDescription("🌍 | ***ТОП СЕРВЕРА ПО УЧАСТНИКАМ!***")
      .addField(
        `__***1.***__ **${top[0].name}**`,
        `Участников: *${top[0].memberCount}*`
      )
      .addField(
        `__***2.***__ **${top[1].name}**`,
        `Участников: *${top[1].memberCount}*`
      )
      .addField(
        `__***3.***__ **${top[2].name}**`,
        `Участников: *${top[2].memberCount}*`
      )
      .addField(
        `__***4.***__ **${top[3].name}**`,
        `Участников: *${top[3].memberCount}*`
      )
      .addField(
        `__***5.***__ **${top[4].name}**`,
        `Участников: *${top[4].memberCount}*`
      )
      .addField(
        `__***6.***__ **${top[5].name}**`,
        `Участников: *${top[5].memberCount}*`
      )
      .addField(
        `__***7.***__ **${top[6].name}**`,
        `Участников: *${top[6].memberCount}*`
      )
      .addField(
        `__***8.***__ **${top[7].name}**`,
        `Участников: *${top[7].memberCount}*`
      )
      .addField(
        `__***9.***__ **${top[8].name}**`,
        `Участников: *${top[8].memberCount}*`
      )
      .addField(
        `__***10.***__ **${top[9].name}**`,
        `Участников: *${top[9].memberCount}*`
      )
      .setTimestamp();
    const embed2 = new RichEmbed()
      .addField(
        `__***11.***__ **${top[10].name}**`,
        `Участников: *${top[10].memberCount}*`,
        true
      )
      .addField(
        `__***12.***__ **${top[11].name}**`,
        `Участников: *${top[11].memberCount}*`,
        true
      )
      .addField(
        `__***13.***__ **${top[12].name}**`,
        `Участников: *${top[12].memberCount}*`,
        true
      )
      .addField(
        `__***14.***__ **${top[13].name}**`,
        `Участников: *${top[13].memberCount}*`,
        true
      )
      .addField(
        `__***15.***__ **${top[14].name}**`,
        `Участников: *${top[14].memberCount}*`,
        true
      )
      .addField(
        `__***16.***__ **${top[15].name}**`,
        `Участников: *${top[15].memberCount}*`,
        true
      )
      .addField(
        `__***17.***__ **${top[16].name}**`,
        `Участников: *${top[16].memberCount}*`,
        true
      )
      .addField(
        `__***18.***__ **${top[17].name}**`,
        `Участников: *${top[17].memberCount}*`,
        true
      )
      .addField(
        `__***19.***__ **${top[18].name}**`,
        `Участников: *${top[18].memberCount}*`,
        true
      )
      .setColor(colors)
      .setFooter(`Страница 2 из ${Страниц}`)
      .setTimestamp()
      .addField(
        `__***20.***__ **${top[19].name}**`,
        `Участников: *${top[19].memberCount}*`,
        true
      );
    message.channel.send(embed).then(msg => {
      msg.react("⏪").then(r => {
        msg.react("⏩");
        const backwardsFilter = (reaction, user) =>
          reaction.emoji.name === "⏪" && user.id === message.author.id;
        const forwardsFilter = (reaction, user) =>
          reaction.emoji.name === "⏩" && user.id === message.author.id;
        const backwards = msg.createReactionCollector(backwardsFilter);
        const forwards = msg.createReactionCollector(forwardsFilter);
        backwards.on("collect", r => {
          if (message.channel.type !== "dm") {
            msg.reactions.forEach(e => e.remove(message.author.id));
          }
          if (page === 1) return;
          page--;
          if (page == 1) {
            msg.edit(embed).then(msg => {
              msg.react("⏪");
              msg.react("⏩");
              return;
            });
          }
          if (page == 2) {
            msg.edit(embed2).then(msg => {
              msg.react("⏪");
              msg.react("⏩");
              return;
            });
          }
        });
        forwards.on("collect", r => {
          if (message.channel.type !== "dm") {
            msg.reactions.forEach(e => e.remove(message.author.id));
          }
          if (page === Страниц) return;
          page++;
          if (page == 1) {
            msg.edit(embed).then(msg => {
              msg.react("⏪");
              msg.react("⏩");
              return;
            });
          }
          if (page == 2) {
            msg.edit(embed2).then(msg => {
              msg.react("⏪");
              msg.react("⏩");
              return;
            });
          }
        });
      });
    });
  } catch (err) {
    message.channel.send(
      new Discord.RichEmbed().setColor("RED").addField(ERROR, err.message)
    );
    console.log(err);
  }
};
exports.command = {
  name: "topserver"
};
