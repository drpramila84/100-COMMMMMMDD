# Kythia Discord Bot - Replit Setup

## Overview
Kythia is a feature-rich Discord bot with a web dashboard, currently running on Replit. The bot includes numerous addons for adventure games, AI chat, economy systems, music playback, leveling, and much more.

## Current Status
- **Environment**: Replit
- **Database**: SQLite (configured at `database.sqlite`)
- **Dashboard**: Running on port 5000
- **Bot Status**: ✅ Running and connected to Discord
- **Version**: 0.9.11-beta

## Project Structure
```
.
├── addons/              # Modular addon system
│   ├── adventure/       # Adventure game addon
│   ├── ai/             # AI chat addon (Google Gemini)
│   ├── core/           # Core bot functionality
│   ├── dashboard/      # Web dashboard
│   ├── economy/        # Economy system
│   ├── music/          # Music player addon
│   └── ... (many more)
├── src/                # Core source files
├── index.js            # Main entry point
├── kythia.config.js    # Configuration file
└── package.json        # Dependencies
```

## Configuration

### Environment Variables (Configured in Replit Secrets)
- `DISCORD_BOT_TOKEN` - Discord bot token
- `DISCORD_BOT_CLIENT_ID` - Discord application client ID
- `DISCORD_BOT_CLIENT_SECRET` - Discord OAuth2 client secret
- `DB_DRIVER` - Set to "sqlite"
- `DB_STORAGE_PATH` - Set to "database.sqlite"
- `DASHBOARD_PORT` - Set to "5000"
- `DASHBOARD_URL` - Replit domain URL
- `DASHBOARD_SESSION_SECRET` - Session secret for dashboard

### Optional Services (Not Configured)
- **Redis**: Used for caching (shows connection errors but bot works without it)
- **Lavalink**: Required for music addon to function (shows connection errors)
- **Gemini API**: Required for AI chat addon

## Running the Bot

The bot runs automatically via the configured workflow:
- **Command**: `npm start`
- **Port**: 5000 (for web dashboard)
- **Status**: Running

To restart manually:
```bash
npm start
```

## Features Currently Active

### Core Addons
- ✅ Adventure - Text-based RPG game
- ✅ AI - AI chat integration (requires Gemini API key)
- ✅ Checklist - Task management
- ✅ Dashboard - Web interface at port 5000
- ✅ Economy - Virtual currency system
- ✅ Fun - Games and entertainment
- ✅ Giveaway - Giveaway management
- ✅ Global Chat - Cross-server chat
- ✅ Leveling - XP and level system
- ✅ Music - Music player (requires Lavalink)
- ✅ Pet - Virtual pet system
- ✅ Streak - Daily streak tracking
- And many more!

### Total Commands
- 74 slash commands deployed
- 69 top-level slash commands
- 3 user context menu commands
- 2 message context menu commands

## Known Issues & Warnings

### Non-Critical Warnings
1. **Redis Connection Errors**: Redis is optional. Bot works fine without it but uses less efficient caching.
2. **Database Tables Missing**: Tables will be created automatically when features are first used.
3. **Lavalink Connection Errors**: Music addon requires a Lavalink server. Music features won't work until configured.
4. **Global Chat API**: Requires external API (localhost:2000) - not configured.

### To Enable Music Features
You need to:
1. Set up a Lavalink server
2. Configure these environment variables:
   - `LAVALINK_HOSTS`
   - `LAVALINK_PORTS`
   - `LAVALINK_PASSWORDS`
   - `LAVALINK_SECURES`
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`

### To Enable AI Features
Set the `GEMINI_API_KEYS` environment variable with your Google Gemini API key(s).

## Development Notes

### Dependencies
- Node.js 22.x (configured)
- Native modules rebuilt for Replit environment:
  - `canvas` - Image generation
  - `sqlite3` - Database driver
  
### System Dependencies Installed
- libuuid
- cairo
- pango
- pixman
- libpng
- libjpeg
- giflib
- librsvg

## Dashboard Access
The web dashboard is accessible at: `https://[replit-domain]/`

Features include:
- Server management
- Bot statistics
- Configuration interface
- OAuth2 Discord login

## Troubleshooting

### Bot not responding to commands
1. Check if bot is online in Discord
2. Verify bot has proper permissions in your server
3. Check logs in the Replit console

### Dashboard not loading
1. Ensure port 5000 is accessible
2. Check that `DASHBOARD_URL` matches your Replit domain
3. Verify `DASHBOARD_SESSION_SECRET` is set

### Database errors
- The SQLite database will be created automatically
- Tables are created on first use
- Database file: `database.sqlite`

## Recent Changes
- **2024-11-24**: Initial Replit setup completed
  - Configured SQLite database
  - Set up environment variables
  - Installed system dependencies for native modules
  - Configured dashboard for port 5000
  - Bot successfully deployed and running

## Maintenance

### Updating Dependencies
```bash
npm install
npm rebuild canvas sqlite3
```

### Viewing Logs
Logs are available in the Replit console output when the workflow is running.

## Support
For bot-specific issues, refer to:
- [GitHub Repository](https://github.com/kenndeclouv/kythia)
- [Documentation](https://kythia.my.id)
- [Discord Server](https://dsc.gg/kythia)
