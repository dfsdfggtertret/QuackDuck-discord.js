const sa = require("superagent");
module.exports.run = async (client, message, args) => {
  try {
    var result = Math.floor(Math.random() * 164);
    message.channel.send(
      new Discord.RichEmbed()
        .setColor(colors)
        .setImage(`https://bunnies.media/poster/${result}.png`)
    );
  } catch (err) {
    message.channel.send(
      new Discord.RichEmbed().setColor("RED").addField(ERROR, err.message)
    );
    console.log(err.stack);
  }
};
module.exports.command = {
  name: "bunny"
};
