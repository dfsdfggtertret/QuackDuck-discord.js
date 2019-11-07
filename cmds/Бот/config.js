const { RichEmbed } = require("discord.js");
const strftime = require("strftime");
exports.run = (bot, message) => {
  try {
    let vremya = strftime.timezone(180);
    let TIME = vremya("%F • %T", new Date());
    var args1 = message.content.toLowerCase().split(" ");
    if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.channel.send(
        "🚫 | **У вас недостаточно прав для выполнения этой команды!**"
      );
    const collection = db.collection("prefix");
    collection
      .find({ GuildId: message.guild.id })
      .toArray(function(err, results) {
        let ResultsPrefix = results[0] == undefined ? undefined : results[0];
        let prefix =
          results[0] == undefined ? DefaultPrefix : results[0].Prefix;
        const args = message.content
          .slice(prefix.length)
          .trim()
          .split(/ +/g);
        const collection2 = db.collection("MemberAdd");
        collection2
          .find({ GuildId: message.guild.id })
          .toArray(function(err, results) {
            let Results = results[0] == undefined ? undefined : results[0];
            var welcomemessage =
              results[0] == undefined ? undefined : results[0].welcomemessage;
            var welcomedm = results[0] == undefined ? undefined : results[0].dm;
            const collection3 = db.collection("ChannelConfig");
            collection3
              .find({ GuildId: message.guild.id })
              .toArray(function(err, results) {
                var notificationchannel =
                  results[0] == undefined ? undefined : results[0].channel;
                const collection4 = db.collection("MemberRemove");
                collection4
                  .find({ GuildId: message.guild.id })
                  .toArray(function(err, results) {
                    let Results2 =
                      results[0] == undefined ? undefined : results[0];
                    var leavemessage =
                      results[0] == undefined
                        ? undefined
                        : results[0].leavemessage;
                    const collection5 = db.collection("ConfigLevel");
                    collection5
                      .find({ GuildId: message.guild.id })
                      .toArray(function(err, results) {
                        let Results3 =
                          results[0] == undefined ? undefined : results[0];
                        let Levels =
                          results[0] == undefined ? true : results[0].Config;
                        const collection6 = db.collection("MemberAddRole");
                        collection6
                          .find({ GuildId: message.guild.id })
                          .toArray(function(err, results) {
                            var Results6 =
                              results[0] == undefined ? undefined : results[0];
                            var Results66 = results;
                            let a = results.map(d => d.role);
                            const collection7 = db.collection("LevelRole");
                            collection7
                              .find({ GuildId: message.guild.id })
                              .toArray(function(err, results) {
                                var Results7 =
                                  results[0] == undefined
                                    ? undefined
                                    : results[0];
                                var Results77 = results;
                                let dLevel = results.map(d => d.level);
                                let dRole = results.map(d => d.role);
                                const collection8 = db.collection(
                                  "NotXPChannel"
                                );
                                collection8
                                  .find({ GuildId: message.guild.id })
                                  .toArray(function(err, results) {
                                    var Results8 =
                                      results[0] == undefined
                                        ? undefined
                                        : results[0];
                                    var Results88 = results;
                                    let dChannel = results.map(d => d.Channel);
                                    const collection9 = db.collection(
                                      "ResetLevels"
                                    );
                                    collection9
                                      .find({ GuildId: message.guild.id })
                                      .toArray(function(err, results) {
                                        var Results9 =
                                          results[0] == undefined
                                            ? undefined
                                            : results[0];
                                        var Results99 = results;
                                        let dData = results.map(d => d.Data);
                                        if (!args1[1])
                                          return message.channel.send(
                                            new RichEmbed()
                                              .setColor(colors)
                                              .setDescription(
                                                `\`guild\` - Название сервера\n\`member\` - Упоминание участникa\nПример: \`${prefix}config setwelcome Участник member присоединился к серверу!\``
                                              )
                                              .setFooter(
                                                `Напишите ${prefix}config help для помощи.`,
                                                bot.user.avatarURL
                                              )
                                              .addField(
                                                "Канал приветствий/Прощаний (setchannel)",
                                                notificationchannel == undefined
                                                  ? "Не установлен."
                                                  : `<#${notificationchannel}>`
                                              )
                                              .addField(
                                                `Префикс бота (setprefix)`,
                                                `\`${prefix}\``
                                              )
                                              .addField(
                                                `Приветствие в ЛС (setdm)`,
                                                welcomedm == undefined
                                                  ? "Не установлен."
                                                  : welcomedm
                                              )
                                              .addField(
                                                "Приветствие (setwelcome)",
                                                welcomemessage == undefined
                                                  ? "Не установлен."
                                                  : welcomemessage
                                              )
                                              .addField(
                                                "Прощание (setleave)",
                                                leavemessage == undefined
                                                  ? "Не установлен."
                                                  : leavemessage
                                              )
                                              .addField(
                                                `Авто-Роли (autorole)`,
                                                a
                                                  .map(i => `<@&${i}>`)
                                                  .join("⠀•⠀") ||
                                                  "Не установлены."
                                              )
                                              .addField(
                                                `Роли-Уровни (setlevelrole)`,
                                                `${Results77.map(
                                                  i =>
                                                    `Уровень: ${i.level} (<@&${i.role}>)`
                                                ).join("\n") ||
                                                  "Не установлены."}`
                                              )
                                              .addField(
                                                `Система уровней (setlevels)`,
                                                Levels == true
                                                  ? "Включена."
                                                  : "Отключена."
                                              )
                                              .addField(
                                                `Каналы без подсчёта XP за общение (NotXPChannel)`,
                                                dChannel
                                                  .map(i => `<#${i}>`)
                                                  .join("⠀•⠀") ||
                                                  "Не установлены."
                                              )
                                              .addField(
                                                `Сброс уровней (ResetLevels)`,
                                                `**Последние сбросы:**\n${dData
                                                  .map(i => i)
                                                  .join("\n") ||
                                                  "Ещё не было :0"}`
                                              )
                                              .setTimestamp()
                                          );
                                        if (args1[1] === "help") {
                                          message.channel.send(
                                            new RichEmbed()
                                              .setColor(colors)
                                              .setFooter(
                                                `Config | Guild: ${message.guild.id}`,
                                                bot.user.avatarURL
                                              )
                                              .setDescription(
                                                "Установка параметров\n`guild` - Название сервера.\n`member` - Упоминание участника\nПример использования: `" +
                                                  prefix +
                                                  `config setwelcome Привет member, ты попал на сервер guild` +
                                                  "`"
                                              )
                                              .addField(
                                                "Канал приветствий/Прощаний (setchannel)",
                                                `Пример: \`${prefix}config setchannel <#Канал|ID>\``
                                              )
                                              .addField(
                                                `Префикс бота (setprefix)`,
                                                `Пример: \`${prefix}config setprefix <Префикс>\``
                                              )
                                              .addField(
                                                `Приветствие в ЛС (setdm)`,
                                                `Пример: \`${prefix}config setdm <Сообщение>\``
                                              )
                                              .addField(
                                                "Приветствие (setwelcome)",
                                                `Пример: \`${prefix}config setwelcome <Сообщение>\``
                                              )
                                              .addField(
                                                "Прощание (setleave)",
                                                `Пример: \`${prefix}config setleave <Сообщение>\``
                                              )
                                              .addField(
                                                `Авто-Роль (autorole)`,
                                                `Пример: \`${prefix}config autorole <Название Роли>\``
                                              )
                                              .addField(
                                                `Роли-Уровни (setlevelrole)`,
                                                `Пример: \`${prefix}config setlevelrole <Левел> <Название Роли>\``
                                              )
                                              .addField(
                                                `Система Уровней (setlevels)`,
                                                `Пример: \`${prefix}config setlevels <Команда>\` (где \`<Команда>\` нужно вписать или \`true\` (включить) или \`false\` (отключить)`
                                              )
                                              .addField(
                                                `Каналы без подсчёта XP за общение (NotXPChannel)`,
                                                `Пример: \`${prefix}config NotXPChannel <Канал>\``
                                              )
                                              .addField(
                                                `Сброс уровней (ResetLevels)`,
                                                `Пример: \`${prefix}config ResetLevels\``
                                              )
                                              .setTimestamp()
                                          );
                                          message.channel.send(
                                            new RichEmbed()
                                              .setColor(colors)
                                              .setFooter(
                                                `Config | Guild: ${message.guild.id}`,
                                                bot.user.avatarURL
                                              )
                                              .setDescription(
                                                "Удаление параметров(reset)"
                                              )
                                              .addField(
                                                "Канал приветствий/Прощаний (setchannel)",
                                                `Пример: \`${prefix}config setchannel reset\``
                                              )
                                              .addField(
                                                `Префикс бота (setprefix)`,
                                                `Пример: \`${prefix}config setprefix reset\``
                                              )
                                              .addField(
                                                `Приветствие в ЛС (setdm)`,
                                                `Пример: \`${prefix}config setdm reset\``
                                              )
                                              .addField(
                                                "Приветствие (setwelcome)",
                                                `Пример: \`${prefix}config setwelcome reset\``
                                              )
                                              .addField(
                                                "Прощание (setleave)",
                                                `Пример: \`${prefix}config setleave reset\``
                                              )
                                              .addField(
                                                `Авто-Роль (autorole)`,
                                                `Пример: \`${prefix}config autorole reset <Название Роли, либо ничего>\``
                                              )
                                              .addField(
                                                `Роли-Уровни (setlevelrole)`,
                                                `Пример: \`${prefix}config setlevelrole reset <Название Роли, либо ничего.>\``
                                              )
                                              .addField(
                                                `Каналы без подсчёта XP за общение (NotXPChannel)`,
                                                `Пример: \`${prefix}config NotXPChannel reset <Либо канал, либо ничего.>\``
                                              )
                                              .setTimestamp()
                                          );
                                        } else if (args1[1] === "setchannel") {
                                          if (args1[2] === "reset") {
                                            message.channel.send(
                                              "🛠 | **Вы успешно удалили канал Прощаний/Приветствий!**"
                                            );
                                            if (
                                              notificationchannel == undefined
                                            )
                                              return;
                                            db.collection(
                                              "ChannelConfig"
                                            ).deleteMany(
                                              { GuildId: message.guild.id },
                                              function(err, result) {
                                                console.log(result);
                                                if (err)
                                                  return console.log(err);
                                              }
                                            );
                                            return;
                                          }
                                          var channel =
                                            message.mentions.channels.first() ||
                                            message.guild.channels.get(
                                              args1[2]
                                            );
                                          if (!channel)
                                            return message.channel.send(
                                              "⚠ | **Укажите канал!**"
                                            );

                                          if (
                                            !channel
                                              .permissionsFor(message.guild.me)
                                              .has("SEND_MESSAGES")
                                          )
                                            return message.channel.send(
                                              "🚫 | **У меня нет прав писать в этом канале!**"
                                            );
                                          message.channel.send(
                                            new RichEmbed()
                                              .addField(
                                                "🛠 | **Канал Прощаний/Приветствий был установлен!**",
                                                message.guild.channels.get(
                                                  channel.id
                                                )
                                              )
                                              .setColor(colors)
                                              .setFooter(
                                                `Config | Guild: ${message.guild.id}`
                                              )
                                              .setTimestamp()
                                          );
                                          if (
                                            notificationchannel !== undefined
                                          ) {
                                            collection3.updateOne(
                                              { GuildId: message.guild.id },
                                              { $set: { channel: channel.id } },
                                              function(err, result) {
                                                if (err)
                                                  return console.log(err);
                                              }
                                            );
                                          }
                                          if (
                                            notificationchannel == undefined
                                          ) {
                                            let users2 = [
                                              {
                                                GuildId: message.guild.id,
                                                channel: channel.id
                                              }
                                            ];
                                            collection3.insertMany(
                                              users2,
                                              function(err, results) {
                                                if (err)
                                                  return console.log(err);
                                              }
                                            );
                                          }
                                        } else if (args1[1] === "setwelcome") {
                                          if (args1[2] === "reset") {
                                            message.channel.send(
                                              "🛠 | **Вы успешно удалили сообщение приветствия!**"
                                            );
                                            if (welcomemessage == undefined)
                                              return;
                                            collection2.updateOne(
                                              { GuildId: message.guild.id },
                                              {
                                                $set: {
                                                  welcomemessage: undefined
                                                }
                                              },
                                              function(err, result) {
                                                if (err)
                                                  return console.log(err);
                                              }
                                            );
                                            return;
                                          }
                                          var welcomemessage2 = args
                                            .slice(2)
                                            .join(" ");
                                          if (!welcomemessage2)
                                            return message.channel.send(
                                              "⚠ | **Укажите сообщение приветствия!**"
                                            );
                                          message.channel.send(
                                            new RichEmbed()
                                              .addField(
                                                `🛠 | **Сообщение приветствия было установлено!**`,
                                                welcomemessage2
                                              )
                                              .setColor(colors)
                                              .setFooter(
                                                `Config | Guild: ${message.guild.id}`
                                              )
                                              .setTimestamp()
                                          );
                                          if (Results !== undefined) {
                                            collection2.updateOne(
                                              { GuildId: message.guild.id },
                                              {
                                                $set: {
                                                  welcomemessage: welcomemessage2
                                                }
                                              },
                                              function(err, result) {
                                                if (err)
                                                  return console.log(err);
                                              }
                                            );
                                          }
                                          if (Results == undefined) {
                                            let users2 = [
                                              {
                                                GuildId: message.guild.id,
                                                welcomemessage: welcomemessage2,
                                                role: undefined,
                                                dm: undefined
                                              }
                                            ];
                                            collection2.insertMany(
                                              users2,
                                              function(err, results) {
                                                if (err)
                                                  return console.log(err);
                                              }
                                            );
                                          }
                                        } else if (args1[1] === "setleave") {
                                          if (args1[2] === "reset") {
                                            message.channel.send(
                                              "🛠 | **Вы успешно удалили сообщение прощания!**"
                                            );
                                            if (leavemessage == undefined)
                                              return;
                                            collection4.updateOne(
                                              { GuildId: message.guild.id },
                                              {
                                                $set: {
                                                  leavemessage: undefined
                                                }
                                              },
                                              function(err, result) {
                                                if (err)
                                                  return console.log(err);
                                              }
                                            );
                                            return;
                                          }
                                          var leavemessage2 = args
                                            .slice(2)
                                            .join(" ");
                                          if (!leavemessage2)
                                            return message.channel.send(
                                              "⚠ | **Укажите сообщение прощания!**"
                                            );
                                          message.channel.send(
                                            new RichEmbed()
                                              .addField(
                                                `🛠 | **Сообщение прощания было установлено!**`,
                                                leavemessage2
                                              )
                                              .setColor(colors)
                                              .setFooter(
                                                `Config | Guild: ${message.guild.id}`
                                              )
                                              .setTimestamp()
                                          );
                                          if (Results2 !== undefined) {
                                            collection4.updateOne(
                                              { GuildId: message.guild.id },
                                              {
                                                $set: {
                                                  leavemessage: leavemessage2
                                                }
                                              },
                                              function(err, result) {
                                                if (err)
                                                  return console.log(err);
                                              }
                                            );
                                          }
                                          if (Results2 == undefined) {
                                            let users2 = [
                                              {
                                                GuildId: message.guild.id,
                                                leavemessage: leavemessage2
                                              }
                                            ];
                                            collection4.insertMany(
                                              users2,
                                              function(err, results) {
                                                if (err)
                                                  return console.log(err);
                                              }
                                            );
                                          }
                                        } else if (args1[1] === "autorole") {
                                          if (args1[2] === "reset") {
                                            if (!args1[3]) {
                                              message.channel.send(
                                                "🛠 | **Вы успешно удалили авто-роли!**"
                                              );
                                              db.collection(
                                                "MemberAddRole"
                                              ).deleteMany(
                                                { GuildId: message.guild.id },
                                                function(err, result) {
                                                  if (err) console.log(err);
                                                }
                                              );
                                              return;
                                            }
                                            if (
                                              !message.guild.me.permissions.has(
                                                "MANAGE_ROLES"
                                              )
                                            )
                                              return message.channel.send(
                                                "🚫 | **У меня нет прав управлять ролями!**"
                                              );
                                            var role2 =
                                              message.guild.roles.find(
                                                r =>
                                                  r.name ===
                                                  args.slice(3).join(" ")
                                              ) ||
                                              message.guild.roles.get(
                                                args1[3]
                                              ) ||
                                              message.guild.roles.find(
                                                r =>
                                                  r.id ==
                                                  args.slice(3).join(" ")
                                              );
                                            if (!role2)
                                              return message.channel.send(
                                                "⚠ | **Роль не найдена!**"
                                              );
                                            let Role = a.includes(role2.id);
                                            if (Role == false)
                                              return message.channel.send(
                                                "🚫 | **Роль не найдена в базе!**"
                                              );
                                            message.channel.send(
                                              new RichEmbed()
                                                .setColor(colors)
                                                .setFooter(
                                                  `Config | Guild: ${message.guild.id}`
                                                )
                                                .setTimestamp()
                                                .setDescription(
                                                  `🛠 | **Вы успешно удалили роль <@&${role2.id}> из базы.**`
                                                )
                                            );
                                            db.collection(
                                              "MemberAddRole"
                                            ).deleteMany(
                                              {
                                                GuildId: message.guild.id,
                                                role: role2.id
                                              },
                                              function(err, result) {
                                                if (err) console.log(err);
                                              }
                                            );
                                            return;
                                          }
                                          var role =
                                            message.guild.roles.find(
                                              r =>
                                                r.name ===
                                                args.slice(2).join(" ")
                                            ) ||
                                            message.guild.roles.get(args1[3]) ||
                                            message.guild.roles.find(
                                              r =>
                                                r.id == args.slice(2).join(" ")
                                            );
                                          if (!args[2])
                                            return message.channel.send(
                                              `⚠ | **Укажите роль!**`
                                            );
                                          if (!role)
                                            return message.channel.send(
                                              "⚠ | **Роль не найдена!**"
                                            );
                                          let RolE = a.includes(role.id);
                                          if (RolE == true)
                                            return message.channel.send(
                                              `⚠ | **Данная роль уже находится в базе!**`
                                            );
                                          message.channel.send(
                                            new RichEmbed()
                                              .addField(
                                                `🛠 | **Роль была установлена!**`,
                                                role
                                              )
                                              .setColor(colors)
                                              .setFooter(
                                                `Config | Guild: ${message.guild.id}`
                                              )
                                              .setTimestamp()
                                          );
                                          let users3 = [
                                            {
                                              GuildId: message.guild.id,
                                              role: role.id
                                            }
                                          ];
                                          collection6.insertMany(
                                            users3,
                                            function(err, results) {
                                              if (err) return console.log(err);
                                            }
                                          );
                                        } else if (args1[1] === "setdm") {
                                          if (args1[2] === "reset") {
                                            message.channel.send(
                                              "🛠 | **Вы успешно удалили сообщение приветствия в ЛС!**"
                                            );
                                            if (welcomedm == undefined) return;
                                            collection2.updateOne(
                                              { GuildId: message.guild.id },
                                              { $set: { dm: undefined } },
                                              function(err, result) {
                                                if (err)
                                                  return console.log(err);
                                              }
                                            );
                                            return;
                                          }
                                          var dmmessage = args
                                            .slice(2)
                                            .join(" ");

                                          if (!dmmessage)
                                            return message.channel.send(
                                              "⚠ | **Укажите сообщение приветствия в ЛС!**"
                                            );
                                          message.channel.send(
                                            new RichEmbed()
                                              .addField(
                                                `🛠 | **Сообщение приветствия в ЛС было установлено!**`,
                                                dmmessage
                                              )
                                              .setColor(colors)
                                              .setFooter(
                                                `Config | Guild: ${message.guild.id}`
                                              )
                                              .setTimestamp()
                                          );
                                          if (Results !== undefined) {
                                            collection2.updateOne(
                                              { GuildId: message.guild.id },
                                              { $set: { dm: dmmessage } },
                                              function(err, result) {
                                                if (err)
                                                  return console.log(err);
                                              }
                                            );
                                          }
                                          if (Results == undefined) {
                                            let users2 = [
                                              {
                                                GuildId: message.guild.id,
                                                welcomemessage: undefined,
                                                role: undefined,
                                                dm: dmmessage
                                              }
                                            ];
                                            collection2.insertMany(
                                              users2,
                                              function(err, results) {
                                                if (err)
                                                  return console.log(err);
                                              }
                                            );
                                          }
                                        } else if (args1[1] === "setprefix") {
                                          if (args1[2] === "reset") {
                                            message.channel.send(
                                              "🛠 | **Вы успешно сбросили префикс!**"
                                            );
                                            if (prefix == DefaultPrefix) return;
                                            collection.updateOne(
                                              { GuildId: message.guild.id },
                                              {
                                                $set: { Prefix: DefaultPrefix }
                                              },
                                              function(err, result) {
                                                if (err)
                                                  return console.log(err);
                                              }
                                            );
                                            return;
                                          }
                                          var PrefixMessage = args[2];
                                          if (!PrefixMessage) {
                                            message.channel.send(
                                              "⚠ | **Укажите префикс который хотите установить!**"
                                            );
                                            return;
                                          }
                                          if (PrefixMessage.length > 5)
                                            return message.channel.send(
                                              "⚠ | **Префикс не может быть больше 5 символов!**"
                                            );
                                          message.channel.send(
                                            new RichEmbed()
                                              .addField(
                                                `🛠 | **Префикс успешно был обновлён**`,
                                                `Префикс: \`${PrefixMessage}\``
                                              )
                                              .setColor(colors)
                                              .setFooter(
                                                `Config | Guild: ${message.guild.id}`
                                              )
                                              .setTimestamp()
                                          );
                                          if (ResultsPrefix !== undefined) {
                                            collection.updateOne(
                                              { GuildId: message.guild.id },
                                              {
                                                $set: { Prefix: PrefixMessage }
                                              },
                                              function(err, result) {
                                                if (err)
                                                  return console.log(err);
                                              }
                                            );
                                          }
                                          if (ResultsPrefix == undefined) {
                                            let users2 = [
                                              {
                                                GuildId: message.guild.id,
                                                Prefix: PrefixMessage
                                              }
                                            ];
                                            collection.insertMany(
                                              users2,
                                              function(err, results) {
                                                if (err)
                                                  return console.log(err);
                                              }
                                            );
                                          }
                                        } else if (args1[1] === "setlevels") {
                                          if (args1[2] == "true") {
                                            message.channel.send(
                                              "🛠 | **Система уровней активирована!**"
                                            );
                                            if (Levels == true) return;
                                            collection5.updateOne(
                                              { GuildId: message.guild.id },
                                              { $set: { Config: true } },
                                              function(err, result) {
                                                if (err)
                                                  return console.log(err);
                                              }
                                            );
                                            return;
                                          }
                                          if (args1[2] == "false") {
                                            message.channel.send(
                                              "🛠 | **Система уровней отключена!**"
                                            );
                                            if (Levels == false) return;
                                            if (Results3 == undefined) {
                                              let users2 = [
                                                {
                                                  GuildId: message.guild.id,
                                                  Config: false
                                                }
                                              ];
                                              collection5.insertMany(
                                                users2,
                                                function(err, results) {
                                                  if (err)
                                                    return console.log(err);
                                                }
                                              );
                                              return;
                                            }
                                            collection5.updateOne(
                                              { GuildId: message.guild.id },
                                              { $set: { Config: false } },
                                              function(err, result) {
                                                if (err)
                                                  return console.log(err);
                                              }
                                            );
                                            return;
                                          }
                                          message.channel.send(
                                            `🛠 | **Я не понял вашу команду.**\nНапишите true или false для включения или отключения команды.`
                                          );
                                        } else if (args[1] == "setlevelrole") {
                                          if (args1[2] == "reset") {
                                            if (!args1[3]) {
                                              message.channel.send(
                                                "🛠 | **Вы успешно удалили уровни-роли!**"
                                              );
                                              db.collection(
                                                "LevelRole"
                                              ).deleteMany(
                                                { GuildId: message.guild.id },
                                                function(err, result) {
                                                  if (err) console.log(err);
                                                }
                                              );
                                              return;
                                            }
                                            if (
                                              !message.guild.me.permissions.has(
                                                "MANAGE_ROLES"
                                              )
                                            )
                                              return message.channel.send(
                                                "🚫 | **У меня нет прав управлять ролями!**"
                                              );
                                            var role2 =
                                              message.guild.roles.find(
                                                r =>
                                                  r.name ===
                                                  args.slice(3).join(" ")
                                              ) ||
                                              message.guild.roles.get(
                                                args1[3]
                                              ) ||
                                              message.guild.roles.find(
                                                r =>
                                                  r.id ==
                                                  args.slice(3).join(" ")
                                              );
                                            if (!args1[3])
                                              return message.channel.send(
                                                "⚠ | **Укажите роль.**"
                                              );
                                            if (!role2)
                                              return message.channel.send(
                                                "⚠ | **Роль не найдена!**"
                                              );
                                            let Role = dRole.includes(role2.id);
                                            if (Role == false)
                                              return message.channel.send(
                                                "🚫 | **Роль не найдена в базе!**"
                                              );
                                            message.channel.send(
                                              new RichEmbed()
                                                .setColor(colors)
                                                .setFooter(
                                                  `Config | Guild: ${message.guild.id}`
                                                )
                                                .setTimestamp()
                                                .setDescription(
                                                  `🛠 | **Вы успешно удалили роль <@&${role2.id}> из базы.**`
                                                )
                                            );
                                            db.collection(
                                              "LevelRole"
                                            ).deleteMany(
                                              {
                                                GuildId: message.guild.id,
                                                role: role2.id
                                              },
                                              function(err, result) {
                                                if (err) console.log(err);
                                              }
                                            );
                                            return;
                                          }
                                          var role =
                                            message.guild.roles.find(
                                              r =>
                                                r.name ===
                                                args.slice(3).join(" ")
                                            ) ||
                                            message.guild.roles.get(args1[4]) ||
                                            message.guild.roles.find(
                                              r =>
                                                r.id == args.slice(3).join(" ")
                                            );
                                          if (!args[2]) {
                                            message.channel.send(
                                              `⚠ | **Укажите c какого уровня выдавать данную роль.**`
                                            );
                                            return;
                                          }
                                          if (isNaN(args[2]))
                                            return message.channel.send(
                                              `⚠ | **Укажите валидное число.**`
                                            );
                                          if (!args[3]) {
                                            message.channel.send(
                                              `⚠ | **Укажите роль!**`
                                            );
                                            return;
                                          }
                                          if (!role)
                                            return message.channel.send(
                                              "⚠ | **Роль не найдена!**"
                                            );
                                          let RolE = dRole.includes(role.id);
                                          if (RolE == true)
                                            return message.channel.send(
                                              `⚠ | **Данная роль уже находится в базе!**`
                                            );
                                          message.channel.send(
                                            new RichEmbed()
                                              .addField(
                                                `🛠 | **Роль-Уровень была установлена!**`,
                                                role
                                              )
                                              .setColor(colors)
                                              .setFooter(
                                                `Config | Guild: ${message.guild.id}`
                                              )
                                              .setTimestamp()
                                          );
                                          let users3 = [
                                            {
                                              GuildId: message.guild.id,
                                              role: role.id,
                                              level: args[2]
                                            }
                                          ];
                                          collection7.insertMany(
                                            users3,
                                            function(err, results) {
                                              if (err) return console.log(err);
                                            }
                                          );
                                        } else if (args1[1] == "notxpchannel") {
                                          if (args1[2] == "reset") {
                                            if (!args1[3]) {
                                              message.channel.send(
                                                "🛠 | **Вы успешно удалили каналы на которых не будет получаться XP из базы!**"
                                              );
                                              db.collection(
                                                "NotXPChannel"
                                              ).deleteMany(
                                                { GuildId: message.guild.id },
                                                function(err, result) {
                                                  if (err) console.log(err);
                                                }
                                              );
                                              return;
                                            }
                                            var channel =
                                              message.mentions.channels.first() ||
                                              message.guild.channels.get(
                                                args1[3]
                                              );
                                            if (!args1[3])
                                              return message.channel.send(
                                                "⚠ | **Укажите канал!**"
                                              );
                                            if (!channel)
                                              return message.channel.send(
                                                "⚠ | **Не найден канал!**"
                                              );
                                            let AA = dChannel.includes(
                                              channel.id
                                            );
                                            if (AA == false)
                                              return message.channel.send(
                                                "🚫 | **Канал не найден в базе!**"
                                              );
                                            message.channel.send(
                                              new RichEmbed()
                                                .setColor(colors)
                                                .setFooter(
                                                  `Config | Guild: ${message.guild.id}`
                                                )
                                                .setTimestamp()
                                                .setDescription(
                                                  `🛠 | **Вы успешно удалили канал <#${channel.id}> из базы.**`
                                                )
                                            );
                                            db.collection(
                                              "NotXPChannel"
                                            ).deleteMany(
                                              {
                                                GuildId: message.guild.id,
                                                Channel: channel.id
                                              },
                                              function(err, result) {
                                                if (err) console.log(err);
                                              }
                                            );
                                            return;
                                          }
                                          var channel =
                                            message.mentions.channels.first() ||
                                            message.guild.channels.get(
                                              args1[2]
                                            );
                                          if (!args[2])
                                            return message.channel.send(
                                              `⚠ | **Укажите канал!**`
                                            );
                                          if (!channel)
                                            return message.channel.send(
                                              "⚠ | **Канал не найден!**"
                                            );
                                          let cHANNel = dChannel.includes(
                                            channel.id
                                          );
                                          if (cHANNel == true)
                                            return message.channel.send(
                                              `⚠ | **Данный канал уже находится в базе!**`
                                            );
                                          message.channel.send(
                                            new RichEmbed()
                                              .addField(
                                                `🛠 | **Канал был установлена!**`,
                                                channel
                                              )
                                              .setColor(colors)
                                              .setFooter(
                                                `Config | Guild: ${message.guild.id}`
                                              )
                                              .setTimestamp()
                                          );
                                          let users6 = [
                                            {
                                              GuildId: message.guild.id,
                                              Channel: channel.id
                                            }
                                          ];
                                          collection8.insertMany(
                                            users6,
                                            function(err, results) {
                                              if (err) return console.log(err);
                                            }
                                          );
                                        } else if (args1[1] == "resetlevels") {
                                          if (
                                            message.author.id !==
                                            message.guild.owner.id
                                          )
                                            return message.channel.send(
                                              new Discord.RichEmbed()
                                                .setColor("RED")
                                                .setDescription(
                                                  "🚫 | **С целью безопасности, данная команда доступна только создателю сервера.**"
                                                )
                                                .setFooter(
                                                  message.author.username,
                                                  message.author
                                                    .displayAvatarURL
                                                )
                                                .setTimestamp()
                                            );
                                          message.channel
                                            .send(
                                              "Ты уверен?\nЕсли ты это сделаешь, все уровни, все топы на этом сервере будут полностью стерты.\nВсе труды участников будут обнулены.\nПодумай хорошенько, прежде чем нажимать на ✅...."
                                            )
                                            .then(msg => {
                                              msg.react("✅").then(r => {
                                                msg.react("❎"); //Ставим реакции.
                                                const a = (reaction, user) =>
                                                  reaction.emoji.name ===
                                                    "✅" &&
                                                  user.id === message.author.id;
                                                const b = (reaction, user) =>
                                                  reaction.emoji.name ===
                                                    "❎" &&
                                                  user.id === message.author.id;
                                                const d = msg.createReactionCollector(
                                                  a
                                                );
                                                const z = msg.createReactionCollector(
                                                  b
                                                );
                                                d.on("collect", async r => {
                                                  let embed = new RichEmbed()
                                                    .setColor(colors)
                                                    .setDescription(
                                                      "✅ | **Все уровни были стерты D:**"
                                                    )
                                                    .setTimestamp();
                                                  msg.edit(embed).then(msg => {
                                                    //Изменяем сообщение.
                                                    msg.clearReactions(); //Удалем реакции.
                                                  });
                                                  d.stop(); //Закиываем коллекторы.
                                                  z.stop();
                                                  let users6 = [
                                                    {
                                                      GuildId: message.guild.id,
                                                      Data: TIME
                                                    }
                                                  ];
                                                  await collection9.insertMany(
                                                    users6,
                                                    function(err, results) {
                                                      if (err)
                                                        return console.log(err);
                                                    }
                                                  );
                                                  await db
                                                    .collection("levels")
                                                    .deleteMany(
                                                      {
                                                        GuildId:
                                                          message.guild.id
                                                      },
                                                      function(err, result) {
                                                        if (err)
                                                          console.log(err);
                                                      }
                                                    );
                                                  let addmaxs =
                                                    Math.floor(
                                                      Math.random() * 51
                                                    ) + 50;
                                                  await bot.guilds
                                                    .get(message.guild.id)
                                                    .members.forEach(
                                                      async member => {
                                                        if (member.bot) return;
                                                        let res = MongoDB.levels.findOne(
                                                          {
                                                            UserId: member.id,
                                                            GuildId:
                                                              member.guild.id
                                                          }
                                                        );
                                                        await MongoDB.levels.insertOne(
                                                          {
                                                            UserId: member.id,
                                                            GuildId:
                                                              member.guild.id,
                                                            level: 0,
                                                            xp: 0,
                                                            maxs: addmaxs
                                                          }
                                                        );
                                                      }
                                                    );
                                                });
                                                z.on("collect", r => {
                                                  msg
                                                    .edit(
                                                      "Отлично! Операция отменена. :D"
                                                    )
                                                    .then(msg => {
                                                      msg.clearReactions();
                                                    });
                                                  d.stop();
                                                  z.stop();
                                                });
                                              });
                                            });
                                        }
                                      });
                                  });
                              });
                          });
                      });
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
exports.command = {
  name: "config"
};
