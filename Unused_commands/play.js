module.exports = {
	name: 'play',
	description: 'Plays a test song ATM',
	execute(message) {
		return new Promise((resolve, reject) => {
			const voiceChannel = message.member.voiceChannel;

			if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('Sorry. I couldn\'t connect to your voice channel.');
			voiceChannel.join().then(connection => {return connection.playFile('./Snails.m4a', );}).catch(err => reject(err));
		});
	},
};