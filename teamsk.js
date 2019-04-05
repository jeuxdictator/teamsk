const Discord = require('discord.js')
const client = new Discord.Client()

client.login(process.env.TOKEN)

client.on("ready", () => {
    console.log("connected")
    client.user.setPresence({
        game: { 
            name: `Les membres de la SK_ ! || dev : Jéhèndé#3800`,
            type: 'WATCHING' 
        },
        status: 'dnd' 
    })
});



client.on(`message`, message =>{
    if(message.author.id === client.user.id) return 
    if(message.author.bot) return
    if(message.channel.type === "dm") return
    if(message.guild.id !== "474693373287071745") return
    console.log("111")

    if(client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === message.channel.name).size !==0){
        console.log("2")
        const embed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .addField(message.author.tag + " : ", message.content)
        .setTimestamp()
        .setFooter(client.user.tag +" - Jéhèndé#3800")
        .setAuthor("-", message.author.avatarURL)
        client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === message.channel.name).map(e => e.send(embed))
    }else{
        console.log("1")
        client.guilds.get("563771921812946964").createChannel(message.channel.name, 'text', [{
            id: message.guild.id,
            deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
        }]).then(z =>{
            const embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .addField(message.author.tag + " : ", message.content)
            .setTimestamp()
            .setFooter(client.user.tag +" - Jéhèndé#3800")
            .setAuthor("-", message.author.avatarURL)
            z.send(embed)
        })
        .catch(console.error);
    }
});
