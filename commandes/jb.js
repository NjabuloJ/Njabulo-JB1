const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou({ nomCom: "menu1", categorie: "Menu1" }, async (dest, zk, commandeOptions) => {
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
╭━━━⊷
┃✇╭⊷
┃✇│◎ ʙᴏᴛ ɴᴀᴍᴇ : ${s.OWNER_NAME}
┃✇│◎ ᴘʀᴇғɪx : [ ${s.PREFIXE} ]
┃✇│◎ ᴍᴏᴅᴇ : ${mode}
┃✇│◎ 𝚁𝚊𝚖  : 8/132 GB
┃✇│◎ ᴅᴀᴛᴇ  : ${date}
┃✇│◎ ᴘʟᴀᴛғᴏʀᴍ : ${os.platform()}
┃✇│◎ ᴄʀᴇᴀᴛᴏʀ : ɴᴊᴀʙᴜʟᴏ ᴊʙ
┃✇│◎ 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 : ${cm.length}
┃✇│◎ 𝚃𝚑𝚎𝚖𝚎 : JB
┃✇╰⊷
╰━━━⊷\n

🌆Good evening! time to relax

╰━━━••➤•••${readmore}
`;

    let menuMsg = `ɴᴊᴀʙᴜʟᴏ ᴊʙ ᴄᴍᴅ`;
    
    for (const cat in coms) {
        menuMsg += `
📑 *${cat}*
⚪ `;
        for (const cmd of coms[cat]) {
            menuMsg += `          
⚪ ${s.PREFIXE}  ${cmd}`;    
        }
        menuMsg += `
⚪`;
    }
    
    menuMsg += `
> @ᴍᴀᴅᴇ ʙʏ ɴᴊᴀʙᴜʟᴏ ᴊʙ 2025\n`;

    try {
        const senderName = nomAuteurMessage || message.from;  // Use correct variable for sender name
        await zk.sendMessage(dest, {
            text: infoMsg + menuMsg,
            contextInfo: {
                mentionedJid: [senderName],
                externalAdReply: {
                    title: "𝗡𝗝𝗔𝗕𝗨𝗟𝗢 𝗝𝗕 𝗠𝗘𝗡𝗨 𝗟𝗜𝗦𝗧",
                    body: "Tap here my friend join channel update",
                    thumbnailUrl: "",
                    sourceUrl: "",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (error) {
        console.error("Menu error: ", error);
        repondre("🥵🥵 Menu error: " + error);
    }
});
