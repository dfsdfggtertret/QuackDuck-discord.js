const sa = require("superagent");
module.exports.run = async (client, message, args) => {
  try {
    var { body } = await sa.get(`https://aws.random.cat//meow`);
    message.channel.send(
      new Discord.RichEmbed().setColor(colors).setImage(body.file)
    );
  } catch (err) {
    message.channel.send(
      new Discord.RichEmbed().setColor("RED").addField(ERROR, err.message)
    );
    console.log(err.stack);
  }
};
module.exports.command = {
  name: "cat"
};
