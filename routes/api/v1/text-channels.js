const logger = require('logger').get('text-channels');
const snowmachine = new (require('snowflake-generator'))(1420070400000);

let db;
const configure = (obj) => {
	db = obj['db'];
	console.log(obj, db);
};

const handle = (code, req, res) => {
	return errors => {
		res
			.status(code)
			.json(errors)
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
					.location(`/guilds/${channel.guild_id}/text-channels/${channel.channel_id}`)
					.json(channel);
			})
			.catch(handle(500, req, res));
	}
};

// TODO add limit
// verify 400/500
const getTextChannels = (req, res) => {
	db.getChannels()
		.then(channels => res.json(channels))
		.catch(handle(500, req, res));
};

// verify 400/500
const getTextChannel = (req, res) => {
	db.getChannels({channel_id: req.params.channel_id})
		.then(channels => {
			if (!channels.length) res.status(404).send();
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
			res.status(204).end();
		})
		.catch(handle(400, req, res));
};

const deleteTextChannel = (req, res) => {
	db.deleteChannel(req.params.guild_id, req.params.channel_id)
		.then(() => {
			res.statusMessage = 'Deleted';
			res.status(204).end();
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
		uri: '/api/v0/guilds/:guild_id/text-channels',
		methods: ['post'],
		handler: createTextChannel
	}
	, {
		uri: '/api/v0/guilds/:guild_id/text-channels',
		methods: ['get'],
		handler: getTextChannels
	}
	, {
		uri: '/api/v0/guilds/:guild_id/text-channels/:channel_id',
		methods: ['get'],
		handler: getTextChannel
	}
	, {
		uri: '/api/v0/guilds/:guild_id/text-channels/:channel_id',
		methods: ['put'],
		handler: updateTextChannel
	}
	, {
		uri: '/api/v0/guilds/:guild_id/text-channels/:channel_id',
		methods: ['delete'],
		handler: deleteTextChannel
	}
];


module.exports = { logger, routes, configure }
