"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");

zokou({ nomCom: "repo1",git", "fana", ".bot", "last", "liverpool", "anfield", "script", 'cs"; catégorie:"gitHub", reaction: "💬", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
  const githubRepo = 'https://api.github.com/repos/NjabuloJ/Njabulo-jb';
  const img = 'https://files.catbox.moe/xfn913.jpg';
            'mediaType': 0x1,
            'renderLargerThumbnail': true,
            'mediaUrl': "https://whatsapp.com/channel/0029VarYP5iAInPtfQ8fRb2T",

  try {
    const response = await fetch(githubRepo);
    const data = await response.json();

    if (data) {
      const repoInfo = {
        stars: data.stargazers_count,
        forks: data.forks_count,
        lastUpdate: data.updated_at,
        owner: data.owner.login,
      };

      const releaseDate = new Date(data.created_at).toLocaleDateString('en-GB');
      const lastUpdateDate = new Date(data.updated_at).toLocaleDateString('en-GB');

      const gitdata = `>*Hallo* : ${s.OWNER_NAME}


          *this is ɴᴊᴀʙᴜʟᴏ ᴊʙ*
            the best bot in the universe developed by Njabulo. Fork and give a star 🌟 to my repo!
╭───────────────━⊷
║💬 ɴᴀᴍᴇ: ɴᴊᴀʙᴜʟᴏ ᴊʙ
║⭐ ᴛᴏᴛᴀʟ sᴛᴀʀs: ${repolinfo.stars}
║🍴 ᴛᴏᴛᴀʟ ғᴏʀᴋs: ${repo lindo.forks}
║⏰ʀᴇʟᴇᴀsᴇ ᴅᴀᴛᴇ : ${repolnfo.lastUpdate}
║ ʀᴇᴘᴏ ʟɪɴᴋ: !
║github.com/NjabuloJ/Njabulo-jb
╰───────────────━⊷

⊷────────────────━⊷`;

      await zk.sendMessage(dest, { image: { url: img }, caption: gitdata });
    } else {
      console.log("Could not fetch data");
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
});
