const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

zokou({ nomCom: "help", categorie: "update" }, async (dest, zk, commandeOptions) => {
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

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
  ╭──━━═━━━━━╮
  ┃💬 *ʙᴏᴛ ɴᴀᴍᴇ* : ɴᴊᴀʙᴜʟᴏ ᴊʙ
  ┃🧚 *ᴜsᴇ ɴᴀᴍᴇ* : ${nomAuteurMessage} 
  ┃🛸 *ᴘʀᴇғɪx* : [${s.PREFIXE}]
  ┃🔏 *ᴍᴏᴅᴇ* : ${mode}
  ┃🛸 *ᴘʟᴜɢɪɴ* : ${cm.length} 
  ┃🚀 *ʀᴏᴍ* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
  ┃📟 *ʀᴜɴɴɪɴɢ ᴏɴ* : ${os.platform()}
  ┃📆 *ᴅᴀᴛᴇ* ${date}
  ┃⏱️ *ᴛɪᴍᴇ* : ${temps}
  ╰──━━═━━━━┈╯

  
  > *@🔏ɴᴊᴀʙᴜʟᴏ ᴊʙ ᴄᴏᴍᴍᴀɴᴅ💬*
╭──━━━━━━━━━━━╮
┃💬🛸 *ʙᴜɢᴍᴇɴᴜ*
┃💬🚀 *ᴍᴇɴᴜ*
┃💬📄 *ᴀɪ-ᴍᴇɴᴜ*
┃💬🔏 *ᴍᴏᴅs-ᴍᴇɴᴜ* 
┃💬📜 *ᴄᴏɴᴠᴇʀsɪᴏɴ-ᴍᴇɴᴜ* 
┃💬🔏 *ᴅᴏᴡʟᴏᴀᴅ-ᴍᴇɴᴜ*
┃💬📄 *ғᴜɴ-ᴍᴇɴᴜ* 
┃💬🛸 *ɢᴇɴᴇʀᴀʟ-ᴍᴇɴᴜ*
┃💬🚀 *ɢʀᴏᴜᴘ-ᴍᴇɴᴜ* 
┃💬🔏 *ɢᴀᴍᴇs-ᴍᴇɴᴜ* 
┃💬📜 *ʜᴇʀᴏᴋᴜ-ᴍᴇɴᴜ*
┃💬📄 *ɪᴍ-ᴇᴅɪᴛ-ᴍᴇɴᴜ* 
┃💬🛸 *ʟᴏɢᴏ-ᴍᴇɴᴜ*
┃💬🚀 *ʀᴇᴀᴄᴛɪᴏɴ-ᴍᴇɴᴜ*
┃💬🔏 *sᴇᴀʀᴄʜ-ᴍᴇɴᴜ*
┃💬📜 *ᴍᴇɴᴜ1*
┃💬📃 *ʜᴇʟᴘs*
┃💬🛸 *ᴍᴇɴᴜ2*
┃💬🔏 *ᴍᴇɴᴜ-ʟɪsᴛ*
╰──━━━━━━━━━━┈╯`;
    
let menuMsg = `  
    
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Njabulomd*, déveloper Njabulo Jb" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Njabulomd*, déveloper Njabulo MD" }, { quoted: ms });
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
