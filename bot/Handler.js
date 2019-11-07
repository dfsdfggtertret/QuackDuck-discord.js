try {
  const { RichEmbed } = require("discord.js");
  bot.on("ready", async () => {
    bot.setInterval(() => {
      if (config2.bot.Handler.Status.Mute.Status == false) return
      const collection = db.collection("mutes");
      collection.find().toArray(function(err, results) {
        if (results[0] == undefined) return;
        results.forEach(e => {
          let time = e.Time;
          let guildid = e.GuildId;
          let userid = e.UserId;
          let guild = bot.guilds.get(guildid);
          let member = guild.members.get(userid);
          let muteRole = bot.guilds.get(guildid).roles.find(
            r => r.name === config2.index.MuteRoleName
          );
          if (!muteRole) return;
          if (!guild) return
          if (!member) return
          if (Date.now() >= time) {
            if (config2.bot.Handler.Status.Mute.Role == true) {
            member.removeRole(muteRole);
          }
          if (config2.bot.Handler.Status.Mute.Message == true) {
            member.send(
              new RichEmbed()
                .setColor(colors)
                .setFooter(bot.user.username, bot.user.avatarURL)
                .setTimestamp()
                .setDescription(`Ваш мут прошёл на сервере \`${guild.name}\``)
            );
          }
            db.collection("mutes").deleteOne(
              { UserId: userid, GuildId: guildid },
              function(err, result) {
                if (err) return console.log(err);
              }
            );
          }
        });
      });
    }, config2.bot.Handler.Time.Mute);
    bot.setInterval(() => {
      if (config2.bot.Handler.Status.Напоминания.Status == false) return
      const collection = db.collection("напоминания");
      collection.find().toArray(function(err, results) {
        if (results[0] == undefined) return;
        results.forEach(e => {
          let time = e.Time;
          let reason = e.Reason;
          let userid = e.UserId;
          if (Date.now() >= time) {
            if (config2.bot.Handler.Status.Напоминания.Message == true) {
            bot.users.get(userid).send(
              new Discord.RichEmbed()
                .setColor(colors)
                .setAuthor("Напоминание!")
                .setDescription(`> ${reason}`)
                .setFooter(`Напоминание`)
            );
          }
            db.collection("напоминания").deleteOne({ UserId: userid }, function(
              err,
              result
            ) {
              if (err) return console.log(err);
            });
          }
        });
      });
    }, config2.bot.Handler.Time.Напоминания);
    bot.setInterval(() => {
      if (config2.bot.Handler.Status.Ban.Status == false) return
      const collection = db.collection("bans");
      collection.find().toArray(function(err, results) {
        if (results[0] == undefined) return;
        results.forEach(e => {
          let time = e.Time;
          let guildid = e.GuildId;
          let userid = e.UserId;
          if (Date.now() >= time) {
            if (config2.bot.Handler.Status.Ban.Unban == true) {
            bot.guilds.get(guildid).unban(userid);
          }
            db.collection("bans").deleteOne(
              { UserId: userid, GuildId: guildid },
              function(err, result) {
                if (err) return console.log(err);
              }
            );
          }
        });
      });
    }, config2.bot.Handler.Time.Ban);
  });
} catch (err) {
  console.log(err.stack);
}
