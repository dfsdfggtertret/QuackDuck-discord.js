try{
if(config2.bot.Reaction.Status == false) return
bot.on("message", async message => {
if(message.channel.id != config2.bot.Reaction.Channel) return
if(config2.bot.Reaction.AuthorBot == false) {
if(message.author.bot) return
}
  config2.bot.Reaction.React.forEach(async e => {
await message.react(e)
})
})
} catch (err) {
  console.log(err.stack);
}
