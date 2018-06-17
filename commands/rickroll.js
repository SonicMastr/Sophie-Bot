module.exports = {
	name: 'rickroll',
	description: 'Get Rick Rolled',
	cooldown: 180,
	execute(message) {
		message.channel.send('Never gonna give you up, never gonna let you down \nNever gonna run around and desert you \nNever gonna make you cry, never gonna say goodbye \nNever gonna tell a lie and hurt you');
	},
};