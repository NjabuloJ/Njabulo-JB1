const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const Taphere = more.repeat(4001)

zokou({ nomCom: "menu2", categorie: "Menu2" }, async (dest, zk, commandeOptions) => {
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

    moment.tz.setDefault("Africa/Dar Es Salam");

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

let infoMsg =  `
╭──━━━━┈╮
│  ɴᴊᴀʙᴜʟᴏ ᴊʙ ᴏғғɪᴄᴇ
│💬 ʙᴏᴛ ɴᴀᴍᴇ: ${a.OWNER_NAME}
│🛸 ᴘʀᴇғɪx: ${s.PREDIXE}
│🛸 ᴍᴏᴅᴇ: ${mode}
│⏰ ᴛɪᴍᴇ: ${temps}
│📅 ᴅᴀᴛᴇ: ${date}
│🧑‍🧑‍🧒‍🧒ᴛᴏᴛᴀʟ ᴜsᴇʀs: ${formattedRotalUsers}}
│📟ᴜᴘᴛɪᴍᴇ: ${formatUptime(process.uptime())}
╰──━━━━┈╯
   💬sɪʀ ʜᴀʟʟᴏ : ${nomAuteurMessge}

> 💬@ʜᴀᴘᴘʏ sɪʀ ɴᴊᴀʙᴜʟᴏ🔏

│
╰━┈➤${readmore}

📜 *All command for happy JB*

📄 *IA*
- .bot
- .dalle
- .gpt
- .chat
- .calcul
- .news
- .gemini2
- .Njabulo

📄 *General*
- .owner
- .dev
- .support
- .developer
- .alive
- .anti-delete
- .url
- .deploy
- .ping
- .ping1
- .getall
- .deployer
- .poll
- .repo
- .git
- .test
- .uptime
- .ss
- .channel
- .done
- .update
- .vision
- .done
- .hack
- .wallpaper
- .menu

📃 *Group*
- .kickall
- .onlyadmin
- .forward
- .welcome
- .goodbye
- .antipromote
- .antidemote
- .add
- .disap
- .approve
- .vcf
- .tagall
- .invite
- .promote
- .demote
- .remove
- .info
- .antilink
- .antibot
- .group
- .gdesc
- .revoke
- .hidetag
- .automute
- .autounmute
- .fkick
- .antiword
- .antilink-all
- .tagadmin
- .warn

📄 *Mods*
- .tgs
- .crew
- .left
- .join
- .jid
- .block
- .unblock
- .ban
- .sudo
- .save
- .mention
- .boom
- .telesticker
- .reboot

📃 *Fun*
- .hack
- .ranime
- .fancy
- .profile
- .quote
- .rank
- .toprank

🗒️ *Search*
- .google
- .imdb
- .movie
- .weather
- .img
- .movie
- .define
- .lyrics
- .stickersearch
- .video

🗒️ *Conversion*
- .emomix
- .sticker
- .scrop
- .take
- .write
- .photo
- .trt

📃 *Download*
- .apk
- .fb
- .igdl
- .fbdl
- .tiktok
- .fb2
- .play
- .song

📜 *Audio-Edit*
- .deep
- .bass
- .reverse
- .slow
- .smooth
- .tempo
- .nightcore

📃 *God-first*
- .bible

🗒️*Menu*
- .bugmenu
- .donwmenu
- .help
- .list 

📄 *Image-Edit*
- .shit
- .wasted
- .wanted
- .trigger
- .trash
- .rip
- .sepia
- .rainbow
- .hitler
- .invert
- .jail
- .affect
- .beautiful
- .blur
- .circle
- .facepalm
- .greyscale
- .joke

📜 *User*
- .rent
- .del
- .mygroups
- .fact
- .quotes
- .whois
- .getpp

📃 *Njabulo-PICS*
- .design

🗒️ *Games*
- .riddle
- .chifumi
- .quizz

📄 *NJABULO-TEST*
- .anticall
- .areact
- .readstatus
- .antidelete
- .downloadstatus
- .startmessage
- .readmessage
- .pm-permit
- .publicmode
- .autorecord
- .autotyping
- .alwaysonline
- .privatemode

📜 *search*
- .gpt
- .lyrics
- .lyric2
- .Njabulo

📃 *Hentai*
- .hwaifu
- .trap
- .hneko
- .blowjob
- .hentaivid
- .ass
- .masterbation
- .thigh
- .panty

🗒️ *Modern-Logo*
- .birthday
- .birthday1
- .birthday2
- .comic
- .zodiac
- .underwater2
- .glow
- .avatargold
- .bokeh
- .firework
- .gaming
- .signature
- .luxury
- .dragonfire
- .queencard
- .graffiticolor
- .tattoo
- .pentakill
- .halloween1
- .horror
- .halloween2
- .women's-day
- .valentine
- .neonlight
- .assassin
- .foggy
- .summer
- .light
- .moderngold
- .cartoonstyle
- .galaxy
- .hacker
- .dragonball
- .naruto
- .didong
- .purple
- .gold
- .arena
- .incandescent
- .christmas
- .frost
- .christmas
- .mechanical

🗒️ *Reaction*
- .bully
- .cuddle
- .cry
- .hug
- .awoo
- .kiss
- .lick
- .pat
- .smug
- .bonk
- .yeet
- .blush
- .smile
- .wave
- .highfive
- .handhold
- .nom
- .bite
- .glomp
- .slap
- .kill
- .kick
- .happy
- .wink
- .poke
- .dance
- .cringe

📄 *stickcmd*
- .setcmd
- .delcmd
- .allcmd

📜 *tts*
- .dit
- .itta
- .say

📃 *Général*
- .vv

🗒️ *Bug-cmds*
- .bu
- .bug
- .crash
- .loccrash
- .crashbug
- .amountbug
- .pmbug
- .delaybug
- .docubug
- .unlimi
- .bombug 
- .trolly

📄 *anime*
- .waifu
- .neko
- .shinobu
- .megumin
- .cosplay
- .couplepp  `;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Luckymd*, déveloper Fredi Tech" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Luckymd*, déveloper Fredie Tech" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
