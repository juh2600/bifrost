#!/usr/bin/node

process.env.NODE_ENV = "debug";
const package = require("./package.json");

console.log(`Starting ${package.name} v${package.version}`);
require("dotenv").config();
const logger = require("logger").get("main");

logger.info('Requiring packages...');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const upload = require('multer')({ dest: __dirname + '/public/icons' });
const CassandraStore = require('cassandra-store');
const session = require("express-session");
const { createProxyMiddleware } = require('http-proxy-middleware');
logger.info('Required packages.');

logger.info('Instantiating globals...');
const app = express();
const db = require('./db/dal');
const { server, io } = require('./sockets')({db, app});
logger.info('Instantiated globals.');

logger.info("Configuring microservices...");
let routeFiles = [
'frontend'
	, 'api/v0/guilds'
	, 'api/v0/text-channels'
	, 'api/v0/messages'
	, 'api/v0/users'
	, 'api/v0/icons'
	, 'api/v1/guilds'
	, 'api/v1/text-channels'
	, 'api/v1/messages'
	, 'api/v1/users'
	, 'api/v1/icons'
];
const micros = require('./microservices');
// whitelist routes
if (micros.routes)
	routeFiles = micros.routes;

// configure proxies
if (micros.proxies) {
	const logger = require('logger').get('proxy');
	for (let route of Object.keys(micros.proxies)) {
		logger.info(`Installing proxy middleware: ${route} -> ${micros.proxies[route]}`);
		app.use(createProxyMiddleware(route, {
			target: micros.proxies[route]
			, changeOrigin: true
		}));
	}
}
logger.info("Configured microservices.");

logger.info("Configuring Express...");
app.set("trust proxy", 1);
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname + "/public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
logger.info("Configured Express.");

logger.info("Configuring sessions...");
// https://blog.jscrambler.com/best-practices-for-secure-session-management-in-node/
app.use(
  session({
    secret: require('./secrets').session.secret
		, name: 'bifrost.session'
    , resave: false
    , saveUninitialized: false
		, cookie: {
			httpOnly: true
			, secure: process.env.REVERSE_PROXY_SSL == 'true' // .env doesn't like boolean; has returned to string
			, sameSite: true
			, maxAge: 1000 * 60 * 60 * 24 * process.env.SESSION_LIFETIME_DAYS // ms; this is 90 days
		}
		, store: new CassandraStore({
			table: require('./secrets').session.store_table
			, client: db.db
		})
  })
);

//app.use((req, res, next) => { console.log(req.session); next(); });
logger.info("Configured sessions.");

logger.info('Configuring routes...');
const routeManager = require('./routes/manager');
routeFiles.forEach((file) => {
	logger.info(`Adding ${file} routes...`);
	let component = require(`./routes/${file}`);
	if(component.configure) component.configure({
		// pass stuff to routing files here
		// dependency injection :tm:
		db
		, io
		, upload
	});
	routeManager.apply(app, component);
	logger.info(`Added ${file} routes.`);

});

logger.info("Configured routes.");

logger.info(`Listening on port ${process.env.PORT}`);

server.listen(process.env.PORT); // ??
