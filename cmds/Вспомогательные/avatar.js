const { RichEmbed } = require("discord.js"); // RichEmbed - конструктор "Имбедов"
module.exports.run = (bot, msg, args) => {
  try {
    let User = msg.guild.member(
          msg.mentions.users.first() || msg.guild.members.get(args[0])
        )// Переменная user присваивает себе первого "пинганутого" пользователя.

    msg.channel.send(
      new RichEmbed()
        .setColor(colors) // Ставим цвет для нашего сообщения
        .setDescription((!User) ? msg.author.tag : User.user.tag) // Описание для нашего сообщения, в данном случае пишем туда дискорд-тег пользователя
        .setImage(
          `${(!User) ? msg.author.displayAvatarURL : User.user.displayAvatarURL}?size=2048`
        ) // Достали URL аватарки пользователя, потом добавили ?size=2048 к ссылке на аватар пользователя, чтобы получить лучшее качество картинки.
    );
  } catch (err) {
    msg.channel.send(
      new Discord.RichEmbed().setColor("RED").addField(ERROR, err.message)
    );
    console.log(err.stack);
  }
};
module.exports.command = {
  name: "avatar"
};
