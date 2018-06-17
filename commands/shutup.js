module.exports = {
	name: 'shut',
	description: 'sends a shutup gif',
	execute(message) {
		message.channel.send('https://media.giphy.com/media/aQGqcObSxfixy/giphy.gif');
	},
};