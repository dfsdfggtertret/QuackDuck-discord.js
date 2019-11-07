const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  try {
    const collection1 = db.collection("ConfigLevel");
    collection1
      .find({ GuildId: message.guild.id })
      .toArray(async function(err, results) {
        let Levels = results[0] == undefined ? true : results[0].Config;
        if (Levels == false)
          return message.channel.send(
            "🛠 | **Система уровней отключена на этом сервере!**"
          );
        let rUser = message.guild.member(
          message.mentions.users.first() ||
            message.guild.members.get(args[1]) ||
            message.guild.member(message.author)
        );
        const collection = db.collection("levels");
        collection
          .find({ GuildId: message.guild.id, UserId: rUser.id })
          .toArray(async function(err, results) {
            let Level = results[0] == undefined ? undefined : results[0].level;
            let Xp = results[0] == undefined ? 0 : results[0].xp;
            let Maxs = results[0] == undefined ? "???" : results[0].maxs;
            function Buffer(Levell, Xpp, Maxss, TOP, Процентыы) {
              let att = new Discord.RichEmbed()
                .setThumbnail(rUser.user.displayAvatarURL)
                .addField(
                  "💡 | **Опыт:**",
                  `${Xpp}/${Maxss} [ ${Процентыы}% ]`,
                  true
                )
                .addField(":incoming_envelope: | **Уровень:**", Levell, true)
                .setAuthor(`🦆 | ${rUser.user.username} | TOP: ${TOP}`)
                .setColor(colors)
                .setTimestamp()
                .setFooter(bot.user.username, bot.user.avatarURL);
              message.channel.send(att);
            }
            if (Level == undefined) return Buffer(0, 0, "???", "???", 0);
            collection
              .find({
                GuildId: message.guild.id
              })
              .sort({ level: -1 })
              .toArray()
              .then(res =>
                res.map(async (u, i) => {
                  i + 1;
                  if (u.UserId !== rUser.id) return;
                  let a = `${i + 1}`;
                  let Процент0 = Maxs / 100;
                  let Проценты =
                    Math.round(Xp / Процент0) == NaN
                      ? 0
                      : Math.round(Xp / Процент0);
                  Buffer(Level, Xp, Maxs, a, Проценты);
                })
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
module.exports.command = {
  name: "rankducktext",
  DM: false,
  bot: false
};
