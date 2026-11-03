export interface SlashOption {
  name: string;
  description: string;
  type: 'USER' | 'STRING' | 'INTEGER' | 'BOOLEAN' | 'CHANNEL' | 'ROLE';
  required: boolean;
}

export interface BotCommand {
  id: string;
  name: string;
  slashName: string;
  category: 'Moderation' | 'Staff' | 'Tickets' | 'Applications' | 'Music' | 'Security' | 'Roleplay' | 'Marketplace' | 'Verification' | 'Utility';
  description: string;
  syntax: string;
  slashSyntax: string;
  slashOptions?: SlashOption[];
  permission: 'Everyone' | 'Staff' | 'Senior Staff' | 'Internal Affairs' | 'Management' | 'Founder';
  hasTopBanner: boolean;
  hasBottomBanner: boolean;
  dmsUser: boolean;
  dmPreview?: {
    title: string;
    description: string;
    fields: { name: string; value: string }[];
    footer: string;
  };
  channelPreview?: {
    title: string;
    description: string;
    color: string;
  };
}

// Raw command list with prefix definitions
const RAW_COMMANDS: Array<Omit<BotCommand, 'slashName' | 'slashSyntax'> & { slashName?: string; slashSyntax?: string }> = [
  // --- MODERATION & DMs (1-7) ---
  {
    id: '1',
    name: '!ban',
    category: 'Moderation',
    description: 'Bans a user from the server. Automatically Direct Messages (DMs) the user with punishment details, reason, moderator, and appeal link before ban.',
    syntax: '!ban <@user> [reason]',
    permission: 'Management',
    hasTopBanner: false,
    hasBottomBanner: false,
    dmsUser: true,
    dmPreview: {
      title: '🔨 You have been banned from Los Angeles Roleplay',
      description: 'You were banned from **Los Angeles Roleplay / New York City Roleplay**.',
      fields: [
        { name: 'Server', value: 'Los Angeles Roleplay' },
        { name: 'Moderator', value: '@Aviator62284' },
        { name: 'Reason', value: 'Severe toxicity / advertising competing communities' },
        { name: 'Appeal Information', value: 'You can submit an appeal in our Internal Affairs Tribunal ticket or via https://discord.gg/larp-appeals' }
      ],
      footer: 'Los Angeles Roleplay • Automated Moderation'
    },
    channelPreview: {
      title: '🔨 Member Banned',
      description: '**@Ronaldoiscat** was banned by **@Aviator62284**.\n**Reason:** Severe toxicity / advertising competing communities\n*Direct Message (DM) notification dispatched successfully.*',
      color: '#da373c'
    }
  },
  {
    id: '2',
    name: '!kick',
    category: 'Moderation',
    description: 'Kicks a user from the server. Automatically Direct Messages (DMs) them the reason and re-entry conditions before removal.',
    syntax: '!kick <@user> [reason]',
    permission: 'Senior Staff',
    hasTopBanner: false,
    hasBottomBanner: false,
    dmsUser: true,
    dmPreview: {
      title: '👢 You have been kicked from Los Angeles Roleplay',
      description: 'You were kicked from **Los Angeles Roleplay**.',
      fields: [
        { name: 'Server', value: 'Los Angeles Roleplay' },
        { name: 'Moderator', value: '@Aviator62284' },
        { name: 'Reason', value: 'Inactivity during mandatory staff roster check' },
        { name: 'Rejoin Information', value: 'You may rejoin the server using our invite link once you are ready to remain active.' }
      ],
      footer: 'Los Angeles Roleplay • Automated Moderation'
    },
    channelPreview: {
      title: '👢 Member Kicked',
      description: '**@Ronaldoiscat** was kicked by **@Aviator62284**.\n**Reason:** Inactivity during mandatory staff roster check\n*Direct Message (DM) notification dispatched successfully.*',
      color: '#e67e22'
    }
  },
  {
    id: '3',
    name: '!mute',
    category: 'Moderation',
    description: 'Applies Discord timeout/mute to a member. Automatically Direct Messages (DMs) the user with duration, reason, and moderator tag.',
    syntax: '!mute <@user> <duration> [reason]',
    permission: 'Staff',
    hasTopBanner: false,
    hasBottomBanner: false,
    dmsUser: true,
    dmPreview: {
      title: '🔇 You have been muted in Los Angeles Roleplay',
      description: 'You have received a temporary mute/timeout in **Los Angeles Roleplay**.',
      fields: [
        { name: 'Server', value: 'Los Angeles Roleplay' },
        { name: 'Duration', value: '24 Hours' },
        { name: 'Moderator', value: '@Aviator62284' },
        { name: 'Reason', value: 'Spamming in public roleplay channels' },
        { name: 'Notice', value: 'Your ability to send messages and connect to voice channels will be automatically restored once the timer expires.' }
      ],
      footer: 'Los Angeles Roleplay • Automated Moderation'
    },
    channelPreview: {
      title: '🔇 Member Muted',
      description: '**@Ronaldoiscat** was muted for **24 Hours** by **@Aviator62284**.\n**Reason:** Spamming in public roleplay channels\n*Direct Message (DM) notification dispatched successfully.*',
      color: '#f1c40f'
    }
  },
  {
    id: '4',
    name: '!unmute',
    category: 'Moderation',
    description: 'Removes timeout/mute from a member. Automatically Direct Messages (DMs) them informing that their voice and chat privileges are restored.',
    syntax: '!unmute <@user> [reason]',
    permission: 'Staff',
    hasTopBanner: false,
    hasBottomBanner: false,
    dmsUser: true,
    dmPreview: {
      title: '🔊 Your mute has been removed in Los Angeles Roleplay',
      description: 'Your communication privileges have been restored in **Los Angeles Roleplay**.',
      fields: [
        { name: 'Moderator', value: '@Aviator62284' },
        { name: 'Reason', value: 'Early appeal approved / time served' }
      ],
      footer: 'Los Angeles Roleplay • Automated Moderation'
    },
    channelPreview: {
      title: '🔊 Member Unmuted',
      description: '**@Ronaldoiscat** was unmuted by **@Aviator62284**.\n*Direct Message (DM) notification dispatched successfully.*',
      color: '#2ecc71'
    }
  },
  {
    id: '5',
    name: '!warn',
    category: 'Moderation',
    description: 'Issues an official warning and saves it to SQLite. Automatically Direct Messages (DMs) the member with warning ID, rule broken, and reason.',
    syntax: '!warn <@user> <reason>',
    permission: 'Staff',
    hasTopBanner: false,
    hasBottomBanner: false,
    dmsUser: true,
    dmPreview: {
      title: '⚠️ You have received a formal warning in Los Angeles Roleplay',
      description: 'You have been warned in **Los Angeles Roleplay**.',
      fields: [
        { name: 'Warning ID', value: 'WARN-0019' },
        { name: 'Moderator', value: '@Aviator62284' },
        { name: 'Reason', value: 'Disrespectful language towards other community members' },
        { name: 'Important Policy', value: 'Accumulating 3 warnings will result in an automatic 24-hour timeout.' }
      ],
      footer: 'Los Angeles Roleplay • Automated Moderation'
    },
    channelPreview: {
      title: '⚠️ Warning Issued (WARN-0019)',
      description: '**@Ronaldoiscat** received a formal warning from **@Aviator62284**.\n**Reason:** Disrespectful language towards other community members\n*Direct Message (DM) notification dispatched successfully.*',
      color: '#f39c12'
    }
  },
  {
    id: '6',
    name: '!warns',
    category: 'Moderation',
    description: 'Displays all active and historical warnings for a member, along with strike accumulation count.',
    syntax: '!warns <@user>',
    permission: 'Staff',
    hasTopBanner: false,
    hasBottomBanner: false,
    dmsUser: false,
    channelPreview: {
      title: '📋 Warnings Record for @Ronaldoiscat',
      description: 'Total Warnings: **2** | Status: **Active**\n\n1. **WARN-0012** by @Joekenz - Off-topic in announcements (Oct 18, 2026)\n2. **WARN-0019** by @Aviator62284 - Disrespectful language (Nov 2, 2026)',
      color: '#3498db'
    }
  },
  {
    id: '7',
    name: '!warn-remove',
    category: 'Moderation',
    description: 'Pardons or clears a specific warning log ID from database after successful appeal.',
    syntax: '!warn-remove <WARN-ID> [reason]',
    permission: 'Senior Staff',
    hasTopBanner: false,
    hasBottomBanner: false,
    dmsUser: true,
    dmPreview: {
      title: '✓ Warning Pardoned in Los Angeles Roleplay',
      description: 'Your warning record has been updated in **Los Angeles Roleplay**.',
      fields: [
        { name: 'Warning ID', value: 'WARN-0019' },
        { name: 'Pardoned By', value: '@Aviator62284' },
        { name: 'Reason', value: 'Accepted apology / situation resolved peacefully' }
      ],
      footer: 'Los Angeles Roleplay • Automated Moderation'
    },
    channelPreview: {
      title: '✓ Warning Pardoned',
      description: '**WARN-0019** for **@Ronaldoiscat** was removed by **@Aviator62284**.\n*Direct Message (DM) notification dispatched successfully.*',
      color: '#2ecc71'
    }
  },

  // --- STAFF (8-25) ---
  {
    id: '8',
    name: '!promote',
    category: 'Staff',
    description: 'Promotes a staff member with dynamic PRO-0000 sequence code, top & bottom banners, and thread creation',
    syntax: '!promote <@user> <new_rank> [reason]',
    permission: 'Management',
    hasTopBanner: true,
    hasBottomBanner: true,
    dmsUser: true,
    dmPreview: {
      title: '🎉 Congratulations on your Promotion!',
      description: 'You have been officially promoted in **Los Angeles Roleplay**!',
      fields: [
        { name: 'Promotion Code', value: 'PRO-0043' },
        { name: 'New Rank', value: '@Junior Administrator' },
        { name: 'Promoted By', value: '@Joekenz' },
        { name: 'Reason', value: 'Fastpassed / Excellent leadership and ticket activity' }
      ],
      footer: 'Los Angeles Roleplay • Staff Management'
    }
  },
  { id: '9', name: '!promotions-list', category: 'Staff', description: 'Displays full promotion history timeline of a staff member', syntax: '!promotions-list <@user>', permission: 'Staff', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '10', name: '!promotion-revoke', category: 'Staff', description: 'Revokes a promotion log matching Screenshot 1 (PRO-0039 revoked by @joseph5g12345)', syntax: '!promotion-revoke <PRO-ID> [reason]', permission: 'Management', hasTopBanner: false, hasBottomBanner: false, dmsUser: true },
  {
    id: '11',
    name: '!infraction',
    category: 'Staff',
    description: 'Issues a strike, warning, demotion, termination, or blacklist with INF-0000 sequence code and Appeal button',
    syntax: '!infraction <@user> <punishment> <reason>',
    permission: 'Internal Affairs',
    hasTopBanner: true,
    hasBottomBanner: true,
    dmsUser: true,
    dmPreview: {
      title: '⚠️ Staff Infraction Issued',
      description: 'You have received a formal disciplinary infraction in **Los Angeles Roleplay**.',
      fields: [
        { name: 'Infraction Code', value: 'INF-0055' },
        { name: 'Punishment', value: 'Termination' },
        { name: 'Appealable', value: 'No' },
        { name: 'Reason', value: 'Raider' },
        { name: 'Logged By', value: '@Graves' }
      ],
      footer: 'Los Angeles Roleplay • Internal Affairs'
    }
  },
  { id: '12', name: '!infractions-list', category: 'Staff', description: 'Lists all past infractions and strikes on a staff member', syntax: '!infractions-list <@user>', permission: 'Internal Affairs', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '13', name: '!infraction-revoke', category: 'Staff', description: 'Revokes an active infraction log with reason (e.g. Improper evidence matching image_549599ab.png)', syntax: '!infraction-revoke <INF-ID> [reason]', permission: 'Management', hasTopBanner: false, hasBottomBanner: false, dmsUser: true },
  { id: '14', name: '!infraction-appeal', category: 'Staff', description: 'Opens Internal Affairs appeal ticket (#ia-appeal-inf-xxxx) with AI Support assistant', syntax: '!infraction-appeal <INF-ID>', permission: 'Everyone', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '15', name: '!training-log', category: 'Staff', description: 'Logs classroom training outcome (Pass / Fail / Incomplete) with Trainee, Trainer, and bottom banner', syntax: '!training-log <@trainee> <passed|failed> [notes]', permission: 'Senior Staff', hasTopBanner: false, hasBottomBanner: true, dmsUser: true },
  { id: '16', name: '!staff-feedback', category: 'Staff', description: 'Submits or displays a 5-star performance rating on a staff member with comments', syntax: '!staff-feedback <@staff> <1-5> [comment]', permission: 'Everyone', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '17', name: '!feedback-list', category: 'Staff', description: 'Shows aggregated reviews and rating score for a staff member', syntax: '!feedback-list <@staff>', permission: 'Management', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '18', name: '!staff-blacklist', category: 'Staff', description: 'Permanently blacklists an individual from all staff roles and DMs outcome', syntax: '!staff-blacklist <@user> <reason>', permission: 'Management', hasTopBanner: true, hasBottomBanner: true, dmsUser: true },
  { id: '19', name: '!staff-unblacklist', category: 'Staff', description: 'Removes an applicant from blacklist after tribunal appeal', syntax: '!staff-unblacklist <@user> [reason]', permission: 'Management', hasTopBanner: true, hasBottomBanner: true, dmsUser: true },
  { id: '20', name: '!duty-on', category: 'Staff', description: 'Clocks in on active staff duty and adds on-duty role', syntax: '!duty-on', permission: 'Staff', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '21', name: '!duty-off', category: 'Staff', description: 'Clocks off duty and computes hours served during shift', syntax: '!duty-off', permission: 'Staff', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '22', name: '!duty-leaderboard', category: 'Staff', description: 'Displays top active staff members by weekly shift time', syntax: '!duty-leaderboard', permission: 'Staff', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '23', name: '!staff-activity', category: 'Staff', description: 'Checks messages, ticket claims, and duty stats of staff member', syntax: '!staff-activity <@staff>', permission: 'Management', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '24', name: '!strike-remove', category: 'Staff', description: 'Pardons or removes an active disciplinary strike', syntax: '!strike-remove <INF-ID>', permission: 'Management', hasTopBanner: true, hasBottomBanner: true, dmsUser: true },
  { id: '25', name: '!chain-of-command', category: 'Staff', description: 'Displays full hierarchy and high rank responsibilities', syntax: '!chain-of-command', permission: 'Everyone', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },

  // --- TICKETS & SUPPORT (26-39) ---
  { id: '26', name: '!assistance-panel', category: 'Tickets', description: 'Sends the Contact Us ticket creation panel with category dropdown', syntax: '!assistance-panel [#channel]', permission: 'Management', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '27', name: '!ticket-claim', category: 'Tickets', description: 'Claims active ticket, updates channel emoji to 🟢, turns button red Unclaim, halts AI', syntax: '!ticket-claim', permission: 'Staff', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '28', name: '!ticket-unclaim', category: 'Tickets', description: 'Unclaims ticket, updates channel emoji to 🔴, turns button green Claim, resumes AI', syntax: '!ticket-unclaim', permission: 'Staff', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '29', name: '!ticket-escalate', category: 'Tickets', description: 'Escalates ticket to Directive Team or Internal Affairs', syntax: '!ticket-escalate [directive|ia]', permission: 'Staff', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '30', name: '!ticket-close', category: 'Tickets', description: 'Closes ticket, compiles Cookie API transcript, and DMs creator with online link', syntax: '!ticket-close [reason]', permission: 'Staff', hasTopBanner: false, hasBottomBanner: false, dmsUser: true },
  { id: '31', name: '!transcript', category: 'Tickets', description: 'Generates real-time Cookie API HTML transcript link immediately', syntax: '!transcript', permission: 'Staff', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '32', name: '!transcript-test', category: 'Tickets', description: 'Validates Cookie API authentication and endpoint status', syntax: '!transcript-test', permission: 'Management', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '33', name: '!ticket-add', category: 'Tickets', description: 'Grants a specified user access to the private ticket channel', syntax: '!ticket-add <@user>', permission: 'Staff', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '34', name: '!ticket-remove', category: 'Tickets', description: 'Revokes a user permission from the current ticket channel', syntax: '!ticket-remove <@user>', permission: 'Staff', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '35', name: '!ticket-rename', category: 'Tickets', description: 'Renames ticket channel title (e.g. general-0014)', syntax: '!ticket-rename <new_name>', permission: 'Staff', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '36', name: '!ticket-active', category: 'Tickets', description: 'Marks ticket channel status as active with green indicator', syntax: '!ticket-active', permission: 'Staff', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '37', name: '!ai-support', category: 'Tickets', description: 'Manually invokes AI Support Assistant to answer in ticket', syntax: '!ai-support [query]', permission: 'Staff', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '38', name: '!ai-support-toggle', category: 'Tickets', description: 'Enables or disables auto AI responses in specific ticket category', syntax: '!ai-support-toggle <category> <on|off>', permission: 'Management', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '39', name: '!ticket-stats', category: 'Tickets', description: 'View total tickets closed, avg response time, and satisfaction rating', syntax: '!ticket-stats', permission: 'Management', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },

  // --- APPLICATIONS & AI SCORING (40-51) ---
  { id: '40', name: '!applications-panel', category: 'Applications', description: 'Sends the Staff Applications prompt with dropdown triggering 15-question flow', syntax: '!applications-panel [#channel]', permission: 'Management', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '41', name: '!apply', category: 'Applications', description: 'Initiates private 15-question application thread or DM flow', syntax: '!apply', permission: 'Everyone', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '42', name: '!app-review', category: 'Applications', description: 'Displays applicant responses, Sapling AI writing score, and review tools', syntax: '!app-review <app_id>', permission: 'Senior Staff', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '43', name: '!app-approve', category: 'Applications', description: 'Approves applicant into Trainee, logs result and DMs user with top/bottom banners', syntax: '!app-approve <app_id> [notes]', permission: 'Management', hasTopBanner: true, hasBottomBanner: true, dmsUser: true },
  { id: '44', name: '!app-deny', category: 'Applications', description: 'Denies applicant with professional feedback and DMs result with top/bottom banners', syntax: '!app-deny <app_id> [reason]', permission: 'Management', hasTopBanner: true, hasBottomBanner: true, dmsUser: true },
  { id: '45', name: '!app-score', category: 'Applications', description: 'Runs Sapling AI writing analysis on application responses', syntax: '!app-score <app_id>', permission: 'Management', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '46', name: '!app-pending', category: 'Applications', description: 'Lists all pending applications awaiting high rank review', syntax: '!app-pending', permission: 'Senior Staff', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '47', name: '!app-questions', category: 'Applications', description: 'Lists the 15 official staff application questions and rubrics', syntax: '!app-questions', permission: 'Management', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '48', name: '!app-status', category: 'Applications', description: 'Allows an applicant to check their submission review state', syntax: '!app-status', permission: 'Everyone', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '49', name: '!app-stats', category: 'Applications', description: 'Shows total applicants, acceptance rate, and AI detection rate', syntax: '!app-stats', permission: 'Management', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '50', name: '!app-hold', category: 'Applications', description: 'Places an application on hold pending voice interview', syntax: '!app-hold <app_id> [notes]', permission: 'Management', hasTopBanner: true, hasBottomBanner: true, dmsUser: true },
  { id: '51', name: '!app-interview', category: 'Applications', description: 'Schedules an applicant for live oral high rank interview', syntax: '!app-interview <app_id> <time>', permission: 'Management', hasTopBanner: true, hasBottomBanner: true, dmsUser: true },

  // --- YOUTUBE MUSIC ENGINE & 25 FILTERS (52-67) ---
  { id: '52', name: '!play', category: 'Music', description: 'Streams YouTube/Spotify audio with live 1s interactive progress embed and 25-song queue', syntax: '!play <song_or_url>', permission: 'Everyone', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '53', name: '!pause', category: 'Music', description: 'Pauses active stream playback and updates controller embed', syntax: '!pause', permission: 'Everyone', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '54', name: '!resume', category: 'Music', description: 'Resumes track playback', syntax: '!resume', permission: 'Everyone', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '55', name: '!skip', category: 'Music', description: 'Skips to next track in queue', syntax: '!skip', permission: 'Everyone', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '56', name: '!back', category: 'Music', description: 'Replays previous track or restarts current track from 0:00', syntax: '!back', permission: 'Everyone', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '57', name: '!queue', category: 'Music', description: 'Displays interactive song queue with estimated time and up to 25+ tracks', syntax: '!queue', permission: 'Everyone', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '58', name: '!volume', category: 'Music', description: 'Sets playback audio volume from 1% to 150%', syntax: '!volume <1-150>', permission: 'Everyone', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '59', name: '!filter', category: 'Music', description: 'Toggles 25 audio filters: nightcore, 8d, bassboost, vaporwave, chorus, etc.', syntax: '!filter <filter_name>', permission: 'Everyone', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '60', name: '!filter-list', category: 'Music', description: 'Displays all 25 supported high-definition audio filters', syntax: '!filter-list', permission: 'Everyone', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '61', name: '!loop', category: 'Music', description: 'Toggles repeat modes: track, queue, or off', syntax: '!loop [track|queue|off]', permission: 'Everyone', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '62', name: '!shuffle', category: 'Music', description: 'Shuffles songs in the current playlist queue', syntax: '!shuffle', permission: 'Everyone', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '63', name: '!stop', category: 'Music', description: 'Stops playback, clears queue, and leaves voice channel', syntax: '!stop', permission: 'Everyone', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '64', name: '!nowplaying', category: 'Music', description: 'Pulls the dynamic live 1-second progress bar and song metadata', syntax: '!nowplaying', permission: 'Everyone', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '65', name: '!seek', category: 'Music', description: 'Jumps directly to designated timestamp in audio (e.g. 1:30)', syntax: '!seek <mm:ss>', permission: 'Everyone', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '66', name: '!lyrics', category: 'Music', description: 'Fetches synchronized lyrics for the currently playing track', syntax: '!lyrics', permission: 'Everyone', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '67', name: '!dj-role', category: 'Music', description: 'Restricts music player queue manipulation to DJ role', syntax: '!dj-role <@role>', permission: 'Management', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },

  // --- SECURITY, TRIPWIRE & WATCHDOG (68-79) ---
  { id: '68', name: '!tripwire', category: 'Security', description: 'Posts Tripwire warning embed with TOP BANNER ONLY & strictly NO bottom banner', syntax: '!tripwire [#channel]', permission: 'Management', hasTopBanner: true, hasBottomBanner: false, dmsUser: false },
  { id: '69', name: '!tripwire-stats', category: 'Security', description: 'View softbans issued and protected members count', syntax: '!tripwire-stats', permission: 'Internal Affairs', hasTopBanner: true, hasBottomBanner: false, dmsUser: false },
  { id: '70', name: '!watchdog-status', category: 'Security', description: 'Reports server security heartbeat, audit trail, and threat levels', syntax: '!watchdog-status', permission: 'Internal Affairs', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '71', name: '!antiping-toggle', category: 'Security', description: 'Enables Don\'t Ping Directive/Founder warning with 7-second auto-disappearing GIF', syntax: '!antiping-toggle <on|off>', permission: 'Management', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '72', name: '!evidence-add', category: 'Security', description: 'Uploads and creates SHA-256 tamper-proof evidence file', syntax: '!evidence-add <case_id> [notes]', permission: 'Internal Affairs', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '73', name: '!evidence-view', category: 'Security', description: 'Inspects verified evidence hash and cryptographic integrity', syntax: '!evidence-view <evidence_id>', permission: 'Internal Affairs', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '74', name: '!ia-case', category: 'Security', description: 'Opens confidential Internal Affairs investigation dossier', syntax: '!ia-case <open|close|list> [target]', permission: 'Internal Affairs', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '75', name: '!lockdown', category: 'Security', description: 'Instantly locks public channels during raid or mass violation', syntax: '!lockdown [channel|all]', permission: 'Management', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '76', name: '!unlock', category: 'Security', description: 'Restores public permissions after raid threat neutralized', syntax: '!unlock [channel|all]', permission: 'Management', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '77', name: '!security-audit', category: 'Security', description: 'Scans recent administrative actions for unauthorized overrides', syntax: '!security-audit', permission: 'Founder', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '78', name: '!quarantine', category: 'Security', description: 'Isolates suspect account into restricted quarantine role and DMs notice', syntax: '!quarantine <@user> <reason>', permission: 'Internal Affairs', hasTopBanner: true, hasBottomBanner: true, dmsUser: true },
  { id: '79', name: '!unquarantine', category: 'Security', description: 'Restores verified user from quarantine isolation and DMs restoration', syntax: '!unquarantine <@user>', permission: 'Internal Affairs', hasTopBanner: true, hasBottomBanner: true, dmsUser: true },

  // --- ROLEPLAY, ERLC & DEPARTMENTS (80-89) ---
  { id: '80', name: '!departments', category: 'Roleplay', description: 'Sends departments panel with Join buttons for MDSO, FHP, FBI, NYSP', syntax: '!departments [#channel]', permission: 'Management', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '81', name: '!regulations', category: 'Roleplay', description: 'Posts interactive regulations embed with Respect and Fair Roleplay dropdowns', syntax: '!regulations [#channel]', permission: 'Management', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '82', name: '!dashboard', category: 'Roleplay', description: 'Posts the server hub dashboard with ER:LC Live Map and My ER:LC Statistics buttons', syntax: '!dashboard [#channel]', permission: 'Management', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '83', name: '!notifications-panel', category: 'Roleplay', description: 'Posts notification roles picker (Session, Announcement, Event, Giveaway, Poll pings)', syntax: '!notifications-panel [#channel]', permission: 'Management', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '84', name: '!session-start', category: 'Roleplay', description: 'Announces active in-game roleplay session and alerts session pingers', syntax: '!session-start [notes]', permission: 'Staff', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '85', name: '!session-vote', category: 'Roleplay', description: 'Launches threshold vote panel for scheduling roleplay session', syntax: '!session-vote [required_votes]', permission: 'Staff', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '86', name: '!session-boost', category: 'Roleplay', description: 'Pings roleplay members when server player count is low', syntax: '!session-boost', permission: 'Staff', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '87', name: '!session-full', category: 'Roleplay', description: 'Alerts community server is full and queueing has started', syntax: '!session-full', permission: 'Staff', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '88', name: '!session-shutdown', category: 'Roleplay', description: 'Concludes active server session and posts wrap-up logs', syntax: '!session-shutdown', permission: 'Staff', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '89', name: '!cad', category: 'Roleplay', description: 'Generates direct link to Community Police Computer Aided Dispatch', syntax: '!cad', permission: 'Everyone', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },

  // --- MARKETPLACE & GIVEAWAYS (90-94) ---
  { id: '90', name: '!marketplace', category: 'Marketplace', description: 'Sends Marketplace embed with Claim Purchase & View Queue buttons', syntax: '!marketplace [#channel]', permission: 'Management', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '91', name: '!giveaway', category: 'Marketplace', description: 'Hosts timed Robux/perk giveaway with Enter Giveaway button', syntax: '!giveaway <prize> <duration> [winners]', permission: 'Senior Staff', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '92', name: '!giveaway-reroll', category: 'Marketplace', description: 'Rerolls winners without duplicate entries from database', syntax: '!giveaway-reroll <message_id>', permission: 'Senior Staff', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '93', name: '!giveaway-end', category: 'Marketplace', description: 'Concludes active giveaway immediately and announces winners', syntax: '!giveaway-end <message_id>', permission: 'Senior Staff', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '94', name: '!orders-queue', category: 'Marketplace', description: 'Lists active pending purchases in marketplace queue', syntax: '!orders-queue', permission: 'Staff', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },

  // --- VERIFICATION & UTILITY (95-100) ---
  { id: '95', name: '!verify', category: 'Verification', description: 'Links Discord account to official Roblox account, syncs nickname (Roblox | Discord), assigns @Verified', syntax: '!verify [roblox_username]', permission: 'Everyone', hasTopBanner: true, hasBottomBanner: true, dmsUser: true },
  { id: '96', name: '!verifyinfo', category: 'Verification', description: 'Displays full linked Roblox user ID, display name, account age, and ticket link', syntax: '!verifyinfo <@user>', permission: 'Staff', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '97', name: '!verifylookup', category: 'Verification', description: 'Finds verified Discord member by their official Roblox username or ID', syntax: '!verifylookup <RobloxUsername>', permission: 'Staff', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
  { id: '98', name: '!unverify', category: 'Verification', description: 'Unlinks Roblox account, resets server nickname, and revokes Verified role', syntax: '!unverify <@user> [reason]', permission: 'Management', hasTopBanner: false, hasBottomBanner: false, dmsUser: true },
  { id: '99', name: '!verifyrefresh', category: 'Verification', description: 'Re-queries Roblox API to sync latest Roblox display name and nickname', syntax: '!verifyrefresh <@user>', permission: 'Staff', hasTopBanner: false, hasBottomBanner: false, dmsUser: false },
  { id: '100', name: '!help', category: 'Utility', description: 'Interactive directory of all 100 commands grouped by department', syntax: '!help [category]', permission: 'Everyone', hasTopBanner: true, hasBottomBanner: true, dmsUser: false },
];

function deriveSlashSyntax(cmd: { name: string; syntax: string }): { slashName: string; slashSyntax: string; slashOptions: SlashOption[] } {
  const slashName = cmd.name.replace(/^!/, '');
  const args = cmd.syntax.replace(cmd.name, '').trim();
  const options: SlashOption[] = [];

  if (args) {
    const parts = args.split(' ').filter(Boolean);
    const slashParts = parts.map((part) => {
      const isOptional = part.startsWith('[') && part.endsWith(']');
      const clean = part.replace(/[<>[\]@]/g, '').trim();
      const optName = clean.toLowerCase().replace(/[^a-z0-9_]/g, '_') || 'option';
      let type: SlashOption['type'] = 'STRING';
      if (optName.includes('user') || optName.includes('member') || optName.includes('trainee') || optName.includes('trainer') || optName.includes('staff')) {
        type = 'USER';
      } else if (optName.includes('channel')) {
        type = 'CHANNEL';
      } else if (optName.includes('role')) {
        type = 'ROLE';
      } else if (optName.includes('count') || optName.includes('amount') || optName.includes('volume') || optName.includes('votes') || optName.includes('points')) {
        type = 'INTEGER';
      }

      options.push({
        name: optName,
        description: `Provide ${optName} value`,
        type,
        required: !isOptional,
      });

      return isOptional ? `${optName}:[${optName}]` : `${optName}:<${optName}>`;
    });

    return {
      slashName,
      slashSyntax: `/${slashName} ${slashParts.join(' ')}`,
      slashOptions: options,
    };
  }

  return {
    slashName,
    slashSyntax: `/${slashName}`,
    slashOptions: [],
  };
}

export const COMMANDS_100: BotCommand[] = RAW_COMMANDS.map((raw) => {
  const derived = deriveSlashSyntax(raw);
  return {
    ...raw,
    slashName: raw.slashName || derived.slashName,
    slashSyntax: raw.slashSyntax || derived.slashSyntax,
    slashOptions: raw.slashOptions || derived.slashOptions,
  };
});

