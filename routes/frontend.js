const logger = require('logger').get('frontend');

const index = (req, res) => {
	res.render('index', {
		// key: value
	});
};

const app = (req, res) => {
	res.render('app', {
		// key: value
	});
};
const createGuild = (req, res) => {
	res.render('createGuild', {
		// key: value
	});
};
const guildSettings = (req, res) => {
	res.render('guildSettings', {
		// key: value
	});
};

const routes = [
	{
		uri: '/',
		methods: ['get'],
		handler: index
	},
	{
		uri: '/app',
		methods: ['get'],
		handler: app
	},
	{
		uri: '/guilds/create',
		methods: ['get'],
		handler: createGuild
	},
	{
		uri: '/guilds/:snowflake/settings',
		methods: ['get'],
		handler: guildSettings
	}

];


module.exports = { logger, routes }
