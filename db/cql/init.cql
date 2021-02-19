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
    name text,
    position int,
    PRIMARY KEY (guild_id, channel_id)
) WITH CLUSTERING ORDER BY (channel_id ASC);

CREATE TABLE bifrost.messages_by_channel_bucket (
	channel_id bigint,
	bucket int,
	message_id bigint,
	author_id bigint,
	body text,
	PRIMARY KEY ((channel_id, bucket), message_id)
) WITH CLUSTERING ORDER BY (message_id ASC); // discord says desc?
