CREATE KEYSPACE bifrost WITH replication =
	{'class': 'SimpleStrategy', 'replication_factor': 1};

CREATE TABLE bifrost.guilds (
	guild_id bigint,
	name text,
	icon_id bigint,
	PRIMARY KEY (guild_id)
);

CREATE TABLE bifrost.channels_by_guild (
	guild_id bigint,
	channel_id bigint,
	position int,
	name text,
	PRIMARY KEY ((guild_id), position)
) WITH CLUSTERING ORDER BY (position ASC);
// would've used channel_id rather than position for clustering key, but
// it makes more sense to sort by position, and position should be unique
// within each partition (guild) anyways

CREATE TABLE bifrost.messages_by_channel (
	channel_id bigint,
	bucket int,
	message_id bigint,
	author_id bigint,
	body text,
	PRIMARY KEY ((channel_id, bucket), message_id)
) WITH CLUSTERING ORDER BY (message_id ASC); // discord says desc?
