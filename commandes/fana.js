const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

zokou({ nomCom: "list", categorie: "General" }, async (dest, zk, commandeOptions) => {
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

    moment.tz.setDefault('EAT');

// Créer une date et une heure en EAT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╭──────────────┈⊷`
│◦➛╭────────────⊷
│◦➛  *𝚗𝚊𝚖𝚎 𝚘𝚠𝚗𝚎𝚛* : ${s.OWNER_NAME}
│◦➛  *𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚎𝚛* : ${nomAuteurMessage} 
│◦➛  *𝚍𝚊𝚝𝚎* : ${date}
│◦➛  *𝚙𝚛𝚎𝚏𝚒𝚡* : ${s.PREFIXE}
│◦➛  *𝚖𝚘𝚍𝚎* : ${mode}
│◦➛  *𝚙𝚕𝚞𝚐𝚒𝚗* : ${cm.length} 
│◦➛  *𝚛𝚊𝚖* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│◦➛  *𝚛𝚞𝚗𝚗𝚒𝚗𝚐 𝚘𝚗* : ${os.platform()}
│◦➛╰────────────⊷
╰──────────────┈⊷\n\n`;
 
    let menuMsg=`  
  *NJABULO JB CMD LIST*
`;

    for (const cat in coms) {
        menuMsg += ╭────「 *${cat}* 」──┈⊷`;
│◦➛╭────────────⊷
        for (const cmd of coms[cat]) {
            menuMsg += `  
│◦➛ ${cmd}`;
        }
        menuMsg += `
│◦➛╰────────────⊷
╰──────────────┈⊷\n`
    }

    menuMsg += `
*Made by Njabulo JB 2025*           
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *NJABULO JB*, développé par Djalega++" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "*Ibrahim-tech*" }, { quoted: ms });
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
