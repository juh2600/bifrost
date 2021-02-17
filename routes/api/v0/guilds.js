const logger = require('logger').get('guilds');

const snowmachine = new (require('snowflake-generator'))(1420070400000);

const createGuild = (req, res) => {
	const errors = [];
	expect(req.body, ['name', 'icon_id'], errors);
	if (errors.length)
		res.status(400).json(errors);
	else {
		const snowflake = snowmachine.generate().snowflake;
		res
			.status(201)
			.location('/guilds/' + snowflake)
			.json(Object.assign({}, req.body, {guild_id: snowflake}));
	}
};

const getGuilds = (req, res) => {
	res.json([
		{"guild_id": "811410903487692800", "name": "Sam Ramaham's Auto Zone and Stripper Dome", "icon_id": "811411148556681216"}
		, {"guild_id": "811411148556681216", "name": "Albania", "icon_id": "811411487263506432"}
		, {"guild_id": "811411322687406080", "name": "Comfort Zone 130", "icon_id": "811411461028134912"}
		, {"guild_id": "811411348876640256", "name": "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", "icon_id": "811411438727020544"}
		, {"guild_id": "811411377200775168", "name": "h", "icon_id": "811411410646155264"}
	]);
};

const getGuild = (req, res) => {
	res.json({guild_id: req.params.guild_id, name: "Your Ad Here", icon_id: "811417505498361856"});
};

const updateGuild = (req, res) => {
	res.json(Object.assign({guild_id: req.params.guild_id, name: "Your Ad Here", icon_id: "811417505498361856"}, req.body));
};

const deleteGuild = (req, res) => {
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
		uri: '/api/v0/guilds',
		methods: ['post'],
		handler: createGuild
	}
	, {
		uri: '/api/v0/guilds',
		methods: ['get'],
		handler: getGuilds
	}
	, {
		uri: '/api/v0/guilds/:guild_id',
		methods: ['get'],
		handler: getGuild
	}
	, {
		uri: '/api/v0/guilds/:guild_id',
		methods: ['put'],
		handler: updateGuild
	}
	, {
		uri: '/api/v0/guilds/:guild_id',
		methods: ['delete'],
		handler: deleteGuild
	}
];


module.exports = { logger, routes }
