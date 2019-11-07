try {
  if(config2.bot.Levels.Status.Status != true) return
  const { RichEmbed } = require("discord.js");
  bot.on("message", async message => {
    if (config2.bot.Levels.AuthorBot == false) {
    if(message.author.bot) return
  }
    if (message.channel.type === "dm") return;
    let addxp = config2.bot.Levels.AddXp;
    let addmaxs = config2.bot.Levels.AddMaxs
    const collection1 = db.collection("ConfigLevel");
    collection1
      .find({ GuildId: message.guild.id })
      .toArray(async function(err, results) {
        let Levels = results[0] == undefined ? true : results[0].Config;
        if (Levels == false) return;
        const collection7 = db.collection("LevelRole");
        collection7
          .find({ GuildId: message.guild.id })
          .toArray(async function(err, results) {
          let Results7 = results
          const collection8 = db.collection("NotXPChannel")
                                collection8
                                .find({ GuildId: message.guild.id })
                                .toArray(async function(err, results) {
                                  var Results8 =
                                    results[0] == undefined
                                      ? undefined
                                      : results[0];
                                  var Results88 = results;
                                  let dChannel = results.map(d => d.Channel);
                                  if(dChannel.includes(message.channel.id)) return
            await MongoDB.levels._toCollection();
            let res = MongoDB.levels.findOne({
              UserId: message.author.id,
              GuildId: message.guild.id
            });
            if (res.UserId == undefined) {
              MongoDB.levels.insertOne({
                UserId: message.author.id,
                GuildId: message.guild.id,
                level: 0,
                xp: 0,
                maxs: addmaxs
              });
              return;
            }
            await MongoDB.duckcoins._toCollection();
            let res2 = MongoDB.duckcoins.findOne({ UserId: message.author.id });
            if (message.guild.id == ServerID) {
              if(config2.bot.Levels.Status.DuckCoins == true) {
              if (res2.UserId == undefined) {
                MongoDB.duckcoins.insertOne({
                  UserId: message.author.id,
                  DuckCoins: 0
                });
                return;
              }
            }
            }
            if (res.maxs <= res.xp) {
              if(config2.bot.Levels.Status.RoleLevels == true) {
              Results7.forEach(e => {
                if (res.level + 1 >= e.level) {
                  message.member.addRole(e.role);
                }
              });
            }
              if (message.guild.id == ServerID) {
                if(config2.bot.Levels.Status.DuckCoins == true) {
                await MongoDB.duckcoins.updateOne(
                  { UserId: message.author.id },
                  { coins: parseInt(res2.DuckCoins) + parseInt(10) }
                );
              }
              }
              await MongoDB.levels.updateOne(
                { UserId: message.author.id, GuildId: message.guild.id },
                {
                  level: parseInt(res.level) + parseInt(1),
                  xp: 0,
                  maxs: parseInt(res.maxs) + parseInt(addmaxs)
                }
              );
              if(config2.bot.Levels.Status.Message == true) {
              message.channel
                .send(
                  new RichEmbed()
                    .addField(
                      `${
                        message.author.username
                      }, поздравляю, ты получил ${parseInt(res.level) +
                        parseInt(1)} уровень!`,
                      `Следующий уровень будет через ${parseInt(res.maxs) +
                        parseInt(addmaxs)} XP.`
                    )
                    .setFooter(bot.user.username, bot.user.avatarURL)
                    .setTimestamp()
                    .setColor(colors)
                )
              }
              return;
            }
            await MongoDB.levels.updateOne(
              { UserId: message.author.id, GuildId: message.guild.id },
              { xp: parseInt(res.xp) + parseInt(addxp) }
            );
          });
      });
  })
  });
} catch (err) {
  console.log(err.stack);
}
