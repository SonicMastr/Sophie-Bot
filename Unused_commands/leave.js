module.exports = {
	name: 'leave',
	description: 'Leaves voice channel',
	execute(message) {
			const voiceChannel = message.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('You\'re not in that voice channel.');
            if (!voiceChannel) return message.reply('Silly goose! I\'m not in a voice channel.');
			voiceChannel.leave();
	},
};