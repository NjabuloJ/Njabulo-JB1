const { zokou } = require('../framework/zokou');
const axios = require("axios");

zokou({
  nomCom: "twittersearch",
  aliases: ["xsearch", "twitterlist", "tweetsearch", "xsearch"],
  categorie: "Fledi-search",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  // Ensure a query is provided in the arguments
  if (!arg[0]) {
    return repondre('🤦Please provide a thing!');
  }

  try {
    // Define the search API URL
    const searchApiUrl = `https://apis-starlights-team.koyeb.app/starlight/Twitter-Posts?text=${encodeURIComponent(arg[0])}`;
    const response = await axios.get(searchApiUrl);
    const searchData = response.data.result;  // Assuming 'result' contains an array of tweets

    // Check if no results are found
    if (!searchData || searchData.length === 0) {
      return repondre("❌No Twitter search results found.");
    }

    // Construct the search message
    let searchMessage = `NJABULO JB PLANET TWITTER SEARCH\n\n`;
    searchMessage += `Creator: ${response.data.creator}\n\n`;  // Include the creator info

    // Loop through search results and append details to the message
    searchData.forEach((track, index) => {
      const trackNumber = index + 1; // Number tracks starting from 1
      searchMessage += `*📜${trackNumber}.* ${track.user}\n`;
      searchMessage += `*📜Profile*: ${track.profile || "Unknown"}\n`;
      searchMessage += `*📜Post*: ${track.post}\n`;  // The text of the tweet
      searchMessage += `*📜User Link*: ${track.user_link}\n`;  // Link to the user's profile
      searchMessage += `──────────────\n\n`;
    });

    // Send the search result message
    await zk.sendMessage(
      dest,
      {
        text: searchMessage,
        contextInfo: {
        isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "NJABULO JB",
         serverMessageId: 143,
         },
         forwardingScore: 999, // Score to indicate it has been forwarded
          externalAdReply: {
            showAdAttribution: true,
            title: "🦋ɴᴊᴀʙᴜʟᴏ ᴊʙ🦋",
            body: "message on",
            sourceUrl: "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        },
      }
    );
  } catch (error) {
    // Log and respond with the error message
    console.error(error);  // Log the error to the console
    repondre(`❌Error: ${error.message || 'Something went wrong.'}`);
  }
});
