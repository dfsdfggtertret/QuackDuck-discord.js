const { RichEmbed } = require("discord.js");
module.exports.run = async (bot, message, args) => {
  try {
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
    let one = "сообщение";
    let two = "сообщения";
    let five = "сообщений";
    if (!message.guild.me.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send(
        new RichEmbed()
          .setDescription(
            "🚫 | **У меня недостаточно прав для выполнения этой команды!**"
          )
          .setColor("RED")
          .setTimestamp()
          .setFooter(
            `${message.author.username}`,
            message.author.displayAvatarURL
          )
      );
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        new RichEmbed()
          .setColor("RED")
          .setDescription(
            "🚫 | **У вас недостаточно прав для выполнения этой команды!**"
          )
          .setFooter(message.author.username, message.author.displayAvatarURL)
          .setTimestamp()
      );
    if (!args[0])
      return message.channel.send(
        new RichEmbed()
          .setDescription("⚠ | **Укажите количество сообщений для удаления!**")
          .setColor("RED")
          .setFooter(message.author.username, message.author.displayAvatarURL)
          .setTimestamp()
      );
    if (isNaN(args[0]))
      return message.channel.send("⚠ | **Укажите валидное число!**");
    if (args[0] > 100) {
      message.channel.send(
        new RichEmbed()
          .setColor("RED")
          .setDescription(
            "По правилам Дискорда я не могу удалить больше 100 сообщений за раз.\nМне удалить 100 сообщений?"
          )
          .setTimestamp()
      ).then(msg => {
        msg.react("✅").then(r => {
          msg.react("❎"); //Ставим реакции.
          const a = (reaction, user) =>
            reaction.emoji.name === "✅" && user.id === message.author.id;
          const b = (reaction, user) =>
            reaction.emoji.name === "❎" && user.id === message.author.id;
          const d = msg.createReactionCollector(a);
          const z = msg.createReactionCollector(b);
          d.on("collect", async r => {
            await msg.delete()
            await message.channel.bulkDelete(100)
            await message.channel.send(
              new RichEmbed()
              .setColor(colors)
              .setDescription("✅ | **Удалено 100 сообщений.**")
              .setTimestamp()
              .setFooter(bot.user.username, bot.user.displayAvatarURL)
            )
            d.stop(); //Закрываем коллекторы.
            z.stop();
          });
          z.on("collect", r => {
            msg.edit(
              new RichEmbed()
                .setColor("RED")
                .setDescription("❎ | **Операция удалений сообщений отменена.**")
                .setTimestamp()
            ).then(msg => {
              msg.clearReactions();
            });
            d.stop();
            z.stop();
          });
        });
      });
      return;
    }
    if(args[0] <= 0) return message.channel.send(
      new RichEmbed()
      .setColor("RED")
      .setDescription(`Укажи значение больше 0!`)
      .setTimestamp()
      .setFooter(message.author.username, message.author.displayAvatarURL)
    )
    await message.delete();
    await message.channel.bulkDelete(parseInt(args[0])).then(() => {
      message.channel.send(
        new RichEmbed()
          .setDescription(`🗑 | **Удалено ${uts(parseInt(args[0]), one, two, five)}!**`)
          .setColor(colors)
          .setTimestamp()
          .setFooter(message.author.username, message.author.displayAvatarURL)
      ).then(m => m.delete(6000))
    });
  } catch (err) {
    message.channel.send(
      new Discord.RichEmbed().setColor("RED").addField("Произошла ошибка.\nЯ не могу удалять сообщения которым старше 14 дней.", "You can only bulk delete messages that are under 14 days old.")
    );
    console.log(err.stack);
  }
};
module.exports.command = {
  name: "clear",
  DM: false
};
