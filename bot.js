const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Receive requests that leave you online (Recebe solicitações que o deixa online).

const Discord = require("discord.js"); // Connection to Discord.js bookstore (Conexão com a livraria Discord.js)
const client = new Discord.Client(); //Client Creation of a new one (Criação de um novo Client)
const config = require("./config.json"); // Getting the bot prefix for command responses (Pegando o prefixo do bot para respostas de comandos)


client.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

   const args = message.content
       .trim().slice(config.prefix.length) 
       .split(/ +/g);
   const command = args.shift().toLowerCase();

   try {
       const commandFile = require(`./commands/${command}.js`)
       commandFile.run(client, message, args);
   } catch (err) {
   console.error('Erro:' + err);
 }
});

client.on("ready", () => 
  let activities = [
      `discord status of your bot (discord status do seu bot)`,
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "PLAYING, LISTENING, WATCHING, STREAMING "
      }), 1000 * 60); 
  client.user
      .setStatus("on")
      .catch(console.error); 
console.log("Estou Online!")
});



client.login(process.env.TOKEN); //Turning on the Bot if he can access the token (ligando o bot caso ele consigo acessar o token)
