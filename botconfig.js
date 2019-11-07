module.exports.index = {
  ERROR: "Упс, произошла ошибка D:\nСкорее всего разработчик бота где-то допустил ошибку, чтобы сообщить об этом создателю, напишите в ЛС мне !message",
  ServerID: "546736610209955850",
  colors: "#FFFF00",
  DefaultPrefix: "!",
  BotOwnerID: "517331770656686080",
  BotOwnersID: ["517331770656686080", "483649025799880704", "178404926869733376", "418712700848439318"],
  MuteRoleName: "DuckMuted"
}
module.exports.bot = {
  VoiceRoom: {
    categoryID: "631917636535713792",
    voiceID: "631917890458615808",
    AuthorBot: true,
    Status: true
  },
  Status: {
    ChannelsID: "612324441363578902",
    MessageID: "612324541972348929",
    Time: 30000,
    Status: true
  },
  Reaction: {
    Channel: "552594486463561729",
    React: ["👍", "👎"],
    AuthorBot: true,
    Status: true
  },
  Message: {
    Status: true
  },
  Logs: {
    Channel: "552550888460386307",
    AuthorBot: {
      Delete: false,
      Update: false
    },
    Status: {
      Delete: true,
      Update: true
    }
  },
  Login: {
    SetPresence: function() {
        bot.user.setPresence({
          game: { type: 0, name: `🦆УТКОМАНИЮ🦆┇${DefaultPrefix}helpDuck` }
        });
      },
      BaseName: "QuackDuck",
      Status: {
        Base: true,
        Bot: true,
        StatusBot: true
      }
  },
  Levels: {
    AddXp: Math.floor(Math.random() * 6) + 5,
    AddMaxs: Math.floor(Math.random() * 51) + 50,
    AuthorBot: false,
    Status: {
      Status: true,
      DuckCoins: true,
      RoleLevels: true,
      Message: true
    }
  },
  Handler: {
    Time: {
      Mute: 5000,
      Напоминания: 5000,
      Ban: 5000
    },
    Status: {
      Mute: {
        Status: true,
        Role: true,
        Message: true
      },
      Напоминания: {
        Status: true,
        Message: true
      },
      Ban: {
        Status: true,
        Unban: true
      }
    }
  },
  GuildMemberRemove: {
    Status: {
      Status: true,
      Message: true
    }
  },
  GuildMemberAdd: {
    Status: {
      GuildMemberAddRole: true,
      GuildMemberAdd: true,
      Role: true,
      DM: true,
      Message: true
    }
  },
  DM: {
    Status: true,
    Channel: "605391844058333185",
    OwnerIgnor: true
  },
  CommandLoader: {
    Status: {
      Status: true,
      SetName: true,
      SetЧС: true,
      SetDM: true,
      SetOwner: true
    }
  },
  CommandHandler: {
    Status: {
      Status: true,
      Ping: {
        AuthorBot: false,
        Status: true
      },
      ЧС: true,
      DM: true,
      Owner: true
    },
    MessageContent: "🚫 | **Данная команда недоступна в ЛС!**"
  },
  Afk: {
    Status: true,
    AuthorBot: false
  }
}
