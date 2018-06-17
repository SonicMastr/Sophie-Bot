module.exports = {
	name: 'friends',
	description: 'Send\'s the lyrics of \'Friends\'',
	cooldown: 240,
	execute(message) {
		message.channel.send('I\'ll be there for you \n(When the rain starts to pour)\nI\'ll be there for you \n(Like I\'ve been there before)\nI\'ll be there for you \n(\'Cause you\'re there for me too)');
	},
};