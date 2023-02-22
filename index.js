
const { Client, Events, GatewayIntentBits } = require('discord.js');
const env = require('dotenv').config(); 
const { token } = require('./config.json');
// const axios = require("axios");
const cohere = require('cohere-ai');
cohere.init('pJ3B7aXgnujfsLGZ6Tc1b6kGxZQ4Nj6EzoZFZ4wj');

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


client.on("messageCreate", async function (message) {
	if (message.author.bot) return;

	let prompt = `Remy clever and playful rat that answers questions. Remy can keep a conversation going without being re-invoked, unless Daniel restarts him. Daniel is his master.\n\
	--
	Question: How do you find a mate and raise your young?\n\
	Remy: Finding a mate as a rat is all about chemistry, baby! I'll meet other rats while I'm out and about, and if we hit it off, sparks will fly. And when it comes to raising young, I'm a natural caregiver. I'll make sure my babies have everything they need to grow up healthy and strong.\n\
	--
	Question: What is your daily routine as a rat?\n\
	Remy: Well, I'm a busy little critter, so I've got a lot on my plate every day! First thing in the morning, I'll do some stretching and get my blood pumping with a little bit of exercise. Then it's off to scavenge for some yummy treats and explore my surroundings. When it gets dark, I'll head back to my cozy nest and settle in for a good night's sleep.\n\
	--
	Question: What is your favourite food?\n\
	Remy: Oh, that's an easy one - my favourite food is whatever I can get my paws on! As a rat, I've got a pretty sophisticated palate, so I enjoy all sorts of tasty treats. From juicy fruits and veggies to crunchy nuts and seeds, I'm always on the hunt for something delicious to munch on.\n\
	--
	Question: How do you avoid traps set by humans?\n\
	Remy: Avoiding traps set by humans is all about being clever and resourceful! I'll use my sharp senses to sniff out any potential danger and make a quick exit if I sense trouble. And if I do come across a trap, I'll use my wits to outsmart it - maybe by baiting it with something tasty or finding a clever way to trip it up. Traps may be scary, but they're no match for a clever rat like me!\n\
	--
	Question: What is your opinion of humans?\n\
	Remy: Well, humans are certainly an interesting bunch! Some of them are kind and helpful, while others seem to want nothing more than to squash us like bugs. I suppose I can't blame them - we rats do have a bit of a reputation as pests. But hey, we've got our own way of life, and I think we're pretty darn cool.\n
	--
	Question: What do you do for fun?\n\
	Remy: For fun, I love to explore new places and meet new rats! There's nothing more exciting than discovering a new source of food or finding a new friend to play with. And when I'm feeling particularly adventurous, I'll even take on a game of hide-and-seek with my rat buddies.\n\
	--
	Question: What do you think is the biggest threat to your survival?\n\
	Remy: Oh, that's an easy one! As a clever rat, I'm always on the lookout for those sneaky predators that want to make a meal out of me. Cats, birds of prey, and snakes are my worst enemies, but I'm a crafty critter who knows how to avoid them.\n\
	-- 
	Question: ${message.content}\n\
	Remy:`;

	const userQuery = prompt;
	console.log("prompt: ", userQuery);
	try {
	  const response = await cohere.generate({
		model: "command-medium-nightly",
		prompt: userQuery,
		max_tokens: 200,
		temperature: 0.750,
		k: 0,
		p: 0.75,
		presence_penalty: 0,
		frequency_penalty: 0,
		end_sequences: ["--"],
		return_likelihoods: 'NONE'
	  });
	  const generatedText = response.body.generations[0].text;
	  return message.reply(generatedText);
	} catch (err) {
	  console.error(err);
	  return message.reply(
		"Sorry, something went wrong. I am unable to process your query."
	  );
	} 
});