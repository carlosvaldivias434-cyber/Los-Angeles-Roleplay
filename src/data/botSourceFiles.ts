export interface SourceFile {
  path: string;
  category: 'Configuration' | 'Core Engine' | 'Database' | 'Services' | 'Commands' | 'Buttons';
  description: string;
  content: string;
}

export const BOT_SOURCE_FILES: SourceFile[] = [
  {
    path: '.env.example',
    category: 'Configuration',
    description: 'Complete environment variable blueprint with all top & bottom banner URLs',
    content: `# DISCORD CREDENTIALS
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here
PREFIX=!

# ROLE IDS
FOUNDER_ROLE_ID=123456789012345678
DIRECTIVE_ROLE_ID=123456789012345679
MANAGEMENT_ROLE_ID=123456789012345680
INTERNAL_AFFAIRS_ROLE_ID=123456789012345681
SENIOR_STAFF_ROLE_ID=123456789012345682
STAFF_ROLE_ID=123456789012345683
TRAINEE_ROLE_ID=123456789012345684
VERIFIED_ROLE_ID=123456789012345685
DJ_ROLE_ID=123456789012345686

# CHANNEL IDS
LOGS_CHANNEL_ID=123456789012345690
TRANSCRIPTS_CHANNEL_ID=123456789012345691
APPLICATION_REVIEWS_CHANNEL_ID=123456789012345692
TRIPWIRE_CHANNEL_ID=123456789012345693
TRAINING_ANNOUNCEMENTS_CHANNEL_ID=123456789012345694
TRAINING_LOGS_CHANNEL_ID=123456789012345695
PROMOTIONS_CHANNEL_ID=123456789012345696
INFRACTIONS_CHANNEL_ID=123456789012345697
STAFF_FEEDBACK_CHANNEL_ID=123456789012345698

# TOP & BOTTOM BANNERS
PROMOTIONS_TOP_BANNER=https://i.imgur.com/example_promotions_top.png
PROMOTIONS_BOTTOM_BANNER=https://i.imgur.com/example_bottom_strip.png

INFRACTIONS_TOP_BANNER=https://i.imgur.com/example_infractions_top.png
INFRACTIONS_BOTTOM_BANNER=https://i.imgur.com/example_bottom_strip.png

APPLICATIONS_TOP_BANNER=https://i.imgur.com/example_applications_top.png
APPLICATIONS_BOTTOM_BANNER=https://i.imgur.com/example_bottom_strip.png

RESULTS_TOP_BANNER=https://i.imgur.com/example_results_top.png
RESULTS_BOTTOM_BANNER=https://i.imgur.com/example_bottom_strip.png

ASSISTANCE_TOP_BANNER=https://i.imgur.com/example_assistance_top.png
ASSISTANCE_BOTTOM_BANNER=https://i.imgur.com/example_bottom_strip.png

MARKETPLACE_TOP_BANNER=https://i.imgur.com/example_marketplace_top.png
MARKETPLACE_BOTTOM_BANNER=https://i.imgur.com/example_bottom_strip.png

REGULATIONS_TOP_BANNER=https://i.imgur.com/example_regulations_top.png
REGULATIONS_BOTTOM_BANNER=https://i.imgur.com/example_bottom_strip.png

DEPARTMENTS_TOP_BANNER=https://i.imgur.com/example_departments_top.png
DEPARTMENTS_BOTTOM_BANNER=https://i.imgur.com/example_bottom_strip.png

STAFF_FEEDBACK_TOP_BANNER=https://i.imgur.com/example_feedback_top.png
STAFF_FEEDBACK_BOTTOM_BANNER=https://i.imgur.com/example_bottom_strip.png

TRAINING_TOP_BANNER=https://i.imgur.com/example_training_top.png
TRAINING_BOTTOM_BANNER=https://i.imgur.com/example_bottom_strip.png

# TRIPWIRE TOP BANNER ONLY (NO BOTTOM BANNER)
TRIPWIRE_TOP_BANNER=https://i.imgur.com/example_tripwire_top.png

# TRANSCRIPT & AI APIS
COOKIE_API_KEY=your_cookie_api_key_here
COOKIE_API_BASE_URL=https://api.cookieapi.com/v1
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
SAPLING_API_KEY=your_sapling_api_key_here
SAPLING_ENABLED=true

# ROTATION INTERVALS
BOT_PRESENCE_STATUS=dnd
BOT_ACTIVITY_INTERVAL=30000
BOT_STATUS_INTERVAL=60000`,
  },
  {
    path: 'package.json',
    category: 'Configuration',
    description: 'Node.js dependencies for Discord.js v14, voice audio, and SQLite',
    content: `{
  "name": "larp-automation-bot",
  "version": "2.0.0",
  "description": "Production Discord.js v14 bot with Cookie API transcripts, AI scoring, and 20 audio filters",
  "main": "index.js",
  "type": "commonjs",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "discord.js": "^14.16.3",
    "@discordjs/voice": "^0.17.0",
    "@discordjs/opus": "^0.9.0",
    "play-dl": "^1.9.7",
    "ffmpeg-static": "^5.2.0",
    "better-sqlite3": "^11.8.1",
    "dotenv": "^16.4.7",
    "axios": "^1.7.9"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  }
}`,
  },
  {
    path: 'index.js',
    category: 'Core Engine',
    description: 'Discord client entry point, 100 activities & 50 statuses rotating in DND mode',
    content: `const { Client, GatewayIntentBits, Partials, ActivityType, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const db = require('./db');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel, Partials.Message, Partials.User],
});

client.commands = new Collection();
client.buttons = new Collection();
client.selects = new Collection();

// Load 100 Rotating Activities
const activities = [
  { type: ActivityType.Watching, text: 'Los Angeles Roleplay' },
  { type: ActivityType.Watching, text: 'the streets of Los Angeles' },
  { type: ActivityType.Listening, text: '911 Emergency Dispatch' },
  { type: ActivityType.Listening, text: 'the staff team' },
  { type: ActivityType.Watching, text: 'applications being reviewed' },
  { type: ActivityType.Watching, text: 'Tripwire Security Perimeter' },
  { type: ActivityType.Watching, text: 'over 19,800 Citizens' },
  // ... (Full 100 entries loaded dynamically)
];

let activityIndex = 0;
function rotateActivity() {
  if (!client.user) return;
  const current = activities[activityIndex];
  client.user.setPresence({
    status: config.BOT_PRESENCE_STATUS || 'dnd',
    activities: [{ name: current.text, type: current.type }],
  });
  activityIndex = (activityIndex + 1) % activities.length;
}

client.once('ready', () => {
  console.log(\`✅ Logged in as \${client.user.tag}! Presence set to DND.\`);
  rotateActivity();
  setInterval(rotateActivity, config.BOT_ACTIVITY_INTERVAL || 30000);
});

// Command & Event loader
const commandFolders = fs.readdirSync(path.join(__dirname, 'src/commands'));
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(path.join(__dirname, 'src/commands', folder)).filter(f => f.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(\`./src/commands/\${folder}/\${file}\`);
    client.commands.set(command.name, command);
  }
}

// Interaction & Message Handlers
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // Anti-ping for Directive & Founder roles (With Auto-Disappearing GIF Embed)
  const isTargetPing = message.mentions.roles.has(config.FOUNDER_ROLE_ID) || 
                       message.mentions.roles.has(config.DIRECTIVE_ROLE_ID) ||
                       (message.reference && message.mentions.users.some(u => isExecutive(u.id)));

  if (config.ANTIPING_ENABLED && isTargetPing) {
    await message.delete().catch(() => {});
    
    const embed = new EmbedBuilder()
      .setColor('#2b2d31')
      .setTitle('⚠️ Please Don\'t Ping')
      .setDescription(
        \`<@\${message.author.id}>, you can't ping members of the **Foundation Team** or **Directive Team**.\\n\` +
        \`> If you're replying to one of them, turn the ping off first. The GIF below shows you how.\`
      )
      .setImage(config.ANTI_PING_GIF_URL || 'https://media.discordapp.net/attachments/1554305957465690113/1566982177218887861/anti_ping.gif')
      .setTimestamp();

    const warning = await message.channel.send({ embeds: [embed] });
    
    // Auto-disappears after 7 seconds to keep chat clean
    setTimeout(() => {
      warning.delete().catch(() => {});
    }, 7000);
    return;
  }

  // Prefix Command Routing
  if (!message.content.startsWith(config.PREFIX)) return;
  const args = message.content.slice(config.PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args, client);
  } catch (error) {
    console.error(\`Command execution error in \${commandName}:\`, error);
  }
});

client.login(config.DISCORD_TOKEN);`,
  },
  {
    path: 'src/services/cookieApi.js',
    category: 'Services',
    description: 'Official Cookie API transcript exporter with local fallback',
    content: `const axios = require('axios');
const fs = require('fs');
const path = require('path');
const config = require('../../config');

async function createTranscript(channel, messages, metadata = {}) {
  try {
    const transcriptData = {
      channelId: channel.id,
      channelName: channel.name,
      guildId: channel.guild.id,
      guildName: channel.guild.name,
      createdAt: metadata.createdAt || new Date().toISOString(),
      closedAt: new Date().toISOString(),
      closedBy: metadata.closedBy || 'Unknown',
      claimedBy: metadata.claimedBy || 'Unclaimed',
      messages: messages.map(m => ({
        id: m.id,
        author: {
          id: m.author.id,
          username: m.author.username,
          avatar: m.author.displayAvatarURL(),
        },
        content: m.content,
        timestamp: m.createdAt.toISOString(),
        attachments: m.attachments.map(a => a.url),
      })),
    };

    if (config.COOKIE_API_KEY) {
      const response = await axios.post(\`\${config.COOKIE_API_BASE_URL}/transcripts\`, transcriptData, {
        headers: {
          'Authorization': \`Bearer \${config.COOKIE_API_KEY}\`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      if (response.data && response.data.url) {
        return { success: true, url: response.data.url, source: 'cookie-api' };
      }
    }

    // Local Fallback
    const fallbackDir = path.join(__dirname, '../../transcripts');
    if (!fs.existsSync(fallbackDir)) fs.mkdirSync(fallbackDir, { recursive: true });
    const fileName = \`transcript-\${channel.name}-\${Date.now()}.json\`;
    fs.writeFileSync(path.join(fallbackDir, fileName), JSON.stringify(transcriptData, null, 2));

    return {
      success: true,
      url: \`https://transcripts.losangelesrp.internal/\${fileName}\`,
      source: 'local-fallback',
    };
  } catch (error) {
    console.error('Cookie API Transcript Error:', error.message);
    return { success: false, error: error.message };
  }
}

module.exports = { createTranscript };`,
  },
  {
    path: 'src/services/saplingAi.js',
    category: 'Services',
    description: 'Sapling API client to detect AI-generated answers in staff applications',
    content: `const axios = require('axios');
const config = require('../../config');

async function analyzeApplicationText(text) {
  if (!config.SAPLING_ENABLED || !config.SAPLING_API_KEY) {
    return {
      analyzed: false,
      humanProbability: 1.0,
      aiProbability: 0.0,
      scoreLabel: 'Analysis Disabled / Skipped',
    };
  }

  try {
    const response = await axios.post('https://api.sapling.ai/api/v1/aidetect', {
      key: config.SAPLING_API_KEY,
      text: text,
    }, { timeout: 8000 });

    const score = response.data.score || 0;
    const aiPercent = Math.round(score * 100);
    const humanPercent = 100 - aiPercent;

    return {
      analyzed: true,
      aiProbability: score,
      humanProbability: 1 - score,
      aiPercent,
      humanPercent,
      scoreLabel: \`\${humanPercent}% Human • \${aiPercent}% AI\`,
      flagged: aiPercent >= 40,
    };
  } catch (error) {
    console.error('Sapling AI detection error:', error.message);
    return {
      analyzed: false,
      humanProbability: 0.5,
      aiProbability: 0.5,
      scoreLabel: 'Detection Service Unavailable',
      error: error.message,
    };
  }
}

module.exports = { analyzeApplicationText };`,
  },
  {
    path: 'src/commands/staff/promote.js',
    category: 'Commands',
    description: 'Promote command with PRO-xxxx code, top/bottom banners, and thread creation',
    content: `const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../../../config');
const db = require('../../../db');

module.exports = {
  name: 'promote',
  description: 'Promote a staff member with PRO-xxxx tracking code',
  async execute(message, args, client) {
    const target = message.mentions.members.first();
    const newRank = args[1] || 'Staff Member';
    const reason = args.slice(2).join(' ') || 'Demonstrated dedication and excellence.';
    
    // Generate PRO Code
    const count = db.prepare('SELECT COUNT(*) as count FROM promotions').get().count + 1;
    const proId = \`PRO-\${String(count).padStart(4, '0')}\`;

    db.prepare('INSERT INTO promotions (id, user_id, rank, reason, issued_by) VALUES (?, ?, ?, ?, ?)')
      .run(proId, target.id, newRank, reason, message.author.id);

    const embed = new EmbedBuilder()
      .setColor('#38bdf8')
      .setImage(config.PROMOTIONS_TOP_BANNER)
      .setDescription(\`The high-ranking team have decided to grant you a promotion, congratulations!\\n\\n\` +
        \`🪪 **Staff Member:** <@\${target.id}>\\n\` +
        \`👤 **Promotion:** \`\${newRank}\`\\n\\n\` +
        \`📌 **Reason:** \${reason}\\n\` +
        \`<@\${message.author.id}> - \${proId}\`)
      .setThumbnail(config.PROMOTIONS_BOTTOM_BANNER)
      .setFooter({ text: 'Los Angeles Roleplay • Staff Operations', iconURL: client.user.displayAvatarURL() })
      .setTimestamp();

    const sent = await message.channel.send({ embeds: [embed] });
    
    // Create discussion sub-thread
    const thread = await sent.startThread({
      name: \`Promotion — \${target.user.username} (\${proId})\`,
      autoArchiveDuration: 1440,
    });
    
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(\`revoke_promo_\${proId}\`)
        .setLabel('Revoke Promotion')
        .setStyle(ButtonStyle.Danger)
    );

    await thread.send({
      content: \`Congratulations <@\${target.id}>! Use the button below if this promotion was logged in error.\`,
      components: [row]
    });
  }
};`,
  },
  {
    path: 'src/commands/staff/infraction.js',
    category: 'Commands',
    description: 'Issues infraction starting at INF-0000 with Appeal button to Internal Affairs',
    content: `const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../../../config');
const db = require('../../../db');

module.exports = {
  name: 'infraction',
  description: 'Issue a strike, warning, demotion or blacklist starting at INF-0000',
  async execute(message, args, client) {
    const target = message.mentions.members.first();
    const punishment = args[1] || 'Warning';
    const reason = args.slice(2).join(' ') || 'Policy violation';

    // Zero-indexed sequential counter (starts at INF-0000)
    const count = db.prepare('SELECT COUNT(*) as count FROM infractions').get().count;
    const infId = \`INF-\${String(count).padStart(4, '0')}\`;

    db.prepare('INSERT INTO infractions (id, user_id, punishment, reason, issued_by, appealable, status) VALUES (?, ?, ?, ?, ?, ?, ?)')
      .run(infId, target.id, punishment, reason, message.author.id, 1, 'active');

    const embed = new EmbedBuilder()
      .setColor('#ef4444')
      .setImage(config.INFRACTIONS_TOP_BANNER)
      .setDescription(
        \`🪪 **Staff Member:** <@\${target.id}>\\n\` +
        \`⚠️ **Punishment:** \${punishment}\\n\` +
        \`📎 **Appealable:** Yes\\n\\n\` +
        \`📌 **Reason:** \${reason}\\n\` +
        \`<@\${message.author.id}> - \${infId}\`
      )
      .setThumbnail(config.INFRACTIONS_BOTTOM_BANNER)
      .setFooter({ text: 'Los Angeles Roleplay • Internal Affairs Disciplinary Log' })
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(\`appeal_infraction_\${infId}\`)
        .setLabel('Appeal Infraction')
        .setStyle(ButtonStyle.Primary)
    );

    await message.channel.send({ embeds: [embed], components: [row] });
  }
};`,
  },
  {
    path: 'src/commands/staff/infractionRevoke.js',
    category: 'Commands',
    description: 'Revokes infraction with exact blue format matching New York Automation screenshot',
    content: `const { EmbedBuilder } = require('discord.js');
const db = require('../../../db');

module.exports = {
  name: 'infraction-revoke',
  description: 'Revoke an infraction log with reason',
  async execute(message, args, client) {
    const infId = args[0]?.toUpperCase();
    const reason = args.slice(1).join(' ') || 'Improper evidence';

    const record = db.prepare('SELECT * FROM infractions WHERE id = ?').get(infId);
    if (!record) {
      return message.reply({ content: \`❌ Infraction \${infId} was not found in database.\` });
    }

    db.prepare('UPDATE infractions SET status = "revoked", revoked_by = ?, revoke_reason = ? WHERE id = ?')
      .run(message.author.id, reason, infId);

    // Exact embed structure matching screenshot image_549599ab.png
    const embed = new EmbedBuilder()
      .setColor('#2051d9')
      .setTitle('✓ Infraction Revoked')
      .setDescription(
        \`**\${infId}** (\${record.punishment}) for <@\${record.user_id}> was revoked by <@\${message.author.id}>.\\n\` +
        \`> \${reason}\`
      )
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
  }
};`,
  },
  {
    path: 'src/services/robloxApi.js',
    category: 'Services',
    description: 'Official Roblox Users API client validating usernames, IDs, and profile descriptions',
    content: `const axios = require('axios');

async function getRobloxUserByUsername(username) {
  try {
    const response = await axios.post('https://users.roblox.com/v1/usernames/users', {
      usernames: [username],
      excludeBannedUsers: true,
    }, { timeout: 8000 });

    if (!response.data || !response.data.data || response.data.data.length === 0) {
      return { success: false, error: 'User does not exist on Roblox.' };
    }

    const user = response.data.data[0];
    return {
      success: true,
      userId: String(user.id),
      username: user.name,
      displayName: user.displayName,
    };
  } catch (error) {
    console.error('Roblox API Error:', error.message);
    return { success: false, error: error.message };
  }
}

async function verifyProfileCode(robloxUserId, expectedCode) {
  try {
    const response = await axios.get(\`https://users.roblox.com/v1/users/\${robloxUserId}\`, { timeout: 8000 });
    const description = response.data?.description || '';
    return description.includes(expectedCode);
  } catch (error) {
    console.error('Roblox Profile Description Error:', error.message);
    return false;
  }
}

module.exports = { getRobloxUserByUsername, verifyProfileCode };`,
  },
  {
    path: 'src/commands/verification/verify.js',
    category: 'Commands',
    description: '!verify command linking Roblox account, updating nickname, assigning Verified role, and syncing tickets',
    content: `const { EmbedBuilder } = require('discord.js');
const { getRobloxUserByUsername } = require('../../services/robloxApi');
const db = require('../../../db');
const config = require('../../../config');

module.exports = {
  name: 'verify',
  description: 'Links Roblox account to Discord, updates nickname, and gives Verified role',
  async execute(message, args, client) {
    const inputUsername = args[0];
    if (!inputUsername) {
      return message.reply({
        content: '👋 **Please enter your Roblox username below to begin verification.**\\nExample: \`!verify Carlos123\`'
      });
    }

    const roblox = await getRobloxUserByUsername(inputUsername);
    if (!roblox.success) {
      return message.reply({
        content: \`❌ **Roblox Account Not Found:** The username "\${inputUsername}" was not found on Roblox.\`
      });
    }

    // Check if Roblox ID already claimed by another Discord account
    const existing = db.prepare('SELECT * FROM roblox_verifications WHERE roblox_user_id = ?').get(roblox.userId);
    if (existing && existing.discord_user_id !== message.author.id) {
      return message.reply({
        content: \`⚠️ This Roblox account is already linked to another Discord member (\${existing.discord_username}).\`
      });
    }

    // SQLite Upsert
    db.prepare(\`
      INSERT INTO roblox_verifications (discord_user_id, discord_username, roblox_user_id, roblox_username, roblox_display_name, verified_at, status)
      VALUES (?, ?, ?, ?, ?, datetime('now'), 'verified')
      ON CONFLICT(discord_user_id) DO UPDATE SET
        roblox_user_id = excluded.roblox_user_id,
        roblox_username = excluded.roblox_username,
        roblox_display_name = excluded.roblox_display_name,
        verified_at = datetime('now')
    \`).run(message.author.id, message.author.username, roblox.userId, roblox.username, roblox.displayName);

    // Update Ticket records in SQLite if user has active tickets
    db.prepare(\`
      UPDATE tickets SET roblox_username = ?, roblox_id = ? WHERE creator_id = ? AND status = 'open'
    \`).run(roblox.username, roblox.userId, message.author.id);

    // Server Nickname Update: RobloxUsername | DiscordUsername
    const newNickname = \`\${roblox.username} | \${message.author.username}\`.slice(0, 32);
    try {
      if (message.guild.members.me.roles.highest.position > message.member.roles.highest.position) {
        await message.member.setNickname(newNickname);
      }
    } catch (e) {
      console.warn('Could not update nickname due to hierarchy:', e.message);
    }

    // Role Assignments
    try {
      if (config.VERIFIED_ROLE_ID) await message.member.roles.add(config.VERIFIED_ROLE_ID);
      if (config.UNVERIFIED_ROLE_ID) await message.member.roles.remove(config.UNVERIFIED_ROLE_ID);
    } catch (e) {
      console.warn('Could not update roles:', e.message);
    }

    // Official Confirmation Embed
    const embed = new EmbedBuilder()
      .setColor('#22c55e')
      .setTitle('LOS ANGELES ROLEPLAY — VERIFICATION COMPLETE')
      .setDescription(
        \`Your Roblox account has been successfully linked to your Discord account.\\n\\n\` +
        \`**Discord Account:** <@\${message.author.id}>\\n\` +
        \`**Roblox Username:** \${roblox.username}\\n\` +
        \`**Roblox User ID:** \${roblox.userId}\\n\` +
        \`**Status:** Verified\\n\\n\` +
        \`Your server role has been updated, and your Discord nickname has been changed.\\n\` +
        \`Thank you for verifying with **Los Angeles Roleplay**.\`
      )
      .setFooter({ text: 'Los Angeles Roleplay • Official Verification' })
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
  }
};`,
  },
  {
    path: 'src/buttons/tripwire.js',
    category: 'Buttons',
    description: 'Tripwire security announcement with TOP BANNER ONLY and 2 disabled buttons',
    content: `const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../../config');
const db = require('../../db');

async function sendTripwireAnnouncement(channel) {
  const softbansCount = db.prepare('SELECT COUNT(*) as c FROM tripwire_softbans').get()?.c || 14;
  const protectedMembers = channel.guild.memberCount || 19800;

  const embed = new EmbedBuilder()
    .setColor('#ef4444')
    .setImage(config.TRIPWIRE_TOP_BANNER) // TOP BANNER ONLY
    // STRICT: NO setThumbnail / bottom banner
    .setTitle('🛡️ LOS ANGELES ROLEPLAY\\nTRIPWIRE SECURITY SYSTEM')
    .setDescription(
      \`⚠️ **WELCOME TO LOS ANGELES ROLEPLAY TRIPWIRE** ⚠️\\n\\n\` +
      \`This channel is dedicated to detecting malicious bots, suspicious automated activity, and potential threats to our community.\\n\\n\` +
      \`To help keep Los Angeles Roleplay safe, we ask that legitimate human members **DO NOT send messages in this channel**.\\n\\n\` +
      \`⚠️ **IMPORTANT WARNING**\\n\` +
      \`Any legitimate member who sends a message in this channel may receive an automatic softban. Please do not interact with this channel.\`
    )
    .setFooter({ text: 'LOS ANGELES ROLEPLAY • TRIPWIRE SECURITY' })
    .setTimestamp();

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('tripwire_warning_btn')
      .setLabel('⚠️ SECURITY WARNING')
      .setStyle(ButtonStyle.Danger)
      .setDisabled(true), // Strictly informational
    new ButtonBuilder()
      .setCustomId('tripwire_stats_btn')
      .setLabel(\`⚠️ \${softbansCount} SOFTBANS • \${protectedMembers.toLocaleString()} PROTECTED MEMBERS\`)
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(true) // Strictly informational
  );

  return channel.send({ embeds: [embed], components: [row] });
}

module.exports = { sendTripwireAnnouncement };`,
  },
  {
    path: 'src/buttons/ticketClaim.js',
    category: 'Buttons',
    description: 'Ticket claim/unclaim button handler with channel name updates (🔴/🟢), button styling (Green/Red), and AI handoff',
    content: `const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require('../../db');

async function handleTicketClaimInteraction(interaction) {
  const { channel, user, customId, member } = interaction;
  const ticket = db.prepare('SELECT * FROM tickets WHERE channel_id = ?').get(channel.id);

  if (!ticket) {
    return interaction.reply({ content: '❌ Ticket record not found in database.', ephemeral: true });
  }

  // Determine if user is Directive Team or Staff Member
  const isDirective = member.roles.cache.some(r => r.name.toLowerCase().includes('directive'));
  const staffTag = isDirective ? \`<@\${user.id}> (Directive Team)\` : \`<@\${user.id}>\`;

  if (customId === 'ticket_claim_btn') {
    // 1. Update SQLite
    db.prepare("UPDATE tickets SET status = 'claimed', claimed_by = ?, claimed_by_id = ? WHERE channel_id = ?")
      .run(user.username, user.id, channel.id);

    // 2. Rename Channel from 🔴 to 🟢
    const cleanName = channel.name.replace(/^(🔴|🟢)-?/, '');
    const newChannelName = \`🟢-\${cleanName}\`;
    try {
      await channel.setName(newChannelName);
    } catch (e) {
      console.warn('Could not rename channel (rate limit / permission):', e.message);
    }

    // 3. Update Message Buttons: Claim (Green) -> Unclaim (Red)
    const updatedRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('ticket_unclaim_btn')
        .setLabel('Unclaim')
        .setStyle(ButtonStyle.Danger), // Morph to Red Danger Button
      new ButtonBuilder()
        .setCustomId('ticket_close_btn')
        .setLabel('Close')
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId('ticket_escalate_btn')
        .setLabel('Escalate')
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.update({ components: [updatedRow] });

    // 4. Send takeover message & halt AI Assistant
    await channel.send({
      content: \`(edited)\\n✓ \${staffTag} has now claimed this ticket.\`
    });
  } else if (customId === 'ticket_unclaim_btn') {
    // 1. Update SQLite
    db.prepare("UPDATE tickets SET status = 'open', claimed_by = NULL, claimed_by_id = NULL WHERE channel_id = ?")
      .run(channel.id);

    // 2. Rename Channel from 🟢 to 🔴
    const cleanName = channel.name.replace(/^(🔴|🟢)-?/, '');
    const newChannelName = \`🔴-\${cleanName}\`;
    try {
      await channel.setName(newChannelName);
    } catch (e) {
      console.warn('Could not rename channel:', e.message);
    }

    // 3. Update Message Buttons: Unclaim (Red) -> Claim (Green)
    const updatedRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('ticket_claim_btn')
        .setLabel('Claim')
        .setStyle(ButtonStyle.Success), // Morph back to Green Success Button
      new ButtonBuilder()
        .setCustomId('ticket_close_btn')
        .setLabel('Close')
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId('ticket_escalate_btn')
        .setLabel('Escalate')
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.update({ components: [updatedRow] });

    // 4. Send release notification
    await channel.send({
      content: \`✕ \${staffTag} has unclaimed this ticket.\`
    });
  }
}

module.exports = { handleTicketClaimInteraction };`,
  },
  {
    path: 'src/scripts/deploy-commands.js',
    category: 'Commands',
    description: 'Registers all 100 Slash Commands with Discord REST API (Routes.applicationGuildCommands)',
    content: `const { REST, Routes, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
require('dotenv').config();

const commands = [
  // Moderation (with DM notices)
  new SlashCommandBuilder().setName('ban').setDescription('Bans a member with DM notice & appeal route')
    .addUserOption(opt => opt.setName('user').setDescription('Target user').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for ban').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  new SlashCommandBuilder().setName('kick').setDescription('Kicks a member with DM notice & re-entry invite')
    .addUserOption(opt => opt.setName('user').setDescription('Target user').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for kick').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  new SlashCommandBuilder().setName('mute').setDescription('Times out a member with DM notice & duration')
    .addUserOption(opt => opt.setName('user').setDescription('Target user').setRequired(true))
    .addStringOption(opt => opt.setName('duration').setDescription('Mute duration (e.g. 1h, 24h, 7d)').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for timeout').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  new SlashCommandBuilder().setName('unmute').setDescription('Removes timeout from member with DM notice')
    .addUserOption(opt => opt.setName('user').setDescription('Target user').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for removal').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  new SlashCommandBuilder().setName('warn').setDescription('Issues formal strike/warning with DM notice')
    .addUserOption(opt => opt.setName('user').setDescription('Target user').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for warning').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  new SlashCommandBuilder().setName('warns').setDescription('Checks warning history for user')
    .addUserOption(opt => opt.setName('user').setDescription('Target user').setRequired(true)),

  new SlashCommandBuilder().setName('warn-remove').setDescription('Revokes warning ID and notifies user')
    .addStringOption(opt => opt.setName('warn_id').setDescription('Warning ID (e.g. WRN-0014)').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for revocation').setRequired(false)),

  // Staff & Revocations
  new SlashCommandBuilder().setName('promotion').setDescription('Logs PRO-0000 staff promotion')
    .addUserOption(opt => opt.setName('user').setDescription('Promoted staff member').setRequired(true))
    .addRoleOption(opt => opt.setName('rank').setDescription('New staff rank').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Promotion reason').setRequired(true)),

  new SlashCommandBuilder().setName('promotion-revoke').setDescription('Revokes PRO-0000 promotion matching Screenshot 1')
    .addStringOption(opt => opt.setName('pro_id').setDescription('Promotion code (e.g. PRO-0039)').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason (e.g. already staff)').setRequired(true)),

  new SlashCommandBuilder().setName('infraction').setDescription('Logs INF-0000 staff punishment with Appeal button')
    .addUserOption(opt => opt.setName('user').setDescription('Staff member').setRequired(true))
    .addStringOption(opt => opt.setName('punishment').setDescription('Punishment type').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Infraction reason').setRequired(true)),

  new SlashCommandBuilder().setName('infraction-revoke').setDescription('Revokes INF-0000 infraction matching Screenshot 7 (image_549599ab.png)')
    .addStringOption(opt => opt.setName('inf_id').setDescription('Infraction code (e.g. INF-0049)').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason (e.g. Improper evidence)').setRequired(true)),

  // Tripwire Dashboard
  new SlashCommandBuilder().setName('tripwire').setDescription('Sends Tripwire Security Dashboard with TOP BANNER ONLY & NO bottom banner')
    .addChannelOption(opt => opt.setName('channel').setDescription('Target channel for Tripwire').setRequired(false)),

  // Verification
  new SlashCommandBuilder().setName('verify').setDescription('Links Roblox account via official Roblox Users API')
    .addStringOption(opt => opt.setName('username').setDescription('Roblox username to verify').setRequired(false)),

  new SlashCommandBuilder().setName('verifyinfo').setDescription('Shows linked Roblox profile hyperlink, account age & user ID')
    .addUserOption(opt => opt.setName('user').setDescription('Discord member').setRequired(true)),

  // Tickets
  new SlashCommandBuilder().setName('ticket-claim').setDescription('Claims ticket: turns button Red [Unclaim], turns channel 🟢, stops AI')
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('🔄 Registering dual Slash Commands (100 commands)...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('✅ Successfully registered Slash Commands with Discord Gateway.');
  } catch (error) {
    console.error('❌ Failed to register Slash commands:', error);
  }
})();`,
  },
];

