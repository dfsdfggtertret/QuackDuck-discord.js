const Minesweeper = require('discord.js-minesweeper'),
  Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
const rows = parseInt(args[0]);
    const columns = parseInt(args[1]);
    if (!args[0]) return message.channel.send('Укажите количество строк.');
    if (!args[1]) return message.channel.send('Пожалуйста, укажите количество столбцов.');
    if(isNaN(args[0]) || isNaN(args[1])) return message.channel.send('Введите валидное число');
    const minesweeper = new Minesweeper({ rows, columns });
    const matrix = minesweeper.start();
    let embed = new Discord.RichEmbed()
      .setColor(colors)
      .setAuthor(`Сапёр был создан.`)
      .setDescription(matrix)
    return matrix
      ? message.channel.send(embed)
      : message.channel.send('Вы предоставили неверные данные.');
}
module.exports.command = {
    name: 'сапёр',
  }
