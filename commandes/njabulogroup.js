const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const Taphere = more.repeat(4001)

zokou({ nomCom: "group-menu", categorie: "Menu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("Africa/Dar Es Salam");

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

let infoMsg =  `
💬ɴᴊᴀʙᴜʟᴏ ᴊʙ ɢʀᴏᴜᴘ ᴍᴇɴᴜ🔏 
╭━━══••══━━━╮ 
┃💬 *ᴡᴇʟᴄᴏᴍᴇ* 
┃🔏 *ɢᴏᴏᴅʙʏᴇ* 
┃🛸 *ᴀɴᴛɪᴘʀᴏᴍᴏᴛᴇ* 
┃🚀 *ᴀɴᴛɪᴅᴇᴍᴏᴛᴇ* 
┃📃 *ᴀᴅᴅ* 
┃📃 *ᴅɪsᴀᴘ-ᴏғғ* 
┃📜 *ᴅɪsᴀᴘ* 
┃💬 *ʀᴇᴊᴇᴄᴛ* 
┃🔏 *ᴀᴘᴘʀᴏᴠᴇ* 
┃🛸 *ᴠᴄғ* 
┃🚀 *ɪɴᴠɪᴛᴇ* 
┃📃 *ʀᴇᴠᴏᴋᴇ* 
┃📃 *ᴀɴᴛɪᴡᴏʀᴅ* 
┃📜 *ᴀɴᴛɪʟɪɴᴋ-ᴀʟʟ* 
┃💬 *ᴛᴀɢᴀʟʟ* 
┃🔏 *ʟɪɴᴋ* 
┃🛸 *ᴘʀᴏᴍᴏᴛᴇ* 
┃🚀 *ᴅᴇᴍᴏᴛᴇ* 
┃📃 *ʀᴇᴍᴏᴠᴇ* 
┃📃 *ᴅᴇʟ* 
┃📜 *ɪɴғᴏ* 
┃💬 *ᴀɴᴛɪʟɪɴᴋ* 
┃🔏 *ᴀɴᴛɪʙᴏᴛ* 
┃🛸 *ɢʀᴏᴜᴘ* 
┃🚀 *ɢɴᴀᴍᴇ* 
┃📃 *ɢᴅᴇsᴄ* 
┃📄 *ɢᴘᴘ* 
┃📜 *ᴛᴀɢ* 
┃💬 *ᴀᴜᴛᴏᴍᴜᴛᴇ* 
┃🔏 *ᴀᴜᴛᴏᴜɴᴍᴜᴛᴇ* 
┃🛸 *ғᴋɪᴄᴋ* 
┃🚀 *ɴsғᴡ* 
┃📃 *ǫᴜᴏᴛᴇ* 
┃📄 *ᴋɪᴄᴋᴀʟʟ* 
┃📜 *ᴏɴʟʏᴀᴅᴍɪɴ* 
┃💬 *ᴡᴀʀɴ*
╰━━══••══━━━┈╯`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *njabulojb*, déveloper Fredi Tech" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Njabulojb*, déveloper Fredie Tech" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
