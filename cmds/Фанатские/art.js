const ascii = require("ascii-art");
module.exports.run = async (bot, message, args) => {
  try {
    if (!args.join(" "))
      return message.channel.send("Я конечно художник, но....укажи текст!");
    ascii.font(args.join(" "), "Doom", async txt => {
      message.channel.send(txt, {
        code: "md"
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
  name: "art"
};
