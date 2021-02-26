const logger = require('logger').get('icons');
const path = require('path');
const snowmachine = new (require('snowflake-generator'))(1420070400000);
const api_ver = '/api/v1';

let db;
let upload;
const configure = (obj) => {
	db = obj['db'];
	upload = obj['upload'];
	routes.filter(route => route.id === 'Upload Here')
		.forEach(route => route.handler.unshift(upload.single('icon')));
	//file_target_thingy = upload.single('icon');
};

const handle = (code, req, res) => {
	return errors => {
		res
			.status(code)
			.json(errors)
	};
};

// TODO
// The game plan:
// Accept EXACTLY ONE of these:
//  - An image file
//  - A URL // FIXME note that this looks a lot like a security risk to me
// If NEITHER or BOTH are found, return 400
// Otherwise:
//    If we have an image file:
//       Upload it to the /icons folder                 \
//       Construct the URL that points to the new icon  /`- Wrap these as a function that can change if we find an alternative file store
//    Create an icon record in the database using the URL
const createIcon = (req, res) => {
	const errors = [];

	let hasImage = false; if (req.file)     hasImage = true;
	let hasURL   = false; if (req.body.url) hasURL   = true;
	if (hasImage && hasURL)
		errors.push('Either an image or a JSON body with a URL must be specified, but both were supplied');
	if (!hasImage && !hasURL)
		errors.push('Either an image or a JSON body with a URL must be specified, but neither was supplied');
	if (errors.length) {
		res.status(400).json(errors);
		return;
	}

	if (hasImage) {
		req.body.url = uploadImageFile(req.file);
	}

	db.createIcon(req.body.url)
		.then(icon => {
			res
				.status(201)
			// ?? should i have the /guys without /api/v0 stuff redirect to the api-prefixed routes?
			// for now i think i'll just stick the prefix in the location
				.location(`${api_ver}/icons/${icon.snowflake}`)
				.json(icon);
		})
		.catch(handle(500, req, res));
};

// takes in ???? returns URL/path to image
// for now, it looks like `file' is just a description of the file, since multer has already uploaded it
// TODO make this go somewhere else pls thx
const uploadImageFile = (file) => {
	return '/icons/' + file.filename;
};


// TODO implement this part too
const getIcon = (req, res) => {
	db.getIcon(req.params.icon_id)
		.then(icon => {
			if (!icon) res.sendStatus(404);
			//else res.sendFile('bolb.png', {root: path.join('./', 'icons')});
			else res.redirect(icon.url);
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
		id: 'Upload Here',
		uri: '/api/v1/icons',
		methods: ['post'],
		handler: [createIcon]
	}
	, {
		uri: '/api/v1/icons/:icon_id',
		methods: ['get'],
		handler: getIcon
	}
];


module.exports = { logger, routes, configure }
