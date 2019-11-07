try {
  if(config2.bot.GuildMemberAdd.Status.GuildMemberAddRole != true) return
  bot.on("guildMemberAdd", async member => {
    const collection = db.collection("MemberAddRole");
    collection
      .find({ GuildId: member.guild.id })
      .toArray(async function(err, results) {
        results.forEach(e => {
          if(config2.bot.GuildMemberAdd.Status.Role == true) {
          member.addRole(e.role);
        }
        });
      });
  });
} catch (err) {
  console.log(err.stack);
}
