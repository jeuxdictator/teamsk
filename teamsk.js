const Discord = require('discord.js')
const client = new Discord.Client()
//constantes

client.login(process.env.TOKEN)
//connexion du bot

client.on("ready", () => {
    console.log("connected")
    //un petit message pour la console, pour indiquer que le bot est co
    client.user.setPresence({
        game: { 
            name: `Les modifications apportées (Démarrage !)`,
            type: 'WATCHING' 
        },
        status: 'dnd' 
    })
    //statut discord 
    setTimeout(function(){
        client.user.setPresence({
            game: { 
                name: `Les membres de la SK_ ! || dev : Jéhèndé#3800`,
                type: 'WATCHING' 
            },
            status: 'dnd' 
        })},
    5000)
});



client.on(`message`, message =>{
    if(message.author.id === client.user.id) return 
    if(message.author.bot) return
    //anti botsception

    if(message.channel.type === "dm") return
    //anti dm
    if(message.guild.id !== "474693373287071745") return
    //anti boucles

    if(client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === message.channel.name).size !==0){ // si le salon du message existe dans la team de backup et que c'est un salon textuel 
        const embed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .addField(message.author.tag + " : ", message.content)
        .setTimestamp()
        .setFooter(client.user.tag +" - Jéhèndé#3800")
        .setAuthor("-", message.author.avatarURL)
        client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === message.channel.name).map(e => e.send(embed)) // envoier le message en embed
    }else{
        client.guilds.get("563771921812946964").createChannel(message.channel.name, 'text', [{ //créer le salon
            id: message.guild.id,
            deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
        }]).then(z =>{
            const embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .addField(message.author.tag + " : ", message.content)
            .setTimestamp()
            .setFooter(client.user.tag +" - Jéhèndé#3800")
            .setAuthor("-", message.author.avatarURL)
            z.send(embed) // envoier le message en embed
        })
        .catch(O_o => {}) // on annule toutes les erreures
    }
});
