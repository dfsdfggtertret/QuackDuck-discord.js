const strftime = require("strftime");
module.exports.run = (bot, message, args) => {
  try {
    let statuses = {
      online: "Онлайн",
      idle: "Не активен",
      dnd: "Занят",
      offline: "Оффлайн"
    };
    let member = !message.guild
      ? message.author
      : message.guild.member(
          message.mentions.users.first() ||
            message.guild.members.get(args[1]) ||
            message.guild.member(message.author)
        );
    let argsUser;
    if (member) argsUser = !message.guild ? message.author : member.user;
    else argsUser = message.author;
    const collection = db.collection("prefix");
    collection
      .find({ GuildId: !message.guild ? 0 : message.guild.id })
      .toArray(function(err, results) {
        let prefix =
          results[0] == undefined ? DefaultPrefix : results[0].Prefix;
        const collection2 = db.collection("levels");
        collection2
          .find({
            UserId: !message.guild ? message.author.id : member.id,
            GuildId: !message.guild ? 0 : message.guild.id
          })
          .toArray(async function(err, results) {
            let CurrentLevel = results[0] == undefined ? 0 : results[0].level;
            let CurrentXp = results[0] == undefined ? 0 : results[0].xp;
            let Maxs = results[0] == undefined ? "???" : results[0].maxs;
            const collection3 = db.collection("info");
            collection3
              .find({ UserId: !message.guild ? message.author.id : member.id })
              .toArray(async function(err, results) {
                let about =
                  results[0] == undefined ? "Не указана." : results[0].Info;
                let AboutResults = results[0] == undefined ? undefined : true;
                let game;
                if (!argsUser.presence.game)
                  game = `**${statuses[argsUser.presence.status]}**`;
                else if (argsUser.presence.game.type == 0)
                  game = `Играет в **${argsUser.presence.game.name}**`;
                else if (argsUser.presence.game.type == 1)
                  game = `Стримит [**${argsUser.presence.game.name}**](${argsUser.presence.game.url})`;
                else if (argsUser.presence.game.type == 2)
                  game = `Слушает **${argsUser.presence.game.name}**`;
                else if (argsUser.presence.game.type == 3)
                  game = `Смотрит **${argsUser.presence.game.name}**`;

                let day = 1000 * 60 * 60 * 24;
                let date1 = new Date(message.createdTimestamp);
                let date2 = new Date(argsUser.createdTimestamp);
                let diff1 = Math.round(
                  Math.abs((date1.getTime() - date2.getTime()) / day)
                );
                var args1 = message.content.split(" ");
                var mention = !message.guild
                  ? message.author
                  : message.guild.member(message.mentions.users.first()) ||
                    message.guild.members.get(args1[1]) ||
                    message.guild.member(message.author);
                if (message.channel.type == "dm") {
                  message.channel.send(
                    new Discord.RichEmbed()
                      .setAuthor(message.author.tag, message.author.avatarURL)
                      .addField(
                        "👋 **Никнейм:**",
                        `${message.author.username}`,
                        true
                      )
                      .addField(`⏳ **Статус:**`, `${game}`, true)
                      .addField(
                        "⏰ **Дата создания аккаунта:**",
                        `${strftime(
                          "%d.%m.%Y в %H:%M",
                          new Date(message.author.createdTimestamp)
                        )}\n(${diff1} дней назад)⠀\n `,
                        true
                      )
                      .addField(
                        "📞 **Идентификатор:**",
                        `ID: ${message.author.id}`
                      )
                      .setThumbnail(message.author.displayAvatarURL)
                      .setTimestamp()
                      .addField(`📋 **Паспорт этого участника:**`, about)
                      .setColor(colors)
                      .setFooter(
                        AboutResults == undefined
                          ? `Вы можете указать о себе информацию командой - !personal`
                          : bot.user.username,
                        bot.user.avatarURL
                      )
                  );
                  return;
                }
                if (member.user.bot) {
                  message.channel.send("Низя, он бот.");
                  return;
                }
                let date3 = new Date(
                  message.guild.member(argsUser).joinedTimestamp
                );
                let diff2 = Math.round(
                  Math.abs((date1.getTime() - date3.getTime()) / day)
                );
                const collection4 = db.collection("ConfigLevel");
                collection4
                  .find({ GuildId: message.guild.id })
                  .toArray(async function(err, results) {
                    let Levels =
                      results[0] == undefined ? true : results[0].Config;
                    if (Levels == false)
                      return message.channel.send(
                        new Discord.RichEmbed()
                          .setAuthor(mention.user.tag, mention.user.avatarURL)
                          .addField(
                            "👋 **Никнейм:**",
                            `${mention.user.username}`,
                            true
                          )
                          .addField(`⏳ **Статус:**`, `${game}`, true)
                          .addField(
                            "⏰ **Присоединился к серверу:**",
                            `${strftime(
                              "%d.%m.%Y в %H:%M",
                              new Date(
                                message.guild.member(argsUser).joinedTimestamp
                              )
                            )}\n(${diff2} дней назад)⠀\n `,
                            true
                          )
                          .addField(
                            "⏰ **Дата создания аккаунта:**",
                            `${strftime(
                              "%d.%m.%Y в %H:%M",
                              new Date(argsUser.createdTimestamp)
                            )}\n(${diff1} дней назад)⠀\n `,
                            true
                          )
                          .addField(
                            "📞 **Идентификатор:**",
                            `ID: ${argsUser.id}`
                          )
                          .addField(
                            `👀 **Роли[${message.member.roles.size - 1}]:**`,
                            message.guild
                              .member(argsUser)
                              .roles.filter(r => r.id != message.guild.id)
                              .map(r => `${r}`)
                              .join("⠀•⠀") || "Нет ролей! 😕"
                          )
                          .setThumbnail(argsUser.avatarURL)
                          .setTimestamp()
                          .addField(`📋 **Паспорт этого участника:**`, about)
                          .setColor(colors)
                          .setFooter(
                            AboutResults == undefined
                              ? `Вы можете указать о себе информацию командой - ${prefix}personal`
                              : bot.user.username,
                            bot.user.avatarURL
                          )
                      );
                    let embed2 = new Discord.RichEmbed()
                      .setAuthor(mention.user.tag, mention.user.avatarURL)
                      .addField(
                        "👋 **Никнейм:**",
                        `${mention.user.username}`,
                        true
                      )
                      .addField(`⏳ **Статус:**`, `${game}`, true)
                      .addField(
                        "⏰ **Присоединился к серверу:**",
                        `${strftime(
                          "%d.%m.%Y в %H:%M",
                          new Date(
                            message.guild.member(argsUser).joinedTimestamp
                          )
                        )}\n(${diff2} дней назад)⠀\n `,
                        true
                      )
                      .addField(
                        "⏰ **Дата создания аккаунта:**",
                        `${strftime(
                          "%d.%m.%Y в %H:%M",
                          new Date(argsUser.createdTimestamp)
                        )}\n(${diff1} дней назад)⠀\n `,
                        true
                      )
                      .addField(
                        ":incoming_envelope: **Уровень:**",
                        CurrentLevel,
                        true
                      )
                      .addField("💡 **Опыт:**", `${CurrentXp}/${Maxs}`, true)
                      .addField("📞 **Идентификатор:**", `ID: ${argsUser.id}`)
                      .addField(
                        `👀 **Роли[${member.roles.size - 1}]:**`,
                        message.guild
                          .member(argsUser)
                          .roles.filter(r => r.id != message.guild.id)
                          .map(r => `${r}`)
                          .join("⠀•⠀") || "Нет ролей! 😕"
                      )
                      .setThumbnail(argsUser.avatarURL)
                      .setTimestamp()
                      .addField(`📋 **Паспорт этого участника:**`, about)
                      .setColor(colors)
                      .setFooter(
                        AboutResults == undefined
                          ? `Вы можете указать о себе информацию командой - ${prefix}personal`
                          : bot.user.username,
                        bot.user.avatarURL
                      );
                    message.channel.send(embed2);
                    return;
                  });
              });
          });
      });
  } catch (err) {
    message.channel.send(
      new Discord.RichEmbed().setColor("RED").addField(ERROR, err.message)
    );
    console.log(err.stack);
  }
};
module.exports.command = {
  name: "userinfo"
};
