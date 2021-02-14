#!/usr/bin/node
const logger = require('logger').get('db');
const cass = require('cassandra-driver');
const secrets = require('../secrets').cassandra;

const client = new cass.Client({
	contactPoints: [secrets.host],
	localDataCenter: secrets.dc,
	keyspace: secrets.keyspace,
	credentials: {
		username: secrets.username,
		password: secrets.password
	}
});

client.connect().then(() => logger.info(`Connected to ${secrets.host}`));

module.exports = client;
