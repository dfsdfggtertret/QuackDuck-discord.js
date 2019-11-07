Бот утка.Самый масштабный бот, который я сделал. 
Над его работой я потратил кучу времени и сил и я хочу выразить благодарности таким людям из Дискорда как:
- `cipherskyinc#0001`, помог с хостом.
- `ClintFlames?HELLo!#6675`, помогал разбираться в JavaScript.
- `! Zargovv#6666`, огромное спасибо за помощь работы с MongoDB и discore.js
- Также большое спасибо:
- `Digitalist#1456`, Администратор сервера.
- `[ p a l i z e t ]#4004`, за моральную поддержку и не только...
- `DigitalMon#3537`, за идеи для бота.
- `KOT_PILOT#4070`, за название бота, поддержку и кучу полезных идей.
- `ORPA [LΞTS]#9798`, `Гусь#6885` - За хорошие идеи.
- `Moon_Cat#0958`, предложил идею с мини-игрой, которую скоро **возможно** реализую.
- `whattheralsei#7821`, просто предложил интересную систему экономики. Обязательно в будущем реализую.
О людях поговорили, теперь о боте.
- Язык программирования: Node.JS
- База: MongoDB
- Модули: discord.js, fs, dotenv, discore.js, mongodb, superagent, strftime, ascii-art, canvas-constructor, moment
- Стандартный префикс: !
- Есть уровни за общение.
- Можно настраивать бота.
- Есть система голосовых комнат.
- Команды можно писать в ЛС.
# Ссылки.
- [GitHub.](https://github.com/DarkVessel/QuackDuck-discord.js)
- [Наш Discord сервер.](https://discord.gg/tVmcqFp)
- [Ссылка на приглашение бота.](https://discordapp.com/oauth2/authorize?client_id=558522292934541312&scope=bot&permissions=2146958847)
# Указание токена и настроек для подключения к базе.
Создайте файл ".env" и впишите туда: (Обязательно, без пробелов!)
```
TOKEN=ТокенБота
MongodbURL=URL для подключения к базе MongoDB
```
# Настройка бота.
В файл "botconfig.json" пишем:
```JSON
{
  "colors": "HTML код цвета.",
  "ServerID": "ID вашего сервера.",
  "ChannelsDM": "ID канала в котором будут присылаться сообщения которые написали в ЛС боту.",
  "ReactionChannelID": "ID канал в котором бот будет ставить реакции.",
  "ChannelLogsID": "ID канала логирования.",
  "DefaultPrefix": "Стандартный префикс.",
  "BotOwnerID": "ID создателя бота.",
  "BotURL": "URL для приглашения бота.",
  "MuteRoleName": "Название роли мута.",
  "ReportsChannelID": "ID роли куда будут присылаться репорты.",
  "MessageLog": "ID канала для идей бота.",
  "categoryID": "ID категории в котором будут создаваться голосовые комнаты.",
  "voiceID": "ID голосового канала в котором при заходе будет создаваться голосовая комната."
}
```
Скачайте и установите Node.JS

Для установки модулей запустите файл: `InstallModules.bat` (Только на Windows)

Для запуска бота запустите файл: `StartBot.bat` (Только на Windows)

В остальных случаях:
- Установка модулей: `npm i <Модуль> --save`
- Запуск бота: `node bot.js`
# Список команд.
- Бот: botinfo, config, eval, invite, invite_s, message, ping, say, stop.
- Вспомогательные: afk, avatar, helpDuck, personal, random, rankDuck, role, serverinfo, topserver, userinfo, напомни.
- Модераторские: ban, clear, kick, mute, report, unban, unmute.
- Мусор: PMSvote, TLvote, TMvote, TZvote, TerrariaByVote, hollowknightwiki, minecraftwiki, robloxwiki, terrariawiki.
- Фанатские: art, bunny, cat, dog, duck, duckvideo, fox, ship.
# Настройка базы.
Настройка базы не требуется, MongoDB сам создаст базы, коллекции и документы. Вам нужно только указать URL в файл ".env"
# Префикс.
Чтобы узнать префикс бота просто "пинганите" бота.
# Продолжение инструкции следует... (возможно)
Остальные инструкции есть в папках.
