const { RichEmbed } = require("discord.js");
module.exports.run = (bot, message, args) => {
  try {
    const collection2 = db.collection("bans");
    const collection = db.collection("prefix");
    collection
      .find({ GuildId: message.guild.id })
      .toArray(function(err, results) {
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
        let rUser = message.guild.member(
          message.mentions.users.first() || message.guild.members.get(args[0])
        );
        let Time = args[1];
        var reason = args.slice(2).join(" ");
        if (!message.guild.me.permissions.has("BAN_MEMBERS"))
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
        if (!message.member.permissions.has("BAN_MEMBERS"))
          return message.channel.send(
            new Discord.RichEmbed()
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
              .setColor("RED")
              .setAuthor("Укажите пользователя!")
              .setDescription(
                `🚫 | **Правильный синтаксис команды: \`${prefix}ban <Участник> <Время> <Причина>\`**`
              )
              .setFooter(bot.user.username, bot.user.displayAvatarURL)
              .setTimestamp()
          );
        if (!rUser)
          return message.channel.send(
            new Discord.RichEmbed()
              .setColor("RED")
              .setAuthor("Не найден пользователь!")
              .setDescription(
                `⚠ | **Правильный синтаксис команды: \`${prefix}ban <Участник> <Время> <Причина>\`**`
              )
              .setFooter(bot.user.username, bot.user.displayAvatarURL)
              .setTimestamp()
          );
        if (message.author.id == rUser.id)
          return message.channel.send(
            new Discord.RichEmbed()
              .setColor("RED")
              .setAuthor("Нельзя забанить самого себя!")
              .setDescription(
                `🚫 | **Пример использования команды: \`${prefix}ban @Участник 5m Причина\`**`
              )
              .setFooter(bot.user.username, bot.user.displayAvatarURL)
              .setTimestamp()
          );
        if (message.guild.owner.id == rUser.id)
          return message.channel.send(
            new RichEmbed()
              .setColor("RED")
              .setDescription(`🚫 | **Нельзя забанить создателя сервера!**`)
              .setFooter(bot.user.username, bot.user.displayAvatarURL)
              .setTimestamp()
          );
        if (rUser.id == bot.user.id) return message.channel.send("Нихачу.")
        if (rUser.bannable == false)
          return message.channel.send(
            new RichEmbed()
              .setColor("RED")
              .setDescription(
                `🚫 | **Я не могу забанить этого человека, ${
                  rUser.permissions.has("ADMINISTRATOR")
                    ? "ведь у него права Администратора."
                    : "возможно он выше меня."
                }**`
              )
              .setFooter(bot.user.username, bot.user.displayAvatarURL)
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
        if (!Time) {
          let reason1 = args.slice(1).join(" ");
          if (!reason1) {
            let Embed = new Discord.RichEmbed()
              .setColor(colors)
              .setFooter(
                `${message.author.username}`,
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
                  reaction.emoji.name === "✅" && user.id === message.author.id;
                const b = (reaction, user) =>
                  reaction.emoji.name === "❎" && user.id === message.author.id;
                const d = msg.createReactionCollector(a);
                const z = msg.createReactionCollector(b);
                d.on("collect", r => {
                  Embed.setDescription(
                    `✅ | **Пользователь ${message.author} забанил пользователя ${rUser}!**`
                  );
                  msg.edit(Embed).then(msg => {
                    msg.clearReactions();
                  });
                  let EmbedMute = new Discord.RichEmbed()
                    .setDescription(
                      `✅ | **Вас забанили на сервере \`${message.guild.name}\`!**`
                    )
                    .setColor(colors)
                    .addField("⏱ | **Длительность**", `**Навсегда.**`, true)
                    .addField("⚔ | **Модератор**", `**${message.author.tag}**`, true)
                    .addField("📄 | **Причина**", `**Без причины.**`)
                    .setFooter(bot.user.username, bot.user.avatarURL)
                    .setTimestamp();
                  rUser.send(EmbedMute);
                  d.stop();
                  z.stop();
                  message.guild.members.get(rUser.id).ban();
                });
                z.on("collect", r => {
                  Embed.setDescription(
                    `❎ | **Пользователь ${message.author} отменил команду!**`
                  );
                  Embed.setColor("RED");
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
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(
              `Подтвердите данные!\nИгрок: ${rUser}\nВремя: Не указано.\nПричина: \`${reason1}\``
            );
          message.channel.send(Embed).then(msg => {
            msg.react("✅").then(r => {
              msg.react("❎");
              const a = (reaction, user) =>
                reaction.emoji.name === "✅" && user.id === message.author.id;
              const b = (reaction, user) =>
                reaction.emoji.name === "❎" && user.id === message.author.id;
              const d = msg.createReactionCollector(a);
              const z = msg.createReactionCollector(b);
              d.on("collect", r => {
                Embed.setDescription(
                  `✅ | **Пользователь ${message.author} забанил пользователя ${rUser} по причине \`${reason1}\`!**`
                );
                msg.edit(Embed).then(msg => {
                  msg.clearReactions();
                });
                let EmbedMute = new Discord.RichEmbed()
                  .setDescription(
                    `✅ | **Вас забанили на сервере \`${message.guild.name}\`!**`
                  )
                  .setColor(colors)
                  .addField("⏱ | **Длительность**", `**Навсегда.**`, true)
                  .addField("⚔ | **Модератор**", `**${message.author.tag}**`, true)
                  .addField("📄 | **Причина**", `**${reason1}**`)
                  .setFooter(bot.user.username, bot.user.avatarURL)
                  .setTimestamp();
                rUser.send(EmbedMute);
                d.stop();
                z.stop();
                message.guild.members.get(rUser.id).ban(reason1);
              });
              z.on("collect", r => {
                Embed.setColor("RED");
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
          let reason1 = args.slice(1).join(" ");
          if (!reason1) {
            let Embed = new Discord.RichEmbed()
              .setColor(colors)
              .setFooter(
                `${message.author.username}`,
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
                  reaction.emoji.name === "✅" && user.id === message.author.id;
                const b = (reaction, user) =>
                  reaction.emoji.name === "❎" && user.id === message.author.id;
                const d = msg.createReactionCollector(a);
                const z = msg.createReactionCollector(b);
                d.on("collect", r => {
                  Embed.setDescription(
                    `✅ | **Пользователь ${message.author} забанил пользователя ${rUser}!**`
                  );
                  msg.edit(Embed).then(msg => {
                    msg.clearReactions();
                  });
                  let EmbedMute = new Discord.RichEmbed()
                    .setDescription(
                      `✅ | **Вас забанили на сервере \`${message.guild.name}\`!**`
                    )
                    .setColor(colors)
                    .addField("⏱ | **Длительность**", `**Навсегда.**`, true)
                    .addField("⚔ | **Модератор**", `**${message.author.tag}**`, true)
                    .addField("📄 | **Причина**", `**Без причины.**`)
                    .setFooter(bot.user.username, bot.user.avatarURL)
                    .setTimestamp();
                  rUser.send(EmbedMute);
                  d.stop();
                  z.stop();
                  message.guild.members.get(rUser.id).ban();
                });
                z.on("collect", r => {
                  Embed.setColor("RED");
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
              `${message.author.username}`,
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
                reaction.emoji.name === "✅" && user.id === message.author.id;
              const b = (reaction, user) =>
                reaction.emoji.name === "❎" && user.id === message.author.id;
              const d = msg.createReactionCollector(a);
              const z = msg.createReactionCollector(b);
              d.on("collect", r => {
                Embed.setDescription(
                  `✅ | **Пользователь ${message.author} забанил пользователя ${rUser} по причине \`${reason1}\`!**`
                );
                msg.edit(Embed).then(msg => {
                  msg.clearReactions();
                });
                let EmbedMute = new Discord.RichEmbed()
                  .setDescription(
                    `✅ | **Вас забанили на сервере \`${message.guild.name}\`!**`
                  )
                  .setColor(colors)
                  .addField("⏱ | **Длительность**", `**Навсегда.**`, true)
                  .addField("⚔ | **Модератор**", `**${message.author.tag}**`, true)
                  .addField("📄 | **Причина**", `**${reason1}**`)
                  .setFooter(bot.user.username, bot.user.avatarURL)
                  .setTimestamp();
                rUser.send(EmbedMute);
                d.stop();
                z.stop();
                message.guild.members.get(rUser.id).ban(reason1);
              });
              z.on("collect", r => {
                Embed.setColor("RED");
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
                  reaction.emoji.name === "✅" && user.id === message.author.id;
                const b = (reaction, user) =>
                  reaction.emoji.name === "❎" && user.id === message.author.id;
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
                  Embed.setDescription(
                    `✅ | **Пользователь ${
                      message.author
                    } забанил пользователя ${rUser} на ${uts(
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
                      `✅ | **Вас забанили на сервере \`${message.guild.name}\`!**`
                    )
                    .setColor(colors)
                    .addField(
                      "⏱ | **Длительность**",
                      `**${uts(time, one, two, five)}**`,
                      true
                    )
                    .addField("⚔ | **Модератор**", `**${message.author.tag}**`, true)
                    .addField("📄 | **Причина**", `**Без причины.**`)
                    .setFooter(bot.user.username, bot.user.avatarURL)
                    .setTimestamp();
                  rUser.send(EmbedMute);
                  d.stop();
                  z.stop();
                  message.guild.members.get(rUser.id).ban();
                  return;
                });
                z.on("collect", r => {
                  Embed.setColor("RED");
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
              `${message.author.username}`,
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
                reaction.emoji.name === "✅" && user.id === message.author.id;
              const b = (reaction, user) =>
                reaction.emoji.name === "❎" && user.id === message.author.id;
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
                Embed.setDescription(
                  `✅ | **Пользователь ${
                    message.author
                  } забанил пользователя ${rUser} на ${uts(
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
                    `✅ | **Вас забанили на сервере \`${message.guild.name}\`!**`
                  )
                  .setColor(colors)
                  .addField(
                    "⏱ | **Длительность**",
                    `**${uts(time, one, two, five)}**`,
                    true
                  )
                  .addField("⚔ | **Модератор**", `**${message.author.tag}**`, true)
                  .addField("📄 | **Причина**", `**${reason}**`)
                  .setFooter(bot.user.username, bot.user.avatarURL)
                  .setTimestamp();
                rUser.send(EmbedMute);
                message.guild.members.get(rUser.id).ban(reason);
              });
              z.on("collect", r => {
                Embed.setColor("RED");
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
          if (!reason) {
            let Embed = new Discord.RichEmbed()
              .setColor(colors)
              .setFooter(
                `${message.author.username}`,
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
                  reaction.emoji.name === "✅" && user.id === message.author.id;
                const b = (reaction, user) =>
                  reaction.emoji.name === "❎" && user.id === message.author.id;
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
                  Embed.setDescription(
                    `✅ | **Пользователь ${
                      message.author
                    } забанил пользователя ${rUser} на ${uts(
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
                      `✅ | **Вас забанили на сервере \`${message.guild.name}\`!**`
                    )
                    .setColor(colors)
                    .addField(
                      "⏱ | **Длительность**",
                      `**${uts(time, one, two, five)}**`,
                      true
                    )
                    .addField("⚔ | **Модератор**", `**${message.author.tag}**`, true)
                    .addField("📄 | **Причина**", `**Без причины.**`)
                    .setFooter(bot.user.username, bot.user.avatarURL)
                    .setTimestamp();
                  rUser.send(EmbedMute);
                  d.stop();
                  z.stop();
                  message.guild.members.get(rUser.id).ban();
                  return;
                });
                z.on("collect", r => {
                  Embed.setColor("RED");
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
              `${message.author.username}`,
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
                reaction.emoji.name === "✅" && user.id === message.author.id;
              const b = (reaction, user) =>
                reaction.emoji.name === "❎" && user.id === message.author.id;
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
                Embed.setDescription(
                  `✅ | **Пользователь ${
                    message.author
                  } забанил пользователя ${rUser} на ${uts(
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
                    `✅ | **Вас забанили на сервере \`${message.guild.name}\`!**`
                  )
                  .setColor(colors)
                  .addField(
                    "⏱ | **Длительность**",
                    `**${uts(time, one, two, five)}**`,
                    true
                  )
                  .addField("⚔ | **Модератор**", `**${message.author.tag}**`, true)
                  .addField("📄 | **Причина**", `**${reason}**`)
                  .setFooter(bot.user.username, bot.user.avatarURL)
                  .setTimestamp();
                rUser.send(EmbedMute);
                message.guild.members.get(rUser.id).ban(reason);
              });
              z.on("collect", r => {
                Embed.setColor("RED");
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
          if (!reason) {
            let Embed = new Discord.RichEmbed()
              .setColor(colors)
              .setFooter(
                `${message.author.username}`,
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
                  reaction.emoji.name === "✅" && user.id === message.author.id;
                const b = (reaction, user) =>
                  reaction.emoji.name === "❎" && user.id === message.author.id;
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
                  Embed.setDescription(
                    `✅ | **Пользователь ${
                      message.author
                    } забанил пользователя ${rUser} на ${uts(
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
                      `✅ | **Вас забанили на сервере \`${message.guild.name}\`!**`
                    )
                    .setColor(colors)
                    .addField(
                      "⏱ | **Длительность**",
                      `**${uts(time, one, two, five)}**`,
                      true
                    )
                    .addField("⚔ | **Модератор**", `**${message.author.tag}**`, true)
                    .addField("📄 | **Причина**", `**Без причины.**`)
                    .setFooter(bot.user.username, bot.user.avatarURL)
                    .setTimestamp();
                  rUser.send(EmbedMute);
                  d.stop();
                  z.stop();
                  message.guild.members.get(rUser.id).ban();
                  return;
                });
                z.on("collect", r => {
                  Embed.setColor("RED");
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
              `${message.author.username}`,
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
                reaction.emoji.name === "✅" && user.id === message.author.id;
              const b = (reaction, user) =>
                reaction.emoji.name === "❎" && user.id === message.author.id;
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
                Embed.setDescription(
                  `✅ | **Пользователь ${
                    message.author
                  } забанил пользователя ${rUser} на ${uts(
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
                    `✅ | **Вас забанили на сервере \`${message.guild.name}\`!**`
                  )
                  .setColor(colors)
                  .addField(
                    "⏱ | **Длительность**",
                    `**${uts(time, one, two, five)}**`,
                    true
                  )
                  .addField("⚔ | **Модератор**", `**${message.author.tag}**`, true)
                  .addField("📄 | **Причина**", `**${reason}**`)
                  .setFooter(bot.user.username, bot.user.avatarURL)
                  .setTimestamp();
                rUser.send(EmbedMute);
                message.guild.members.get(rUser.id).ban(reason);
              });
              z.on("collect", r => {
                Embed.setColor("RED");
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
          if (!reason) {
            let Embed = new Discord.RichEmbed()
              .setColor(colors)
              .setFooter(
                `${message.author.username}`,
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
                  reaction.emoji.name === "✅" && user.id === message.author.id;
                const b = (reaction, user) =>
                  reaction.emoji.name === "❎" && user.id === message.author.id;
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
                  Embed.setDescription(
                    `✅ | **Пользователь ${
                      message.author
                    } забанил пользователя ${rUser} на ${uts(
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
                      `✅ | **Вас забанили на сервере \`${message.guild.name}\`!**`
                    )
                    .setColor(colors)
                    .addField(
                      "⏱ | **Длительность**",
                      `**${uts(time, one, two, five)}**`,
                      true
                    )
                    .addField("⚔ | **Модератор**", `**${message.author.tag}**`, true)
                    .addField("📄 | **Причина**", `**Без причины.**`)
                    .setFooter(bot.user.username, bot.user.avatarURL)
                    .setTimestamp();
                  rUser.send(EmbedMute);
                  d.stop();
                  z.stop();
                  message.guild.members.get(rUser.id).ban();
                  return;
                });
                z.on("collect", r => {
                  Embed.setColor("RED");
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
              `${message.author.username}`,
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
                reaction.emoji.name === "✅" && user.id === message.author.id;
              const b = (reaction, user) =>
                reaction.emoji.name === "❎" && user.id === message.author.id;
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
                Embed.setDescription(
                  `✅ | **Пользователь ${
                    message.author
                  } забанил пользователя ${rUser} на ${uts(
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
                    `✅ | **Вас забанили на сервере \`${message.guild.name}\`!**`
                  )
                  .setColor(colors)
                  .addField(
                    "⏱ | **Длительность**",
                    `**${uts(time, one, two, five)}**`,
                    true
                  )
                  .addField("⚔ | **Модератор**", `**${message.author.tag}**`, true)
                  .addField("📄 | **Причина**", `**${reason}**`)
                  .setFooter(bot.user.username, bot.user.avatarURL)
                  .setTimestamp();
                rUser.send(EmbedMute);
                message.guild.members.get(rUser.id).ban(reason);
              });
              z.on("collect", r => {
                Embed.setColor("RED");
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
          if (!reason) {
            let Embed = new Discord.RichEmbed()
              .setColor(colors)
              .setFooter(
                `${message.author.username}`,
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
                  reaction.emoji.name === "✅" && user.id === message.author.id;
                const b = (reaction, user) =>
                  reaction.emoji.name === "❎" && user.id === message.author.id;
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
                  Embed.setDescription(
                    `✅ | **Пользователь ${
                      message.author
                    } забанил пользователя ${rUser} на ${uts(
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
                      `✅ | **Вас забанили на сервере \`${message.guild.name}\`!**`
                    )
                    .setColor(colors)
                    .addField(
                      "⏱ | **Длительность**",
                      `**${uts(time, one, two, five)}**`,
                      true
                    )
                    .addField("⚔ | **Модератор**", `**${message.author.tag}**`, true)
                    .addField("📄 | **Причина**", `**Без причины.**`)
                    .setFooter(bot.user.username, bot.user.avatarURL)
                    .setTimestamp();
                  rUser.send(EmbedMute);
                  d.stop();
                  z.stop();
                  message.guild.members.get(rUser.id).ban();
                  return;
                });
                z.on("collect", r => {
                  Embed.setColor("RED");
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
              `${message.author.username}`,
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
                reaction.emoji.name === "✅" && user.id === message.author.id;
              const b = (reaction, user) =>
                reaction.emoji.name === "❎" && user.id === message.author.id;
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
                Embed.setDescription(
                  `✅ | **Пользователь ${
                    message.author
                  } забанил пользователя ${rUser} на ${uts(
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
                    `✅ | **Вас забанили на сервере \`${message.guild.name}\`!**`
                  )
                  .setColor(colors)
                  .addField(
                    "⏱ | **Длительность**",
                    `**${uts(time, one, two, five)}**`,
                    true
                  )
                  .addField("⚔ | **Модератор**", `**${message.author.tag}**`, true)
                  .addField("📄 | **Причина**", `**${reason}**`)
                  .setFooter(bot.user.username, bot.user.avatarURL)
                  .setTimestamp();
                rUser.send(EmbedMute);
                message.guild.members.get(rUser.id).ban(reason);
              });
              z.on("collect", r => {
                Embed.setColor("RED");
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
          if (!reason) {
            let Embed = new Discord.RichEmbed()
              .setColor(colors)
              .setFooter(
                `${message.author.username}`,
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
                  reaction.emoji.name === "✅" && user.id === message.author.id;
                const b = (reaction, user) =>
                  reaction.emoji.name === "❎" && user.id === message.author.id;
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
                  Embed.setDescription(
                    `✅ | **Пользователь ${
                      message.author
                    } забанил пользователя ${rUser} на ${uts(
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
                      `✅ | **Вас забанили на сервере \`${message.guild.name}\`!**`
                    )
                    .setColor(colors)
                    .addField(
                      "⏱ | **Длительность**",
                      `**${uts(time, one, two, five)}**`,
                      true
                    )
                    .addField("⚔ | **Модератор**", `**${message.author.tag}**`, true)
                    .addField("📄 | **Причина**", `**Без причины.**`)
                    .setFooter(bot.user.username, bot.user.avatarURL)
                    .setTimestamp();
                  rUser.send(EmbedMute);
                  d.stop();
                  z.stop();
                  message.guild.members.get(rUser.id).ban();
                  return;
                });
                z.on("collect", r => {
                  Embed.setColor("RED");
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
              `${message.author.username}`,
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
                reaction.emoji.name === "✅" && user.id === message.author.id;
              const b = (reaction, user) =>
                reaction.emoji.name === "❎" && user.id === message.author.id;
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
                Embed.setDescription(
                  `✅ | **Пользователь ${
                    message.author
                  } забанил пользователя ${rUser} на ${uts(
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
                    `✅ | **Вас забанили на сервере \`${message.guild.name}\`!**`
                  )
                  .setColor(colors)
                  .addField(
                    "⏱ | **Длительность**",
                    `**${uts(time, one, two, five)}**`,
                    true
                  )
                  .addField("⚔ | **Модератор**", `**${message.author.tag}**`, true)
                  .addField("📄 | **Причина**", `**${reason}**`)
                  .setFooter(bot.user.username, bot.user.avatarURL)
                  .setTimestamp();
                rUser.send(EmbedMute);
                message.guild.members.get(rUser.id).ban(reason);
              });
              z.on("collect", r => {
                Embed.setColor("RED");
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
  } catch (err) {
    message.channel.send(
      new Discord.RichEmbed().setColor("RED").addField(ERROR, err.message)
    );
    console.log(err.stack);
  }
};
exports.command = {
  name: "ban",
  DM: false
};
