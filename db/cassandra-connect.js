#!/usr/bin/node
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

client.connect().then((x) => console.log(x, 'yeet'));
