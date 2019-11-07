const { MessageLog } = require("../../botconfig.json");
module.exports.run = async (bot, message, args) => {
  try {
    if (!args[0]) return message.channel.send(`Укажите идею/баг/вопрос.`);
    message.channel.send(`Вы успешно отправили сообщение создателю бота.`)(
      bot.channels
        .get(MessageLog)
        .send(
          `Пришло сообщение от ${message.author.username}\n${args.join(" ")}`
        )
    );
  } catch (err) {
    console.log(err.stack);
  }
};
module.exports.command = {
  name: "message",
  DM: true,
  bot: true,
  owner: false
};
