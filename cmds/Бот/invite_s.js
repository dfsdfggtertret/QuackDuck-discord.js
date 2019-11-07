module.exports.run = async (bot, message, args) => {
  let guild = bot.guilds.get(args[0]);

  if (!guild)
    return message.reply("Бот не находится на сервере с указанным ID.");
  guild
    .fetchInvites()
    .then(invites =>
      message.channel.send(
        "Найдено приглашений:\n " +
          "https://discordapp.com/invite/" +
          invites.map(invite => invite.code).join("\n")
      )
    )
    .catch(console.error);
};

module.exports.command = {
  name: "invite_s",
  aliases: [],
  bot: false,
  owner: true,
  DM: true
};
