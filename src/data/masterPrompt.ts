export const MASTER_PROMPT_CONTENT = `You are an elite Discord.js v14 systems architect, cybersecurity engineer, and backend developer. 

Build a complete, enterprise-grade, standalone Discord Bot repository for "Los Angeles Roleplay / New York City Roleplay" (LARP/NYRP) in Node.js (v18+) with Discord.js v14, SQLite persistence (better-sqlite3 with WAL mode), Cookie API ticket transcripts, Groq AI ticket assistance, Sapling AI application writing detection, and a high-performance YouTube audio engine.

CRITICAL ARCHITECTURE REQUIREMENTS:
1. This is a REAL DISCORD BOT (NO placeholder website, NO dummy frontend). Everything is executed via Discord slash commands and '!' prefix commands.
2. File Structure: Strictly modular with clean separation of commands, button handlers, select menu handlers, events, and API services:
   ├── index.js                    # Client initialization, 100 activities & 50 statuses rotation, DND presence
   ├── config.js                   # Reads all .env variables with fallbacks & validation
   ├── db.js                       # SQLite database tables & WAL mode initialization
   ├── package.json                # All dependencies (discord.js, @discordjs/voice, play-dl, better-sqlite3, axios, etc.)
   ├── .env.example                # Full environment variable blueprint with all top & bottom banners
   ├── src/
   │   ├── commands/               # 100 modular commands organized in folders:
   │   │   ├── staff/              # promote, infraction, training, feedback, duty, blacklist, etc.
   │   │   ├── tickets/            # assistance-panel, claim, close, transcript, escalate, ai-support
   │   │   ├── applications/       # applications-panel, apply, review, approve, deny, score
   │   │   ├── music/              # play, pause, skip, back, queue, volume, filter (20 filters)
   │   │   ├── security/           # tripwire, watchdog, antiping, evidence, lockdown
   │   │   ├── roleplay/           # departments, regulations, dashboard, session, stats
   │   │   ├── marketplace/        # marketplace, giveaway, orders, reroll
   │   │   └── utility/            # verify, roblox-lookup, bot-presence, banner-config, help
   │   ├── buttons/                # Individual interaction handlers for every button
   │   ├── selects/                # Dropdown menu handlers (ticket category, app start, regulations)
   │   ├── events/                 # ready.js, messageCreate.js, interactionCreate.js, guildMemberAdd.js
   │   ├── services/
   │   │   ├── cookieApi.js        # Official Cookie API transcript generator & local HTML backup
   │   │   ├── groqAi.js           # Groq AI Support Assistant with staff handbook knowledge base
   │   │   ├── saplingAi.js        # Sapling AI Writing detector for staff application responses
   │   │   └── audioFilters.js     # FFmpeg audio filter configurations for 20 music filters
   │   └── utils/
   │       └── embedBuilder.js     # Universal rich embed builder injecting TOP & BOTTOM banners

================================================================================
SECTION 1: THE .ENV CONFIGURATION BLUEPRINT (TOP & BOTTOM BANNERS)
================================================================================
Provide a complete .env.example with individual TOP_BANNER and BOTTOM_BANNER variables for every department, command, and panel. Every rich embed must fetch its corresponding banner from this config:

\`\`\`env
# DISCORD BOT CREDENTIALS
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here
PREFIX=!

# PERMISSION ROLES
FOUNDER_ROLE_ID=123456789012345678
DIRECTIVE_ROLE_ID=123456789012345679
MANAGEMENT_ROLE_ID=123456789012345680
INTERNAL_AFFAIRS_ROLE_ID=123456789012345681
SENIOR_STAFF_ROLE_ID=123456789012345682
STAFF_ROLE_ID=123456789012345683
TRAINEE_ROLE_ID=123456789012345684
VERIFIED_ROLE_ID=123456789012345685
DJ_ROLE_ID=123456789012345686

# LOG CHANNELS
LOGS_CHANNEL_ID=123456789012345690
TRANSCRIPTS_CHANNEL_ID=123456789012345691
APPLICATION_REVIEWS_CHANNEL_ID=123456789012345692
TRIPWIRE_CHANNEL_ID=123456789012345693
TRAINING_ANNOUNCEMENTS_CHANNEL_ID=123456789012345694
TRAINING_LOGS_CHANNEL_ID=123456789012345695
PROMOTIONS_CHANNEL_ID=123456789012345696
INFRACTIONS_CHANNEL_ID=123456789012345697
STAFF_FEEDBACK_CHANNEL_ID=123456789012345698

# TOP & BOTTOM BANNERS (MANDATORY FOR ALL RICH EMBEDS)
PROMOTIONS_TOP_BANNER=https://your-domain.com/banners/promotions-top.png
PROMOTIONS_BOTTOM_BANNER=https://your-domain.com/banners/bottom-strip.png

INFRACTIONS_TOP_BANNER=https://your-domain.com/banners/infractions-top.png
INFRACTIONS_BOTTOM_BANNER=https://your-domain.com/banners/bottom-strip.png

APPLICATIONS_TOP_BANNER=https://your-domain.com/banners/applications-top.png
APPLICATIONS_BOTTOM_BANNER=https://your-domain.com/banners/bottom-strip.png

RESULTS_TOP_BANNER=https://your-domain.com/banners/results-top.png
RESULTS_BOTTOM_BANNER=https://your-domain.com/banners/bottom-strip.png

ASSISTANCE_TOP_BANNER=https://your-domain.com/banners/assistance-top.png
ASSISTANCE_BOTTOM_BANNER=https://your-domain.com/banners/bottom-strip.png

MARKETPLACE_TOP_BANNER=https://your-domain.com/banners/marketplace-top.png
MARKETPLACE_BOTTOM_BANNER=https://your-domain.com/banners/bottom-strip.png

REGULATIONS_TOP_BANNER=https://your-domain.com/banners/regulations-top.png
REGULATIONS_BOTTOM_BANNER=https://your-domain.com/banners/bottom-strip.png

DEPARTMENTS_TOP_BANNER=https://your-domain.com/banners/departments-top.png
DEPARTMENTS_BOTTOM_BANNER=https://your-domain.com/banners/bottom-strip.png

STAFF_FEEDBACK_TOP_BANNER=https://your-domain.com/banners/feedback-top.png
STAFF_FEEDBACK_BOTTOM_BANNER=https://your-domain.com/banners/bottom-strip.png

TRAINING_TOP_BANNER=https://your-domain.com/banners/training-top.png
TRAINING_BOTTOM_BANNER=https://your-domain.com/banners/bottom-strip.png

# TRIPWIRE HAS TOP BANNER ONLY (NO BOTTOM BANNER)
TRIPWIRE_TOP_BANNER=https://your-domain.com/banners/tripwire-top.png

# COOKIE API TRANSCRIPTS CONFIGURATION
COOKIE_API_KEY=your_cookie_api_key_here
COOKIE_API_BASE_URL=https://api.cookieapi.com/v1

# GROQ AI SUPPORT ASSISTANT (TICKETS)
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
GROQ_AI_SUPPORT_ENABLED=true

# SAPLING AI WRITING DETECTION (APPLICATIONS)
SAPLING_API_KEY=your_sapling_api_key_here
SAPLING_ENABLED=true

# BOT PRESENCE & ROTATION
BOT_PRESENCE_STATUS=dnd
BOT_ACTIVITY_ROTATION=true
BOT_ACTIVITY_INTERVAL=30000
BOT_STATUS_INTERVAL=60000
\`\`\`

================================================================================
SECTION 2: STAFF APPLICATION SYSTEM (15 QUESTIONS + AI SAPLING ANALYSIS)
================================================================================
1. The Initial Panel:
   - Posted via \`!applications-panel\` in the public applications channel.
   - Embed contains \`APPLICATIONS_TOP_BANNER\` and \`APPLICATIONS_BOTTOM_BANNER\`.
   - Text explains age limit (13+), having Roblox username/ID/timezone ready, and review by the High-Ranking team.
   - Action Row: Select Menu with option "Staff Application: Apply for staff".
2. Channel Creation & Interactive AI Question Flow:
   - User selects the dropdown -> creates private channel \`#app-username\` (or private thread/DM).
   - Bot greets: "Are you ready to start?" with button [Start Application].
   - Sequential 15-question flow (records each answer into SQLite):
     Q1: Roblox username & numeric User ID
     Q2: Age confirmation (13 or older)
     Q3: Timezone & daily active hours
     Q4: Microphone capability for voice meetings
     Q5: Past staff experience (ranks & communities)
     Q6: Why do you want to join our Staff Team over others?
     Q7: What makes you stand out from other applicants?
     Q8: Scenario: Witnessing a high rank abusing commands
     Q9: Scenario: Member constantly arguing & insulting in tickets
     Q10: Scenario: Two players accusing RDM with no video proof
     Q11: Define "Fail Roleplay" and "Fear Roleplay" with examples
     Q12: Commitment to complete staff training within 7 days
     Q13: Dual-duty status in other servers
     Q14: Blacklist agreement for trolling/false info
     Q15: Final statement for the High-Ranking team
   - Before question 15, AI prompts: "Are you almost done?"
   - User finishes and clicks [Submit Application].
3. AI Writing Detection via Sapling API:
   - Concatenates essay responses and calls Sapling AI detection endpoint.
   - Calculates overall AI probability score (e.g., 94% Human, 6% AI Generated).
   - Flags any paragraph exceeding 40% AI likelihood.
4. Reviewer Notification Embed:
   - Posts in \`APPLICATION_REVIEWS_CHANNEL_ID\` and pings application reviewers.
   - Displays applicant's Discord tag, ID, Roblox info, full 15 answers, and Sapling AI Score.
   - Action Row:
     - [Approve Trainee] (Green)
     - [Deny Application] (Red)
     - [Hold / Interview] (Gray)
5. Decision Dispatch & DMs:
   - When Reviewer clicks [Approve]:
     - Assigns \`TRAINEE_ROLE_ID\`.
     - Sends DM to applicant with \`RESULTS_TOP_BANNER\` & \`RESULTS_BOTTOM_BANNER\`:
       "We would like to congratulate you on passing your application and becoming a Trainee within our server. Your dedication throughout your application has stood out to us..."
   - When Reviewer clicks [Deny]:
     - Sends DM with \`RESULTS_TOP_BANNER\` & \`RESULTS_BOTTOM_BANNER\`:
       "On behalf of the high rank team, we are sad to have had to decline your application. We appreciate all that you have put forward..."

================================================================================
SECTION 3: ASSISTANCE & TICKETS WITH OFFICIAL COOKIE API TRANSCRIPTS
================================================================================
1. The Contact Us Panel (\`!assistance-panel\`):
   - Styled with \`ASSISTANCE_TOP_BANNER\` and \`ASSISTANCE_BOTTOM_BANNER\`.
   - Category Select Menu:
     - ⚙️ General: Questions, support, and assistance from any staff member.
     - 👥 High Rank: Escalated concerns requiring senior staff attention.
     - 👮 Department: Department-related or high-priority leadership matters.
2. The Ticket Channel & Dynamic Naming:
   - Channel naming format: \`category-numbers\`, e.g. \`🔴-general-0014\`.
   - Title Header: \`General Support #0014\`.
   - Dynamic Status Emojis:
     - Unclaimed: \`🔴\` (Red circle emoji: waiting for staff response).
     - Claimed: \`🟢\` (Green circle emoji: staff actively assisting).
   - Channel Permissions: Locked to ticket creator, Verified role, Support Team, and Directive Team.
3. Ticket Announcement Embed & Verified Details:
   - Mentions \`@Support Team\` above the embed.
   - Embed Title: \`⚙️ General Support\`.
   - Description: "Hello @User thank you for reaching out to us. Please remain patient as one of our staff members comes to assist you."
   - Roblox Information (Pulled from SQLite verification table):
     - Roblox Username: \`[username](https://www.roblox.com/users/{robloxId}/profile)\` (clickable link to official profile).
     - Roblox ID: numeric ID.
     - Account Creation: e.g. "Dec 3, 01:47 PM".
   - Discord Information:
     - Discord Account: \`@User\` mention.
     - Discord ID: Snowflake ID.
     - Account Creation: e.g. "Oct 1, 09:57 AM".
   - Inquiry Box: Displays member's inquiry in monospace codeblock (e.g. \`When will the server gonna be finished?\`).
4. Interactive Claim / Unclaim Button Mechanics:
   - Initial State (Unclaimed):
     - [Claim] Button: GREEN (\`ButtonStyle.Success\`).
     - [Close] Button: RED (\`ButtonStyle.Danger\`).
     - [Escalate] Button: GRAY (\`ButtonStyle.Secondary\`).
   - When Staff or Directive clicks [Claim]:
     - [Claim] button automatically transforms into [Unclaim] and turns RED (\`ButtonStyle.Danger\`).
     - Channel automatically renames from \`🔴-general-XXXX\` to \`🟢-general-XXXX\`.
     - Bot posts staff takeover message in chat:
       \`✓ @StaffMember has now claimed this ticket.\`
       (Or if Directive: \`✓ @StaffMember (Directive Team) has now claimed this ticket.\`).
     - AI Support Assistant immediately STOPS/PAUSES automated replies so human staff takes full control.
   - When Staff clicks [Unclaim]:
     - Button transforms back to [Claim] in GREEN (\`ButtonStyle.Success\`).
     - Channel automatically renames from \`🟢-general-XXXX\` to \`🔴-general-XXXX\`.
     - Bot posts: \`✕ @StaffMember has unclaimed this ticket.\`.
     - AI Assistant resumes assisting if user asks further questions.
5. AI Support Assistant & Fallback Hand-off:
   - While ticket is unclaimed and user asks questions, AI assistant provides answers from rules/handbook knowledge base.
   - If AI cannot be reached or model times out:
     \`\`\`
     (edited)
     I can't reply right now, so a human staff member will assist you shortly.
     Summary for staff: The AI couldn't be reached.
     AI Assistant · Handed to staff
     \`\`\`
   - Once human staff joins or claims, AI assistant halts responses until ticket is unclaimed.
6. Ticket Closure & Official Cookie API Transcript:
   - Staff clicks [Close].
   - Compiles complete message history (authors, timestamps, attachments, embeds).
   - Sends payload to official Cookie API endpoint (\`https://api.cookieapi.com/v1/transcripts\`).
   - Validates response URL. If API fails, generates local HTML backup.
   - Posts Closed Ticket Embed to \`TRANSCRIPTS_CHANNEL_ID\`:
     - Ticket #, Category, Handled By, Closed By, Opened time, Duration, Messages Sent count.
     - Action Row: Link Button [Online Transcript ↗] pointing to the valid Cookie API URL.
   - DMs the same embed to the ticket creator.
   - Deletes ticket channel only AFTER transcript generation succeeds.


================================================================================
SECTION 4: YOUTUBE MUSIC ENGINE (1-SECOND PROGRESS BAR, 25 AUDIO FILTERS & 25+ QUEUE)
================================================================================
1. Live Controller Embed:
   - Streams YouTube / Spotify tracks via \`@discordjs/voice\` and \`play-dl\`.
   - Real-time updates every 1 SECOND:
     \`\`\`
     [02:45 / 04:12] 🔘▬▬▬▬▬▬▬▬▬▬▬▬▬▬
     Volume: 80% | Filters: [Nightcore, 8D]
     \`\`\`
   - Action Row 1: [⏮️ Back] [⏯️ Pause/Resume] [⏭️ Skip] [🔁 Loop] [📜 Queue]
   - Action Row 2: [🔉 Vol -10] [🔊 Vol +10] [🎛️ Audio Filters Menu] [⏹️ Stop]
2. Supported 25 Audio Filters via FFmpeg:
   1) Nightcore (High pitch + 1.25x speed)
   2) 8D Audio (Binaural panning spatial surround)
   3) Bass Boost (+10dB low-end enhancement)
   4) Vaporwave (Slowed 0.8x with vintage tape warmth)
   5) Speed 1.25x (1.25x tempo without pitch shift)
   6) Treble Boost (Crisp high-frequency sparkle)
   7) Karaoke (Center-channel vocal remover)
   8) Slowed + Reverb (Cathedral acoustic space)
   9) Flanger (Jet-engine sweeping delay modulation)
   10) Echo (300ms rhythmic audio reflections)
   11) Sub-Bass Boost (Ultra-low 40Hz sub-rumble)
   12) Surround 7.1 (Multichannel stereo simulation)
   13) Phaser (Spacey audio frequency notch sweeps)
   14) Normalizer (Even volume levels across all tracks)
   15) Vibrato (Gentle pitch wavering tremolo effect)
   16) Compressor (Punchy radio broadcast studio limiter)
   17) Lowpass (Muffled underwater / club hallway vibe)
   18) Highpass (Radio walkie-talkie / telephone acoustic)
   19) Mono Mixdown (Single centered mono track)
   20) Pitch Shift +2 (Higher key signature transposition)
   21) Chorus Effect (Rich multi-voice spatial thickening)
   22) Tremolo (Rapid pulsating amplitude modulation)
   23) Distortion (Heavy rock guitar overdrive saturation)
   24) Reverse Audio (Backward time-reversed audio playback)
   25) Underwater Deep (Submerged lowpass resonant filter)
3. 25+ YouTube Track Queue & Playlist Support:
   - Supports loading individual YouTube URLs, searches, and full playlists up to 25+ songs.
   - Preserves queue order with track indexing (Track 1 to 25+).
   - Shows total queue duration, requester tags, and track progression.
   - Loop modes: Off, Loop Track, Loop Queue.


================================================================================
SECTION 5: TRIPWIRE SECURITY SYSTEM (TOP BANNER ONLY)
================================================================================
1. The Tripwire Embed (\`!tripwire\`):
   - Configured with \`TRIPWIRE_TOP_BANNER\` across top.
   - STRICT RULE: NEVER include a bottom banner on Tripwire!
   - Content:
     "🛡️ LOS ANGELES ROLEPLAY TRIPWIRE SECURITY SYSTEM
     ⚠️ WELCOME TO LOS ANGELES ROLEPLAY TRIPWIRE ⚠️
     This channel is dedicated to detecting malicious bots, suspicious automated activity, and potential threats to our community.
     To help keep Los Angeles Roleplay safe, we ask that legitimate human members DO NOT send messages in this channel.
     ⚠️ IMPORTANT WARNING: Any legitimate member who sends a message in this channel may receive an automatic softban."
   - Action Row (EXACTLY TWO DISABLED BUTTONS):
     - Button 1: Label: "⚠️ SECURITY WARNING", Style: Danger (Red), Disabled: true.
     - Button 2: Label: "⚠️ [TOTAL] SOFTBANS • [TOTAL] PROTECTED MEMBERS", Style: Secondary (Gray), Disabled: true.
   - Live query calculates real softbans and member counts upon refresh.

================================================================================
SECTION 6: STAFF DISCIPLINARY, PROMOTIONS & REVOCATION SYSTEM
================================================================================
1. Promotions (\`!promote\`):
   - Generates sequential database code starting at PRO-0000:
     Code format: PRO-0000, PRO-0001, PRO-0043, etc. (reflecting the exact historical count of promotions in SQLite).
   - Rich Embed with PROMOTIONS_TOP_BANNER and PROMOTIONS_BOTTOM_BANNER:
     🪪 **Staff Member:** @Djshsdhzudyx
     👤 **Promotion:** @Junior Administrator
     
     📌 **Reason:** Fastpassed
     🗽 @Joekenz - PRO-0043
   - Automatically synchronizes Discord roles.
   - Creates a sub-thread for congratulations with [Revoke Promotion] button for high ranks.
   - Command \`!promotion-revoke <PRO-ID> [reason]\` revokes the promotion and logs:
     "✕ Promotion Revoked: PRO-0039 (@Junior Administrator) for @Killer2hikids was revoked by @joseph5g12345. | already staff."

2. Infractions (\`!infraction\`):
   - Generates sequential database code starting at INF-0000:
     Code format: INF-0000, INF-0001, INF-0049, INF-0055, etc.
   - Rich Embed with INFRACTIONS_TOP_BANNER and INFRACTIONS_BOTTOM_BANNER:
     🪪 **Staff Member:** @Riffle48
     ⚠️ **Punishment:** Termination (or Demotion, Warning, Strike, Blacklist)
     📎 **Appealable:** No (or Yes)
     
     📌 **Reason:** Raider
     🗽 @Graves - INF-0055
   - Action Row:
     - [Appeal Infraction] (Button)
   - When [Appeal Infraction] is clicked:
     - Opens a dedicated Internal Affairs Ticket Channel: \`#🔒-ia-appeal-inf-xxxx\`.
     - The AI Support Assistant immediately initiates the appeal:
       "Hello! You are appealing Infraction INF-xxxx. Please state why you believe this disciplinary action was issued unfairly, and upload any screenshot or video evidence."
     - Pings @Internal Affairs Team for formal human review.
     - Saves all statements and evidence into the database.

3. Infraction Revocation (\`!infraction-revoke\`):
   - Command: \`!infraction-revoke <INF-ID> [reason]\`
   - Sends exact Discord embed:
     Title: "✓ Infraction Revoked" (Blue/White bold)
     Description:
     "INF-0049 (Warning) for @2012TyLane was revoked by @strxlc.
     | Improper evidence"
   - Adjusts user's strike counter in SQLite and removes punitive roles if strike count drops below threshold.

================================================================================
SECTION 7: BLOXLINK VERIFICATION, DEPARTMENTS & SERVER STATISTICS
================================================================================
1. Bloxlink Verify (\`!verify-panel\`):
   - Embed: "Welcome to Los Angeles Roleplay! Click the button below to Verify with Bloxlink and gain access to the rest of the server."
   - Action Row:
     - [Verify with Bloxlink] (Success Green - OAuth link or role assignment)
     - [Need help? ↗] (Secondary Gray - Step-by-step tutorial link)
2. Departments Panel (\`!departments\`):
   - Uses \`DEPARTMENTS_TOP_BANNER\` and \`DEPARTMENTS_BOTTOM_BANNER\`.
   - Lists whitelisted departments: MDSO (Miami-Dade/LAPD), FHP (Highway Patrol), FBI, NYSP, NYCSO.
   - Action Row: [Join ↗] buttons for each department application.
3. Server Statistics (\`!server-stats\`):
   - Rich embed displaying Members (19,800), Online (1,703), Boosts (36) in styled box format.
4. Auto Moderation & Disappearing Anti-Ping System:
   - Trigger: Detects direct role mentions OR replying to members of @Foundation Team or @Directive Team with reply ping toggled ON.
   - Action 1: Instantly deletes the offender's pinging message to prevent notifying leadership.
   - Action 2: Sends the exact Rich Warning Embed:
     Title: "⚠️ Please Don't Ping"
     Description:
     "<@user>, you can't ping members of the **Foundation Team** or **Directive Team**.
     | If you're replying to one of them, turn the ping off first. The GIF below shows you how."
     Image: Displays the animated tutorial GIF from ANTI_PING_GIF_URL:
     https://media.discordapp.net/attachments/1554305957465690113/1566982177218887861/anti_ping.gif
   - Action 3 (CRITICAL AUTO-DISAPPEAR): The warning embed automatically deletes itself after 7 seconds:
     \`\`\`js
     const warningMsg = await message.channel.send({ embeds: [antiPingEmbed] });
     setTimeout(() => warningMsg.delete().catch(() => {}), 7000);
     \`\`\`
     This guarantees chat stays completely clean and uncluttered.

================================================================================
SECTION 8: 100 ROTATING ACTIVITIES & 50 CUSTOM STATUSES (DND PRESENCE)
================================================================================
1. Discord Presence:
   - Always sets status to \`dnd\` (Do Not Disturb) upon ready and reconnects.
2. 100 Rotating Activities (every 30 seconds):
   - Alternates between ActivityType.Watching and ActivityType.Listening.
   - Full list of 100 themed activities (e.g. "Watching Los Angeles Roleplay", "Listening to 911 Emergency Dispatch", "Watching Tripwire Security Perimeter", etc.).
   - Never repeats immediately previous item.
3. 50 Custom Status Messages (every 60 seconds):
   - 50 Los Angeles/New York themed statuses.

================================================================================
SECTION 9: FULL 100 PREFIX COMMANDS CATALOG & MANDATORY DM NOTIFICATIONS
================================================================================
All commands strictly use the prefix \`!\`.

CRITICAL MODERATION DIRECT MESSAGE (DM) DISCIPLINE:
Whenever any moderation or disciplinary action is taken (!ban, !kick, !mute, !unmute, !warn, !warn-remove, !infraction, !promote, !app-approve, !app-deny), the bot MUST send a formal, styled Direct Message (DM) to the target recipient prior to executing the action. If the user's DMs are closed, the bot catches the error and appends "(⚠️ Unable to deliver DM notification)" to the server mod-log embed.

1. Moderation & Sanctions (1-7) — All with Automated DM Dispatch:
   - !ban <@user> [reason]: Direct Messages target with Server, Moderator tag, Reason, and Appeal Link (https://discord.gg/larp-appeals), then bans member.
   - !kick <@user> [reason]: Direct Messages target with Server, Moderator, Reason, and Re-entry rules, then kicks member.
   - !mute <@user> <duration> [reason]: Direct Messages target with Duration (e.g. 24h), Reason, and expiration notice, then applies Discord timeout.
   - !unmute <@user> [reason]: Direct Messages target that their voice and chat privileges have been restored.
   - !warn <@user> <reason>: Direct Messages target with Warning ID (WARN-0019), Reason, and 3-strike escalation policy.
   - !warns <@user>: Displays active warnings list and strike count in SQLite.
   - !warn-remove <WARN-ID> [reason]: Pardons warning in database and Direct Messages member.

2. Staff Hierarchy & Disciplinary (8-25):
   - !promote <@user> <new_rank> [reason]: Generates PRO-0000 sequence code, sets role, sends embed with top & bottom banners, creates thread, and DMs member.
   - !promotions-list <@user>: Timeline of all historical promotions.
   - !promotion-revoke <PRO-ID> [reason]: Revokes promotion log (Screenshot 1 matching).
   - !infraction <@user> <punishment> <reason>: Generates INF-0000 code, sets punishment, sends top & bottom banner embed with [Appeal Infraction] button, and DMs member.
   - !infractions-list <@user>: Disciplinary ledger for staff member.
   - !infraction-revoke <INF-ID> [reason]: Revokes infraction (Screenshot 7 / image_549599ab.png blue box matching).
   - !infraction-appeal <INF-ID>: Opens #ia-appeal-inf-xxxx channel with AI Support Assistant.
   - !training-log <@trainee> <passed|failed> [notes]: Logs classroom training outcome with Trainee, Trainer, and bottom banner (Screenshot 2).
   - !staff-feedback <@staff> <1-5> [comment]: 5-star rating with review comment.
   - !feedback-list <@staff>: Aggregated star ratings for staff.
   - !staff-blacklist <@user> <reason>: Permanent staff blacklist with DM.
   - !staff-unblacklist <@user> [reason]: Pardons staff blacklist with DM.
   - !duty-on: Clocks in on active staff shift, adds @On-Duty role.
   - !duty-off: Clocks off duty, computes shift hours into SQLite.
   - !duty-leaderboard: Weekly top staff by shift hours.
   - !staff-activity <@staff>: Messages, ticket claims, and duty stats.
   - !strike-remove <INF-ID>: Pardons disciplinary strike with DM.
   - !chain-of-command: Complete leadership chain and role hierarchy.

3. Tickets & Assistance (26-39):
   - !assistance-panel [#channel]: Posts Contact Us panel with category dropdown.
   - !ticket-claim: Claims ticket, renames channel to 🟢-general-xxxx, turns button RED Unclaim, and pauses AI assistant.
   - !ticket-unclaim: Unclaims ticket, renames channel to 🔴-general-xxxx, turns button GREEN Claim, and resumes AI assistant.
   - !ticket-escalate [directive|ia]: Escalates ticket to leadership.
   - !ticket-close [reason]: Closes ticket, compiles Cookie API transcript, and DMs creator with online transcript link.
   - !transcript: Generates real-time Cookie API HTML transcript link.
   - !transcript-test: Tests Cookie API credentials and endpoint.
   - !ticket-add <@user>: Adds user to private ticket.
   - !ticket-remove <@user>: Removes user from private ticket.
   - !ticket-rename <new_name>: Renames channel title.
   - !ticket-active: Sets active green indicator on ticket.
   - !ai-support [query]: Manually queries AI Assistant in ticket.
   - !ai-support-toggle <category> <on|off>: Toggles AI assistance.
   - !ticket-stats: Total tickets closed, response times, and ratings.

4. Staff Applications & Sapling AI (40-51):
   - !applications-panel, !apply, !app-review, !app-approve (with DM), !app-deny (with DM), !app-score, !app-pending, !app-questions, !app-status, !app-stats, !app-hold, !app-interview.

5. YouTube Music Engine & 25 Filters (52-67):
   - !play, !pause, !resume, !skip, !back, !queue (supports 25+ songs), !volume, !filter (25 FFmpeg filters), !filter-list, !loop, !shuffle, !stop, !nowplaying (1s progress bar), !seek, !lyrics, !dj-role.

6. Security & Watchdog (68-79):
   - !tripwire (TOP BANNER ONLY), !tripwire-stats, !watchdog-status, !antiping-toggle (7s auto-disappearing GIF), !evidence-add, !evidence-view, !ia-case, !lockdown, !unlock, !security-audit, !quarantine (with DM), !unquarantine (with DM).

7. Roleplay & Departments (80-89):
   - !departments, !regulations, !dashboard, !notifications-panel, !session-start, !session-vote, !session-boost, !session-full, !session-shutdown, !cad.

8. Marketplace & Giveaways (90-94):
   - !marketplace, !giveaway, !giveaway-reroll, !giveaway-end, !orders-queue.

9. Roblox Verification & Utility (95-100):
   - !verify [roblox_username]: Links account via official Roblox Users API, updates nickname to RobloxUsername | DiscordUsername, assigns @Verified.
   - !verifyinfo <@user>: Audits verified Roblox account.
   - !verifylookup <RobloxUsername>: Reverse lookup.
   - !unverify <@user> [reason]: Unlinks account and resets nickname (with DM).
   - !verifyrefresh <@user>: Refreshes display name.
   - !help [category]: Directory of all 100 commands.
================================================================================
SECTION 10: ROBLOX VERIFICATION, WELCOME ONBOARDING & BOOSTER PERKS
================================================================================
1. The !verify Command (Prefix only):
   - Member runs: !verify
   - Bot asks: "Please enter your Roblox username below to begin verification."
   - User inputs their Roblox username.
   - Validation & Official Roblox Users API:
     Endpoint: POST https://users.roblox.com/v1/usernames/users
     Payload: { usernames: [inputUsername], excludeBannedUsers: true }
     Confirms account exists, fetches Roblox User ID, exact username, and display name.
   - Optional Ownership Check (VERIFY_OWNERSHIP_CHECK=true):
     Generates temporary code (e.g. "larp-verify-7391") and checks user's profile description via https://users.roblox.com/v1/users/{userId}.
   - Permanent SQLite Storage:
     Table roblox_verifications:
     (discord_user_id TEXT PRIMARY KEY, discord_username TEXT, roblox_user_id TEXT UNIQUE, roblox_username TEXT, roblox_display_name TEXT, verified_at DATETIME, status TEXT)
   - Role Management:
     - Removes UNVERIFIED_ROLE_ID
     - Grants VERIFIED_ROLE_ID
   - Automatic Discord Server Nickname Update:
     Format: RobloxUsername | DiscordUsername (e.g. "Carlos123 | Carlos")
     Truncated to 32 characters if needed.
   - Confirmation Embed:
     "LOS ANGELES ROLEPLAY — VERIFICATION COMPLETE
     Your Roblox account has been successfully linked to your Discord account.
     Discord Account: <@user>
     Roblox Username: RobloxUsername
     Roblox User ID: RobloxID
     Status: Verified
     Your server role has been updated, and your Discord nickname has been changed.
     Thank you for verifying with Los Angeles Roleplay."

2. Ticket System Integration:
   - When verified, all active and future ticket records for the user sync their verified Roblox username & ID.
   - Staff viewing any ticket see:
     Discord Information: Username, ID, Server Nickname
     Roblox Information: Username, Display Name, User ID, Verified Date, Status.

3. Staff Verification Commands:
   - !verify — Start member verification
   - !verifyinfo <@user> — View linked Roblox & Discord info
   - !verifylookup <RobloxUsername> — Search linked account by Roblox name/ID
   - !unverify <@user> [reason] — Unlinks account and removes Verified role
   - !verifyrefresh <@user> — Syncs latest Roblox name and refreshes nickname

4. Server Join Welcome with Verify Link:
   - Event: guildMemberAdd
   - Sends exact message:
     "👋 [-] Welcome <@user> to New York City Roleplay! You are our 19,794th member, we hope you enjoy your stay!
     Ensure to verify to stop in-game Private Messages."
   - Action Row:
     - Button 1: Link Button [Verify ↗] pointing to verification channel
     - Button 2: Secondary Button [19,794] (disabled member counter)

5. Server Repping & Booster Perks:
   - Detects users equipping the server vanity tag (.gg/larp or NYC) in status:
     Embed:
     "🏙️ Thank You for Repping Us!
     Thank you <@user> for equipping our NYC server tag! Showing it off helps more people find New York City Roleplay."
     Includes bottom banner strip.
   - Detects Server Boosters (guildMemberUpdate with premiumSince):
     Sends congratulations embed, grants Booster Role, and unlocks in-game vehicle & chat perks upon verification.

Provide complete, executable, production-ready code with no placeholder omissions. Ensure error handlers prevent the bot from crashing during Discord API timeouts or network drops.
`;
