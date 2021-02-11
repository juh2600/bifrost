# Guilds

## Refers to all guilds

    /api/v1/guilds

## Refers to a specific guild

    /api/v1/guilds/<guild-snowflake>

# Text Channels

## Refers to all text channels

    /api/v1/text-channels

## Refers to all text channels in a specific guild

    /api/v1/guilds/<guild-snowflake>/text-channels

## Refers to a specific text channel

    /api/v1/text-channels/<text-channel-snowflake>
    /api/v1/guilds/<guild-snowflake>/text-channels/<text-channel-snowflake>

# Messages

## Refers to all messages

    /api/v1/messages

## Refers to all messages in a specific channel

    /api/v1/text-channels/<text-channel-snowflake>/messages
    /api/v1/guilds/<guild-snowflake>/text-channels/<text-channel-snowflake>/messages

## Refers to a specific message

    /api/v1/messages/<message-snowflake>
    /api/v1/text-channels/<text-channel-snowflake>/messages/<message-snowflake>
    /api/v1/guilds/<guild-snowflake>/text-channels/<text-channel-snowflake>/messages/<message-snowflake>

# Choosing an Endpoint

Use the most specific endpoint possible, while minimizing the number of requests sent. If your application only knows the snowflake of a specific message, then use the form `/api/v1/messages/<message-snowflake>`; however, if you already know what channel the message belongs to, then use `/api/v1/text-channels/<text-channel-snowflake>/messages/<message-snowflake>`. Do not request information just for the purpose of using a different endpoint.
