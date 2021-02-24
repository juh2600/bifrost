const logger = require('logger').get('test');
const snowmachine = new (require('snowflake-generator'))(1420070400000);
const snow = () => snowmachine.generate().snowflake.toString();
const Long = require('long');

const db = require('./db/dal');

const g = {guild_id: '123456', icon_id: '765432', name: 'yeehaw'};
const values = [undefined, null, 3, 'bar', new Long(4), {}, [], g.guild_id];

for (let v of values) {
	try {
		console.log('>>> ', v, v.constructor.name)
	} catch {
	}
}
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
			.then ((o) => {console.log(`[ X ]\tgetGuilds({guild_id: ${valueA}, limit: ${valueB}})`, o)})
			.catch((o) => {console.log(`[   ]\tgetGuilds({guild_id: ${valueA}, limit: ${valueB}})`, o)});
	}
}
logger.info('Tested getGuilds.');

logger.info('Testing updateGuild...');
db.updateGuild()
	.then ((o) => {console.log(`[ X ]\tupdateGuild()`, o)})
	.catch((o) => {console.log(`[   ]\tupdateGuild()`, o)});
for (let valueB of values) {
	db.updateGuild(valueB)
		.then ((o) => {console.log(`[ X ]\tupdateGuild(${valueB})`, o)})
		.catch((o) => {console.log(`[   ]\tupdateGuild(${valueB})`, o)});
	for (let valueA of values) {
		db.updateGuild(valueA, {name: valueB})
			.then ((o) => {console.log(`[ X ]\tupdateGuild(${valueA}, {name: ${valueB}})`, o)})
			.catch((o) => {console.log(`[   ]\tupdateGuild(${valueA}, {name: ${valueB}})`, o)});
		for (let valueC of values) {
			db.updateGuild(valueA, {name: valueB, icon_id: valueC})
				.then ((o) => {console.log(`[ X ]\tupdateGuild(${valueA}, {name: ${valueB}, icon_id: ${valueC}})`, o)})
				.catch((o) => {console.log(`[   ]\tupdateGuild(${valueA}, {name: ${valueB}, icon_id: ${valueC}})`, o)});
		}
	}
}
logger.info('Tested updateGuild.');

logger.info('Testing deleteGuild...');
db.deleteGuild()
	.then ((o) => {console.log(`[ X ]\tdeleteGuild()`, o)})
	.catch((o) => {console.log(`[   ]\tdeleteGuild()`, o)});
for (let valueB of values) {
	db.deleteGuild(valueB)
		.then ((o) => {console.log(`[ X ]\tdeleteGuild(${valueB})`, o)})
		.catch((o) => {console.log(`[   ]\tdeleteGuild(${valueB})`, o)});
}
//db.getGuilds().then(guilds => guilds.map(guild => guild.guild_id)).then(guild_ids => guild_ids.forEach(db.deleteGuild));
logger.info('Tested deleteGuild.');

logger.info('Testing createChannel...');
db.createChannel()
	.then ((o) => {console.log(`[ X ]\tcreateChannel()`, o)})
	.catch((o) => {console.log(`[   ]\tcreateChannel()`, o)});
for (let valueB of values) {
	db.createChannel(valueB)
		.then ((o) => {console.log(`[ X ]\tcreateChannel(${valueB})`, o)})
		.catch((o) => {console.log(`[   ]\tcreateChannel(${valueB})`, o)});
	for (let valueA of values) {
		db.createChannel(valueA, valueB)
			.then ((o) => {console.log(`[ X ]\tcreateChannel(${valueA}, ${valueB})`, o)})
			.catch((o) => {console.log(`[   ]\tcreateChannel(${valueA}, ${valueB})`, o)});
		for (let valueC of values) {
			db.createChannel(valueA, valueB, valueC)
				.then ((o) => {console.log(`[ X ]\tcreateChannel(${valueA}, ${valueB}, ${valueC})`, o)})
				.catch((o) => {console.log(`[   ]\tcreateChannel(${valueA}, ${valueB}, ${valueC})`, o)});
		}
	}
}
logger.info('Tested createChannel.');

logger.info('Testing getChannels...');
db.getChannels()
	.then ((o) => {console.log(`[ X ]\tgetChannels()`, o)})
	.catch((o) => {console.log(`[   ]\tgetChannels()`, o)});
for (let valueA of values) {
	db.getChannels(valueA)
		.then ((o) => {console.log(`[ X ]\tgetChannels(${valueA})`, o)})
		.catch((o) => {console.log(`[   ]\tgetChannels(${valueA})`, o)});
	for (let valueB of values) {
		for (let valueC of values) {
			for (let valueD of values) {
				for (let valueE of values) {
					db.getChannels(valueA, {before: valueB, after: valueC, channel_id: valueD, limit: valueE})
						.then ((o) => {console.log(`[ X ]\tgetChannels(${valueA}, {before: ${valueB}, after: ${valueC}, channel_id: ${valueD}, limit: ${valueE}})`, o)})
						.catch((o) => {console.log(`[   ]\tgetChannels(${valueA}, {before: ${valueB}, after: ${valueC}, channel_id: ${valueD}, limit: ${valueE}})`, o)});
				}
			}
		}
	}
}
logger.info('Tested getChannels.');

logger.info('Testing updateChannel...');
db.updateChannel()
	.then ((o) => {console.log(`[ X ]\tupdateChannel()`, o)})
	.catch((o) => {console.log(`[   ]\tupdateChannel()`, o)});
for (let valueB of values) {
	db.updateChannel(valueB)
		.then ((o) => {console.log(`[ X ]\tupdateChannel(${valueB})`, o)})
		.catch((o) => {console.log(`[   ]\tupdateChannel(${valueB})`, o)});
	for (let valueA of values) {
		db.updateChannel(valueA, valueB)
			.then ((o) => {console.log(`[ X ]\tupdateChannel(${valueA}, ${valueB})`, o)})
			.catch((o) => {console.log(`[   ]\tupdateChannel(${valueA}, ${valueB})`, o)});
		for (let valueC of values) {
			db.updateChannel(valueA, valueB, {name: valueC})
				.then ((o) => {console.log(`[ X ]\tupdateChannel(${valueA}, ${valueB}, {name: ${valueC}})`, o)})
				.catch((o) => {console.log(`[   ]\tupdateChannel(${valueA}, ${valueB}, {name: ${valueC}})`, o)});
			for (let valueD of values) {
				db.updateChannel(valueA, valueB, {name: valueC, guild_id: valueD}) // these should pass/fail regardless of guild_id value: it should be ignored
					.then ((o) => {console.log(`[ X ]\tupdateChannel(${valueA}, ${valueB}, {name: ${valueC}, guild_id: ${valueD}})`, o)})
					.catch((o) => {console.log(`[   ]\tupdateChannel(${valueA}, ${valueB}, {name: ${valueC}, guild_id: ${valueD}})`, o)});
			for (let valueE of values) {
				db.updateChannel(valueA, valueB, {name: valueC, guild_id: valueD, channel_id: valueE}) // these should pass/fail regardless of channel_id value: it should be ignored
					.then ((o) => {console.log(`[ X ]\tupdateChannel(${valueA}, ${valueB}, {name: ${valueC}, guild_id: ${valueD}, channel_id: ${valueE}})`, o)})
					.catch((o) => {console.log(`[   ]\tupdateChannel(${valueA}, ${valueB}, {name: ${valueC}, guild_id: ${valueD}, channel_id: ${valueE}})`, o)});
			}
			}
		}
	}
}
logger.info('Tested updateChannel.');

//module.exports = { cases };
setInterval(() => {throw undefined;}, 3000);
