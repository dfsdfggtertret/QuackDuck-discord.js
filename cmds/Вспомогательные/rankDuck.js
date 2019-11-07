const Discord = require("discord.js");
const { Canvas } = require("canvas-constructor");
const fetch = require("node-fetch");
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
        const imageUrlRegex = /\?size=2048$/g;
        const result = await fetch(
          rUser.user.displayAvatarURL.replace(imageUrlRegex, "?size=128")
        );
        if (!result.ok) throw new Error("Failed to get the avatar.");
        const avatar = await result.buffer();
        const name =
          rUser.user.username.length > 20
            ? rUser.user.substring(0, 17) + "..."
            : rUser.user.username;
        collection
          .find({ GuildId: message.guild.id, UserId: rUser.id })
          .toArray(async function(err, results) {
            let Level = results[0] == undefined ? undefined : results[0].level;
            let Xp = results[0] == undefined ? 0 : results[0].xp;
            let Maxs = results[0] == undefined ? "???" : results[0].maxs;
            function Buffer(Levell, Xpp, Maxss, TOP, Процентыы) {
              let buffer = new Canvas(400, 180)
                .setColor("#adff2f")
                .addRect(84, 0, 316, 180)
                .setColor("#2C2F33")
                .addRect(0, 0, 84, 180)
                .addRect(169, 26, 231, 46)
                .addRect(224, 108, 176, 46)
                .setColor("#2C2F33")
                .addRect(0, 0, 84, 180)
                .addRect(169, 26, 231, 46)
                .addRect(224, 108, 176, 46)
                .setShadowColor("rgba(22, 22, 22, 1)")
                .setShadowOffsetY(5)
                .setShadowBlur(10)
                .addCircle(84, 90, 62)
                .addCircularImage(avatar, 84, 90, 62)
                .save()
                .createBeveledClip(20, 138, 128, 32, 5)
                .setColor("#23272A")
                .fill()
                .restore()
                .setTextAlign("center")
                .setTextFont("10pt Discord")
                .setColor("#FFFFFF")
                .addText(`${name} [ TOP: ${TOP} ]`, 285, 54)
                .addText(`Level: ${Levell}`, 84, 159)
                .setTextAlign("left")
                .addText(`XP: ${Xpp}/${Maxss} [ ${Процентыы}% ]`, 241, 136);
              let att = new Discord.Attachment(buffer.toBuffer());
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
  name: "rankduck",
  DM: false,
  bot: false
};
