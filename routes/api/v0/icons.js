const logger = require('logger').get('icons');
const path = require('path');

const snowmachine = new (require('snowflake-generator'))(1420070400000);

const createIcon = (req, res) => {
	const errors = [];
	//expect(req.body, ['name', 'icon_id', 'email', 'password'], errors);
	if (errors.length)
		res.status(400).json(errors);
	else {
		const snowflake = snowmachine.generate().snowflake;
		res
			.status(201)
			.location('/icons/' + snowflake)
			.json({
				'icon_id': req.body.icon_id
			});
	}
};

/*
const getIcons = (req, res) => {
	res.json([
		  {"icon_id": "811410903487692800", "name": "Joe 1", "icon_id": "811411148556681216", "email": "josephreed2600@gmail.com", "discriminator": 1234}
		, {"icon_id": "811411148556681216", "name": "Joe 2", "icon_id": "811411487263506432", "email": "josephreed2601@gmail.com", "discriminator": 1234}
		, {"icon_id": "811411322687406080", "name": "Joe 3", "icon_id": "811411461028134912", "email": "josephreed2602@gmail.com", "discriminator": 1234}
		, {"icon_id": "811411348876640256", "name": "Joe 4", "icon_id": "811411438727020544", "email": "josephreed2603@gmail.com", "discriminator": 1234}
		, {"icon_id": "811411377200775168", "name": "Joe 5", "icon_id": "811411410646155264", "email": "josephreed2604@gmail.com", "discriminator": 1234}
	]);
};
*/

const getIcon = (req, res) => {
	res.sendFile('bolb.png', {root: path.join('./', 'icons')});
};

const updateIcon = (req, res) => {
	res.json(Object.assign({"user_id": req.params.user_id, "name": "Joe 5", "icon_id": "811411410646155264", "email": "josephreed2604@gmail.com", "discriminator": 1234}, req.body));
};

const deleteIcon = (req, res) => {
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
		uri: '/api/v0/icons',
		methods: ['post'],
		handler: createIcon
	}
	/*
	, {
		uri: '/api/v0/icons',
		methods: ['get'],
		handler: getIcons
	}
	*/
	, {
		uri: '/api/v0/icons/:icon_id',
		methods: ['get'],
		handler: getIcon
	}
	, {
		uri: '/api/v0/icons/:icon_id',
		methods: ['put'],
		handler: updateIcon
	}
	, {
		uri: '/api/v0/icons/:icon_id',
		methods: ['delete'],
		handler: deleteIcon
	}
];


module.exports = { logger, routes }
