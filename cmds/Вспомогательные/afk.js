const { RichEmbed } = require("discord.js");
module.exports.run = (bot, msg, args) => {
  try {
    if (msg.channel.type != "dm") msg.delete();

    let reason = args.join(" ");
    const collection = db.collection("afk");
    let users2 = [{ UserId: msg.author.id, reason: !reason ? null : reason }];
    collection.insertMany(users2, function(err, results) {
      console.log("Внёс.");
    });
    msg.channel.send(
      new RichEmbed()
        .setColor(colors)
        .setDescription(
          `☪️ | **${
            !msg.guild
              ? "Вы были помечены"
              : `Участник ${msg.author} был помечен`
          } как \ AFK\** ${reason ? `\n\`Причина: ${reason}\`` : ""}`
        )
    );
  } catch (err) {
    msg.channel.send(
      new Discord.RichEmbed().setColor("RED").addField(ERROR, err.message)
    );
    console.log(err.stack);
  }
};

module.exports.command = {
  name: "afk",
};
