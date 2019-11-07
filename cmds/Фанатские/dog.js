const sa = require("superagent");
exports.run = async (client, message, args) => {
  try {
    var { body } = await sa.get(`https://random.dog/woof.json`);
    message.channel.send(
      new Discord.RichEmbed().setColor(colors).setImage(body.url)
    );
  } catch (err) {
    message.channel.send(
      new Discord.RichEmbed().setColor("RED").addField(ERROR, err.message)
    );
    console.log(err.stack);
  }
};
exports.command = {
  name: "dog"
};
