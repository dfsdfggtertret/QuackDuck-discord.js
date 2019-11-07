exports.run = async(bot, message, args) => {
  function clean(text) {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8302))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  }
  try {
    var input = args.join(" ");
    let evalcode = eval(input);
    if (typeof evalcode !== "string")
      evalcode = require("util").inspect(evalcode);
    message.channel.send(
      new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .addField(`Input`, `\`\`\`js\n${input}\`\`\``)
        .addField(`Output`, `\`\`\`js\n${clean(evalcode)}\`\`\``)
        .addField(`Type`, `\`\`\`\n${typeof evalcode}\`\`\``)
        .setColor(colors)
    );
  } catch (e) {
    message.channel.send(
      new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .addField(`Error`, `\`\`\`js\n${clean(e)}\`\`\``)
        .setColor("RED")
    );
  }
};
exports.command = {
  name: "eval",
  DM: true,
  bot: false,
  owner: true
};
