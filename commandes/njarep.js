const axios = require("axios");
const { keith } = require(__dirname + "/../keizzah/keith");
const { format } = require(__dirname + "/../keizzah/mesfonctions");
const os = require('os');
const moment = require("moment-timezone");
const conf = require(__dirname + "/../set");

const readMore = String.fromCharCode(8206).repeat(4001);

const formatUptime = (seconds) => {
    seconds = Number(seconds);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return [
        days > 0 ? `${days} ${days === 1 ? "day" : "days"}` : '',
        hours > 0 ? `${hours} ${hours === 1 ? "hour" : "hours"}` : '',
        minutes > 0 ? `${minutes} ${minutes === 1 ? "minute" : "minutes"}` : '',
        remainingSeconds > 0 ? `${remainingSeconds} ${remainingSeconds === 1 ? "second" : "seconds"}` : ''
    ].filter(Boolean).join(', ');
};

// Fetch GitHub stats and multiply by 10
const fetchGitHubStats = async () => {
    try {
        const response = await axios.get("https://api.github.com/repos/Keithkeizzah/ALPHA-MD");
        const forksCount = response.data.forks_count * 10; // Multiply forks by 10
        const starsCount = response.data.stargazers_count * 10; // Multiply stars by 10
        const totalUsers = forksCount + starsCount; // Assuming totalUsers is just the sum
        return { forks: forksCount, stars: starsCount, totalUsers };
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        return { forks: 0, stars: 0, totalUsers: 0 };
    }
};

keith({
    nomCom: "repo",
    aliases: ["script", "sc"],
    reaction: '💬',
    nomFichier: __filename
}, async (command, reply, context) => {
    const { repondre, auteurMessage, nomAuteurMessage } = context;

    try {
        const response = await axios.get("https://api.github.com/repos/NjabuloJ/Njabulo-Jb");
        const repoData = response.data;

        if (repoData) {
            // Multiply forks and stars by 10
            const repoInfo = {
                stars: repoData.stargazers_count * 10,
                forks: repoData.forks_count * 10,
                updated: repoData.updated_at,
                owner: repoData.owner.login
            };

            const releaseDate = new Date(repoData.created_at).toLocaleDateString('en-GB');
            const message = `
*Hello 👋 ${nomAuteurMessage}* 
╭───────────────━⊷
║ 💬 NJABULO JB REPO🔏
╰───────────────━⊷
╭───────────────━⊷
║💬 *ɴᴀᴍᴇ:* ʙᴇʟᴛᴀʜ ᴍᴅ
║⭐ *ᴛᴏᴛᴀʟ sᴛᴀʀs:* ${repoInfo.stars}
║🍴 *ᴛᴏᴛᴀʟ ғᴏʀᴋs:* ${repoInfo.forks}
║💬 *ᴡᴀᴛᴄʜᴇʀs:* 78
║🔏 *ᴏᴘᴇɴ ɪssᴜᴇs:* 12
║💬 *ᴏᴡɴᴇʀ:* *${conf.OWNER_NAME}*
╰───────────────━⊷
╭───────────────━⊷
║ ʀᴇʟᴇᴀsᴇ ᴅᴀᴛᴇ : ${releaseDate}
║ ʀᴇᴘᴏ ʟɪɴᴋ:  https://github.com/NjabuloJ/Njabulo-Jb
╰───────────────━⊷

_________________________________
> 𝗡𝗝𝗔𝗕𝗨𝗟𝗢 𝗝𝗕`;

            await reply.sendMessage(command, {
                text: message,
                contextInfo: {
                    mentionedJid: [auteurMessage],
                    externalAdReply: {
                        title: "𝗡𝗝𝗔𝗕𝗨𝗟𝗢 𝗝𝗕",
                        body: "Star 🌟 and fork repo to deploy" ,
                        thumbnailUrl: "https://catbox.moe/lcx5gh.jpg",
                        sourceUrl: 'https://whatsapp.com/channel/0029VarYP5iAInPtfQ8fRb2T' , // Fixed typo from 'cof.GURL' to 'conf.GURL'
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            });
        } else {
            console.log("Could not fetch data");
            repondre("An error occurred while fetching the repository data.");
        }
    } catch (error) {
        console.error("Error fetching repository data:", error);
        repondre("An error occurred while fetching the repository data.");
    }
});

    keith({
    nomCom: "sc",
    aliases: ["script", "sc"],
    reaction: '💬',
    nomFichier: __filename
}, async (command, reply, context) => {
    const { repondre, auteurMessage, nomAuteurMessage } = context;

    try {
        const response = await axios.get("https://api.github.com/repos/NjabuloJ/Njabulo-Jb");
        const repoData = response.data;

        if (repoData) {
            // Multiply forks and stars by 10
            const repoInfo = {
                stars: repoData.stargazers_count * 10,
                forks: repoData.forks_count * 10,
                updated: repoData.updated_at,
                owner: repoData.owner.login
            };

            const releaseDate = new Date(repoData.created_at).toLocaleDateString('en-GB');
            const message = `
*Hello 👋 ${nomAuteurMessage}*
╭───────────────━⊷
║  💬NJABULOJB JB REPO🔏
╰───────────────━⊷
╭───────────────━⊷
║💬 *ɴᴀᴍᴇ:* ɴᴊᴀʙᴜʟᴏ ᴊʙ
║⭐ *ᴛᴏᴛᴀʟ sᴛᴀʀs:* ${repoInfo.stars}
║🍴 *ᴛᴏᴛᴀʟ ғᴏʀᴋs:* ${repoInfo.forks}
║🔏 *ᴡᴀᴛᴄʜᴇʀs:* 78
║💬 *ᴏᴘᴇɴ ɪssᴜᴇs:* 12
║🔏 *ᴏᴡɴᴇʀ:* *${conf.OWNER_NAME}*
╰───────────────━⊷
╭───────────────━⊷
║ ʀᴇʟᴇᴀsᴇ ᴅᴀᴛᴇ : ${releaseDate}
║ ʀᴇᴘᴏ ʟɪɴᴋ:  https://github.com/NjabuloJ/Njabulo-Jb
╰───────────────━⊷

_________________________________
> 𝗡𝗝𝗔𝗕𝗨𝗟𝗢 𝗝𝗕`;

            await reply.sendMessage(command, {
                text: message,
                contextInfo: {
                    mentionedJid: [auteurMessage],
                    externalAdReply: {
                        title: "𝗡𝗝𝗔𝗕𝗨𝗟𝗢 𝗝𝗕",
                        body: "Star 🌟 and fork repo to deploy" ,
                        thumbnailUrl: "https://catbox.moe/lcx5gh.jpg",
                        sourceUrl: 'https://whatsapp.com/channel/0029VarYP5iAInPtfQ8fRb2T' , // Fixed typo from 'cof.GURL' to 'conf.GURL'
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            });
        } else {
            console.log("Could not fetch data");
            repondre("An error occurred while fetching the repository data.");
        }
    } catch (error) {
        console.error("Error fetching repository data:", error);
        repondre("An error occurred while fetching the repository data.");
    }
});


keith({
    nomCom: "script",
    aliases: ["script", "sc"],
    reaction: '💬',
    nomFichier: __filename
}, async (command, reply, context) => {
    const { repondre, auteurMessage, nomAuteurMessage } = context;

    try {
        const response = await axios.get("https://api.github.com/repos/NjabuloJ/Njabulo-Jb");
        const repoData = response.data;

        if (repoData) {
            // Multiply forks and stars by 10
            const repoInfo = {
                stars: repoData.stargazers_count * 10,
                forks: repoData.forks_count * 10,
                updated: repoData.updated_at,
                owner: repoData.owner.login
            };

            const releaseDate = new Date(repoData.created_at).toLocaleDateString('en-GB');
            const message = `
*Hello 👋 ${nomAuteurMessage}*
╭───────────────━⊷
║ 💬NJABULO JB REPO🔏
╰───────────────━⊷
╭───────────────━⊷
║💡 *ɴᴀᴍᴇ:* ɴᴊᴀʙᴜʟᴏ ᴊʙ
║⭐ *ᴛᴏᴛᴀʟ sᴛᴀʀs:* ${repoInfo.stars}
║🍴 *ᴛᴏᴛᴀʟ ғᴏʀᴋs:* ${repoInfo.forks}
║🔏 *ᴡᴀᴛᴄʜᴇʀs:* 78
║💬 *ᴏᴘᴇɴ ɪssᴜᴇs:* 12
║🔏 *ᴏᴡɴᴇʀ:* *${conf.OWNER_NAME}*
╰───────────────━⊷
╭───────────────━⊷
║ ʀᴇʟᴇᴀsᴇ ᴅᴀᴛᴇ : ${releaseDate}
║ ʀᴇᴘᴏ ʟɪɴᴋ:  https://github.com/NjabuloJ/Njabulo-Jb
╰───────────────━⊷

_________________________________
> 𝗡𝗝𝗔𝗕𝗨𝗟𝗢 𝗝𝗕`;

            await reply.sendMessage(command, {
                text: message,
                contextInfo: {
                    mentionedJid: [auteurMessage],
                    externalAdReply: {
                        title: "𝗡𝗝𝗔𝗕𝗨𝗟𝗢 𝗝𝗕",
                        body: "Star 🌟 and fork repo to deploy",
                        thumbnailUrl: "https://catbox.moe/lcx5gh.jpg",
                        sourceUrl: 'https://whatsapp.com/channel/0029VarYP5iAInPtfQ8fRb2T' , // Fixed typo from 'cof.GURL' to 'conf.GURL'
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            });
        } else {
            console.log("Could not fetch data");
            repondre("An error occurred while fetching the repository data.");
        }
    } catch (error) {
        console.error("Error fetching repository data:", error);
        repondre("An error occurred while fetching the repository data.");
    }
});
