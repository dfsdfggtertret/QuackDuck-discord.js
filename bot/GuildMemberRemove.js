try{
  if(config2.bot.GuildMemberRemove.Status.Status != true) return
  bot.on("guildMemberRemove", async member => {
  const collection = db.collection("MemberRemove");
  collection.find({ GuildId: member.guild.id }).toArray(function(err, results) {
    if (results[0] == undefined) return;
    var leavemessage =
      results[0] == undefined ? undefined : results[0].leavemessage;
    const collection2 = db.collection("ChannelConfig");
    collection2
      .find({ GuildId: member.guild.id })
      .toArray(function(err, results) {
        if (results[0] == undefined) return;
        var channel = results[0] == undefined ? undefined : results[0].channel;
        if (leavemessage !== undefined && leavemessage !== null) {
          if (channel == undefined && channel == null) return;
          if(config2.bot.GuildMemberRemove.Status.Message == true) {
          bot.channels
            .get(channel)
            .send(
              leavemessage
              .replace(`guild`, member.guild.name)
              .replace("member", member.user.tag)
            );
        }
      }
      });
  });
});
} catch (err) {
  console.log(err.stack);
}
