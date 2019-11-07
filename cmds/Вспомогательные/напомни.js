const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  try{
  if(message.channel.type !== "dm") return
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
  const db = bot.client.db("QuackDuck");
  const collection = db.collection("напоминания");
  if (args1[1] === "через") {
    let Time = args[1];
    var reason = args.slice(2).join(" ");
    if (!Time) {
      let embed = new Discord.RichEmbed()
        .setColor("RED")
        .setAuthor("Ошибка!\nУкажите время.")
        .setFooter(bot.user.username, bot.user.avatarURL)
        .setTimestamp();
      message.channel.send(embed);
      return;
    }
    if (!reason) {
      let embed = new Discord.RichEmbed()
        .setColor("RED")
        .setAuthor("Ошибка!\nУкажите напоминание.")
        .setFooter(bot.user.username, bot.user.avatarURL)
        .setTimestamp();
      message.channel.send(embed);
      return;
    }
    let sym = Time.split("").reverse()[0];
    let time = Time.slice(0, -1);
    if (isNaN(time)) {
      let embed = new Discord.RichEmbed()
        .setColor("RED")
        .setAuthor("Ошибка!\nУкажите валидное число.")
        .setFooter(bot.user.username, bot.user.avatarURL)
        .setTimestamp();
      message.channel.send(embed);
      return;
    }
    if (sym === "s") {
      one = "секунду";
      two = "секунды";
      five = "секунд";
      if (!reason) {
        let embed = new Discord.RichEmbed()
          .setColor("RED")
          .setAuthor("Ошибка!\nУкажите напоминание.")
          .setFooter(bot.user.username, bot.user.avatarURL)
          .setTimestamp();
        message.channel.send(embed);
        return;
      }
      let embed = new Discord.RichEmbed()
        .setColor(colors)
        .setDescription(
          `Вы успешно установили напоминание!\nВремя: ${uts(
            time,
            one,
            two,
            five
          )}\nНапоминание: \`${reason}\``
        )
        .setFooter(bot.user.username, bot.user.avatarURL)
        .setTimestamp();
      message.channel.send(embed);
      let g = parseInt(Date.now() + time * 1000);
      let users2 = [
                  {
                    UserId: message.author.id,
                    Reason: reason,
                    Time: g
                  }
                ];
                collection.insertMany(users2, function(err, results) {
                  if (err) return console.log(err);
                });
      return;
    }
    if (sym === "m") {
      one = "минуту";
      two = "минуты";
      five = "минут";
      if (!reason) {
        let embed = new Discord.RichEmbed()
          .setColor("RED")
          .setAuthor("Ошибка!\nУкажите напоминание.")
          .setFooter(bot.user.username, bot.user.avatarURL)
          .setTimestamp();
        message.channel.send(embed);
        return;
      }
      let embed = new Discord.RichEmbed()
        .setColor(colors)
        .setDescription(
          `Вы успешно установили напоминание!\nВремя: ${uts(
            time,
            one,
            two,
            five
          )}\nНапоминание: \`${reason}\``
        )
        .setFooter(bot.user.username, bot.user.avatarURL)
        .setTimestamp();
      message.channel.send(embed);
      let min = parseInt(Date.now() + (time * 60) * 1000);
      let users2 = [
                  {
                    UserId: message.author.id,
                    Reason: reason,
                    Time: min
                  }
                ];
                collection.insertMany(users2, function(err, results) {
                  if (err) return console.log(err);
                });
    }
    if (sym === "h") {
      one = "час";
      two = "часа";
      five = "часов";
      if (!reason) {
        let embed = new Discord.RichEmbed()
          .setColor("RED")
          .setAuthor("Ошибка!\nУкажите напоминание.")
          .setFooter(bot.user.username, bot.user.avatarURL)
          .setTimestamp();
        message.channel.send(embed);
        return;
      }
      let embed = new Discord.RichEmbed()
        .setColor(colors)
        .setDescription(
          `Вы успешно установили напоминание!\nВремя: ${uts(
            time,
            one,
            two,
            five
          )}\nНапоминание: \`${reason}\``
        )
        .setFooter(bot.user.username, bot.user.avatarURL)
        .setTimestamp();
      message.channel.send(embed);
      let hac = parseInt(Date.now() + (time * 3600) * 1000);
      let users2 = [
                  {
                    UserId: message.author.id,
                    Reason: reason,
                    Time: hac
                  }
                ];
                collection.insertMany(users2, function(err, results) {
                  if (err) return console.log(err);
                });
    }
    if (sym === "d") {
      one = "день";
      two = "дня";
      five = "дней";
      if (!reason) {
        let embed = new Discord.RichEmbed()
          .setColor("RED")
          .setAuthor("Ошибка!\nУкажите напоминание.")
          .setFooter(bot.user.username, bot.user.avatarURL)
          .setTimestamp();
        message.channel.send(embed);
        return;
      }
      let embed = new Discord.RichEmbed()
        .setColor(colors)
        .setDescription(
          `Вы успешно установили напоминание!\nВремя: ${uts(
            time,
            one,
            two,
            five
          )}\nНапоминание: \`${reason}\``
        )
        .setFooter(bot.user.username, bot.user.avatarURL)
        .setTimestamp();
      message.channel.send(embed);
      let day = parseInt(Date.now() + (time * 86400) * 1000);
      let users2 = [
                  {
                    UserId: message.author.id,
                    Reason: reason,
                    Time: day
                  }
                ];
                collection.insertMany(users2, function(err, results) {
                  if (err) return console.log(err);
                });
      return;
    }
    if (sym === "w") {
            one = "неделю";
            two = "недели";
            five = "недель";
      if (!reason) {
        let embed = new Discord.RichEmbed()
          .setColor("RED")
          .setAuthor("Ошибка!\nУкажите напоминание.")
          .setFooter(bot.user.username, bot.user.avatarURL)
          .setTimestamp();
        message.channel.send(embed);
        return;
      }
      let embed = new Discord.RichEmbed()
        .setColor(colors)
        .setDescription(
          `Вы успешно установили напоминание!\nВремя: ${uts(
            time,
            one,
            two,
            five
          )}\nНапоминание: \`${reason}\``
        )
        .setFooter(bot.user.username, bot.user.avatarURL)
        .setTimestamp();
      message.channel.send(embed);
      let day = parseInt(Date.now() + (time * 604800) * 1000);
      let users2 = [
                  {
                    UserId: message.author.id,
                    Reason: reason,
                    Time: day
                  }
                ];
                collection.insertMany(users2, function(err, results) {
                  if (err) return console.log(err);
                });
      return;
    }
    if (sym === "y") {
            one = "год";
            two = "года";
            five = "года";
      if (!reason) {
        let embed = new Discord.RichEmbed()
          .setColor("RED")
          .setAuthor("Ошибка!\nУкажите напоминание.")
          .setFooter(bot.user.username, bot.user.avatarURL)
          .setTimestamp();
        message.channel.send(embed);
        return;
      }
      let embed = new Discord.RichEmbed()
        .setColor(colors)
        .setDescription(
          `Вы успешно установили напоминание!\nВремя: ${uts(
            time,
            one,
            two,
            five
          )}\nНапоминание: \`${reason}\``
        )
        .setFooter(bot.user.username, bot.user.avatarURL)
        .setTimestamp();
      message.channel.send(embed);
      let day = parseInt(Date.now() + (time * 31536000) * 1000);
      let users2 = [
                  {
                    UserId: message.author.id,
                    Reason: reason,
                    Time: day
                  }
                ];
                collection.insertMany(users2, function(err, results) {
                  if (err) return console.log(err);
                });
      return;
    }
    return;
  }
  let embed1 = new Discord.RichEmbed()
    .setColor("RED")
    .setAuthor('Ошибка!\nНапишите "через".')
    .setDescription(
      "Пример использования команды:\n```!напомни через 12s Обновить бота\n!напомни через 12m Пайти пакушац\n!напомни через 5h Спать\n!напомни через 9d Школа```\n5s - Секунды.\n5m - Минуты.\n5h - Часы.\n5d - Дней."
    )
    .setFooter(bot.user.username, bot.user.avatarURL)
    .setTimestamp();
  message.channel.send(embed1);
      } catch (err) {
    message.channel.send(
      new Discord.RichEmbed()
        .setColor("RED")
        .addField(
          ERROR,
          err.message
        )
    );
    console.log(err.stack);
  }
};
module.exports.command = {
  name: "напомни"
};
