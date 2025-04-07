"use strict";
const { zokou } = require("../framework/zokou");
const axios = require("axios");
const moment = require("moment");

zokou({ 
    nomCom: "rep11", 
    categorie: "General", 
    reaction: "🦋", 
    nomFichier: __filename 
}, async (dest, zk, commandeOptions) => {
    const { pushname, repondre } = commandeOptions;
    const githubRepo = 'https://api.github.com/repos/NjabuloJ/Njabulo-Jb';
    const img = 'https://files.catbox.moe/xfn913.jpg';

    try {
        const response = await axios.get(githubRepo);
        const data = response.data;

        const created = moment(data.created_at).format("DD/MM/YYYY");
        const updated = moment(data.updated_at).format("DD/MM/YYYY");

        const gitdata = `

       *╭────────────━⊷*
       *┋* *ɴᴀᴍᴇ:* ${data.name}
       *┋* *ᴏᴡɴᴇʀ:* ${data.owner.login}
       *┋* *sᴛᴀʀs:* ⭐ ${data.stargazers_count}
       *┋* *ғᴏʀᴋs:* 🍴 ${data.forks_count}
       *┋* *ᴡᴀᴛᴄʜᴇʀs:* 👀 ${data.watchers}
       *┋* *ᴄʀᴇᴀᴛᴇᴅ:* 📅 ${created}
       *┋* *ᴜᴘᴅᴀᴛᴇᴅ:* 🔄 ${updated}
       *┋* *ʟɪᴄᴇɴsᴇ:* 📜 ${data.license?.name || "None"}
       *╰────────────━⊷*
1️⃣ *REPO LINK:*
2️⃣ ${data.html_url}

3️⃣ *SESSION:* https://shorturl.at/9WfYs
4️⃣ *CHANNEL:* https://shorturl.at/q8ZuS

*THANKS FOR SUPPORTING NJABULO JB!* ✨`;

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

    } catch (error) {
        console.log("Error fetching data:", error);
        repondre("❌ Error fetching repository data. Please try again later.");
       }

    // List of audio URLs
    const audioUrls = [
        "https://files.catbox.moe/wsyxi0.mp3",
        "https://files.catbox.moe/w2k8g2.mp3",
        "https://files.catbox.moe/cpjbnl.mp3",
        "https://files.catbox.moe/y6fph9.mp3",
        "https://files.catbox.moe/moctzu.mp3" // New song added
    ];

    // Select a random audio file
    const randomAudioUrl = audioUrls[Math.floor(Math.random() * audioUrls.length)];

    try {
        await zk.sendMessage(dest, {
            audio: { url: randomAudioUrl },
            mimetype: 'audio/mpeg',
            ptt: true, // Send as a voice note
        }, { quoted: ms });
    } catch (e) {
        console.log("🥵🥵 Error sending audio: " + e);
        repondre("🥵🥵 Error sending audio: " + e);
    }
});
