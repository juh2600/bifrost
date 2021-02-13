#!/usr/bin/node
const cass = require('cassandra-driver');

const client = new cass.Client({
	contactPoints: ['172.17.0.2'],
	localDataCenter: 'datacenter1',
	keyspace: 'bifrost',
	credentials: {
		username: 'bifrost',
		password: 'removed lol'
	}
});

client.connect().then((x) => console.log(x, 'yeet'));
