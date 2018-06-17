module.exports = {
	name: 'copy',
	description: 'Copies whatever you input',
	args: true,
	sophie: true,
	usage: '<text>',


	execute(message, args) {
		message.channel.send(args.join(' '));
	},
};