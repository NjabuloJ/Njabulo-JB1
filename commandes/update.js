const {
  cmd,
  commands
} = require("../command");
const yts = require("yt-search");
const axios = require("axios");
const {
  fetchJson,
  getBuffer
} = require("../lib/functions");

const commandDetails = {
  pattern: "play",
  desc: "Download play",
  react: "🎸",
  use: ".song <YouTube URL>",
  category: "download",
  filename: __filename,
};

cmd(commandDetails, async (bot, message, args, { from, q, reply, sender }) => {
  try {
    if (!q) {
      return reply("*give me send song url 🖇️*\n`👇Example :`\n\n.song Lelena");
    }

    const searchResults = await yts(q);
    const video = searchResults.videos[0];
    const videoUrl = video.url;
    const videoTitle = video.title.length > 20 ? video.title.substring(0, 20) + "..." : video.title;

    const downloadMessage = `
╔══════════════●●
║ *Song Name :* ${videoTitle}
║
║ *1 | AUDIO  MP3 🎶*
║ *2 | AUDIO  DOCUMENTS*
╚══════════════●●`;

    const axiosOptions = { responseType: "arraybuffer" };
    const thumbnailImage = Buffer.from(
      (await axios.get("https://i.ibb.co/TcyMWM2/3482.jpg", axiosOptions)).data,
      "binary"
    );

    const messageContext = {
      image: { url: video.thumbnail || "https://i.ibb.co/TcyMWM2/3482.jpg" },
      caption: downloadMessage,
      contextInfo: {
        mentionedJid: [sender],
        externalAdReply: {
          showAdAttribution: true,
          containsAutoReply: true,
          title: "NJABULO JB ",
          body: "© CREATE BY NJABULO JB",
          previewType: "PHOTO",
          thumbnail: thumbnailImage,
          sourceUrl: "https://whatsapp.com/channel/0029VarYP5iAInPtfQ8fRb2T",
          mediaType: 1,
          
        },
      },
    };

    const fetchAudio = await fetchJson(`https://dark-shan-yt.koyeb.app/download/ytmp3?url=${videoUrl}`);
    const downloadLink = fetchAudio.data.download;

    const initialMessage = await bot.sendMessage(from, messageContext, { quoted: message });

    bot.ev.on("messages.upsert", async (newMessageEvent) => {
      const newMessage = newMessageEvent.messages[0];

      if (!newMessage.message || !newMessage.message.extendedTextMessage) {
        return;
      }

      const userResponse = newMessage.message.extendedTextMessage.text.trim();
      const contextInfo = newMessage.message.extendedTextMessage.contextInfo;

      if (contextInfo && contextInfo.stanzaId === initialMessage.key.id) {
        try {
          switch (userResponse) {
            case "1":
              await bot.sendMessage(
                from,
                {
                  audio: { url: downloadLink },
                  mimetype: "audio/mpeg",
                  fileName: `${video.title}.mp3`,
                  caption: "> *© POWER BY NJABULO JB",
                },
                { quoted: newMessage }
              );
              break;

            case "2":
              await bot.sendMessage(
                from,
                {
                  document: { url: downloadLink },
                  mimetype: "audio/mpeg",
                  fileName: `${video.title}.mp3`,
                  caption: "> *© POWER BY NJABULO JB",
                },
                { quoted: newMessage }
              );
              break;

            case "3":
              await bot.sendMessage(
                from,
                {
                  audio: { url: downloadLink },
                  mimetype: "audio/mpeg",
                  ptt: true,
                },
                { quoted: newMessage }
              );
              break;



          


              
            default:
              reply("*Invalid option. Please select a valid option 🔢*");
          }
        } catch (error) {
          console.error(error);
          reply(`${error.message}`);
        }
      }
    });
  } catch (error) {
    console.error(error);
    reply(`${error.message}`);
  }
});
