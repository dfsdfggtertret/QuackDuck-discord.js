const { RichEmbed } = require("discord.js");
const { BotOwnerID, Page, MuteRoleName } = require("../../botconfig.json");
module.exports.run = (bot, message, args) => {
  try {
    const collection = db.collection("prefix");
    collection
      .find({ GuildId: !message.guild ? 0 : message.guild.id })
      .toArray(function(err, results) {
        let prefix =
          results[0] == undefined ? DefaultPrefix : results[0].Prefix;
        var args1 = message.content.toLowerCase().split(" ");

        /*  var helpmsg = `
💭 **Мои стандартные команды:**
☪️ \`${prefix}afk <Причина>\` - Данная команда даёт знать что вы в AFK ️состоянии.
Каждый раз когда вас будут пинговать, бот будет сообщать что вы в AFK.
Пример: \`${prefix}afk Ушёл кушать\`.
📊 \`${prefix}rankDuck\` - Проверить свой ранг.
📸 \`${prefix}avatar <@Участник>\` - Показывает ваш аватар или аватар участника.
⏱ \`${prefix}ping\` - Узнать задержку бота.
📩 \`${prefix}invite\` - Выслать ссылку на приглашение этого бота.
📄 \`${prefix}userinfo\` - Показать ваш профиль.
📄 \`${prefix}personal\` - Указать свою информацию.
📜 \`${prefix}serverinfo\` - Показать информацию о сервере.
🤖 \`${prefix}botinfo\` - Показать информацию о сервере.
🌍 \`${prefix}topserver\` - Топ 10 серверов по участникам!
📸 **Развлекательные команды:**
🐱 \`${prefix}cat\` - Рандомное изображение кошки.
🐶 \`${prefix}dog\` - Рандомное изображение собаки.
🦊 \`${prefix}fox\` - Рандомное изображение лисы.
🐰 \`${prefix}bunny\` - Рандомное изображение кролика.
🦆 \`${prefix}duck\` - Рандомное изображение утки.
🔰 **Команды для Модераторов:**
🔰 \`${prefix}ban <@Участник> <Причина>\` - Забанить участника.
🔰 \`${prefix}unban <ID Участника>\` - Разбанить участника.
🗑 \`${prefix}clear <Количество>\` - Массовое удаление сообщений.
👉🏼 \`${prefix}kick <@Участник> <Причина>\` - Кикнуть участника.
📛 \`${prefix}mute <@Участник> <Время в секундах> <Причина>\` - Заблокировать участника в чате.
✅ \`${prefix}unmute <@Участник>\` - Разблокировать участника.
🛠 \`${prefix}config\` - Настройка бота.
  `;

 // var help = `💭 **Мои стандартные команды:**\n☪️ \`${prefix}afk <Причина>\` - Данная команда даёт знать что вы в AFK ️состоянии. Каждый раз когда вас будут пинговать, бот будет сообщать что вы в AFK. Пример: \`${prefix}afk Ушёл кушать\`.\n📊 \`${prefix}rankDuck\` - Проверить свой ранг.\n📸 \`${prefix}avatar <@Участник>\` - Показывает ваш аватар или аватар участника.\n⏱ \`${prefix}ping\` - Узнать задержку бота.\n📩 \`${prefix}invite\` - Выслать ссылку на приглашение этого бота.\n📄 \`${prefix}userinfo\` - Показать ваш профиль.\n📄 \`${prefix}personal\` - Указать свою информацию.\n📜 \`${prefix}serverinfo\` - Показать информацию о сервере.\n🤖 \`${prefix}botinfo\` - Показать информацию о сервере.\n🌍 \`${prefix}topserver\` - Топ 10 серверов по участникам!\n📸 **Развлекательные команды:**\n🐱 \`${prefix}cat\` - Рандомное изображение кошки.\n🐶 \`${prefix}dog\` - Рандомное изображение собаки.\n🦊 \`${prefix}fox\` - Рандомное изображение лисы.\n🐰 \`${prefix}bunny\` - Рандомное изображение кролика.\n🦆 \`${prefix}duck\` - Рандомное изображение утки.\n❓ \`${prefix}QuackDuck\` - Задать вопросу боту, но cкорее всего он не ответит =/\n🙌 \`${prefix}hug\` - Обнять кого-нибуть.\n✊ \`${prefix}punch\` - Ударить кого-нибуть\n👼 \`${prefix}kiss\` - Поцеловать кого-нибуть.\n💀 \`${prefix}kill\` - **УБИТЬ уЧаСТниКА...**(по нарошку)\n🔰 **Команды для Модераторов:**\n🔰 \`${prefix}ban <@Участник> <Причина>\` - Забанить участника.\n'🔰 \`${prefix}unban <ID УЧАСТНИКА>\` - Разбанить участника.\n🗑 \`${prefix}clear <Количество>\` - Массовое удаление сообщений.\n👉🏼 \`${prefix}kick <@Участник> <Причина>\` - Кикнуть участника.\n📛 \`${prefix}mute <@Участник> <Время в секундах> <Причина>\` - Заблокировать участника в чате.\n✅ \`${prefix}unmute <@Участник>\` - Разблокировать участника.\n🔐 \`${prefix}lockdown <Время>\` - Заглушить канал на определённое время.Пример использования: \`${prefix}lockdown 5m\`\n🛠 \`${prefix}config\` - Настройка бота.`;

  msg.channel.send(new RichEmbed()
    .setTitle(`🦆 **Список всех моих команд!**`)
    .setFooter("QuackDuck Оператор", bot.user.avatarURL)
    .setDescription(helpmsg)
    .setColor(colors)
    .setTimestamp());
*/
        let embed1 = `Добро пожаловать в справочник.\nИспользуйте ⏪ ⏩ для переключения по страницам.`;
        let embed2 = `💭 **Мои стандартные команды:**
      ☪️ \`${prefix}afk <Причина>\` - Данная команда даёт знать что вы в AFK ️состоянии.
      Каждый раз когда вас будут пинговать, бот будет сообщать что вы в AFK.
      Пример: \`${prefix}afk Ушёл кушать\`.
      📊 \`${prefix}rankDuck\` - Проверить свой ранг(картинка).
      📊 \`${prefix}rankDuckText\` - Проверить свой ранг, но уже в текстовом виде..
      📸 \`${prefix}avatar <@Участник>\` - Показывает ваш аватар или аватар участника.
      ⏱ \`${prefix}ping\` - Узнать задержку бота.
      📩 \`${prefix}invite\` - Выслать ссылку на приглашение этого бота.
      📄 \`${prefix}userinfo\` - Показать ваш профиль.
      📄 \`${prefix}personal\` - Указать о себе информацию.
      📜 \`${prefix}serverinfo\` - Показать информацию о сервере.
      🤖 \`${prefix}botinfo\` - Показать информацию о боте.
      🌍 \`${prefix}topserver\` - Топ серверов по участникам!`;
        let embed3 = `📸 **Развлекательные команды:**
      🐱 \`${prefix}cat\` - Рандомное изображение кошки.
      🐶 \`${prefix}dog\` - Рандомное изображение собаки.
      🦊 \`${prefix}fox\` - Рандомное изображение лисы.
      🐰 \`${prefix}bunny\` - Рандомное изображение кролика.
      🦆 \`${prefix}duck\` - Рандомное изображение утки.`;
        let embed4 = `🔰 **Команды для Модераторов:**
      🔰 \`${prefix}ban <@Участник> <Время> <Причина>\` - Забанить участника. (если хотите забанить навечно не указывайте время)
      🔰 \`${prefix}unban <ID Участника>\` - Разбанить участника.
      🗑 \`${prefix}clear <Количество>\` - Массовое удаление сообщений(до 100).
      👉🏼 \`${prefix}kick <@Участник> <Причина>\` - Кикнуть участника.
      📛 \`${prefix}mute <@Участник> <Время в секундах> <Причина>\` - Заблокировать участника в чате.
      ✅ \`${prefix}unmute <@Участник>\` - Разблокировать участника.
      🛠 \`${prefix}config\` - Настройка бота.`;
        let embed5 = `Информация о боте.
      - Язык программирования: \`Node.JS\`
      - База: \`MongoDB\`, \`JSON\`, \`sqilte\`
      - Модули: \`discord.js\`, \`fs\`, \`dotenv\`, \`discore.js\`, \`mongodb\`, \`superagent\`, \`strftime\`, \`ascii-art\`, \`canvas-constructor\`, \`moment\`, \`os\`
      - Стандартный префикс: \`${DefaultPrefix}\`
      - Задержкка API: ${bot.ping}
      - Есть уровни за общение.`;
        let embed6 = `GitHub: https://github.com/DarkVessel/QuackDuck-discord.js`;
        let embed7 = `Уровни за общение.
      Когда вы общаетесь, вы получаете XP.
Когда набираете достаточное количество XP, вы получаете уровень. (Боты не могут иметь уровень)
После каждого уровня получать новые уровни всё сложнее и сложнее, так как требуется всё больше и больше XP для этого.
Сделано это с целью предотвращения чрезмерного фарма, дабы в самый день не получить 120 уровень.
Уровни локальные, то есть у каждого сервера у вас свой уровень будет, а не общий.`;
        let embed8 = `Дальше будут информации о командах.
      Если остались вопросы воспользуйтесь командой: \`${prefix}message\`
      Также чтобы узнать мой префикс можно просто упомянуть меня.
      Удачи!`;
        let embed9 = `Команда \`${prefix}afk\`
      Причину не обязательно указывать.
      Имейте в виду.`;
        let embed10 = `Команда \`${prefix}rankDuck\`
      Позволяет просмотреть какой у вас уровень, сколько XP и сколько ещё нужно XP до уровня.
      Если у вас плохой интернет и у вас не грузится картинка вы можете воспользоваться: \`${prefix}rankDuckText\`
      В скором времени возможно сделаю в графическом виде.`;
        let embed11 = `Команда \`${prefix}avatar\`
      Показывает аватар пользователя в лучшем качестве.
      Для того чтобы просмотреть свой аватар не обязательно упоминать себя.`;
        let embed12 = `Команда \`${prefix}ping\`
      Позволяет узнать задержку API и саму задержку бота при выполнение операции.`;
        let embed13 = `Команда \`${prefix}invite\`
      Кидает инвайт-ссылку на этого бота, где вы можете его пригласить себе на сервер и выдать определённые права.`;
        let embed14 = `Команда \`${prefix}userinfo\`
      Просмотреть информацию о пользователе.
      Когда создал аккаунт, когда присоединился и так далее.`;
        let embed15 = `Команда \`${prefix}personal\`
      Позволяет указать о себе информацию, которая потом будет отображаться в: \`${prefix}userinfo\`
      Ограничение: 500 символов.`;
        let embed16 = `Команда \`${prefix}serverinfo\`
      Позволяет узнать информацию о сервере, его ID, создатель, каналы и так далее.`;
        let embed17 = `Команда \`${prefix}botinfo\`
      Мои характеристики, версия и так далее.`;
        let embed18 = `Команда \`${prefix}topserver\`
      Узнать топ сервера по участникам, на которых есть бот.`;
        let embed19 = `Развлекательные команды по типу \`${prefix}cat\`, \`${prefix}dog\`, \`${prefix}fox\`, \`${prefix}bunny\`, \`${prefix}duck\`
      Эти команды позволяют получить рандомное изображение чего-либо.
      Стоит помнить что изображения не бесконечны и возможны повторы.`;
        let embed20 = `Команда \`${prefix}ban\`
      Позволяет забанить пользователя как и на время, так и на вечно.
      Постарался сделать команду максимально удобным, то есть вы можете просто указать время, или можете просто указать причину. Бот сам поймёт что вам надо.
      Также в случае если вы допустили ошибку, вы можете её исправить так как перед тем как забанить бот попросит проверить данные.
      Пример команды: \`${prefix}ban @Участник 5m Тест\`
      Где \`5m\` на конце можно поставить другую букву.
      Поддерживаются:
      \`5s\` - Секунды.
      \`5m\` - Минуты.
      \`5h\` - Часы.
      \`5d\` - Дни.
      \`5w\` - Недели.
      \`5y\` - Годы.`;
        let embed21 = `Команда \`${prefix}unban\`
      Позволяет разбанить пользователя.
      Можно разбанить по его ID, тегу и нику.
      Пример: \`${prefix}unban Участник#Тег\`
      Также необязательно разбанивать через бота, можно просто через настройки сервера Дискорда.`;
        let embed22 = `Команда \`${prefix}clear\`
      Позволяет массово удалить до 100 сообщений.
      Почему до 100?
      Это связано с ограничениями Дискорда, мы тут не при делах.`;
        let embed23 = `Команда \`${prefix}kick\`
      Позволяет кикнуть(выгнать) участника.
      Думаю объяснять не надо.`;
        let embed24 = `Команда \`${prefix}mute\`
      Работает почти точно также как и \`${prefix}ban\`(страница 20)
      Отличие только в том что вместо бана выдаётся специальная роль(${MuteRoleName}) которая не даёт возможность писать.
      **ВНИМАНИЕ! РОЛЬ НУЖНО НАСТРАИВАТЬ, ТО ЕСТЬ КАЖДЫЙ КАНАЛ НАСТРОИТЬ ПОД ЭТУ РОЛЬ!**`;
        let embed25 = `Команда \`${prefix}unmute\`
      Позволяет снять роль мута у участника.`;
        let embed26 = `Команда \`${prefix}config\`
      Позволяет настроить бота под ваш сервер. Добавить Авто-Роль, приветствие, прощание, изменить префикс и так далее.
      Пропишите \`${prefix}config help\` для помощи.`;
        let page = 1;
        let Страниц = 26;
        const embed = new RichEmbed()
          .setColor(colors)
          .setFooter(`Страница ${page} из ${Страниц}`)
          .setDescription(
            `Добро пожаловать в справочник.\nИспользуйте ⏪ ⏩ для переключения по страницам.`
          )
          .setTimestamp();
        message.channel.send(embed).then(msg => {
          msg.react("⏪").then(r => {
            msg.react("⏩");
            const backwardsFilter = (reaction, user) =>
              reaction.emoji.name === "⏪" && user.id === message.author.id;
            const forwardsFilter = (reaction, user) =>
              reaction.emoji.name === "⏩" && user.id === message.author.id;
            const backwards = msg.createReactionCollector(backwardsFilter);
            const forwards = msg.createReactionCollector(forwardsFilter);
            backwards.on("collect", r => {
              if (message.channel.type !== "dm") {
                msg.reactions.forEach(e => e.remove(message.author.id));
              }
              if (page === 1) return;
              page--;
              if (page == 1) {
                embed.setDescription(embed1);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 2) {
                embed.setDescription(embed2);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 3) {
                embed.setDescription(embed3);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 4) {
                embed.setDescription(embed4);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 5) {
                embed.setDescription(embed5);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 6) {
                embed.setDescription(embed6);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 7) {
                embed.setDescription(embed7);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 8) {
                embed.setDescription(embed8);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 9) {
                embed.setDescription(embed9);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 10) {
                embed.setDescription(embed10);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 11) {
                embed.setDescription(embed11);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 12) {
                embed.setDescription(embed12);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 13) {
                embed.setDescription(embed13);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 14) {
                embed.setDescription(embed14);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 15) {
                embed.setDescription(embed15);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 16) {
                embed.setDescription(embed16);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 17) {
                embed.setDescription(embed17);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 18) {
                embed.setDescription(embed18);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 19) {
                embed.setDescription(embed19);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 20) {
                embed.setDescription(embed20);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 21) {
                embed.setDescription(embed21);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 22) {
                embed.setDescription(embed22);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 23) {
                embed.setDescription(embed23);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 24) {
                embed.setDescription(embed24);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 25) {
                embed.setDescription(embed25);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 26) {
                embed.setDescription(embed26);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
            });
            forwards.on("collect", r => {
              if (message.channel.type !== "dm") {
                msg.reactions.forEach(e => e.remove(message.author.id));
              }
              if (page === Страниц) return;
              page++;
              if (page == 1) {
                embed.setDescription(embed1);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 2) {
                embed.setDescription(embed2);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 3) {
                embed.setDescription(embed3);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 4) {
                embed.setDescription(embed4);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 5) {
                embed.setDescription(embed5);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 6) {
                embed.setDescription(embed6);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 7) {
                embed.setDescription(embed7);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 8) {
                embed.setDescription(embed8);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 9) {
                embed.setDescription(embed9);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 10) {
                embed.setDescription(embed10);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 11) {
                embed.setDescription(embed11);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 12) {
                embed.setDescription(embed12);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 13) {
                embed.setDescription(embed13);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 14) {
                embed.setDescription(embed14);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 15) {
                embed.setDescription(embed15);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 16) {
                embed.setDescription(embed16);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 17) {
                embed.setDescription(embed17);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 18) {
                embed.setDescription(embed18);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 19) {
                embed.setDescription(embed19);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 20) {
                embed.setDescription(embed20);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 21) {
                embed.setDescription(embed21);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 22) {
                embed.setDescription(embed22);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 23) {
                embed.setDescription(embed23);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 24) {
                embed.setDescription(embed24);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 25) {
                embed.setDescription(embed25);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
              if (page == 26) {
                embed.setDescription(embed26);
                embed.setFooter(`Страница ${page} из ${Страниц}`);
                msg.edit(embed).then(msg => {
                  msg.react("⏪");
                  msg.react("⏩");
                  return;
                });
              }
            });
          });
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
  name: "helpduck"
};
