const logger = require('logger').get('text-channels');
const api_ver = require('./api_ver');

const numericSort = (a,b) => a < b ? -1 : 1;

let db;
const configure = (obj) => {
	db = obj['db'];
};

const handle = (code, req, res) => {
	return errors => {
		console.error(errors);
		res
			.status(code)
			.json(errors);
	};
};

// verify 400/500
const createTextChannel = (req, res) => {
	const errors = [];
	expect(req.body, ['name'], errors);
	if (errors.length) res.status(400).json(errors);
	else {
		db.createChannel(req.params.guild_id, req.body.name, req.body.position)
			.then(channel => {
				res
					.status(201)
					.location(`${api_ver}/guilds/${channel.guild_id}/text-channels/${channel.channel_id}`)
					.json(channel);
			})
			.catch(handle(500, req, res));
	}
};

// TODO add limit
// verify 400/500
const getTextChannels = (req, res) => {
	db.getChannels(req.params.guild_id)
		.then(channels => res.json(channels))
		.catch(handle(500, req, res));
};

// verify 400/500
const getTextChannel = (req, res) => {
	db.getChannels(req.params.guild_id, {channel_id: req.params.channel_id})
		.then(channels => {
			if (!channels.length) res.sendStatus(404);
			else res.json(channels[0]);
		})
		.catch(handle(500, req, res));
};

const updateTextChannel = (req, res) => {
	db.updateChannel(req.params.guild_id, req.params.channel_id, {
		name: req.body.name,
		position: req.body.position
	})
		.then(() => {
			res.statusMessage = 'Updated';
			res.sendStatus(204);
		})
		.catch(handle(400, req, res));
};

const updateTextChannels = (req, res) => {
	// okay so, when we remove a channel from a guild, it's not really gone
	// it's just not associated with the guild
	// soooooo, we'll just...delete all the channels and add them back! ;D
	// FIXME use a batch! it's like transactions???
	const errors = [];
	if (req.body === undefined || req.body === null)
		errors.push(`An array of channel descriptions was expected, but ${req.body} was supplied`);
	else if (req.body.constructor.name !== 'Array') {
		console.error(' ==== BAD ==== ');
		console.error(req.body);
		errors.push(`An array of channel descriptions was expected, but ${JSON.stringify(req.body, null, '\t')} was supplied`);
	}
	if (errors.length) {
		handle(400, req, res)(errors);
		return;
		// FIXME ugly??
	};
	db.clearChannels(req.params.guild_id).then(async () => {
		for (let channel of req.body.sort((a,b) => a.position < b.position ? -1 : 1)) {
			if (req.body.channel_id) {
				// FIXME verify that the channel exists
				await db.addChannelToGuild(req.params.guild_id, channel.channel_id, channel.name, channel.position).catch(e => errors.push(...e));
			}
			else {
				await db.createChannel(req.params.guild_id, channel.name, channel.position).catch(e => errors.push(...e));
			}
		}
		if (errors.length) {
			throw errors;
		}
	}).then(() => {
		res.statusMessage = 'Updated';
		res.sendStatus(204);
	}).catch(handle(500, req, res));
};

const deleteTextChannel = (req, res) => {
	db.deleteChannel(req.params.guild_id, req.params.channel_id)
		.then(() => {
			res.statusMessage = 'Deleted';
			res.sendStatus(204);
		})
		.catch(handle(500, req, res));
};

const expect = (obj, names, errors) => {
	if (names.constructor.name !== 'Array')
		names = [names];
	for (let name of names)
		if (!obj.hasOwnProperty(name))
			errors.push(`${name} was expected, but was not provided`);
};

const routes = [
	{
		uri: '/api/v1/guilds/:guild_id/text-channels',
		methods: ['post'],
		handler: createTextChannel
	}
	, {
		uri: '/api/v1/guilds/:guild_id/text-channels',
		methods: ['get'],
		handler: getTextChannels
	}
	, {
		uri: '/api/v1/guilds/:guild_id/text-channels/:channel_id',
		methods: ['get'],
		handler: getTextChannel
	}
	, {
		uri: '/api/v1/guilds/:guild_id/text-channels',
		methods: ['put'],
		handler: updateTextChannels
	}
	, {
		uri: '/api/v1/guilds/:guild_id/text-channels/:channel_id',
		methods: ['put'],
		handler: updateTextChannel
	}
	, {
		uri: '/api/v1/guilds/:guild_id/text-channels/:channel_id',
		methods: ['delete'],
		handler: deleteTextChannel
	}
];


module.exports = { logger, routes, configure }
