const logger = require('logger').get('messages');
const snowmachine = new (require('snowflake-generator'))(1420070400000);

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
const createMessage = (req, res) => {
	const errors = [];
	expect(req.body, ['author', 'body'], errors);
	if (errors.length) res.status(400).json(errors);
	else {
		db.createMessage(req.params.channel_id, req.body.author, req.body.body)
			.then(message => {
				res
					.status(201)
					.location(`/guilds/${req.params.guild_id}/text-channels/${req.params.channel_id}/messages/${message.message_id}`)
					.json(message);
			})
			.catch(handle(500, req, res));
	}
};

// TODO add limit
// verify 400/500
const getMessages = (req, res) => {
	db.getMessages(req.params.channel_id)
		.then(messages => res.json(guilds))
		.catch(handle(500, req, res));
};

// verify 400/500
const getMessage = (req, res) => {
	db.getMessages(req.params.channel_id, {message_id: req.params.message_id})
		.then(message => {
			if (!messages.length) res.sendStatus(404);
			else res.json(messages[0]);
		})
		.catch(handle(500, req, res));
};

const updateMessage = (req, res) => {
	db.updateMessage(req.params.channel_id, req.params.message_id, {
		body: req.body.body
	})
		.then(() => {
			res.statusMessage = 'Updated';
			res.status(204).end();
		})
		.catch(handle(400, req, res));
};

const deleteMessage = (req, res) => {
	db.deleteMessage(req.params.channel_id, req.params.message_id)
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
		uri: '/api/v1/guilds/:guild_id/text-channels/:channel_id/messages',
		methods: ['post'],
		handler: createMessage
	}
	, {
		uri: '/api/v1/guilds/:guild_id/text-channels/:channel_id/messages',
		methods: ['get'],
		handler: getMessages
	}
	, {
		uri: '/api/v1/guilds/:guild_id/text-channels/:channel_id/messages/:message_id',
		methods: ['get'],
		handler: getMessage
	}
	, {
		uri: '/api/v1/guilds/:guild_id/text-channels/:channel_id/messages/:message_id',
		methods: ['put'],
		handler: updateMessage
	}
	, {
		uri: '/api/v1/guilds/:guild_id/text-channels/:channel_id/messages/:message_id',
		methods: ['delete'],
		handler: deleteMessage
	}
];


module.exports = { logger, routes, configure }
