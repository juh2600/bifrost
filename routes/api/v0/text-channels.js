const logger = require('logger').get('text-channels');

const snowmachine = new (require('snowflake-generator'))(1420070400000);

const createTextChannel = (req, res) => {
	const errors = [];
	expect(req.body, ['name', 'position'], errors);
	if (errors.length)
		res.status(400).json(errors);
	else {
		const snowflake = snowmachine.generate().snowflake;
		res
			.status(201)
			.location('/guilds/' + req.params.guild_id + '/text-channels/' + snowflake)
			.json(Object.assign({}, req.body, {guild_id: req.params.guild_id, channel_id: snowflake}));
	}
};

const getTextChannels = (req, res) => {
	res.json([
		  {"guild_id": req.params.guild_id, "channel_id": "811431023975034880", "name": "sam-ramahams-auto-zone-and-stripper-dome", "position": 0}
		, {"guild_id": req.params.guild_id, "channel_id": "811431032275562496", "name": "albania", "position": 2}
		, {"guild_id": req.params.guild_id, "channel_id": "811431034574041088", "name": "comfort-zone-130", "position": 1}
		, {"guild_id": req.params.guild_id, "channel_id": "811431036687970304", "name": "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", "position": 3}
		, {"guild_id": req.params.guild_id, "channel_id": "811431038827065344", "name": "h", "position": 4}
	]);
};

const getTextChannel = (req, res) => {
	res.json({guild_id: req.params.guild_id, channel_id: req.params.channel_id, name: "The English Channel", position: 5});
};

const updateTextChannel = (req, res) => {
	res.json(Object.assign({guild_id: req.params.guild_id, channel_id: req.params.channel_id, name: "The English Channel", position: 5}, req.body));
};

const deleteTextChannel = (req, res) => {
	res.status(204).send('Deleted');
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


module.exports = { logger, routes }
