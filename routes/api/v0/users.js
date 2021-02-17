const logger = require('logger').get('users');

const index = (req, res) => {
	res.render('index', {
		// key: value
	});
};


const routes = [
	{
		uri: '/',
		methods: ['get'],
		handler: index
	}/*,

	{
		uri: '/remote',
		methods: ['get'],
		handler: remote
	}
	*/
];


module.exports = { logger, routes }
