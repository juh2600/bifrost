const logger = require('logger').get('test');
const snowmachine = new (require('snowflake-generator'))(1420070400000);
const snow = () => snowmachine.generate().snowflake.toString();
const Long = require('long');

const db = require('./db/dal');

const values = [undefined, null, 3, 'bar', new Long(4), {}];

logger.info('Testing schema validation...')

const cases = [];
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

logger.info('Tested schema validation.');

logger.info('Testing createGuild...');
for (let valueB of values)
	for (let valueA of values) {
		db.createGuild(valueA, valueB)
			.then ((o) => {console.log(`[ X ]\tcreateGuild(${valueA}, ${valueB})`, o)})
			.catch((o) => {console.log(`[   ]\tcreateGuild(${valueA}, ${valueB})`, o)});
	}
logger.info('Tested createGuild.');

logger.info('Clearing guilds...');
db.getGuilds().then(guilds => guilds.map(guild => guild.guild_id)).then(guild_ids => guild_ids.forEach(db.deleteGuild));
logger.info('Cleared guilds.');

logger.info('Testing getGuilds...');
db.getGuilds()
	.then ((o) => {console.log(`[ X ]\tgetGuilds()`, o)})
	.catch((o) => {console.log(`[   ]\tgetGuilds()`, o)});
for (let valueB of values) {
	db.getGuilds(valueB)
		.then ((o) => {console.log(`[ X ]\tgetGuilds(${valueB})`, o)})
		.catch((o) => {console.log(`[   ]\tgetGuilds(${valueB})`, o)});
	for (let valueA of values) {
		db.getGuilds({guild_id: valueA, limit: valueB})
			.then ((o) => {console.log(`[ X ]\tgetGuilds(${valueA}, ${valueB})`, o)})
			.catch((o) => {console.log(`[   ]\tgetGuilds(${valueA}, ${valueB})`, o)});
	}
}
logger.info('Tested getGuilds.');


logger.info('Testing updateGuild...');

/*
db.createGuild('Test Guild', '123456432322452').then(g => {

	db.updateGuild()
		.then ((o) => {console.log(`[ X ]\tupdateGuild()`, o)})
		.catch((o) => {console.log(`[   ]\tupdateGuild()`, o)});
	for (let valueB of [...values, g.guild_id]) {
		db.updateGuild(valueB)
			.then ((o) => {console.log(`[ X ]\tupdateGuild(${valueB})`, o)})
			.catch((o) => {console.log(`[   ]\tupdateGuild(${valueB})`, o)});
		for (let valueA of [...values, g.guild_id]) {
			db.updateGuild(valueA, {name: valueB})
				.then ((o) => {console.log(`[ X ]\tupdateGuild(${valueA}, ${valueB})`, o)})
				.catch((o) => {console.log(`[   ]\tupdateGuild(${valueA}, ${valueB})`, o)});
		}
	}
});
*/
logger.info('Tested updateGuild.');

module.exports = { cases };
