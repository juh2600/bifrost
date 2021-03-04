const logger = require('logger').get('guilds');
const api_ver = require('./api_ver');

let db;
const configure = (obj) => {
	db = obj['db'];
};

const handle = (code, req, res) => {
	return errors => {
		res
			.status(code)
			.json(errors)
	};
};

// verify 400/500
const createGuild = (req, res) => {
	const errors = [];
	expect(req.body, ['name', 'icon_id'], errors);
	if (errors.length) res.status(400).json(errors);
	else {
		db.createGuild(req.body.name, req.body.icon_id)
			.then(guild => {
				res
					.status(201)
					.location(`${api_ver}/guilds/${guild.guild_id}`)
					.json(guild);
			})
			.catch(handle(500, req, res));
	}
};

// TODO add limit
// verify 400/500
const getGuilds = (req, res) => {
	db.getGuilds()
		.then(guilds => res.json(guilds))
		.catch(handle(500, req, res));
};

// verify 400/500
const getGuild = (req, res) => {
	db.getGuilds({guild_id: req.params.guild_id})
		.then(guilds => {
			if (!guilds.length) res.sendStatus(404);
			else res.json(guilds[0]);
		})
		.catch(handle(500, req, res));
};

const updateGuild = (req, res) => {
	db.updateGuild(req.params.guild_id, {
		name: req.body.name,
		icon_id: req.body.icon_id
	})
		.then(() => {
			res.statusMessage = 'Updated';
			res.status(204).end();
		})
		.catch(handle(400, req, res));
};

const deleteGuild = (req, res) => {
	db.deleteGuild(req.params.guild_id)
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
		uri: '/api/v1/guilds',
		methods: ['post'],
		handler: createGuild
	}
	, {
		uri: '/api/v1/guilds',
		methods: ['get'],
		handler: getGuilds
	}
	, {
		uri: '/api/v1/guilds/:guild_id',
		methods: ['get'],
		handler: getGuild
	}
	, {
		uri: '/api/v1/guilds/:guild_id',
		methods: ['put'],
		handler: updateGuild
	}
	, {
		uri: '/api/v1/guilds/:guild_id',
		methods: ['delete'],
		handler: deleteGuild
	}
];


module.exports = { logger, routes, configure }
