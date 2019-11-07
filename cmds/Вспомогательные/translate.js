const translate = require("translate");
translate.engine = "yandex";
translate.key = process.env.TranslateAPI;
module.exports.run = async (bot, message, args) => {
  var args1 = message.content.toLowerCase().split(/ +/g);
  let RU = ["ru", "русский", "russian"];
  let EN = ["en", "английский", "english"];
  let Text = args.slice(1).join(" ");
  if (!args[0])
    return message.channel.send("Напиши с какого языка переводить (ru, en)");
  if(!Text) return message.channel.send("Укажите текст для перевода!")
  if (args1.some(a => RU.find(word => word == a))) {
    translate(Text, { from: "ru", to: "en" }).then(text => {
      message.channel.send(
      new Discord.RichEmbed()
      .setColor(colors)
      .addField("Перевод с русского на английского:", text)
      )
    });
    return
  }
  if (args1.some(a => EN.find(word => word == a))) {
    translate(Text, { from: "en", to: "ru" }).then(text => {
      message.channel.send(
      new Discord.RichEmbed()
      .setColor(colors)
      .addField("Перевод с английского на русский:", text)
      )
    });
    return
  }
  message.channel.send("Я не понял команду!")
};
module.exports.command = {
  name: "translate"
};
