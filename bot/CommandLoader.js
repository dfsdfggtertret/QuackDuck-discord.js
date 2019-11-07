try {
  if(config2.bot.CommandLoader.Status.Status != true) return
  fs.readdirSync("./cmds").map(folder => {
    fs.readdirSync(`./cmds/${folder}/`)
      .filter(file => file.endsWith(".js"))
      .forEach(file => {
        if(config2.bot.CommandLoader.Status.SetName == true) {
        commands.set(
          require(`../cmds/${folder}/${file}`).command.name,
          require(`../cmds/${folder}/${file}`)
        );
      }
      if(config2.bot.CommandLoader.Status.SetЧС == true) {
        commands.set(
          require(`../cmds/${folder}/${file}`).command.ЧС,
          require(`../cmds/${folder}/${file}`)
        );
      }
      if(config2.bot.CommandLoader.Status.SetDM == true) {
        commands.set(
          require(`../cmds/${folder}/${file}`).command.DM,
          require(`../cmds/${folder}/${file}`)
        );
      }
      if(config2.bot.CommandLoader.Status.SetOwner == true) {
        commands.set(
          require(`../cmds/${folder}/${file}`).command.owner,
          require(`../cmds/${folder}/${file}`)
        );
      }
        console.log(`[COMMANDS] Загружен ${file}!`);
      });
  });
} catch (err) {
  console.log(err.stack);
}
