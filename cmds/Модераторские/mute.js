const { MuteRoleName } = require("../../botconfig.json");
module.exports.run = async (bot, message, args) => {
  try {
    const collection = db.collection("prefix");
    collection
      .find({ GuildId: message.guild.id })
      .toArray(async function(err, results) {
        let prefix =
          results[0] == undefined ? DefaultPrefix : results[0].Prefix;
        function uts(UT, one, two, five) {
          if (`${UT}`.split("").reverse()[1] === "1") return `${UT} ${five}`;
          if (`${UT}`.split("").reverse()[0] === "1") return `${UT} ${one}`;
          if (
            +`${UT}`.split("").reverse()[0] >= 2 &&
            +`${UT}`.split("").reverse()[0] <= 4
          )
            return `${UT} ${two}`;
          return `${UT} ${five}`;
        }
        var args1 = message.content.toLowerCase().split(" ");
        let rUser = message.guild.member(
          message.mentions.users.first() || message.guild.members.get(args[0])
        );
        let Time = args[1];
        var reason = args.slice(2).join(" ");
        var role = message.guild.roles.find(r => r.name === MuteRoleName);
        if (!message.guild.me.permissions.has("MANAGE_ROLES"))
          return message.channel.send(
            new Discord.RichEmbed()
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
        if (
          !["MANAGE_MESSAGES", "MANAGE_ROLES"].some(i =>
            message.member.hasPermission(i)
          )
        )
          return message.channel.send(
            new Discord.RichEmbed()
              .setColor("RED")
              .setDescription(
                "🚫 | **У вас должны быть права на удаление сообщений или выдачи ролей!**"
              )
              .setFooter(bot.user.username, bot.user.avatarURL)
              .setTimestamp()
          );
        if (!role) {
          let embed = new Discord.RichEmbed()
            .setColor("RED")
            .setAuthor("Повторите попытку ещё раз...");
          message.channel.send(embed);
          await message.guild.createRole({
            name: MuteRoleName
          });
          message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(role, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            });
          });
          return;
        }
        if (!rUser)
          return message.channel.send(
            new Discord.RichEmbed()
              .setColor("RED")
              .setAuthor("Укажите пользователя!")
              .setDescription(
                `🚫 | **Правильный синтаксис команды: \`${prefix}mute <Участник> <Время> <Причина>\`**`
              )
              .setFooter(bot.user.username, bot.user.avatarURL)
              .setTimestamp()
          );
        if (message.author.id == rUser.id)
          return message.channel.send(
            new Discord.RichEmbed()
              .setColor("RED")
              .setDescription("🚫 | **Нельзя замутить самого себя!**")
              .setFooter(bot.user.username, bot.user.avatarURL)
              .setTimestamp()
          );
        if(rUser.id == message.guild.owner.id) return message.channel.send(
            new Discord.RichEmbed()
              .setColor("RED")
              .setTimestamp()
              .setDescription(`🚫 | **Нельзя замутить создателя сервера!**`)
              .setFooter(bot.user.username, bot.user.avatarURL)
          );
        if (rUser.hasPermission("ADMINISTRATOR"))
          return message.channel.send(
            new Discord.RichEmbed()
              .setColor("RED")
              .setTimestamp()
              .setDescription(`🚫 | **Нельзя замутить Администратора!**`)
              .setFooter(bot.user.username, bot.user.avatarURL)
          );
        if (rUser.id == bot.user.id)
          return message.channel.send(
            new Discord.RichEmbed()
              .setColor("RED")
              .setDescription("🚫 | **Нельзя замутить меня!**")
              .setFooter(bot.user.username, bot.user.avatarURL)
              .setTimestamp()
          );
          if (message.guild.owner.id != rUser.id) {
          if(message.member.highestRole.position < rUser.highestRole.position) return message.channel.send(
            new RichEmbed()
              .setColor("RED")
              .setDescription(
                `🚫 | **Этот человек выше вас, пожалуйста попросите кого-нибуть другого, кто выше него.**`
              )
              .setFooter(bot.user.username, bot.user.displayAvatarURL)
              .setTimestamp()
          );
        }
        const collection2 = db.collection("mutes");
        collection2
          .find({ UserId: rUser.id, GuildId: message.guild.id })
          .toArray(async function(err, results) {
            let Mutess = results[0] == undefined ? false : true;
            let Mutes =
              results[0] == undefined ? parseInt(Date.now()) : results[0].Time;
            if (!Time) {
              if (Mutess == true) {
                rUser.addRole(role);
                return message.channel.send(
                  new Discord.RichEmbed()
                    .setColor(`RED`)
                    .setDescription(
                      `🚫 | **Данный пользователь уже заблокирован!**`
                    )
                    .setFooter(
                      message.author.username,
                      message.author.displayAvatarURL
                    )
                    .setTimestamp()
                );
              }
              let reason1 = args.slice(1).join(" ");
              if (!reason1) {
                let Embed = new Discord.RichEmbed()
                  .setColor(colors)
                  .setFooter(
                    message.author.username,
                    message.author.displayAvatarURL
                  )
                  .setTimestamp()
                  .setDescription(
                    `Подтвердите данные!\nИгрок: ${rUser}\nВремя: Не указано.\nПричина: Не указана.`
                  );
                message.channel.send(Embed).then(msg => {
                  msg.react("✅").then(r => {
                    msg.react("❎");
                    const a = (reaction, user) =>
                      reaction.emoji.name === "✅" &&
                      user.id === message.author.id;
                    const b = (reaction, user) =>
                      reaction.emoji.name === "❎" &&
                      user.id === message.author.id;
                    const d = msg.createReactionCollector(a);
                    const z = msg.createReactionCollector(b);
                    d.on("collect", r => {
                      rUser.addRole(role);
                      Embed.setDescription(
                        `✅ | **Пользователь ${message.author} замутил пользователя ${rUser}!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      let EmbedMute = new Discord.RichEmbed()
                        .setDescription(
                          `✅ | **Вас замутили на сервере \`${message.guild.name}\`!**`
                        )
                        .setColor(colors)
                        .addField("Длительность", `**Навсегда.**`, true)
                        .addField("Модератор", `**${message.author}**`, true)
                        .addField("Причина", `**Без причины.**`)
                        .setFooter(bot.user.username, bot.user.avatarURL)
                        .setTimestamp();
                      rUser.send(EmbedMute);
                      d.stop();
                      z.stop();
                    });
                    z.on("collect", r => {
                      Embed.setDescription(
                        `❎ | **Пользователь ${message.author} отменил команду!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      d.stop();
                      z.stop();
                    });
                  });
                });
                return;
              }
              let Embed = new Discord.RichEmbed()
                .setColor(colors)
                .setFooter(
                  message.author.username,
                  message.author.displayAvatarURL
                )
                .setTimestamp()
                .setDescription(
                  `Подтвердите данные!\nИгрок: ${rUser}\nВремя: Не указано.\nПричина: \`${reason1}\``
                );
              message.channel.send(Embed).then(msg => {
                msg.react("✅").then(r => {
                  msg.react("❎");
                  const a = (reaction, user) =>
                    reaction.emoji.name === "✅" &&
                    user.id === message.author.id;
                  const b = (reaction, user) =>
                    reaction.emoji.name === "❎" &&
                    user.id === message.author.id;
                  const d = msg.createReactionCollector(a);
                  const z = msg.createReactionCollector(b);
                  d.on("collect", r => {
                    rUser.addRole(role);
                    Embed.setDescription(
                      `✅ | **Пользователь ${message.author} замутил пользователя ${rUser} по причине \`${reason1}\`!**`
                    );
                    msg.edit(Embed).then(msg => {
                      msg.clearReactions();
                    });
                    let EmbedMute = new Discord.RichEmbed()
                      .setDescription(
                        `✅ | **Вас замутили на сервере \`${message.guild.name}\`!**`
                      )
                      .setColor(colors)
                      .addField("Длительность", `**Навсегда.**`, true)
                      .addField("Модератор", `**${message.author}**`, true)
                      .addField("Причина", `**${reason1}**`)
                      .setFooter(bot.user.username, bot.user.avatarURL)
                      .setTimestamp();
                    rUser.send(EmbedMute);
                    d.stop();
                    z.stop();
                  });
                  z.on("collect", r => {
                    Embed.setDescription(
                      `❎ | **Пользователь ${message.author} отменил команду!**`
                    );
                    msg.edit(Embed).then(msg => {
                      msg.clearReactions();
                    });
                    d.stop();
                    z.stop();
                  });
                });
              });
              return;
            }
            const sym = Time.split("").reverse()[0];
            const time = Time.slice(0, -1);
            if (isNaN(time)) {
              if (Mutess == true) {
                rUser.addRole(role);
                let embed = new Discord.RichEmbed()
                  .setColor(`RED`)
                  .setDescription(
                    `🚫 | **Данный пользователь уже заблокирован!**`
                  )
                  .setFooter(
                    message.author.username,
                    message.author.displayAvatarURL
                  )
                  .setTimestamp();
                return message.channel.send(embed);
              }
              let reason1 = args.slice(1).join(" ");
              if (!reason1) {
                let Embed = new Discord.RichEmbed()
                  .setColor(colors)
                  .setFooter(
                    message.author.username,
                    message.author.displayAvatarURL
                  )
                  .setTimestamp()
                  .setDescription(
                    `Подтвердите данные!\nИгрок: ${rUser}\nВремя: Не указано.\nПричина: Не указана.`
                  );
                message.channel.send(Embed).then(msg => {
                  msg.react("✅").then(r => {
                    msg.react("❎");
                    const a = (reaction, user) =>
                      reaction.emoji.name === "✅" &&
                      user.id === message.author.id;
                    const b = (reaction, user) =>
                      reaction.emoji.name === "❎" &&
                      user.id === message.author.id;
                    const d = msg.createReactionCollector(a);
                    const z = msg.createReactionCollector(b);
                    d.on("collect", r => {
                      rUser.addRole(role);
                      Embed.setDescription(
                        `✅ | **Пользователь ${message.author} замутил пользователя ${rUser}!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      let EmbedMute = new Discord.RichEmbed()
                        .setDescription(
                          `✅ | **Вас замутили на сервере \`${message.guild.name}\`!**`
                        )
                        .setColor(colors)
                        .addField("Длительность", `**Навсегда.**`, true)
                        .addField("Модератор", `**${message.author}**`, true)
                        .addField("Причина", `**Без причины.**`)
                        .setFooter(bot.user.username, bot.user.avatarURL)
                        .setTimestamp();
                      rUser.send(EmbedMute);
                      d.stop();
                      z.stop();
                    });
                    z.on("collect", r => {
                      Embed.setDescription(
                        `❎ | **Пользователь ${message.author} отменил команду!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      d.stop();
                      z.stop();
                    });
                  });
                });
                return;
              }
              let Embed = new Discord.RichEmbed()
                .setColor(colors)
                .setFooter(
                  message.author.username,
                  message.author.displayAvatarURL
                )
                .setTimestamp()
                .setDescription(
                  `Подтвердите данные!\nИгрок: ${rUser}\nВремя: Не указано.\nПричина: \`${reason1}\``
                );
              message.channel.send(Embed).then(msg => {
                msg.react("✅").then(r => {
                  msg.react("❎");
                  const a = (reaction, user) =>
                    reaction.emoji.name === "✅" &&
                    user.id === message.author.id;
                  const b = (reaction, user) =>
                    reaction.emoji.name === "❎" &&
                    user.id === message.author.id;
                  const d = msg.createReactionCollector(a);
                  const z = msg.createReactionCollector(b);
                  d.on("collect", r => {
                    rUser.addRole(role);
                    Embed.setDescription(
                      `✅ | **Пользователь ${message.author} замутил пользователя ${rUser} по причине \`${reason1}\`!**`
                    );
                    msg.edit(Embed).then(msg => {
                      msg.clearReactions();
                    });
                    let EmbedMute = new Discord.RichEmbed()
                      .setDescription(
                        `✅ | **Вас замутили на сервере \`${message.guild.name}\`!**`
                      )
                      .setColor(colors)
                      .addField("Длительность", `**Навсегда.**`, true)
                      .addField("Модератор", `**${message.author}**`, true)
                      .addField("Причина", `**${reason1}**`)
                      .setFooter(bot.user.username, bot.user.avatarURL)
                      .setTimestamp();
                    rUser.send(EmbedMute);
                    d.stop();
                    z.stop();
                  });
                  z.on("collect", r => {
                    Embed.setDescription(
                      `❎ | **Пользователь ${message.author} отменил команду!**`
                    );
                    msg.edit(Embed).then(msg => {
                      msg.clearReactions();
                    });
                    d.stop();
                    z.stop();
                  });
                });
              });
              return;
            }
            if (sym === "s") {
              one = "секунду";
              two = "секунды";
              five = "секунд";
              if (Mutess == true) {
                if (!reason) {
                  let Embed = new Discord.RichEmbed()
                    .setColor(colors)
                    .setFooter(
                      message.author.username,
                      message.author.displayAvatarURL
                    )
                    .setTimestamp()
                    .setDescription(
                      `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                        time,
                        one,
                        two,
                        five
                      )}\nПричина: Не указана.\nДействие: Дополнить мут.`
                    );
                  message.channel.send(Embed).then(msg => {
                    msg.react("✅").then(r => {
                      msg.react("❎");
                      const a = (reaction, user) =>
                        reaction.emoji.name === "✅" &&
                        user.id === message.author.id;
                      const b = (reaction, user) =>
                        reaction.emoji.name === "❎" &&
                        user.id === message.author.id;
                      const d = msg.createReactionCollector(a);
                      const z = msg.createReactionCollector(b);
                      d.on("collect", r => {
                        rUser.addRole(role);
                        let a = Mutes;
                        let g = time * 1000;
                        let b = parseInt(a) + g;
                        collection2.updateOne(
                          { UserId: rUser.id, GuildId: message.guild.id },
                          { $set: { Time: b } },
                          function(err, result) {
                            if (err) return console.log(err);
                          }
                        );
                        Embed.setDescription(
                          `✅ | **Пользователь ${
                            message.author
                          } дополнил мут ${rUser} на ${uts(
                            time,
                            one,
                            two,
                            five
                          )}!**`
                        );
                        msg.edit(Embed).then(msg => {
                          msg.clearReactions();
                        });
                        let EmbedMute = new Discord.RichEmbed()
                          .setColor(colors)
                          .setDescription(
                            `Вам дополнили мут на сервере \`${message.guild.name}\`!`
                          )
                          .addField(
                            "Длительность",
                            `**${uts(time, one, two, five)}**`,
                            true
                          )
                          .addField("Модератор", `**${message.author}**`, true)
                          .addField("Причина", `**Без причины.**`)
                          .setFooter(bot.user.username, bot.user.avatarURL)
                          .setTimestamp();
                        rUser.send(EmbedMute);
                        d.stop();
                        z.stop();
                      });
                      z.on("collect", r => {
                        Embed.setDescription(
                          `❎ | **Пользователь ${message.author} отменил команду!**`
                        );
                        msg.edit(Embed).then(msg => {
                          msg.clearReactions();
                        });
                        d.stop();
                        z.stop();
                      });
                    });
                  });
                  return;
                }
                let Embed = new Discord.RichEmbed()
                  .setColor(colors)
                  .setFooter(
                    message.author.username,
                    message.author.displayAvatarURL
                  )
                  .setTimestamp()
                  .setDescription(
                    `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                      time,
                      one,
                      two,
                      five
                    )}\nПричина: \`${reason}\`\nДействие: Дополнить мут.`
                  );
                message.channel.send(Embed).then(msg => {
                  msg.react("✅").then(r => {
                    msg.react("❎");
                    const a = (reaction, user) =>
                      reaction.emoji.name === "✅" &&
                      user.id === message.author.id;
                    const b = (reaction, user) =>
                      reaction.emoji.name === "❎" &&
                      user.id === message.author.id;
                    const d = msg.createReactionCollector(a);
                    const z = msg.createReactionCollector(b);
                    d.on("collect", r => {
                      rUser.addRole(role);
                      let a = Mutes;
                      let g = time * 1000;
                      let b = parseInt(a) + g;
                      collection2.updateOne(
                        { UserId: rUser.id, GuildId: message.guild.id },
                        { $set: { Time: b } },
                        function(err, result) {
                          if (err) return console.log(err);
                        }
                      );
                      Embed.setDescription(
                        `✅ | **Пользователь ${
                          message.author
                        } дополнил мут ${rUser} на ${uts(
                          time,
                          one,
                          two,
                          five
                        )} по причине \`${reason}\`!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      let EmbedMute = new Discord.RichEmbed()
                        .setColor(colors)
                        .setDescription(
                          `Вам дополнили мут на сервере \`${message.guild.name}\`!`
                        )
                        .addField(
                          "Длительность",
                          `**${uts(time, one, two, five)}**`,
                          true
                        )
                        .addField("Модератор", `**${message.author}**`, true)
                        .addField("Причина", `**${reason}**`)
                        .setFooter(bot.user.username, bot.user.avatarURL)
                        .setTimestamp();
                      rUser.send(EmbedMute);
                      d.stop();
                      z.stop();
                    });
                    z.on("collect", r => {
                      Embed.setDescription(
                        `❎ | **Пользователь ${message.author} отменил команду!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      d.stop();
                      z.stop();
                    });
                  });
                });
                return;
              }
              if (!reason) {
                let Embed = new Discord.RichEmbed()
                  .setColor(colors)
                  .setFooter(
                    message.author.username,
                    message.author.displayAvatarURL
                  )
                  .setTimestamp()
                  .setDescription(
                    `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                      time,
                      one,
                      two,
                      five
                    )}\nПричина: Не указана.`
                  );
                message.channel.send(Embed).then(msg => {
                  msg.react("✅").then(r => {
                    msg.react("❎");
                    const a = (reaction, user) =>
                      reaction.emoji.name === "✅" &&
                      user.id === message.author.id;
                    const b = (reaction, user) =>
                      reaction.emoji.name === "❎" &&
                      user.id === message.author.id;
                    const d = msg.createReactionCollector(a);
                    const z = msg.createReactionCollector(b);
                    d.on("collect", r => {
                      let users2 = [
                        {
                          UserId: rUser.id,
                          GuildId: message.guild.id,
                          Time: parseInt(Date.now() + time * 1000)
                        }
                      ];
                      collection2.insertMany(users2, function(err, results) {
                        if (err) return console.log(err);
                      });
                      rUser.addRole(role);
                      Embed.setDescription(
                        `✅ | **Пользователь ${
                          message.author
                        } замутил пользователя ${rUser} на ${uts(
                          time,
                          one,
                          two,
                          five
                        )}!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      let EmbedMute = new Discord.RichEmbed()
                        .setDescription(
                          `✅ | **Вас замутили на сервере \`${message.guild.name}\`!**`
                        )
                        .setColor(colors)
                        .addField(
                          "Длительность",
                          `**${uts(time, one, two, five)}**`,
                          true
                        )
                        .addField("Модератор", `**${message.author}**`, true)
                        .addField("Причина", `**Без причины.**`)
                        .setFooter(bot.user.username, bot.user.avatarURL)
                        .setTimestamp();
                      rUser.send(EmbedMute);
                      d.stop();
                      z.stop();
                      return;
                    });
                    z.on("collect", r => {
                      Embed.setDescription(
                        `❎ | **Пользователь ${message.author} отменил команду!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      d.stop();
                      z.stop();
                    });
                  });
                });
                return
              }
              let Embed = new Discord.RichEmbed()
                .setColor(colors)
                .setFooter(
                  message.author.username,
                  message.author.displayAvatarURL
                )
                .setTimestamp()
                .setDescription(
                  `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                    time,
                    one,
                    two,
                    five
                  )}\nПричина: ${reason}`
                );
              message.channel.send(Embed).then(msg => {
                msg.react("✅").then(r => {
                  msg.react("❎");
                  const a = (reaction, user) =>
                    reaction.emoji.name === "✅" &&
                    user.id === message.author.id;
                  const b = (reaction, user) =>
                    reaction.emoji.name === "❎" &&
                    user.id === message.author.id;
                  const d = msg.createReactionCollector(a);
                  const z = msg.createReactionCollector(b);
                  d.on("collect", r => {
                    let users2 = [
                      {
                        UserId: rUser.id,
                        GuildId: message.guild.id,
                        Time: parseInt(Date.now() + time * 1000)
                      }
                    ];
                    collection2.insertMany(users2, function(err, results) {
                      if (err) return console.log(err);
                    });
                    rUser.addRole(role);
                    Embed.setDescription(
                      `✅ | **Пользователь ${
                        message.author
                      } замутил пользователя ${rUser} на ${uts(
                        time,
                        one,
                        two,
                        five
                      )} по причине \`${reason}\`!**`
                    );
                    msg.edit(Embed).then(msg => {
                      msg.clearReactions();
                    });
                    d.stop();
                    z.stop();
                    let EmbedMute = new Discord.RichEmbed()
                      .setDescription(
                        `✅ | **Вас замутили на сервере \`${message.guild.name}\`!**`
                      )
                      .setColor(colors)
                      .addField(
                        "Длительность",
                        `**${uts(time, one, two, five)}**`,
                        true
                      )
                      .addField("Модератор", `**${message.author}**`, true)
                      .addField("Причина", `**${reason}**`)
                      .setFooter(bot.user.username, bot.user.avatarURL)
                      .setTimestamp();
                    rUser.send(EmbedMute);
                  });
                  z.on("collect", r => {
                    Embed.setDescription(
                      `❎ | **Пользователь ${message.author} отменил команду!**`
                    );
                    msg.edit(Embed).then(msg => {
                      msg.clearReactions();
                    });
                    d.stop();
                    z.stop();
                  });
                });
              });
            return
            }
            if (sym === "m") {
              one = "минуту";
              two = "минуты";
              five = "минут";
              if (Mutess == true) {
                if (!reason) {
                  let Embed = new Discord.RichEmbed()
                    .setColor(colors)
                    .setFooter(
                      message.author.username,
                      message.author.displayAvatarURL
                    )
                    .setTimestamp()
                    .setDescription(
                      `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                        time,
                        one,
                        two,
                        five
                      )}\nПричина: Не указана.\nДействие: Дополнить мут.`
                    );
                  message.channel.send(Embed).then(msg => {
                    msg.react("✅").then(r => {
                      msg.react("❎");
                      const a = (reaction, user) =>
                        reaction.emoji.name === "✅" &&
                        user.id === message.author.id;
                      const b = (reaction, user) =>
                        reaction.emoji.name === "❎" &&
                        user.id === message.author.id;
                      const d = msg.createReactionCollector(a);
                      const z = msg.createReactionCollector(b);
                      d.on("collect", r => {
                        rUser.addRole(role);
                        let min = time * 60;
                        let a = Mutes;
                        let g = min * 1000
                        let b = parseInt(a) + g;
                        collection2.updateOne(
                          { UserId: rUser.id, GuildId: message.guild.id },
                          { $set: { Time: b } },
                          function(err, result) {
                            if (err) return console.log(err);
                          }
                        );
                        Embed.setDescription(
                          `✅ | **Пользователь ${
                            message.author
                          } дополнил мут ${rUser} на ${uts(
                            time,
                            one,
                            two,
                            five
                          )}!**`
                        );
                        msg.edit(Embed).then(msg => {
                          msg.clearReactions();
                        });
                        let EmbedMute = new Discord.RichEmbed()
                          .setColor(colors)
                          .setDescription(
                            `Вам дополнили мут на сервере \`${message.guild.name}\`!`
                          )
                          .addField(
                            "Длительность",
                            `**${uts(time, one, two, five)}**`,
                            true
                          )
                          .addField("Модератор", `**${message.author}**`, true)
                          .addField("Причина", `**Без причины.**`)
                          .setFooter(bot.user.username, bot.user.avatarURL)
                          .setTimestamp();
                        rUser.send(EmbedMute);
                        d.stop();
                        z.stop();
                      });
                      z.on("collect", r => {
                        Embed.setDescription(
                          `❎ | **Пользователь ${message.author} отменил команду!**`
                        );
                        msg.edit(Embed).then(msg => {
                          msg.clearReactions();
                        });
                        d.stop();
                        z.stop();
                      });
                    });
                  });
                  return;
                }
                let Embed = new Discord.RichEmbed()
                  .setColor(colors)
                  .setFooter(
                    message.author.username,
                    message.author.displayAvatarURL
                  )
                  .setTimestamp()
                  .setDescription(
                    `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                      time,
                      one,
                      two,
                      five
                    )}\nПричина: \`${reason}\`\nДействие: Дополнить мут.`
                  );
                message.channel.send(Embed).then(msg => {
                  msg.react("✅").then(r => {
                    msg.react("❎");
                    const a = (reaction, user) =>
                      reaction.emoji.name === "✅" &&
                      user.id === message.author.id;
                    const b = (reaction, user) =>
                      reaction.emoji.name === "❎" &&
                      user.id === message.author.id;
                    const d = msg.createReactionCollector(a);
                    const z = msg.createReactionCollector(b);
                    d.on("collect", r => {
                      rUser.addRole(role);
                      let min = time * 60;
                      let a = Mutes;
                      let g = min * 1000
                      let b = parseInt(a) + g;
                      collection2.updateOne(
                        { UserId: rUser.id, GuildId: message.guild.id },
                        { $set: { Time: b } },
                        function(err, result) {
                          if (err) return console.log(err);
                        }
                      );
                      Embed.setDescription(
                        `✅ | **Пользователь ${
                          message.author
                        } дополнил мут ${rUser} на ${uts(
                          time,
                          one,
                          two,
                          five
                        )} по причине \`${reason}\`!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      let EmbedMute = new Discord.RichEmbed()

                        .setColor(colors)
                        .setDescription(
                          `Вам дополнили мут на сервере \`${message.guild.name}\`!`
                        )
                        .addField(
                          "Длительность",
                          `**${uts(time, one, two, five)}**`,
                          true
                        )
                        .addField("Модератор", `**${message.author}**`, true)
                        .addField("Причина", `**${reason}**`)
                        .setFooter(bot.user.username, bot.user.avatarURL)
                        .setTimestamp();
                      rUser.send(EmbedMute);
                      d.stop();
                      z.stop();
                    });
                    z.on("collect", r => {
                      Embed.setDescription(
                        `❎ | **Пользователь ${message.author} отменил команду!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      d.stop();
                      z.stop();
                    });
                  });
                });
                return;
              }
              if (!reason) {
                let Embed = new Discord.RichEmbed()
                  .setColor(colors)
                  .setFooter(
                    message.author.username,
                    message.author.displayAvatarURL
                  )
                  .setTimestamp()
                  .setDescription(
                    `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                      time,
                      one,
                      two,
                      five
                    )}\nПричина: Не указана.`
                  );
                message.channel.send(Embed).then(msg => {
                  msg.react("✅").then(r => {
                    msg.react("❎");
                    const a = (reaction, user) =>
                      reaction.emoji.name === "✅" &&
                      user.id === message.author.id;
                    const b = (reaction, user) =>
                      reaction.emoji.name === "❎" &&
                      user.id === message.author.id;
                    const d = msg.createReactionCollector(a);
                    const z = msg.createReactionCollector(b);
                    d.on("collect", r => {
                      let min = time * 60;
                      let users2 = [
                        {
                          UserId: rUser.id,
                          GuildId: message.guild.id,
                          Time: parseInt(Date.now() + min * 1000)
                        }
                      ];
                      collection2.insertMany(users2, function(err, results) {
                        if (err) return console.log(err);
                      });
                      rUser.addRole(role);
                      Embed.setDescription(
                        `✅ | **Пользователь ${
                          message.author
                        } замутил пользователя ${rUser} на ${uts(
                          time,
                          one,
                          two,
                          five
                        )}!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      let EmbedMute = new Discord.RichEmbed()
                        .setDescription(
                          `✅ | **Вас замутили на сервере \`${message.guild.name}\`!**`
                        )
                        .setColor(colors)
                        .addField(
                          "Длительность",
                          `**${uts(time, one, two, five)}**`,
                          true
                        )
                        .addField("Модератор", `**${message.author}**`, true)
                        .addField("Причина", `**Без причины.**`)
                        .setFooter(bot.user.username, bot.user.avatarURL)
                        .setTimestamp();
                      rUser.send(EmbedMute);
                      d.stop();
                      z.stop();
                      return;
                    });
                    z.on("collect", r => {
                      Embed.setDescription(
                        `❎ | **Пользователь ${message.author} отменил команду!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      d.stop();
                      z.stop();
                    });
                  });
                });
return
              }
              let Embed = new Discord.RichEmbed()
                .setColor(colors)
                .setFooter(
                  message.author.username,
                  message.author.displayAvatarURL
                )
                .setTimestamp()
                .setDescription(
                  `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                    time,
                    one,
                    two,
                    five
                  )}\nПричина: ${reason}`
                );
              message.channel.send(Embed).then(msg => {
                msg.react("✅").then(r => {
                  msg.react("❎");
                  const a = (reaction, user) =>
                    reaction.emoji.name === "✅" &&
                    user.id === message.author.id;
                  const b = (reaction, user) =>
                    reaction.emoji.name === "❎" &&
                    user.id === message.author.id;
                  const d = msg.createReactionCollector(a);
                  const z = msg.createReactionCollector(b);
                  d.on("collect", r => {
                    let min = time * 60;
                    let users2 = [
                      {
                        UserId: rUser.id,
                        GuildId: message.guild.id,
                        Time: parseInt(Date.now() + min * 1000)
                      }
                    ];
                    collection2.insertMany(users2, function(err, results) {
                      if (err) return console.log(err);
                    });
                    rUser.addRole(role);
                    Embed.setDescription(
                      `✅ | **Пользователь ${
                        message.author
                      } замутил пользователя ${rUser} на ${uts(
                        time,
                        one,
                        two,
                        five
                      )} по причине \`${reason}\`!**`
                    );
                    msg.edit(Embed).then(msg => {
                      msg.clearReactions();
                    });
                    d.stop();
                    z.stop();
                    let EmbedMute = new Discord.RichEmbed()
                      .setDescription(
                        `✅ | **Вас замутили на сервере \`${message.guild.name}\`!**`
                      )
                      .setColor(colors)
                      .addField(
                        "Длительность",
                        `**${uts(time, one, two, five)}**`,
                        true
                      )
                      .addField("Модератор", `**${message.author}**`, true)
                      .addField("Причина", `**${reason}**`)
                      .setFooter(bot.user.username, bot.user.avatarURL)
                      .setTimestamp();
                    rUser.send(EmbedMute);
                  });
                  z.on("collect", r => {
                    Embed.setDescription(
                      `❎ | **Пользователь ${message.author} отменил команду!**`
                    );
                    msg.edit(Embed).then(msg => {
                      msg.clearReactions();
                    });
                    d.stop();
                    z.stop();
                  });
                });
              });
return
            }

            if (sym === "h") {
              one = "час";
              two = "часа";
              five = "часов";
              if (Mutess == true) {
                if (!reason) {
                  let Embed = new Discord.RichEmbed()
                    .setColor(colors)
                    .setFooter(
                      message.author.username,
                      message.author.displayAvatarURL
                    )
                    .setTimestamp()
                    .setDescription(
                      `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                        time,
                        one,
                        two,
                        five
                      )}\nПричина: Не указана.\nДействие: Дополнить мут.`
                    );
                  message.channel.send(Embed).then(msg => {
                    msg.react("✅").then(r => {
                      msg.react("❎");
                      const a = (reaction, user) =>
                        reaction.emoji.name === "✅" &&
                        user.id === message.author.id;
                      const b = (reaction, user) =>
                        reaction.emoji.name === "❎" &&
                        user.id === message.author.id;
                      const d = msg.createReactionCollector(a);
                      const z = msg.createReactionCollector(b);
                      d.on("collect", r => {
                        rUser.addRole(role);
                        let hac = time * 3600;
                        let a = Mutes;
                        let g = hac * 1000
                        let b = parseInt(a) + g;
                        collection2.updateOne(
                          { UserId: rUser.id, GuildId: message.guild.id },
                          { $set: { Time: b } },
                          function(err, result) {
                            if (err) return console.log(err);
                          }
                        );
                        Embed.setDescription(
                          `✅ | **Пользователь ${
                            message.author
                          } дополнил мут ${rUser} на ${uts(
                            time,
                            one,
                            two,
                            five
                          )}!**`
                        );
                        msg.edit(Embed).then(msg => {
                          msg.clearReactions();
                        });
                        let EmbedMute = new Discord.RichEmbed()

                          .setColor(colors)
                          .setDescription(
                            `Вам дополнили мут на сервере \`${message.guild.name}\`!`
                          )
                          .addField(
                            "Длительность",
                            `**${uts(time, one, two, five)}**`,
                            true
                          )
                          .addField("Модератор", `**${message.author}**`, true)
                          .addField("Причина", `**Без причины.**`)
                          .setFooter(bot.user.username, bot.user.avatarURL)
                          .setTimestamp();
                        rUser.send(EmbedMute);
                        d.stop();
                        z.stop();
                      });
                      z.on("collect", r => {
                        Embed.setDescription(
                          `❎ | **Пользователь ${message.author} отменил команду!**`
                        );
                        msg.edit(Embed).then(msg => {
                          msg.clearReactions();
                        });
                        d.stop();
                        z.stop();
                      });
                    });
                  });
                  return;
                }
                let Embed = new Discord.RichEmbed()
                  .setColor(colors)
                  .setFooter(
                    message.author.username,
                    message.author.displayAvatarURL
                  )
                  .setTimestamp()
                  .setDescription(
                    `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                      time,
                      one,
                      two,
                      five
                    )}\nПричина: \`${reason}\`\nДействие: Дополнить мут.`
                  );
                message.channel.send(Embed).then(msg => {
                  msg.react("✅").then(r => {
                    msg.react("❎");
                    const a = (reaction, user) =>
                      reaction.emoji.name === "✅" &&
                      user.id === message.author.id;
                    const b = (reaction, user) =>
                      reaction.emoji.name === "❎" &&
                      user.id === message.author.id;
                    const d = msg.createReactionCollector(a);
                    const z = msg.createReactionCollector(b);
                    d.on("collect", r => {
                      rUser.addRole(role);
                      let hac = time * 3600;
                      let a = Mutes;
                      let g = hac * 1000
                      let b = parseInt(a) + g;
                      collection2.updateOne(
                        { UserId: rUser.id, GuildId: message.guild.id },
                        { $set: { Time: b } },
                        function(err, result) {
                          if (err) return console.log(err);
                        }
                      );
                      Embed.setDescription(
                        `✅ | **Пользователь ${
                          message.author
                        } дополнил мут ${rUser} на ${uts(
                          time,
                          one,
                          two,
                          five
                        )} по причине \`${reason}\`!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      let EmbedMute = new Discord.RichEmbed()

                        .setColor(colors)
                        .setDescription(
                          `Вам дополнили мут на сервере \`${message.guild.name}\`!`
                        )
                        .addField(
                          "Длительность",
                          `**${uts(time, one, two, five)}**`,
                          true
                        )
                        .addField("Модератор", `**${message.author}**`, true)
                        .addField("Причина", `**${reason}**`)
                        .setFooter(bot.user.username, bot.user.avatarURL)
                        .setTimestamp();
                      rUser.send(EmbedMute);
                      d.stop();
                      z.stop();
                    });
                    z.on("collect", r => {
                      Embed.setDescription(
                        `❎ | **Пользователь ${message.author} отменил команду!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      d.stop();
                      z.stop();
                    });
                  });
                });
                return;
              }
              if (!reason) {
                let Embed = new Discord.RichEmbed()
                  .setColor(colors)
                  .setFooter(
                    message.author.username,
                    message.author.displayAvatarURL
                  )
                  .setTimestamp()
                  .setDescription(
                    `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                      time,
                      one,
                      two,
                      five
                    )}\nПричина: Не указана.`
                  );
                message.channel.send(Embed).then(msg => {
                  msg.react("✅").then(r => {
                    msg.react("❎");
                    const a = (reaction, user) =>
                      reaction.emoji.name === "✅" &&
                      user.id === message.author.id;
                    const b = (reaction, user) =>
                      reaction.emoji.name === "❎" &&
                      user.id === message.author.id;
                    const d = msg.createReactionCollector(a);
                    const z = msg.createReactionCollector(b);
                    d.on("collect", r => {
                      let hac = time * 3600;
                      let users2 = [
                        {
                          UserId: rUser.id,
                          GuildId: message.guild.id,
                          Time: parseInt(Date.now() + hac * 1000)
                        }
                      ];
                      collection2.insertMany(users2, function(err, results) {
                        if (err) return console.log(err);
                      });
                      rUser.addRole(role);
                      Embed.setDescription(
                        `✅ | **Пользователь ${
                          message.author
                        } замутил пользователя ${rUser} на ${uts(
                          time,
                          one,
                          two,
                          five
                        )}!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      let EmbedMute = new Discord.RichEmbed()
                        .setDescription(
                          `✅ | **Вас замутили на сервере \`${message.guild.name}\`!**`
                        )
                        .setColor(colors)
                        .addField(
                          "Длительность",
                          `**${uts(time, one, two, five)}**`,
                          true
                        )
                        .addField("Модератор", `**${message.author}**`, true)
                        .addField("Причина", `**Без причины.**`)
                        .setFooter(bot.user.username, bot.user.avatarURL)
                        .setTimestamp();
                      rUser.send(EmbedMute);
                      d.stop();
                      z.stop();
                      return;
                    });
                    z.on("collect", r => {
                      Embed.setDescription(
                        `❎ | **Пользователь ${message.author} отменил команду!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      d.stop();
                      z.stop();
                    });
                  });
                });
                return
              }
              let Embed = new Discord.RichEmbed()
                .setColor(colors)
                .setFooter(
                  message.author.username,
                  message.author.displayAvatarURL
                )
                .setTimestamp()
                .setDescription(
                  `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                    time,
                    one,
                    two,
                    five
                  )}\nПричина: ${reason}`
                );
              message.channel.send(Embed).then(msg => {
                msg.react("✅").then(r => {
                  msg.react("❎");
                  const a = (reaction, user) =>
                    reaction.emoji.name === "✅" &&
                    user.id === message.author.id;
                  const b = (reaction, user) =>
                    reaction.emoji.name === "❎" &&
                    user.id === message.author.id;
                  const d = msg.createReactionCollector(a);
                  const z = msg.createReactionCollector(b);
                  d.on("collect", r => {
                    let hac = time * 3600;
                    let users2 = [
                      {
                        UserId: rUser.id,
                        GuildId: message.guild.id,
                        Time: parseInt(Date.now() + hac * 1000)
                      }
                    ];
                    collection2.insertMany(users2, function(err, results) {
                      if (err) return console.log(err);
                    });
                    rUser.addRole(role);
                    Embed.setDescription(
                      `✅ | **Пользователь ${
                        message.author
                      } замутил пользователя ${rUser} на ${uts(
                        time,
                        one,
                        two,
                        five
                      )} по причине \`${reason}\`!**`
                    );
                    msg.edit(Embed).then(msg => {
                      msg.clearReactions();
                    });
                    d.stop();
                    z.stop();
                    let EmbedMute = new Discord.RichEmbed()
                      .setDescription(
                        `✅ | **Вас замутили на сервере \`${message.guild.name}\`!**`
                      )
                      .setColor(colors)
                      .addField(
                        "Длительность",
                        `**${uts(time, one, two, five)}**`,
                        true
                      )
                      .addField("Модератор", `**${message.author}**`, true)
                      .addField("Причина", `**${reason}**`)
                      .setFooter(bot.user.username, bot.user.avatarURL)
                      .setTimestamp();
                    rUser.send(EmbedMute);
                  });
                  z.on("collect", r => {
                    Embed.setDescription(
                      `❎ | **Пользователь ${message.author} отменил команду!**`
                    );
                    msg.edit(Embed).then(msg => {
                      msg.clearReactions();
                    });
                    d.stop();
                    z.stop();
                  });
                });
              });
return
            }
            if (sym === "d") {
              one = "день";
              two = "дня";
              five = "дней";
              if (Mutess == true) {
                if (!reason) {
                  let Embed = new Discord.RichEmbed()
                    .setColor(colors)
                    .setFooter(
                      message.author.username,
                      message.author.displayAvatarURL
                    )
                    .setTimestamp()
                    .setDescription(
                      `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                        time,
                        one,
                        two,
                        five
                      )}\nПричина: Не указана.\nДействие: Дополнить мут.`
                    );
                  message.channel.send(Embed).then(msg => {
                    msg.react("✅").then(r => {
                      msg.react("❎");
                      const a = (reaction, user) =>
                        reaction.emoji.name === "✅" &&
                        user.id === message.author.id;
                      const b = (reaction, user) =>
                        reaction.emoji.name === "❎" &&
                        user.id === message.author.id;
                      const d = msg.createReactionCollector(a);
                      const z = msg.createReactionCollector(b);
                      d.on("collect", r => {
                        rUser.addRole(role);
                        let day = time * 86400;
                        let a = Mutes;
                        let g = day * 1000
                        let b = parseInt(a) + g;
                        collection2.updateOne(
                          { UserId: rUser.id, GuildId: message.guild.id },
                          { $set: { Time: b } },
                          function(err, result) {
                            if (err) return console.log(err);
                          }
                        );
                        Embed.setDescription(
                          `✅ | **Пользователь ${
                            message.author
                          } дополнил мут ${rUser} на ${uts(
                            time,
                            one,
                            two,
                            five
                          )}!**`
                        );
                        msg.edit(Embed).then(msg => {
                          msg.clearReactions();
                        });
                        let EmbedMute = new Discord.RichEmbed()

                          .setColor(colors)
                          .setDescription(
                            `Вам дополнили мут на сервере \`${message.guild.name}\`!`
                          )
                          .addField(
                            "Длительность",
                            `**${uts(time, one, two, five)}**`,
                            true
                          )
                          .addField("Модератор", `**${message.author}**`, true)
                          .addField("Причина", `**Без причины.**`)
                          .setFooter(bot.user.username, bot.user.avatarURL)
                          .setTimestamp();
                        rUser.send(EmbedMute);
                        d.stop();
                        z.stop();
                      });
                      z.on("collect", r => {
                        Embed.setDescription(
                          `❎ | **Пользователь ${message.author} отменил команду!**`
                        );
                        msg.edit(Embed).then(msg => {
                          msg.clearReactions();
                        });
                        d.stop();
                        z.stop();
                      });
                    });
                  });
                  return;
                }
                let Embed = new Discord.RichEmbed()
                  .setColor(colors)
                  .setFooter(
                    message.author.username,
                    message.author.displayAvatarURL
                  )
                  .setTimestamp()
                  .setDescription(
                    `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                      time,
                      one,
                      two,
                      five
                    )}\nПричина: \`${reason}\`\nДействие: Дополнить мут.`
                  );
                message.channel.send(Embed).then(msg => {
                  msg.react("✅").then(r => {
                    msg.react("❎");
                    const a = (reaction, user) =>
                      reaction.emoji.name === "✅" &&
                      user.id === message.author.id;
                    const b = (reaction, user) =>
                      reaction.emoji.name === "❎" &&
                      user.id === message.author.id;
                    const d = msg.createReactionCollector(a);
                    const z = msg.createReactionCollector(b);
                    d.on("collect", r => {
                      rUser.addRole(role);
                      let day = time * 86400;
                      let a = Mutes;
                      let g = day * 1000;
                      let b = parseInt(a) + g;
                      collection2.updateOne(
                        { UserId: rUser.id, GuildId: message.guild.id },
                        { $set: { Time: b } },
                        function(err, result) {
                          if (err) return console.log(err);
                        }
                      );
                      Embed.setDescription(
                        `✅ | **Пользователь ${
                          message.author
                        } дополнил мут ${rUser} на ${uts(
                          time,
                          one,
                          two,
                          five
                        )} по причине \`${reason}\`!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      let EmbedMute = new Discord.RichEmbed()

                        .setColor(colors)
                        .setDescription(
                          `Вам дополнили мут на сервере \`${message.guild.name}\`!`
                        )
                        .addField(
                          "Длительность",
                          `**${uts(time, one, two, five)}**`,
                          true
                        )
                        .addField("Модератор", `**${message.author}**`, true)
                        .addField("Причина", `**${reason}**`)
                        .setFooter(bot.user.username, bot.user.avatarURL)
                        .setTimestamp();
                      rUser.send(EmbedMute);
                      d.stop();
                      z.stop();
                    });
                    z.on("collect", r => {
                      Embed.setDescription(
                        `❎ | **Пользователь ${message.author} отменил команду!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      d.stop();
                      z.stop();
                    });
                  });
                });
                return;
              }
              if (!reason) {
                let Embed = new Discord.RichEmbed()
                  .setColor(colors)
                  .setFooter(
                    message.author.username,
                    message.author.displayAvatarURL
                  )
                  .setTimestamp()
                  .setDescription(
                    `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                      time,
                      one,
                      two,
                      five
                    )}\nПричина: Не указана.`
                  );
                message.channel.send(Embed).then(msg => {
                  msg.react("✅").then(r => {
                    msg.react("❎");
                    const a = (reaction, user) =>
                      reaction.emoji.name === "✅" &&
                      user.id === message.author.id;
                    const b = (reaction, user) =>
                      reaction.emoji.name === "❎" &&
                      user.id === message.author.id;
                    const d = msg.createReactionCollector(a);
                    const z = msg.createReactionCollector(b);
                    d.on("collect", r => {
                      let day = time * 86400;
                      let users2 = [
                        {
                          UserId: rUser.id,
                          GuildId: message.guild.id,
                          Time: parseInt(Date.now() + day * 1000)
                        }
                      ];
                      collection2.insertMany(users2, function(err, results) {
                        if (err) return console.log(err);
                      });
                      rUser.addRole(role);
                      Embed.setDescription(
                        `✅ | **Пользователь ${
                          message.author
                        } замутил пользователя ${rUser} на ${uts(
                          time,
                          one,
                          two,
                          five
                        )}!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      let EmbedMute = new Discord.RichEmbed()
                        .setDescription(
                          `✅ | **Вас замутили на сервере \`${message.guild.name}\`!**`
                        )
                        .setColor(colors)
                        .addField(
                          "Длительность",
                          `**${uts(time, one, two, five)}**`,
                          true
                        )
                        .addField("Модератор", `**${message.author}**`, true)
                        .addField("Причина", `**Без причины.**`)
                        .setFooter(bot.user.username, bot.user.avatarURL)
                        .setTimestamp();
                      rUser.send(EmbedMute);
                      d.stop();
                      z.stop();
                      return;
                    });
                    z.on("collect", r => {
                      Embed.setDescription(
                        `❎ | **Пользователь ${message.author} отменил команду!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      d.stop();
                      z.stop();
                    });
                  });
                });
                return
              }
              let Embed = new Discord.RichEmbed()
                .setColor(colors)
                .setFooter(
                  message.author.username,
                  message.author.displayAvatarURL
                )
                .setTimestamp()
                .setDescription(
                  `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                    time,
                    one,
                    two,
                    five
                  )}\nПричина: ${reason}`
                );
              message.channel.send(Embed).then(msg => {
                msg.react("✅").then(r => {
                  msg.react("❎");
                  const a = (reaction, user) =>
                    reaction.emoji.name === "✅" &&
                    user.id === message.author.id;
                  const b = (reaction, user) =>
                    reaction.emoji.name === "❎" &&
                    user.id === message.author.id;
                  const d = msg.createReactionCollector(a);
                  const z = msg.createReactionCollector(b);
                  d.on("collect", r => {
                    let day = time * 86400;
                    let users2 = [
                      {
                        UserId: rUser.id,
                        GuildId: message.guild.id,
                        Time: parseInt(Date.now() + day * 1000)
                      }
                    ];
                    collection2.insertMany(users2, function(err, results) {
                      if (err) return console.log(err);
                    });
                    rUser.addRole(role);
                    Embed.setDescription(
                      `✅ | **Пользователь ${
                        message.author
                      } замутил пользователя ${rUser} на ${uts(
                        time,
                        one,
                        two,
                        five
                      )} по причине \`${reason}\`!**`
                    );
                    msg.edit(Embed).then(msg => {
                      msg.clearReactions();
                    });
                    d.stop();
                    z.stop();
                    let EmbedMute = new Discord.RichEmbed()
                      .setDescription(
                        `✅ | **Вас замутили на сервере \`${message.guild.name}\`!**`
                      )
                      .setColor(colors)
                      .addField(
                        "Длительность",
                        `**${uts(time, one, two, five)}**`,
                        true
                      )
                      .addField("Модератор", `**${message.author}**`, true)
                      .addField("Причина", `**${reason}**`)
                      .setFooter(bot.user.username, bot.user.avatarURL)
                      .setTimestamp();
                    rUser.send(EmbedMute);
                  });
                  z.on("collect", r => {
                    Embed.setDescription(
                      `❎ | **Пользователь ${message.author} отменил команду!**`
                    );
                    msg.edit(Embed).then(msg => {
                      msg.clearReactions();
                    });
                    d.stop();
                    z.stop();
                  });
                });
              });
return
            }
            if (sym === "w") {
              one = "неделю";
              two = "недели";
              five = "недель";
              if (Mutess == true) {
                if (!reason) {
                  let Embed = new Discord.RichEmbed()
                    .setColor(colors)
                    .setFooter(
                      message.author.username,
                      message.author.displayAvatarURL
                    )
                    .setTimestamp()
                    .setDescription(
                      `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                        time,
                        one,
                        two,
                        five
                      )}\nПричина: Не указана.\nДействие: Дополнить мут.`
                    );
                  message.channel.send(Embed).then(msg => {
                    msg.react("✅").then(r => {
                      msg.react("❎");
                      const a = (reaction, user) =>
                        reaction.emoji.name === "✅" &&
                        user.id === message.author.id;
                      const b = (reaction, user) =>
                        reaction.emoji.name === "❎" &&
                        user.id === message.author.id;
                      const d = msg.createReactionCollector(a);
                      const z = msg.createReactionCollector(b);
                      d.on("collect", r => {
                        rUser.addRole(role);
                        let day = time * 604800;
                        let a = Mutes;
                        let g = day * 1000
                        let b = parseInt(a) + g;
                        collection2.updateOne(
                          { UserId: rUser.id, GuildId: message.guild.id },
                          { $set: { Time: b } },
                          function(err, result) {
                            if (err) return console.log(err);
                          }
                        );
                        Embed.setDescription(
                          `✅ | **Пользователь ${
                            message.author
                          } дополнил мут ${rUser} на ${uts(
                            time,
                            one,
                            two,
                            five
                          )}!**`
                        );
                        msg.edit(Embed).then(msg => {
                          msg.clearReactions();
                        });
                        let EmbedMute = new Discord.RichEmbed()

                          .setColor(colors)
                          .setDescription(
                            `Вам дополнили мут на сервере \`${message.guild.name}\`!`
                          )
                          .addField(
                            "Длительность",
                            `**${uts(time, one, two, five)}**`,
                            true
                          )
                          .addField("Модератор", `**${message.author}**`, true)
                          .addField("Причина", `**Без причины.**`)
                          .setFooter(bot.user.username, bot.user.avatarURL)
                          .setTimestamp();
                        rUser.send(EmbedMute);
                        d.stop();
                        z.stop();
                      });
                      z.on("collect", r => {
                        Embed.setDescription(
                          `❎ | **Пользователь ${message.author} отменил команду!**`
                        );
                        msg.edit(Embed).then(msg => {
                          msg.clearReactions();
                        });
                        d.stop();
                        z.stop();
                      });
                    });
                  });
                  return;
                }
                let Embed = new Discord.RichEmbed()
                  .setColor(colors)
                  .setFooter(
                    message.author.username,
                    message.author.displayAvatarURL
                  )
                  .setTimestamp()
                  .setDescription(
                    `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                      time,
                      one,
                      two,
                      five
                    )}\nПричина: \`${reason}\`\nДействие: Дополнить мут.`
                  );
                message.channel.send(Embed).then(msg => {
                  msg.react("✅").then(r => {
                    msg.react("❎");
                    const a = (reaction, user) =>
                      reaction.emoji.name === "✅" &&
                      user.id === message.author.id;
                    const b = (reaction, user) =>
                      reaction.emoji.name === "❎" &&
                      user.id === message.author.id;
                    const d = msg.createReactionCollector(a);
                    const z = msg.createReactionCollector(b);
                    d.on("collect", r => {
                      rUser.addRole(role);
                      let day = time * 604800;
                      let a = Mutes;
                      let g = day * 1000
                      let b = parseInt(a) + g;
                      collection2.updateOne(
                        { UserId: rUser.id, GuildId: message.guild.id },
                        { $set: { Time: b } },
                        function(err, result) {
                          if (err) return console.log(err);
                        }
                      );
                      Embed.setDescription(
                        `✅ | **Пользователь ${
                          message.author
                        } дополнил мут ${rUser} на ${uts(
                          time,
                          one,
                          two,
                          five
                        )} по причине \`${reason}\`!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      let EmbedMute = new Discord.RichEmbed()

                        .setColor(colors)
                        .setDescription(
                          `Вам дополнили мут на сервере \`${message.guild.name}\`!`
                        )
                        .addField(
                          "Длительность",
                          `**${uts(time, one, two, five)}**`,
                          true
                        )
                        .addField("Модератор", `**${message.author}**`, true)
                        .addField("Причина", `**${reason}**`)
                        .setFooter(bot.user.username, bot.user.avatarURL)
                        .setTimestamp();
                      rUser.send(EmbedMute);
                      d.stop();
                      z.stop();
                    });
                    z.on("collect", r => {
                      Embed.setDescription(
                        `❎ | **Пользователь ${message.author} отменил команду!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      d.stop();
                      z.stop();
                    });
                  });
                });
                return;
              }
              if (!reason) {
                let Embed = new Discord.RichEmbed()
                  .setColor(colors)
                  .setFooter(
                    message.author.username,
                    message.author.displayAvatarURL
                  )
                  .setTimestamp()
                  .setDescription(
                    `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                      time,
                      one,
                      two,
                      five
                    )}\nПричина: Не указана.`
                  );
                message.channel.send(Embed).then(msg => {
                  msg.react("✅").then(r => {
                    msg.react("❎");
                    const a = (reaction, user) =>
                      reaction.emoji.name === "✅" &&
                      user.id === message.author.id;
                    const b = (reaction, user) =>
                      reaction.emoji.name === "❎" &&
                      user.id === message.author.id;
                    const d = msg.createReactionCollector(a);
                    const z = msg.createReactionCollector(b);
                    d.on("collect", r => {
                      let day = time * 604800;
                      let users2 = [
                        {
                          UserId: rUser.id,
                          GuildId: message.guild.id,
                          Time: parseInt(Date.now() + day * 1000)
                        }
                      ];
                      collection2.insertMany(users2, function(err, results) {
                        if (err) return console.log(err);
                      });
                      rUser.addRole(role);
                      Embed.setDescription(
                        `✅ | **Пользователь ${
                          message.author
                        } замутил пользователя ${rUser} на ${uts(
                          time,
                          one,
                          two,
                          five
                        )}!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      let EmbedMute = new Discord.RichEmbed()
                        .setDescription(
                          `✅ | **Вас замутили на сервере \`${message.guild.name}\`!**`
                        )
                        .setColor(colors)
                        .addField(
                          "Длительность",
                          `**${uts(time, one, two, five)}**`,
                          true
                        )
                        .addField("Модератор", `**${message.author}**`, true)
                        .addField("Причина", `**Без причины.**`)
                        .setFooter(bot.user.username, bot.user.avatarURL)
                        .setTimestamp();
                      rUser.send(EmbedMute);
                      d.stop();
                      z.stop();
                      return;
                    });
                    z.on("collect", r => {
                      Embed.setDescription(
                        `❎ | **Пользователь ${message.author} отменил команду!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      d.stop();
                      z.stop();
                    });
                  });
                });
                return
              }
              let Embed = new Discord.RichEmbed()
                .setColor(colors)
                .setFooter(
                  message.author.username,
                  message.author.displayAvatarURL
                )
                .setTimestamp()
                .setDescription(
                  `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                    time,
                    one,
                    two,
                    five
                  )}\nПричина: ${reason}`
                );
              message.channel.send(Embed).then(msg => {
                msg.react("✅").then(r => {
                  msg.react("❎");
                  const a = (reaction, user) =>
                    reaction.emoji.name === "✅" &&
                    user.id === message.author.id;
                  const b = (reaction, user) =>
                    reaction.emoji.name === "❎" &&
                    user.id === message.author.id;
                  const d = msg.createReactionCollector(a);
                  const z = msg.createReactionCollector(b);
                  d.on("collect", r => {
                    let day = time * 604800;
                    let users2 = [
                      {
                        UserId: rUser.id,
                        GuildId: message.guild.id,
                        Time: parseInt(Date.now() + day * 1000)
                      }
                    ];
                    collection2.insertMany(users2, function(err, results) {
                      if (err) return console.log(err);
                    });
                    rUser.addRole(role);
                    Embed.setDescription(
                      `✅ | **Пользователь ${
                        message.author
                      } замутил пользователя ${rUser} на ${uts(
                        time,
                        one,
                        two,
                        five
                      )} по причине \`${reason}\`!**`
                    );
                    msg.edit(Embed).then(msg => {
                      msg.clearReactions();
                    });
                    d.stop();
                    z.stop();
                    let EmbedMute = new Discord.RichEmbed()
                      .setDescription(
                        `✅ | **Вас замутили на сервере \`${message.guild.name}\`!**`
                      )
                      .setColor(colors)
                      .addField(
                        "Длительность",
                        `**${uts(time, one, two, five)}**`,
                        true
                      )
                      .addField("Модератор", `**${message.author}**`, true)
                      .addField("Причина", `**${reason}**`)
                      .setFooter(bot.user.username, bot.user.avatarURL)
                      .setTimestamp();
                    rUser.send(EmbedMute);
                  });
                  z.on("collect", r => {
                    Embed.setDescription(
                      `❎ | **Пользователь ${message.author} отменил команду!**`
                    );
                    msg.edit(Embed).then(msg => {
                      msg.clearReactions();
                    });
                    d.stop();
                    z.stop();
                  });
                });
              });
return
            }
            if (sym === "y") {
              one = "год";
              two = "года";
              five = "года";
              if (Mutess == true) {
                if (!reason) {
                  let Embed = new Discord.RichEmbed()
                    .setColor(colors)
                    .setFooter(
                      message.author.username,
                      message.author.displayAvatarURL
                    )
                    .setTimestamp()
                    .setDescription(
                      `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                        time,
                        one,
                        two,
                        five
                      )}\nПричина: Не указана.\nДействие: Дополнить мут.`
                    );
                  message.channel.send(Embed).then(msg => {
                    msg.react("✅").then(r => {
                      msg.react("❎");
                      const a = (reaction, user) =>
                        reaction.emoji.name === "✅" &&
                        user.id === message.author.id;
                      const b = (reaction, user) =>
                        reaction.emoji.name === "❎" &&
                        user.id === message.author.id;
                      const d = msg.createReactionCollector(a);
                      const z = msg.createReactionCollector(b);
                      d.on("collect", r => {
                        rUser.addRole(role);
                        let day = time * 31536000;
                        let a = Mutes;
                        let g = day * 1000
                        let b = parseInt(a) + g;
                        collection2.updateOne(
                          { UserId: rUser.id, GuildId: message.guild.id },
                          { $set: { Time: b } },
                          function(err, result) {
                            if (err) return console.log(err);
                          }
                        );
                        Embed.setDescription(
                          `✅ | **Пользователь ${
                            message.author
                          } дополнил мут ${rUser} на ${uts(
                            time,
                            one,
                            two,
                            five
                          )}!**`
                        );
                        msg.edit(Embed).then(msg => {
                          msg.clearReactions();
                        });
                        let EmbedMute = new Discord.RichEmbed()

                          .setColor(colors)
                          .setDescription(
                            `Вам дополнили мут на сервере \`${message.guild.name}\`!`
                          )
                          .addField(
                            "Длительность",
                            `**${uts(time, one, two, five)}**`,
                            true
                          )
                          .addField("Модератор", `**${message.author}**`, true)
                          .addField("Причина", `**Без причины.**`)
                          .setFooter(bot.user.username, bot.user.avatarURL)
                          .setTimestamp();
                        rUser.send(EmbedMute);
                        d.stop();
                        z.stop();
                      });
                      z.on("collect", r => {
                        Embed.setDescription(
                          `❎ | **Пользователь ${message.author} отменил команду!**`
                        );
                        msg.edit(Embed).then(msg => {
                          msg.clearReactions();
                        });
                        d.stop();
                        z.stop();
                      });
                    });
                  });
                  return;
                }
                let Embed = new Discord.RichEmbed()
                  .setColor(colors)
                  .setFooter(
                    message.author.username,
                    message.author.displayAvatarURL
                  )
                  .setTimestamp()
                  .setDescription(
                    `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                      time,
                      one,
                      two,
                      five
                    )}\nПричина: \`${reason}\`\nДействие: Дополнить мут.`
                  );
                message.channel.send(Embed).then(msg => {
                  msg.react("✅").then(r => {
                    msg.react("❎");
                    const a = (reaction, user) =>
                      reaction.emoji.name === "✅" &&
                      user.id === message.author.id;
                    const b = (reaction, user) =>
                      reaction.emoji.name === "❎" &&
                      user.id === message.author.id;
                    const d = msg.createReactionCollector(a);
                    const z = msg.createReactionCollector(b);
                    d.on("collect", r => {
                      rUser.addRole(role);
                      let day = time * 31536000;
                      let a = Mutes;
                      let g = day * 1000
                      let b = parseInt(a) + g;
                      collection2.updateOne(
                        { UserId: rUser.id, GuildId: message.guild.id },
                        { $set: { Time: b } },
                        function(err, result) {
                          if (err) return console.log(err);
                        }
                      );
                      Embed.setDescription(
                        `✅ | **Пользователь ${
                          message.author
                        } дополнил мут ${rUser} на ${uts(
                          time,
                          one,
                          two,
                          five
                        )} по причине \`${reason}\`!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      let EmbedMute = new Discord.RichEmbed()

                        .setColor(colors)
                        .setDescription(
                          `Вам дополнили мут на сервере \`${message.guild.name}\`!`
                        )
                        .addField(
                          "Длительность",
                          `**${uts(time, one, two, five)}**`,
                          true
                        )
                        .addField("Модератор", `**${message.author}**`, true)
                        .addField("Причина", `**${reason}**`)
                        .setFooter(bot.user.username, bot.user.avatarURL)
                        .setTimestamp();
                      rUser.send(EmbedMute);
                      d.stop();
                      z.stop();
                    });
                    z.on("collect", r => {
                      Embed.setDescription(
                        `❎ | **Пользователь ${message.author} отменил команду!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      d.stop();
                      z.stop();
                    });
                  });
                });
                return;
              }
              if (!reason) {
                let Embed = new Discord.RichEmbed()
                  .setColor(colors)
                  .setFooter(
                    message.author.username,
                    message.author.displayAvatarURL
                  )
                  .setTimestamp()
                  .setDescription(
                    `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                      time,
                      one,
                      two,
                      five
                    )}\nПричина: Не указана.`
                  );
                message.channel.send(Embed).then(msg => {
                  msg.react("✅").then(r => {
                    msg.react("❎");
                    const a = (reaction, user) =>
                      reaction.emoji.name === "✅" &&
                      user.id === message.author.id;
                    const b = (reaction, user) =>
                      reaction.emoji.name === "❎" &&
                      user.id === message.author.id;
                    const d = msg.createReactionCollector(a);
                    const z = msg.createReactionCollector(b);
                    d.on("collect", r => {
                      let day = time * 31536000;
                      let users2 = [
                        {
                          UserId: rUser.id,
                          GuildId: message.guild.id,
                          Time: parseInt(Date.now() + day * 1000)
                        }
                      ];
                      collection2.insertMany(users2, function(err, results) {
                        if (err) return console.log(err);
                      });
                      rUser.addRole(role);
                      Embed.setDescription(
                        `✅ | **Пользователь ${
                          message.author
                        } замутил пользователя ${rUser} на ${uts(
                          time,
                          one,
                          two,
                          five
                        )}!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      let EmbedMute = new Discord.RichEmbed()
                        .setDescription(
                          `✅ | **Вас замутили на сервере \`${message.guild.name}\`!**`
                        )
                        .setColor(colors)
                        .addField(
                          "Длительность",
                          `**${uts(time, one, two, five)}**`,
                          true
                        )
                        .addField("Модератор", `**${message.author}**`, true)
                        .addField("Причина", `**Без причины.**`)
                        .setFooter(bot.user.username, bot.user.avatarURL)
                        .setTimestamp();
                      rUser.send(EmbedMute);
                      d.stop();
                      z.stop();
                      return;
                    });
                    z.on("collect", r => {
                      Embed.setDescription(
                        `❎ | **Пользователь ${message.author} отменил команду!**`
                      );
                      msg.edit(Embed).then(msg => {
                        msg.clearReactions();
                      });
                      d.stop();
                      z.stop();
                    });
                  });
                });
                return
              }
              let Embed = new Discord.RichEmbed()
                .setColor(colors)
                .setFooter(
                  message.author.username,
                  message.author.displayAvatarURL
                )
                .setTimestamp()
                .setDescription(
                  `Подтвердите данные!\nИгрок: ${rUser}\nВремя: ${uts(
                    time,
                    one,
                    two,
                    five
                  )}\nПричина: ${reason}`
                );
              message.channel.send(Embed).then(msg => {
                msg.react("✅").then(r => {
                  msg.react("❎");
                  const a = (reaction, user) =>
                    reaction.emoji.name === "✅" &&
                    user.id === message.author.id;
                  const b = (reaction, user) =>
                    reaction.emoji.name === "❎" &&
                    user.id === message.author.id;
                  const d = msg.createReactionCollector(a);
                  const z = msg.createReactionCollector(b);
                  d.on("collect", r => {
                    let day = time * 31536000;
                    let users2 = [
                      {
                        UserId: rUser.id,
                        GuildId: message.guild.id,
                        Time: parseInt(Date.now() + day * 1000)
                      }
                    ];
                    collection2.insertMany(users2, function(err, results) {
                      if (err) return console.log(err);
                    });
                    rUser.addRole(role);
                    Embed.setDescription(
                      `✅ | **Пользователь ${
                        message.author
                      } замутил пользователя ${rUser} на ${uts(
                        time,
                        one,
                        two,
                        five
                      )} по причине \`${reason}\`!**`
                    );
                    msg.edit(Embed).then(msg => {
                      msg.clearReactions();
                    });
                    d.stop();
                    z.stop();
                    let EmbedMute = new Discord.RichEmbed()
                      .setDescription(
                        `✅ | **Вас замутили на сервере \`${message.guild.name}\`!**`
                      )
                      .setColor(colors)
                      .addField(
                        "Длительность",
                        `**${uts(time, one, two, five)}**`,
                        true
                      )
                      .addField("Модератор", `**${message.author}**`, true)
                      .addField("Причина", `**${reason}**`)
                      .setFooter(bot.user.username, bot.user.avatarURL)
                      .setTimestamp();
                    rUser.send(EmbedMute);
                  });
                  z.on("collect", r => {
                    Embed.setDescription(
                      `❎ | **Пользователь ${message.author} отменил команду!**`
                    );
                    msg.edit(Embed).then(msg => {
                      msg.clearReactions();
                    });
                    d.stop();
                    z.stop();
                  });
                });
              });
          return
            }
 message.channel.send(
            new Discord.RichEmbed()
              .setColor("RED")
              .setDescription("🚫 | **Я не понял вашу команду!**")
              .setFooter(bot.user.username, bot.user.avatarURL)
              .setTimestamp()
          );
          });
      });
  } catch (err) {
    message.channel.send(
      new Discord.RichEmbed().setColor("RED").addField(ERROR, err.message)
    );
    console.log(err.stack);
  }
};
exports.command = {
  name: "mute",
  DM: false
};
