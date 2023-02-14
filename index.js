// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const env = require('dotenv').config(); // what
const { token } = require('./config.json');
const cohere = require('cohere-ai');
// const axios = require("axios");

const COHERE_API_KEY = process.env.COHERE_API_KEY
const COHERE_FEEDBACK_MODEL_ID = process.env.COHERE_FEEDBACK_MODEL_ID;
const FEEDBACK_SCORE_THRESHOLD = 0.8;
const DISCORD_API_KEY = process.env.DISCORD_API_KEY
const DISCORD_GENERAL_CHANNEL_ID = process.env.DISCORD_GENERAL_CHANNEL_ID;
const DISCORD_FEEDBACK_CHANNEL_ID = process.env.DISCORD_FEEDBACK_CHANNEL_ID;

// Create a new client instance
const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	] 
});


// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(DISCORD_API_KEY);


client.on('messageCreate', (message) => {
	if (message.author.bot) return;
	return message.reply(`${message.content}`);
});