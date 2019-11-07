try{
  if(config2.bot.DM.Status != true) return
bot.on("message", async message => {
  if(config2.bot.DM.OwnerIgnor == true) {
  if(message.author.id == config2.index.BotOwnerID) return
}
  if (message.channel.type === "dm") {
    bot.channels.get(config2.bot.DM.Channel).send(`${message.author} - ${message.author.id} - ${message.author.username}\n${message.content}`);
    return;
  }
});
} catch(err) {
  console.log(err.stack)
}
