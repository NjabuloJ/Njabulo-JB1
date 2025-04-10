const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const Taphere = more.repeat(4001)

zokou({ nomCom: "buga", categorie: "General" }, async (dest, zk, commandeOptions) => {
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

    moment.tz.setDefault("Africa/Dar Es Salam")
    const hour = moment().hour();
    let greeting = "ɢᴏᴏᴅ ᴍᴏʀɴɪɴɢ";
    if (hour >= 12 && hour < 18) {
        greeting = "ɢᴏᴏᴅ ᴀғᴛᴇʀɴɴᴏɴ!";
    } else if (hour >= 18) {
        greeting = "ɢᴏᴏᴅ ᴇᴠᴇʀɴɪɴɢ!";
    } else if (hour >= 22 || hour < 5) {
        greeting = "ɢᴏᴏᴅ ɴɪɢʜᴛ"
    };

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

let infoMsg =  `
╭─────────────━┈⊷
│ *ʙᴏᴛ ɴᴀᴍᴇ :* ɴᴊᴀʙᴜʟᴏ
│ *ᴘʀᴇғɪx :* [ ${s.PREFIXE} ]
│ *ᴍᴏᴅᴇ :* ${mode}
│ *ᴅᴀᴛᴇ  :* ${date}
│ *ᴘʟᴀᴛғᴏʀᴍ :* ${os.platform()}
│ *ᴏᴡɴᴇʀ ɪs :* ɴᴊᴀʙᴜʟᴏ ᴊʙ
│ *ᴘʟᴜɢɪɴs ᴄᴍᴅ :* ${cm.length}
╰─────────────━┈⊷ 

*🌇ʜᴇʏ ɪ ᴀᴍ ɴᴊᴀʙᴜʟᴏ ᴊʙ:* *${greeting}*
*ᴀɪ*
╭─────────────━┈⊷
│• *ɴᴊᴀʙᴜʟᴏ*
│• *ᴄʜᴀᴛ* 
│• *ɢᴇᴍɪɴɪ*
│• *ɪʟᴀᴍᴀ*
│• *ɢᴘᴛ*
│• *ʙᴏᴏᴋ*
│• *ʜᴏʟʏ-ʙɪʙʟᴇ*
╰─────────────━┈⊷
*ɢᴇɴᴇʀᴀʟ*
╭─────────────━┈⊷ 
│ • *ʜᴇʟᴘ*
│ • *sᴇssɪᴏɴ*
│ • *ʀᴇᴘᴏs*
│ • *ᴏᴡɴᴇʀ* 
│ • *ᴅᴇᴠ* 
│ • *ʙɪʙʟᴇ* 
│ • *ᴘσʟʟ* 
│ • *ʙʀᴏᴀᴅᴄᴀsᴛ* 
│ • *ᴄʜᴀɴɴᴇʟ*
│ • *ɢʀᴏᴜᴘ* 
│ • *ᴜᴘᴅᴀᴛᴇ* 
│ • *ᴜᴘᴛɪᴍᴇ* 
│ • *ᴍᴇɴᴜ* 
│ • *ᴏʙᴛ* 
│ • *sᴄ*
│ • *sᴄʀɪᴘᴛ*
│ • *ʀᴇᴘᴏ*
│ • *ᴛᴇsᴛ* 
│ • *ᴀʟɪᴠᴇ* 
│ • *ᴘᴀɪʀ* 
│ • *ᴘɪɴɢ* 
│ • *ᴀʀᴇᴀᴄᴛ* 
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
`;   
let menuMsg = `
> ɳᴊᴀʙᴜʟᴏ ᴊʙ σғғɪᴄᴇ
 `;
        await zk.sendMessage(dest, { 
            image: { url: img }, 
            caption: gitdata,
            contextInfo: {
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363288304618280@newsletter",
                    newsletterName: "NJABULO JB",
                    serverMessageId: -1,
                },
                forwardingScore: 999,
                externalAdReply: {
                    title: "Njabulo Jb GitHub",
                    body: "Official Repository",
                    thumbnailUrl: img,
                    sourceUrl: data.html_url,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });

        // Send audio with caption
        await zk.sendMessage(dest, { 
            audio: { 
                url: "https://files.catbox.moe/raje26.mp3" // Replace with your audio URL
            }, 
            mimetype: 'audio/mp4', 
            ptt: true, // Set to true if you want it as a voice note
            caption: "NJABULO-JB SONG",
            contextInfo: {
             isForwarded: true,
             forwardedNewsletterMessageInfo: {
             newsletterJid: "120363345407274799@newsletter",
              newsletterName: "NJABULO JB",
               serverMessageId: -1
                }
            }
        });

    } catch (e) {
        console.log("Error fetching data:", error);
        repondre("❌ Error fetching repository data. Please try again later.");
    }
});
