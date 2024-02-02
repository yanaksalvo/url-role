const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

 
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
      status: "online",
      activity: { name: "", type: "WATCHING" },
    });
});

client.on("presenceUpdate", async (oldMember, newMember) => {
            const guild = oldMember.guild

            if (!oldMember || !newMember) return;
            if(oldMember.status !== newMember.status) return
            const roleId = config.roleId;
            const message = config.message;
            const role = guild.roles.cache.get(roleId)
            if (!role || role.deleted) return;
            let status = newMember.activities.map(a => a.state)
            const member = guild.members.cache.get(newMember.user.id);
            if (!member) return;
            if (status[0] && status[0].includes(message)) {
                member.roles.add(roleId, 'SALVO')
                     const embed = new Discord.MessageEmbed()
                    .setTitle(`Url Aldı`)
                    .setColor(`#2F3136`)
                    .setFooter(`1943`)
                    .setDescription(`\`${member.user.tag}\` Url aldı \`${role.name}\``)
                    client.channels.cache.get(config.logs).send(embed)
            } else {
                if (member.roles.cache.some((r) => r.id === roleId)) {
                    const embed = new Discord.MessageEmbed()
                    .setTitle(`Url kaldırdı`)
                    .setColor(`#2F3136`)
                    .setFooter(`SALVO`)
                    .setDescription(`\`${role.name}\` Rolü kaldırıldı \`${member.user.tag}\``)
                    client.channels.cache.get(config.logs).send(embed)
                    member.roles.remove(roleId, '1943')
                }
              }

        
});  

client.login(config.TOKEN);