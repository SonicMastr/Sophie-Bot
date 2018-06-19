module.exports = {
	name: 'join',
	description: 'joins voice channel',
	execute(message) {
		return new Promise((resolve, reject) => {
			const voiceChannel = message.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('Sorry. I couldn\'t connect to your voice channel.');
			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
		});
	},
};