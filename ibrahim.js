"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const logger = logger_1.default.child({});
logger.level = 'silent';
const pino = require("pino");
const boom_1 = require("@hapi/boom");
const conf = require("./set");
const axios = require("axios");
let fs = require("fs-extra");
let path = require("path");
const FileType = require('file-type');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
//import chalk from 'chalk'
const { verifierEtatJid , recupererActionJid } = require("./bdd/antilien");
const { atbverifierEtatJid , atbrecupererActionJid } = require("./bdd/antibot");
let evt = require(__dirname + "/framework/zokou");
const {isUserBanned , addUserToBanList , removeUserFromBanList} = require("./bdd/banUser");
const  {addGroupToBanList,isGroupBanned,removeGroupFromBanList} = require("./bdd/banGroup");
const {isGroupOnlyAdmin,addGroupToOnlyAdminList,removeGroupFromOnlyAdminList} = require("./bdd/onlyAdmin");
//const //{loadCmd}=require("/framework/mesfonctions")
let { reagir } = require(__dirname + "/framework/app");
var session = conf.session.replace(/BELTAH-MD;;;=>/g,"");
const prefixe = conf.PREFIXE;


async function authentification() {
    try {
       
        //console.log("le data "+data)
        if (!fs.existsSync(__dirname + "/auth/creds.json")) {
            console.log("connected successfully...");
            await fs.writeFileSync(__dirname + "/auth/creds.json", atob(session), "utf8");
            //console.log(session)
        }
        else if (fs.existsSync(__dirname + "/auth/creds.json") && session != "zokk") {
            await fs.writeFileSync(__dirname + "/auth/creds.json", atob(session), "utf8");
        }
    }
    catch (e) {
        console.log("Session Invalid " + e);
        return;
    }
}
authentification();
const store = (0, baileys_1.makeInMemoryStore)({
    logger: pino().child({ level: "silent", stream: "store" }),
});
setTimeout(() => {
    async function main() {
        const { version, isLatest } = await (0, baileys_1.fetchLatestBaileysVersion)();
        const { state, saveCreds } = await (0, baileys_1.useMultiFileAuthState)(__dirname + "/auth");
        const sockOptions = {
            version,
            logger: pino({ level: "silent" }),
            browser: ['BELTAH-MD', "safari", "1.0.0"],
            printQRInTerminal: true,
            fireInitQueries: false,
            shouldSyncHistoryMessage: true,
            downloadHistory: true,
            syncFullHistory: true,
            generateHighQualityLinkPreview: true,
            markOnlineOnConnect: false,
            keepAliveIntervalMs: 30_000,
            /* auth: state*/ auth: {
                creds: state.creds,
                /** caching makes the store faster to send/recv messages */
                keys: (0, baileys_1.makeCacheableSignalKeyStore)(state.keys, logger),
            },
            //////////
            getMessage: async (key) => {
                if (store) {
                    const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
                    return msg.message || undefined;
                }
                return {
                    conversation: 'An Error Occurred, Repeat Command!'
                };
            }
            ///////
        };
        const zk = (0, baileys_1.default)(sockOptions);
        store.bind(zk.ev);
        
//setInterval(() => { store.writeToFile("store.json"); }, 3000);

// Function to get the current date and time in Kenya
function getCurrentDateTime() {
    const options = {
        timeZone: 'Africa/Nairobi', // Kenya time zone
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // 24-hour format
    };
    const dateTime = new Intl.DateTimeFormat('en-KE', options).format(new Date());
    return dateTime;
}

// Auto Bio Update Interval
setInterval(async () => {
    if (conf.AUTO_BIO === "yes") {
        const currentDateTime = getCurrentDateTime(); // Get the current date and time
        const bioText = `ðŸ‘» á´˜á´á´˜á´‹Éªá´… x-á´›á´‡á´„Êœ ðŸ‘» Éªs á´É´ÊŸÉªÉ´á´‡ : ${currentDateTime}`; // Format the bio text
        await zk.updateProfileStatus(bioText); // Update the bio
        console.log(`Updated Bio: ${bioText}`); // Log the updated bio
    }
}, 60000); // Update bio every 60 seconds

// Function to handle deleted messages
// Other functions (auto-react, anti-delete, etc.) as needed
        zk.ev.on("call", async (callData) => {
  if (conf.ANTICALL === 'yes') {
    const callId = callData[0].id;
    const callerId = callData[0].from;

    await zk.rejectCall(callId, callerId);
    await zk.sendMessage(callerId, {
      text: "*sá´Ê€Ê€Ê!! É´á´ á´„á´€ÊŸÊŸs á´€ÊŸÊŸá´á´¡á´‡á´…, á´‹ÉªÉ´á´…ÊŸÊ á´›á´‡xá´›.*\n\n> á´˜á´á´¡á´‡Ê€á´‡á´… Ê™Ê á´á´œsá´›á´€Ò“Ò“á´€ Êœá´€á´„á´‹ÉªÉ´É¢ á´›á´‡á´€á´."
    });
  }
});

        // Default auto-reply message
let auto_reply_message = "á´›Êœá´‡ á´á´¡É´á´‡Ê€ Éªs á´„á´œÊ€Ê€á´‡É´á´›ÊŸÊ á´œÉ´á´€á´ á´€ÉªÊŸá´€Ê™ÊŸá´‡,,á´›Êœá´€É´á´‹ Êá´á´œ Ò“á´Ê€ Êá´á´œÊ€ á´á´‡ssá´€É¢á´‡. á´¡á´‡ á´¡ÉªÊŸÊŸ Ê€á´‡sá´˜á´É´á´… sá´á´É´.\n\n> á´˜á´á´¡á´‡Ê€á´‡á´… Ê™Ê á´á´œsá´›á´€Ò“Ò“á´€ Êœá´€á´„á´‹ÉªÉ´É¢ á´›á´‡á´€á´.";

// Track contacts that have already received the auto-reply
let repliedContacts = new Set();

zk.ev.on("messages.upsert", async (m) => {
    const { messages } = m;
    const ms = messages[0];
    if (!ms.message) return;

    const messageText = ms.message.conversation || ms.message.extendedTextMessage?.text;
    const remoteJid = ms.key.remoteJid;

    // Check if the message exists and is a command to set a new auto-reply message with any prefix
    if (messageText && messageText.match(/^[^\w\s]/) && ms.key.fromMe) {
        const prefix = messageText[0]; // Detect the prefix
        const command = messageText.slice(1).split(" ")[0]; // Command after prefix
        const newMessage = messageText.slice(prefix.length + command.length).trim(); // New message content

        // Update the auto-reply message if the command is 'setautoreply'
        if (command === "setautoreply" && newMessage) {
            auto_reply_message = newMessage;
            await zk.sendMessage(remoteJid, {
                text: `Auto-reply message has been updated to:\n"${auto_reply_message}"`,
            });
            return;
        }
    }

    // Check if auto-reply is enabled, contact hasn't received a reply, and it's a private chat
    if (conf.AUTO_REPLY === "yes" && !repliedContacts.has(remoteJid) && !ms.key.fromMe && !remoteJid.includes("@g.us")) {
        await zk.sendMessage(remoteJid, {
            text: auto_reply_message,
        });

        // Add contact to replied set to prevent repeat replies
        repliedContacts.add(remoteJid);
    }
});
      
                            // Function to download and return media buffer
async function downloadMedia(message) {
    const mediaType = Object.keys(message)[0].replace('Message', ''); // Determine the media type
    try {
        const stream = await zk.downloadContentFromMessage(message[mediaType], mediaType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        return buffer;
    } catch (error) {
        console.error('Error downloading media:', error);
        return null;
    }
}

// Function to format notification message
function createNotification(deletedMessage) {
    const deletedBy = deletedMessage.key.participant || deletedMessage.key.remoteJid;

    // Format time in Nairobi timezone
    const timeInNairobi = new Intl.DateTimeFormat('en-KE', {
        timeZone: 'Africa/Nairobi',
        dateStyle: 'full',
        timeStyle: 'medium',
    }).format(new Date());

    let notification = `*[ á´á´‡ssá´€É¢á´‡ á´…á´‡ÊŸá´‡á´›Éªá´É´ á´…á´‡á´›á´‡á´„á´›á´‡á´… ]*\n\n`;
    notification += `*âŒšDeletion Time:* ${timeInNairobi}\n`;
    notification += `*ðŸ‘¤Deleted By:* @${deletedBy.split('@')[0]}\n\n`;

    return notification;
}

// Event listener for all incoming messages
zk.ev.on("messages.upsert", async (m) => {
    if (conf.ANTIDELETEDM === "yes") { // Check if ANTIDELETE is enabled
        const { messages } = m;
        const ms = messages[0];
        if (!ms.message) return;

        const messageKey = ms.key;
        const remoteJid = messageKey.remoteJid;

        // Store message for future reference
        if (!store.chats[remoteJid]) {
            store.chats[remoteJid] = [];
        }
        store.chats[remoteJid].push(ms);

        // Handle deleted messages
        if (ms.message.protocolMessage && ms.message.protocolMessage.type === 0) {
            const deletedKey = ms.message.protocolMessage.key;
            const chatMessages = store.chats[remoteJid];
            const deletedMessage = chatMessages.find(
                (msg) => msg.key.id === deletedKey.id
            );

            if (deletedMessage) {
                try {
                    const notification = createNotification(deletedMessage);

                    // Determine message type
                    const mtype = Object.keys(deletedMessage.message)[0];

                    // Handle text messages (conversation or extendedTextMessage)
                    if (mtype === 'conversation' || mtype === 'extendedTextMessage') {
                        await zk.sendMessage(zk.user.id, {
                            text: notification + `*Message:* ${deletedMessage.message[mtype].text}\n\n> á´˜á´á´¡á´‡Ê€á´‡á´… Ê™Ê á´˜á´á´˜á´‹Éªá´… Êœá´€á´„á´‹ÉªÉ´É¢ á´›á´‡á´€á´.`,
                            mentions: [deletedMessage.key.participant],
                        });
                    }
                    // Handle media messages (image, video, document, audio, sticker, voice)
                    else if (mtype === 'imageMessage' || mtype === 'videoMessage' || mtype === 'documentMessage' ||
                             mtype === 'audioMessage' || mtype === 'stickerMessage' || mtype === 'voiceMessage') {
                        const mediaBuffer = await downloadMedia(deletedMessage.message);
                        if (mediaBuffer) {
                            const mediaType = mtype.replace('Message', '').toLowerCase();
                            await zk.sendMessage(zk.user.id, {
                                [mediaType]: mediaBuffer,
                                caption: notification,
                                mentions: [deletedMessage.key.participant],
                            });
                        }
                    }
                } catch (error) {
                    console.error('Error handling deleted message:', error);
                }
            }
        }
    }
});

        // Event listener for all incoming messages
zk.ev.on("messages.upsert", async (m) => {
    // Check if ANTIDELETE is enabled
    if (conf.ADMGROUP === "yes") {
        const { messages } = m;
        const ms = messages[0];
        if (!ms.message) return;

        // Store each received message
        const messageKey = ms.key;
        const remoteJid = messageKey.remoteJid;

        // Store message for future undelete reference
        if (!store.chats[remoteJid]) {
            store.chats[remoteJid] = [];
        }

        // Save the received message to storage
        store.chats[remoteJid].push(ms);

        // Handle deleted messages
        if (ms.message.protocolMessage && ms.message.protocolMessage.type === 0) {
            const deletedKey = ms.message.protocolMessage.key;

            // Search for the deleted message in the stored messages
            const chatMessages = store.chats[remoteJid];
            const deletedMessage = chatMessages.find(
                (msg) => msg.key.id === deletedKey.id
            );

            if (deletedMessage) {
                try {
                    // Create notification about the deleted message
                    const notification = createNotification(deletedMessage);

                    // Resend deleted content based on its type
                    if (deletedMessage.message.conversation) {
                        // Text message
                        await zk.sendMessage(remoteJid, {
                            text: notification + `*ðŸ“–Deleted Message:* ${deletedMessage.message.conversation}\n\n> á´˜á´á´¡á´‡Ê€á´‡á´… Ê™Ê á´á´œsá´›á´€Ò“Ò“á´€ Êœá´€á´„á´‹ÉªÉ´É¢ á´›á´‡á´€á´.`,
                            mentions: [deletedMessage.key.participant],
                        });
                    } else if (deletedMessage.message.imageMessage || 
                               deletedMessage.message.videoMessage || 
                               deletedMessage.message.documentMessage || 
                               deletedMessage.message.audioMessage || 
                               deletedMessage.message.stickerMessage || 
                               deletedMessage.message.voiceMessage) {
                        // Media message (image, video, document, audio, sticker, voice)
                        const mediaBuffer = await downloadMedia(deletedMessage.message);
                        if (mediaBuffer) {
                            const mediaType = deletedMessage.message.imageMessage ? 'image' :
                                deletedMessage.message.videoMessage ? 'video' :
                                deletedMessage.message.documentMessage ? 'document' :
                                deletedMessage.message.audioMessage ? 'audio' :
                                deletedMessage.message.stickerMessage ? 'sticker' : 'audio';

                            await zk.sendMessage(remoteJid, {
                                [mediaType]: mediaBuffer,
                                caption: notification,
                                mentions: [deletedMessage.key.participant],
                            });
                        }
                    }
                } catch (error) {
                    console.error('Error handling deleted message:', error);
                }
            }
        }
    }
});

                   
   const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Track the last reaction time to prevent overflow
let lastReactionTime = 0;
        /*// Auto-react to status updates, handling each status one-by-one without tracking
if (conf.AUTO_LIKE_STATUS === "yes") {
    console.log("AUTO_LIKE_STATUS is enabled. Listening for status updates...");

    zk.ev.on("messages.upsert", async (m) => {
        const { messages } = m;

        for (const message of messages) {
            // Check if the message is a status update
            if (message.key && message.key.remoteJid === "status@broadcast") {
                console.log("Detected status update from:", message.key.remoteJid);

                // Ensure throttling by checking the last reaction time
                const now = Date.now();
                if (now - lastReactionTime < 5000) {  // 5-second interval
                    console.log("Throttling reactions to prevent overflow.");
                    continue;
                }

                // Check if bot user ID is available
                const beltah = zk.user && zk.user.id ? zk.user.id.split(":")[0] + "@s.whatsapp.net" : null;
                if (!beltah) {
                    console.log("Bot's user ID not available. Skipping reaction.");
                    continue;
                }

                // React to the status with a green heart
                await zk.sendMessage(message.key.remoteJid, {
                    react: {
                        key: message.key,
                        text: "ðŸ–¤", // Reaction emoji
                    },
                }, {
                    statusJidList: [message.key.participant, beltah],
                });

                // Log successful reaction and update the last reaction time
                lastReactionTime = Date.now();
                console.log(`Successfully reacted to status update by ${message.key.remoteJid}`);

                // Delay to avoid rapid reactions
                await delay(2000); // 2-second delay between reactions
            }
        }
    });
                                }*/
        // Auto-react to status updates, handling each status one-by-one without tracking
if (conf.AUTO_REACT_STATUS === "yes") {
    zk.ev.on("messages.upsert", async (m) => {
        const { messages } = m;
        
        for (const message of messages) {
            if (message.key && message.key.remoteJid === "status@broadcast") {
                try {
                    const adams = zk.user && zk.user.id ? zk.user.id.split(":")[0] + "@s.whatsapp.net" : null;

                    if (adams) {
                        // React to the status with a green heart
                        await zk.sendMessage(message.key.remoteJid, {
                            react: {
                                key: message.key,
                                text: "â¤ï¸",
                            },
                        }, {
                            statusJidList: [message.key.participant, adams],
                        });

                        // Introduce a short delay between each reaction to prevent overflow
                        await new Promise(resolve => setTimeout(resolve, 2000)); // 2-second delay
                    }
                } catch (error) {
                    console.error("Error decoding JID or sending message:", error);
                }
            }
        }
    });
                                            }
        
        zk.ev.on("messages.upsert", async (m) => {
            const { messages } = m;
            const ms = messages[0];
            if (!ms.message)
                return;
            const decodeJid = (jid) => {
                if (!jid)
                    return jid;
                if (/:\d+@/gi.test(jid)) {
                    let decode = (0, baileys_1.jidDecode)(jid) || {};
                    return decode.user && decode.server && decode.user + '@' + decode.server || jid;
                }
                else
                    return jid;
            };
            var mtype = (0, baileys_1.getContentType)(ms.message);
            var texte = mtype == "conversation" ? ms.message.conversation : mtype == "imageMessage" ? ms.message.imageMessage?.caption : mtype == "videoMessage" ? ms.message.videoMessage?.caption : mtype == "extendedTextMessage" ? ms.message?.extendedTextMessage?.text : mtype == "buttons
