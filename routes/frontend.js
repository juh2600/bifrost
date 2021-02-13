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
	}

];


module.exports = { logger, routes }
