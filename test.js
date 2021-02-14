const logger = require('logger').get('test');

logger.info('Testing schema validation...')

const db = require('./db/dal');

const cases = [];
const values = [undefined, null, 3, 'bar'];
for (let valueA of values) {
	for (let valueB of values) {
		for (let valueC of values) {
			for (let valueD of values) {
				let c = {
					'foo': valueA,
					'guild_id': valueB,
					'name': valueC,
					'icon_id': valueD
				};
				cases.push(c);
			}
		}
	}
}

const passing_records = [];
for (let c of cases) {
	console.log(c);
	const out = db.schemas.guilds.validate(c, false); // as a new record
	if (out.length === 0) passing_records.push(c);
}

const passing_updates = [];
for (let c of cases) {
	const out = db.schemas.guilds.validate(c, true); // as a new record
	if (out.length === 0) passing_updates.push(c);
}

for (let c of passing_records) {
	logger.debug('Passed as new record: ' + JSON.stringify(c));
}
for (let c of passing_updates) {
	logger.debug('Passed as update: ' + JSON.stringify(c));
}

logger.info('Tested schema validation.')

module.exports = { cases };
