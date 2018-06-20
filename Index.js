const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, API } = require('./config.json');
const Music = require('discord.js-musicbot-addon');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const cooldowns = new Discord.Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
// Simple Ready Message
	console.log('Ready!');

	// Set Online Status of Bot
	client.user.setStatus('Online');
	// Set Currently Playing or Streaming
	client.user.setActivity('with your hearts | ' + `${prefix}` + 'help');

});

client.on('message', message => {

	// this section is for listeners

	if ((message.content.includes(':(') || message.content.includes('):') || message.content.includes('😦')) && !message.author.bot) {
		return message.channel.send('Why so sad? :(');
	}
	if (message.content.startsWith('yaw') || message.content.includes('Yaw') || message.content.includes('YAW')) {
		return message.channel.send('Yeet!');
	}
	if (message.content.includes('furry') || message.content.includes('Furry') || message.content.includes('FURRY')) {
		return message.channel.send('You mean ***Beastiality?***');
	}
	if (message.content.includes('yote') || message.content.includes('Yote') || message.content.includes('YOTE')) {
		return message.channel.send('**Ahem**. I think you meant yeeted.');
	}
	if (message.content.includes('loli') || message.content.includes('Loli')) {
		return message.channel.send('FBI! OPEN UP!');
	}
	if (message.content.startsWith('despacito') || message.content.startsWith('Despacito')) {
		return message.channel.send('https://pics.me.me/despacito-despacito-30205129.png');
	}
	if ((message.content.startsWith('no') || message.content.startsWith('No')) && !message.author.bot) {
		return message.channel.send('Yes');
	}
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	// After all initial checks pass for commands

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `That's the incorrect usage, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send({
			'embed': {
				'description': reply,
				'color': 14226219, // Red Color
			},
		});
	}
	if (((message.author.id !== '450878704973774849') || (message.author.id !== '294544470953689088')) && command.sophie) return;

	if (message.content.startsWith('\'nou') || message.content.startsWith('\'help') || message.content.startsWith('\'thot') || message.content.startsWith('\'copy')) {
		message.delete();
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (!timestamps.has(message.author.id)) {
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}
	else {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}

	try {
		command.execute(message, args);
	}

	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

Music.start(client, {
	youtubeKey: `${API}`,
	prefix: `${prefix}`,
	clearOnLeave: true,
	requesterName: true,
	anyoneCanJoin: true,
	anyoneCanLeave: true,
	anyoneCanSkip: true,
	anyoneCanPause: true,
	defVolume: 60,
});

process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);
client.login(token);