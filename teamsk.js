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
            .addField(message.author.tag + " : ", message.content)
            .setTimestamp()
            .setFooter(client.user.tag +" - Jéhèndé#3800")
            .setAuthor("-", message.author.avatarURL)
            z.send(embed) // envoier le message en embed
        })
        .catch(O_o => {}) // on annule toutes les erreures
    }
});
client.on(`channelCreate`, channel =>{
    if(channel.guild.id !== "474693373287071745") return
    if(client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === channel.name).size === 0){
        client.guilds.get("563771921812946964").createChannel(channel.name, 'text', [{ //créer le salon
            id: channel.guild.id,
            deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
        }]).then(z =>{
            const createembed = new Discord.RichEmbed()
            .addField(channel.name + " : ", "Salon crée")
            .setTimestamp()
            .setFooter(client.user.tag +" - Jéhèndé#3800")
            z.send(createembed) // envoier le message en createembed
        })
        .catch(O_o => {}) // on annule toutes les erreures
    }else{
        const createembed = new Discord.RichEmbed()
        .addField(channel.name + " : ", "Salon crée")
        .setTimestamp()
        .setFooter(client.user.tag +" - Jéhèndé#3800")
        client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === channel.name).map(e => e.send(createembed)) // envoier le message en embed
    }
});
client.on(`channelDelete`, channel =>{
    if(channel.guild.id !== "474693373287071745") return
    if(client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === channel.name).size === 0){
        client.guilds.get("563771921812946964").createChannel(channel.name, 'text', [{ //créer le salon
            id: channel.guild.id,
            deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
        }]).then(z =>{
            const deleteembed = new Discord.RichEmbed()
            .addField(channel.name + " : ", "Salon supprimé")
            .setTimestamp()
            .setFooter(client.user.tag +" - Jéhèndé#3800")
            z.send(deleteembed) // envoier le message en deleteembed
        })
        .catch(O_o => {}) // on annule toutes les erreures
    }else{
        const deleteembed = new Discord.RichEmbed()
        .addField(channel.name + " : ", "Salon supprimé")
        .setTimestamp()
        .setFooter(client.user.tag +" - Jéhèndé#3800")
        client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === channel.name).map(e => e.send(deleteembed)) // envoier le message en embed
    }
});
client.on(`channelUpdate`, function(oldChannel, newChannel){
    if(oldChannel.guild.id !== "474693373287071745") return
    if(oldChannel.name === newChannel.name) return
    if(oldChannel.deleted) return
    if(newChannel.deleted) return
    if(client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === oldChannel.name).size === 0){
        client.guilds.get("563771921812946964").createChannel(newChannel.name, 'text', [{ //créer le salon
            id: newChannel.guild.id,
            deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
        }]).then(z =>{
            const renameembed = new Discord.RichEmbed()
            .addField(newChannel.name + " : ", "Salon renommé")
            .setTimestamp()
            .setFooter(client.user.tag +" - Jéhèndé#3800")
            z.send(renameembed) // envoier le message en deleteembed
        })
        .catch(O_o => {}) // on annule toutes les erreures
    }else{
        const renameembed = new Discord.RichEmbed()
        .addField(newChannel.name + " : ", "Salon renommé")
        .setTimestamp()
        .setFooter(client.user.tag +" - Jéhèndé#3800")
        client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === oldChannel.name).map(e => e.setName(`${newChannel.name}`).then(v => v.send(renameembed))) // envoier le message en embed
    }
});
