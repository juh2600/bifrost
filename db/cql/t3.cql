CREATE TABLE bifrost.messages_by_channel (
	channel_id bigint,
	bucket int,
	message_id bigint,
	author_id bigint,
	body text,
	PRIMARY KEY ((channel_id, bucket), message_id)
) WITH CLUSTERING ORDER BY (message_id ASC); // discord says desc?
