try {
  if(config2.bot.Status.Status != true) return
  bot.on("ready", async () => {
    bot.setInterval(async() => {
      var os = require("os");

      function ostype() {
        var sysName = os.type();
        return sysName === "Linux"
          ? "Linux"
          : sysName === "Darwin"
          ? "macOS"
          : sysName === "Windows_NT"
          ? "Windows"
          : `Неизвестная (${os.platform()})`;
      }

      function formatSize(length) {
        var i = 0,
          type = ["б", "Кб", "Мб", "Гб", "Тб", "Пб"];
        while ((length / 1000) | 0 && i < type.length - 1) {
          length /= 1024;
          i++;
        }
        return length.toFixed(2) + " " + type[i];
      }

      function getNormalCount(number, one, two, five) {
        number = Math.abs(number);
        number %= 100;
        if (number >= 5 && number <= 20) {
          return five;
        }
        number %= 10;
        if (number == 1) {
          return one;
        }
        if (number >= 2 && number <= 4) {
          return two;
        }
        return five;
      }

      var sec = os.uptime();
      var min = sec / 60;
      var hour = min / 60;

      var normalDay = `${Math.floor(hour / 24)} ${getNormalCount(
        Math.floor(hour / 24),
        "день",
        "дня",
        "дней"
      )}`;
      var normalHour = `${Math.floor(hour % 24)} ${getNormalCount(
        Math.floor(hour % 24),
        "час",
        "часа",
        "часов"
      )}`;
      var normalMinutes = `${Math.floor(min % 60)} ${getNormalCount(
        Math.floor(min % 60),
        "минута",
        "минуты",
        "минут"
      )}`;
      var normalSeconds = `${Math.floor(sec % 60)} ${getNormalCount(
        Math.floor(sec % 60),
        "секунда",
        "секунды",
        "секунд"
      )}`;
      var sysuptime = `${normalDay}, ${normalHour}, ${normalMinutes}, ${normalSeconds}`;

      module.exports.getOSType = ostype();
      module.exports.getOSArch = os.arch();
      module.exports.getOSHostName = os.hostname();
      module.exports.getOSMem = `${formatSize(
        os.totalmem() - os.freemem()
      )}/${formatSize(os.totalmem())} (Свободно: ${formatSize(os.freemem())})`;
      module.exports.getOSUptime = sysuptime;
      const verifilv = [
        "Отсутствует.",
        "Низкая.",
        "Средняя.",
        "Высокая.",
        "Очень высокая."
      ];
      await MongoDB.message._toCollection();
      let res = MongoDB.message.findOne({ GuildId: config2.ServerID });
      let embed = new Discord.RichEmbed()
        .setColor(config2.colors)
        .setAuthor(`📺 | Монитор`)
        .addField(
          `👥 | **Статус участников**`,
          `> Ботов: **${
            bot.guilds
              .get(ServerID)
              .members.filter(mem => mem.user.bot === true).size
          }**\n> В сети: **${
            bot.guilds.get(ServerID).presences.size
          }**\n> Не в сети: **${bot.guilds.get(ServerID).memberCount -
            bot.guilds.get(ServerID).presences.size}**\n> Не активен: **${
            bot.guilds
              .get(ServerID)
              .members.filter(member => member.presence.status === "idle").size
          }**\n> Не беспокоить: **${
            bot.guilds
              .get(ServerID)
              .members.filter(member => member.presence.status === "dnd").size
          }**\n> Общее количество: **${bot.guilds.get(ServerID).memberCount}**`
        )
        .addField("🌟 | **Ролей**", bot.guilds.get(ServerID).roles.size, true)
        .addField("🎉 | **Эмоджи**", bot.guilds.get(ServerID).emojis.size, true)
        .addField(
          "🔰 | **Защита**",
          verifilv[bot.guilds.get(ServerID).verificationLevel],
          true
        )
        .addField(
          "<:Attention:641904977387716608> | **Статус каналов**",
          `> Голосовой онлайн: **${
            bot.guilds.get(ServerID).members.filter(m => m.voiceChannel).size
          }**\n> Сообщений: **${res.message}**\n> Текстовых: **${
            bot.guilds.get(ServerID).channels.filter(c => c.type == "text").size
          }**\n> Голосовых: **${
            bot.guilds.get(ServerID).channels.filter(c => c.type == "voice")
              .size
          }**`
        )
        .addField(
          "📺 | **Монитор Бота**",
          `\nСистема: ${ostype()}\nЗадержка API: \`${Math.round(
            bot.ping
          )} мс\`\nАрхитектура системы: ${os.arch()}\nОЗУ: ${formatSize(
            os.totalmem() - os.freemem()
          )}/${formatSize(os.totalmem())} (Свободно: ${formatSize(
            os.freemem()
          )})\nАптайм системы: ${sysuptime}.`
        );
      bot.channels
        .get(config2.bot.Status.ChannelsID)
        .fetchMessage(config2.bot.Status.MessageID)
        .then(m => m.edit(embed)); //Укажите ID канала и ID сообщения бота.
    }, config2.bot.Status.Time);
  });
} catch (err) {
  console.log(err.stack);
}
