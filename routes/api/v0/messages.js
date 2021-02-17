const logger = require('logger').get('frontend');

const snowmachine = new (require('snowflake-generator'))(1420070400000);

const createMessage = (req, res) => {
	const errors = [];
	expect(req.body, ['author', 'body'], errors);
	if (errors.length)
		res.status(400).json(errors);
	else {
		const snowflake = snowmachine.generate().snowflake;
		res
			.status(201)
			.location('/guilds/' + req.params.guild_id + '/text-channels/' + req.params.channel_id + '/' + snowflake)
			.json(Object.assign({}, req.body, {channel_id: req.params.channel_id, message_id: snowflake}));
	}
};

const getMessages = (req, res) => {
	res.json([
		  {"channel_id": req.params.channel_id, "message_id": "811434223427874816", "author": "811435623419441152", "body": "Sam Ramaham's Auto Zone and Stripper Dome is closed now"}
		, {"channel_id": req.params.channel_id, "message_id": "811434225793462272", "author": "811435623423635456", "body": "Albania is a cool place"}
		, {"channel_id": req.params.channel_id, "message_id": "811434227521515520", "author": "811435623427829760", "body": "Comfort Zone 130 :sunglasses:"}
		, {"channel_id": req.params.channel_id, "message_id": "811434229165682688", "author": "811435623427829761", "body": "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaauuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu"}
		, {"channel_id": req.params.channel_id, "message_id": "811434230772101120", "author": "811435623432024064", "body": "h"}
	]);
};

const getMessage = (req, res) => {
	res.json({"channel_id": req.params.channel_id, "message_id": req.params.message_id, "author": "811435623419441152", "body": "Sam Ramaham's Auto Zone and Stripper Dome is closed now"});
};

const updateMessage = (req, res) => {
	res.json(Object.assign({channel_id: req.params.channel_id, message_id: req.params.message_id, "author": "811435623419441152", "body": "Sam Ramaham's Auto Zone and Stripper Dome is closed now"}, req.body));
};

const deleteMessage = (req, res) => {
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
		uri: '/api/v0/guilds/:guild_id/text-channels/:channel_id/messages',
		methods: ['post'],
		handler: createMessage
	}
	, {
		uri: '/api/v0/guilds/:guild_id/text-channels/:channel_id/messages',
		methods: ['get'],
		handler: getMessages
	}
	, {
		uri: '/api/v0/guilds/:guild_id/text-channels/:channel_id/messages/:message_id',
		methods: ['get'],
		handler: getMessage
	}
	, {
		uri: '/api/v0/guilds/:guild_id/text-channels/:channel_id/messages/:message_id',
		methods: ['put'],
		handler: updateMessage
	}
	, {
		uri: '/api/v0/guilds/:guild_id/text-channels/:channel_id/messages/:message_id',
		methods: ['delete'],
		handler: deleteMessage
	}
];


module.exports = { logger, routes }
