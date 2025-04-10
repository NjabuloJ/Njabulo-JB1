"use strict";
const { zokou } = require("../framework/zokou");
const moment = require("moment-timezone");
const os = require("os");
const s = require("../set");

zokou({ 
    nomCom: "bugatti", 
    categorie: "General", 
    reaction: "📜", 
    nomFichier: __filename 
}, async (dest, zk, commandeOptions) => {
    const { repondre, prefixe, nomAuteurMessage } = commandeOptions;
    const { cm } = require("../framework/zokou");
    let coms = {};
    let mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }

    cm.map(async (com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("Africa/Dar_es_Salaam");
    const hour = moment().hour();
    let greeting = "ɢᴏᴏᴅ ᴍᴏʀɴɪɴɢ";
    if (hour >= 12 && hour < 18) greeting = "ɢᴏᴏᴅ ᴀғᴛᴇʀɴᴏᴏɴ!";
    else if (hour >= 18) greeting = "ɢᴏᴏᴅ ᴇᴠᴇɴɪɴɢ!";
    else if (hour >= 22 || hour < 5) greeting = "ɢᴏᴏᴅ ɴɪɢʜᴛ";

    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');
    const img = 'https://files.catbox.moe/iw6h5w.jpg';

    const infoMsg = `
╭─────────────━┈⊷
│ *ʙᴏᴛ ɴᴀᴍᴇ :* ɴᴊᴀʙᴜʟᴏ
│ *ᴘʀᴇғɪx :* [ ${s.PREFIXE} ]
│ *ᴍᴏᴅᴇ :* ${mode}
│ *ᴅᴀᴛᴇ  :* ${date}
│ *ᴘʟᴀᴛғᴏʀᴍ :* ${os.platform()}
│ *ᴏᴡɴᴇʀ ɪs :* ɴᴊᴀʙᴜʟᴏ ᴊʙ
│ *ᴘʟᴜɢɪɴs ᴄᴍᴅ :* ${cm.length}
╰─────────────━┈⊷ 

*🌇ʜᴇʏ ɪ ᴀᴍ ɴᴊᴀʙᴜʟᴏ ᴊʙ:* *${greeting}*`;

    const menuMsg = `
*ᴀɪ*
╭─────────────━┈⊷
│• ɴᴊᴀʙᴜʟᴏ
│• ᴄʜᴀᴛ 
│• ɢᴇᴍɪɴɪ
│• ɪʟᴀᴍᴀ
│• ɢᴘᴛ
│• ʙᴏᴏᴋ
│• ʜᴏʟʏ-ʙɪʙʟᴇ
╰─────────────━┈⊷
*ɢᴇɴᴇʀᴀʟ*
╭─────────────━┈⊷ 
│ • ʜᴇʟᴘ
│ • sᴇssɪᴏɴ
│ • ʀᴇᴘᴏs
│ • ᴏᴡɴᴇʀ 
│ • ᴅᴇᴠ 
│ • ʙɪʙʟᴇ 
│ • ᴘσʟʟ 
│ • ʙʀᴏᴀᴅᴄᴀsᴛ 
│ • ᴄʜᴀɴɴᴇʟ
│ • ɢʀᴏᴜᴘ 
│ • ᴜᴘᴅᴀᴛᴇ 
│ • ᴜᴘᴛɪᴍᴇ 
│ • ᴍᴇɴᴜ 
│ • ᴏʙᴛ 
│ • sᴄ
│ • sᴄʀɪᴘᴛ
│ • ʀᴇᴘᴏ
│ • ᴛᴇsᴛ 
│ • ᴀʟɪᴠᴇ 
│ • ᴘᴀɪʀ 
│ • ᴘɪɴɢ 
│ • ᴀʀᴇᴀᴄᴛ 
╰─────────────━┈⊷
*ᴅᴏᴡɴʟᴏᴀᴅ*
╭─────────────━┈⊷ 
│ • *ᴀᴘᴋ* 
│ • *ɪɴsᴛᴀɢʀᴀᴍ* 
│ • *ғᴀᴄᴇʙᴏᴏᴋ*
│ • *ᴛɪᴋᴛᴏᴋ* 
│ • *ʟɪᴛᴇ*
│ • *ᴛᴡɪᴛᴛᴇʀsᴇᴀʀᴄʜ*
│ • *ᴛɪᴋᴛᴏᴋsᴇᴀʀᴄʜ*
│ • *sᴘᴏᴛɪғʏʟɪsᴛ*
│ • *ғʙᴅʟ* 
│ • *ᴘʟᴀʏ*
│ • *ʏᴛs*
│ • *ғʙᴅʟ2*
│ • *ᴛɪᴋᴛᴏᴋʟɪᴛᴇ*
╰─────────────━┈⊷ 
*sᴇᴀʀᴄʜ*
╭─────────────━┈⊷ 
│ • *ʜᴇʟᴘ* 
│ • *ɢᴏᴏɢʟᴇ* 
│ • *ɪᴍᴅʙ* 
│ • *ᴍᴏᴠɪᴇ* 
│ • *ʟʏʀɪᴄs*
│ • *ɪᴍɢ* 
│ • *ɢᴀʟᴀxʏ* 
│ • *ᴘʟᴀʏ* 
│ • *ᴠɪᴅᴇᴏ*
│ • *ɢɪᴛᴄʟᴏɴᴇ*
╰─────────────━┈⊷ 
*ᴄᴏɴᴠᴇʀsɪσɴ*
╭─────────────━┈⊷ 
│ • *ᴇᴍᴏᴍíʟɪx* 
│ • *sᴛɪᴄᴋᴇʀ* 
│ • *sᴄʀᴏᴘ* 
│ • *ᴛᴀᴋᴇ*
│ • *ᴡʀɪᴛᴇ*
│ • *ᴘʜᴏᴛᴏ* 
│ • *ʜᴇᴀʀᴛ*
│ • *ᴛʀᴛ* 
│ • *ᴜʀʟ* 
│ • *ᴛᴇsᴛᴀᴍᴇɴᴛ*
╰─────────────━┈⊷ 
*ᴜsᴇʀ*
╭─────────────━┈⊷ 
│ • *sᴄʀᴇᴇɴsʜᴏᴛ*
│ • *ғᴏᴡᴀʀᴅ*
│ • *ғᴀɴᴄч*
│ • *ғᴀᴄᴛ*
│ • *sᴜʀᴀʜ*
│ • *ǫᴜᴏᴛᴇs* 
│ • *ᴅɪᴛ* 
│ • *ɪᴛᴛα* 
│ • *sᴀʏ*
│ • *ᴏᴘᴇɴᴛɪᴍᴇ*
│ • *σᴘᴇɴᴛɪᴍᴇ*
╰─────────────━┈⊷ 
*ɪᴍᴀɢᴇ-ᴇᴅɪᴛ*
╭─────────────━┈⊷ 
│ • *sʜɪᴛ* 
│ • *ᴡᴀɴᴛᴇᴅ* 
│ • *ᴛʀɪɢɢᴇʀ*
│ • *ᴛʀᴀsʜ*
│ • *ʀɪᴘ*
│ • *sᴇᴘɪᴀ*
│ • *ʀᴀɪɴʙᴏᴡ*
│ • *ʜɪᴛʟᴇʀ*
│ • *ɪɴᴠᴇʀᴛ*
│ • *ᴊᴀɪʟ ɴᴏ* 
│ • *ᴀғғᴇᴄᴛ*
│ • *ʙᴇᴀᴜᴛɪғᴜʟ*
│ • *ʙʟᴜʀ*
│ • *ᴄɪʀᴄʟᴇ*
│ • *ғᴀᴄᴇᴘᴀʟᴍ*
│ • *ɢʀᴇʏsᴄᴀʟᴇ*
│ • *ᴊᴏᴋᴇ*
╰─────────────━┈⊷ 
*ɢʀᴏᴜᴘ*
╭─────────────━┈⊷ 
│ • *αᴅᴅ*
│ • *αʟᴀᴘᴘʀᴏᴠᴇ*
│ • *ᴠᴄғ* 
│ • *ɪɴᴠɪᴛᴇ* 
│ • *ʀᴇᴠᴏᴋᴇ*
│ • *ᴛᴀɢᴀʟʟ* 
│ • *ʟɪɴᴋ* 
│ • *ᴘʀᴏᴍᴏᴛᴇ* 
│ • *ᴅᴇᴍσᴛᴇ* 
│ • *ʀᴇᴍᴏᴠᴇ* 
│ • *ᴅᴇʟ* 
│ • *ᴏɴғᴏ* 
│ • *αɴᴛɪʟɪɴᴋ* 
│ • *αɴᴛíʟɪвᴏᴛ* 
│ • *ɢʀᴏᴜᴘ* 
│ • *ʜɪᴅᴇᴛαɢ*
│ • *ᴀᴜᴛᴏᴍᴜᴛᴇ* 
│ • *αᴜᴛᴏᴜɴᴍᴜᴛᴇ*
│ • *ᴋɪᴄᴋᴀʟʟ* 
│ • *ᴏɴʟʏᴀᴅᴍɪɴ* 
│ • *ᴛᴀɢᴀᴅᴍɪɴ* 
│ • *ᴡᴀʀɴ* 
╰─────────────━┈⊷ 
*ᴍᴏᴅs*
╭─────────────━┈⊷ 
│ • *ʙʟᴏᴄᴋʟɪsᴛ*
│ • *ᴛᴇʟᴇsᴛɪᴄᴋᴇʀ*
│ • *ᴄʀᴇᴡ*
│ • *ʟᴇғᴛ*
│ • *ᴊᴏɪɴ*
│ • *ᴊɪᴅ*
│ • *ʙʟᴏᴄᴋ*
│ • *ᴜɴʙʟᴏᴄᴋ*
│ • *ʙᴀɴ*
│ • *ʙᴀɴɢᴇᴏᴜᴘ*
│ • *sᴜᴅᴏ*
│ • *sᴀᴠᴇ*
│ • *ᴍᴇɴᴛɪᴏɴ*
│ • *ᴜɴғᴏʀɢɪᴠᴀʙ*
│ • *ᴘᴏᴏʜʜ*
│ • *ʜᴏɢᴡᴀʏ*
│ • *ʙɪɢᴇɴ*
│ • *ᴅʀɪᴘᴘ* 
│ • *ᴄʟᴏᴡɴs*
│ • *ᴛᴇʀᴍɪɴᴀᴛᴇ*
╰─────────────━┈⊷ 
*ʜᴇɴᴛᴀɪ*
╭─────────────━┈⊷ 
│ • *ᴍᴇssɪ*
│ • *ᴡᴀɪғᴜ*
│ • *ᴛʀᴀᴘ*
│ • *ɴᴇᴋᴏ*
│ • *ʙʟᴏᴡᴊᴏʙ*
╰─────────────━┈⊷ 
*ʟᴏɢᴏ*
╭─────────────━┈⊷ 
│ • *ʜᴀᴄᴋᴇʀ*
│ • *ᴅʀᴀɢᴏɴʙᴀʟʟ*
│ • *ɴᴀʀᴜᴛᴏ*
│ • *ᴅɪᴅᴏɴɢ*
│ • *ᴡᴀʟʟ*
│ • *sᴜᴍᴍᴇʀ*
│ • *ɴᴇᴏɴʟɪɢʜᴛ*
│ • *ɢʀᴇᴇɴɴᴇᴏɴ*
│ • *ᴅᴇᴠɪʟ*
│ • *ʙᴏᴏᴍ*
│ • *ᴡᴀᴛᴇʀ*
│ • *sɴᴏᴡ*
│ • *ᴛʀᴀɴsғᴏʀᴍᴇʀ*
│ • *ᴛʜᴜɴᴅᴇʀ*
│ • *ʜᴀʀʀʏᴘᴏᴛᴛᴡʀ*
│ • *ᴄᴀᴛ*
│ • *ᴡʜɪᴛᴇɢᴏʟᴅ*
│ • *ʟɪɢʜᴛɢʟᴏʟᴏᴡ*
│ • *ᴛʜᴏʀ*
│ • *ɴᴇᴏɴ*
│ • *ᴘᴜʀᴘʟᴇ*
│ • *ɢᴏʟᴅ*
│ • *ᴀʀᴇɴᴀ*
│ • *ɪɴᴄᴀɴᴅᴇsᴄᴇɴᴛ*
╰─────────────━┈⊷ 
*ʀᴇᴀᴄᴛɪᴏɴ*
╭─────────────━┈⊷ 
│ • *ᴄʀʏ*
│ • *ʜᴜɢ*
│ • *ᴋɪss*
│ • *ʟɪᴄᴋ*
│ • *ʙʟᴜsʜ*
│ • *sᴍɪʟᴇ*
│ • *sʟᴀᴘ*
│ • *ᴋɪʟʟ*
│ • *ᴋɪᴄᴋ*
│ • *ʜᴀᴘᴘʏ*
│ • *ᴡíɴᴋ*
│ • *ᴘᴏᴋᴇ*
│ • *ᴅαɴᴄᴇ*
│ • *ᴄʀɪɴɢᴇ*
╰─────────────━┈⊷ 
*ʜєʀσᴋᴜ-ᴄʟíєɴᴛ*
╭─────────────━┈⊷
│ • *ᴀɴᴛɪᴄᴀʟʟ* 
│ • *ʀᴇᴀᴅᴍᴇssᴀɢᴇ* 
│ • *ᴘᴜʙʟɪᴄᴍᴏᴅᴇ* 
│ • *ᴀᴜᴛᴏʀᴇᴄᴏʀᴅ* 
│ • *ᴀᴜᴛᴏᴛʏᴘɪɴɢ* 
│ • *ᴀɴʏᴡᴀʏᴏɴʟɪɴᴇ* 
│ • *ᴘʀɪᴠᴀᴛᴇᴍᴏᴅᴇ*
│ • *ᴀᴜᴛᴏʟɪᴋᴇsᴛᴀᴛᴜs* 
│ • *sᴇᴛᴛɪɴɢs*
╰─────────────━┈⊷
 
*THANKS FOR USING NJABULO JB!* ✨`;

    try {
        await zk.sendMessage(dest, { 
            image: { url: img },
            caption: infoMsg + menuMsg,
            contextInfo: {
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363288304618280@newsletter",
                    newsletterName: "NJABULO JB",
                    serverMessageId: -1
                },
                forwardingScore: 999,
                externalAdReply: {
                    title: "NJABULO JB MENU",
                    body: "Command List",
                    thumbnailUrl: img,
                    sourceUrl: "https://whatsapp.com/channel/0029VarYP5iAInPtfQ8fRb2T",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });

        await zk.sendMessage(dest, { 
            audio: { 
                url: "https://files.catbox.moe/raje26.mp3"
            }, 
            mimetype: 'audio/mp4', 
            ptt: true,
            caption: "NJABULO-JB SONG",
            contextInfo: {
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363345407274799@newsletter",
                    newsletterName: "NJABULO JB",
                    serverMessageId: -1
                },
                forwardingScore: 999
            }
        });

    } catch (error) {
        console.log("Error:", error);
        repondre("❌ Error displaying menu. Please try again later.");
    }
});
