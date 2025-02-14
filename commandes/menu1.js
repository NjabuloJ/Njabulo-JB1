const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou({ nomCom: "menu2", categorie: "Menu2" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");
    let coms = {};
    let mode = "public";

    if ((s.MODE).toLowerCase() !== "yes") {
        mode = "private";
    }

    cm.map((com) => {
        if (!coms[com.categorie]) {
            coms[com.categorie] = [];
        }
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
*╭⊷*
┃✧ ʙᴏᴛ ɴᴀᴍᴇ : ɴᴊᴀʙᴜʟᴏ ᴊʙ
┃✧ ʙᴏᴛ ᴜsᴇʀ : ${nomAuteurMessage} 
┃✧ ᴘʀᴇғɪx : *[ ${s.PREFIXE} ]*
┃✧ ᴍᴏᴅᴇ : ${mode}
┃✧ ᴘʟᴀᴛғᴏʀᴍ : ${os.platform()}
┃✧ ᴅᴀᴛᴇ  : ${date}
┃✧ ᴛɪᴍᴇ : ${temps}
┃✧ ʀᴏᴍ : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
*╰⊷*\n

*╭────────────────────╮*
*🌆Good evening! time to relax🌄*
*╰────────────────────╯*
╰━•➤•${readmore}
`;

    let menuMsg = `ɴᴊᴀʙᴜʟᴏ ᴊʙ ᴄᴍᴅ`;
    
    for (const cat in coms) {
        menuMsg += `
 *${cat}*
 `;
        for (const cmd of coms[cat]) {
            menuMsg += `          
- . ${s.PREFIXE}  ${cmd}`;    
        }
        menuMsg += `
`;
    }
    
    menuMsg += `
╭──────────────────╮
┃✧https://shorturl.at/q8ZuS
╰──────────────────╯\n`;

    try {
        const senderName = nomAuteurMessage || message.from;  // Use correct variable for sender name
       }
                }
            },
            { quoted: mek }
        );

        // Send audio
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/cnl3kg.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
    } catch (error) {
        console.error("Menu error: ", error);
        repondre("🥵🥵 Menu error: " + error);
    }
});
