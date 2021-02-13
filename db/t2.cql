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
