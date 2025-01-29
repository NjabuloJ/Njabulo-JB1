const util = require('util');

const fs = require('fs-extra');

const { zokou } = require(__dirname + "/../framework/zokou");

const { format } = require(__dirname + "/../framework/mesfonctions");

const os = require("os");

const moment = require("moment-timezone");

const s = require(__dirname + "/../set");



zokou({ nomCom: "list", categorie: "list" }, async (dest, zk, commandeOptions) => {

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



    moment.tz.setDefault(s.TZ);



// Créer une date et une heure en GMT

const temps = moment().format('HH:mm:ss');

const date = moment().format('DD/MM/YYYY');



  let infoMsg =  `
╭──━━═━━━━━╮
┃🛸 *ᴘʀᴇғɪx* : ${s.PREFIXE}
┃💬 *ʙᴏᴛ ɴᴀᴍᴇ* : ${s.OWNER_NAME}
┃🔏 *ᴍᴏᴅᴇ* : ${mode}
┃📃 *ᴜsᴇ ʙᴏᴛ* : ${cm.length}
┃📆 *ᴅᴀᴛᴇ* : ${date}
┃⏰ *ʜᴏᴜʀ* : ${temps}
┃🗄️ *ʀᴀᴍ* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┃👩‍💻 *ᴘʟᴀᴛғᴏʀᴍ* : ${os.platform()}
┃🛸 *ᴅᴇᴘʟᴏʏ : ᴏɴ ʜᴇʀᴏᴋᴜ*
╰──━━═━━━━┈╯\n\n`;
   💬sɪʀ ʜᴀʟʟᴏ : ${nomAuteurMessge}

> 💬@ʜᴀᴘᴘʏ sɪʀ ɴᴊᴀʙᴜʟᴏ🔏

│
╰━┈➤${readmore}

    *💬𝗡𝗝𝗔𝗕𝗨𝗟𝗢 𝗝𝗕 𝗢𝗙𝗙𝗜𝗖𝗘🔏*
◇                             ◇
`;

    if (commandeOptions.categorie) {
        const categorieSelectionnee = commandeOptions.categorie;
        if (coms[categorieSelectionnee]) {
            menuMsg += `📜🔏${categorieSelectionnee} 📃`;
            for (const cmd of coms[categorieSelectionnee]) {
                menuMsg += `
- . ${cmd}`;
            }
            menuMsg += `
📃\n`;
        } else {
            menuMsg += `La catégorie "${categorieSelectionnee}" n'existe pas.\n`;
        }
    } else {
        for (const cat in coms) {
            menuMsg += `📄💬${cat} 📄`;
            for (const cmd of coms[cat]) {
                menuMsg += `
- . ${cmd}`;
            }
            menuMsg += `
📜 \n`;
        }
    }

    menuMsg += `
`;

    var lien = mybotpic();

    if (lien.match(/\.(mp4|gif)$/i)) {
        try {
            zk.sendMessage(dest, { video: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *Njabulo-Jb*, développé par BONIPHACE-TECH" , gifPlayback : true }, { quoted: ms });
        } catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        try {
            zk.sendMessage(dest, { image: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *Njabulo-Jb*, développé par BONIPHACE-TECH" }, { quoted: ms });
        } catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
            repondre("🥵🥵 Menu erreur " + e);
        }
    } else {
        repondre(infoMsg + menuMsg);
    }
});
neko
