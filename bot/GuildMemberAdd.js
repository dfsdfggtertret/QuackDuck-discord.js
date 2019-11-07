try {
  if(config2.bot.GuildMemberAdd.Status.GuildMemberAdd != true) return
  bot.on("guildMemberAdd", async member => {
    const collection = db.collection("MemberAdd");
    collection
      .find({ GuildId: member.guild.id })
      .toArray(function(err, results) {
        if (results[0] == undefined) return;
        var welcomemessage =
          results[0] == undefined ? undefined : results[0].welcomemessage;
        var dm = results[0] == undefined ? undefined : results[0].dm;
        const collection2 = db.collection("ChannelConfig");
        collection2
          .find({ GuildId: member.guild.id })
          .toArray(function(err, results) {
            var channel =
              results[0] == undefined ? undefined : results[0].channel;
            if (welcomemessage !== undefined && welcomemessage !== null) {
              if (channel == undefined && channel == null) return;
              if(config2.bot.GuildMemberAdd.Status.Message == true) {
              bot.channels
                .get(channel)
                .send(
                  welcomemessage
                    .replace("member", member)
                    .replace("guild", member.guild.name)
                );
            }
          }
            if (dm !== undefined && dm !== null) {
              if(config2.bot.GuildMemberAdd.Status.DM == true) {
              member.send(
                dm.replace(`guild`, member.guild.name).replace("member", member)
              );
            }
            }
          });
      });
  });
} catch (err) {
  console.log(err.stack);
}
