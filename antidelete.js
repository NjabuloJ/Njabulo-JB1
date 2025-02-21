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

    let notification = `*[ 👻𝐁𝐄𝐋𝐓𝐀𝐇 𝐌𝐃 ANTIDELETE👻 ]*\n\n`;
    notification += `*⌚Deletion Time:* ${timeInNairobi}\n`;
    notification += `*👤Deleted By:* @${deletedBy.split('@')[0]}\n\n`;

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
                            text: notification + `*Message:* ${deletedMessage.message[mtype].text}\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʙᴇʟᴛᴀʜ ʜᴀᴄᴋɪɴɢ ᴛᴇᴀᴍ.`,
                            mentions: [deletedMessage.key.participant],
                        });
              }
                  e if (mtype === 'imageMessage' || mtype === 'videoMessage' || mtype === 'documentMessage' ||
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
                            text: notification + `*📖Deleted Message:* ${deletedMessage.message.conversation}\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʙᴇʟᴛᴀʜ ʜᴀᴄᴋɪɴɢ ᴛᴇᴀᴍ.`,
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

        
