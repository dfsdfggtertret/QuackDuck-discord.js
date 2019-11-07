module.exports.run = async (bot, message, args) => {
    if (!args[0]) return message.channel.send("Укажи название юзера!");
    if(args[0] == "pull") {
        if(message.author.id !== config.BotOwnerID) return
        message.channel.send('Выполняется...').then(msg => msg.edit(require('child_process').execSync("git pull origin master").toString('utf8') + ''))
        return
    }
    if(args[0] == "push") {
        if(message.author.id !== config.BotOwnerID) return
        message.channel.send('Выполняется...').then(msg => msg.edit(require('child_process').execSync("git push origin master").toString('utf8') + ''))
        return
    }
    require("node-fetch")(`https://api.github.com/users/${args[0]}`).then(res => res.json()).then(json => {
        if (!json.login) return
        let embed = new Discord.RichEmbed()
            .setColor(colors) // Замените на свой цвет.
            .setAuthor(args[0], json.avatar_url, json.html_url)
            .setDescription(`Имя: ${json.name ? json.name : "Не найдено."} | ${json.company ? json.company : "Компании нет."}\nБиография: ${json.bio ? json.bio : "Нет."}`)
            .addField('Статистика:', `Кол-во открытых репозиторий: ${json.public_repos} | Гистов: ${json.public_gists}\nПодписок: ${json.following} | Подписчиков: ${json.followers}`)
        if (json.blog) {
            embed.addField('_ _', `[Блог](${json.blog}) | [Ссылка на профиль](${json.html_url})`)
        }
        message.channel.send(embed)
    })
}
module.exports.command = {
    name: "github"
}
