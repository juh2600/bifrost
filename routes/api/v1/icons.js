const logger = require('logger').get('icons');
const path = require('path');
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


const createIcon = (req, res) => {
	const errors = [];
	//expect(req.body, ['name', 'icon_id', 'email', 'password'], errors);
	// TODO like actually implement storing images
	if (errors.length) res.status(400).json(errors);
	else {
		db.createIcon()
			.then(icon => {
				res
					.status(201)
					.location(`/icons/${snowflake}`)
					.json(icon);
			})
			.catch(handle(500, req, res));
	}
};


// TODO implement this part too
const getIcon = (req, res) => {
	db.iconExists(req.params.icon_id)
		.then(exists => {
			if (!exists) res.sendStatus(404);
			else res.sendFile('bolb.png', {root: path.join('./', 'icons')});
		})
		.catch(handle(500, res, req));
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
		uri: '/api/v1/icons',
		methods: ['post'],
		handler: createIcon
	}
	, {
		uri: '/api/v1/icons/:icon_id',
		methods: ['get'],
		handler: getIcon
	}
];


module.exports = { logger, routes, configure }
