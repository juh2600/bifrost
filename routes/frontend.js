const logger = require("logger").get("frontend");

const dal = {
  getGuilds: async () => {
    return [
      {
        guild_id: "456",
        icon_id: "sdfsdfjdshfkjashfkjahdsflkjadsa",
        name: "a"
      },
      {
        guild_id: "123",
        icon_id: "qwertyuiop",
        name: "b"
      },
      {
        guild_id: "4124",
        icon_id: "sdfsdfjdshfkjashfkjahdsflkjadsa",
        name: "c"
      },
      {
        guild_id: "452345",
        icon_id: "qwertyuiop",
        name: "d"
      },
      {
        guild_id: "75",
        icon_id: "sdfsdfjdshfkjashfkjahdsflkjadsa",
        name: "EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE"
      },
      {
        guild_id: "45",
        icon_id: "qwertyuiop",
        name: "LONG NAMEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE"
      },
      {
        guild_id: "456",
        icon_id: "sdfsdfjdshfkjashfkjahdsflkjadsa",
        name: "e"
      },
      {
        guild_id: "123",
        icon_id: "qwertyuiop",
        name: "f"
      },
      {
        guild_id: "4124",
        icon_id: "sdfsdfjdshfkjashfkjahdsflkjadsa",
        name: "g"
      },
      {
        guild_id: "452345",
        icon_id: "qwertyuiop",
        name: "h"
      },
      {
        guild_id: "75",
        icon_id: "sdfsdfjdshfkjashfkjahdsflkjadsa",
        name: "I"
      },
      {
        guild_id: "45",
        icon_id: "qwertyuiop",
        name: "J"
      }
    ]
  },
  getUsers: async() => {
    return [
		  {"user_id": "811410903487692800", "name": "8888888888888888888888888888888888888888888888888888888888888888", "icon_id": "811411148556681216", "email": "josephreed2600@gmail.com", "discriminator": 1234}
		, {"user_id": "811411148556681216", "name": "Joe 2", "icon_id": "811411487263506432", "email": "josephreed2601@gmail.com", "discriminator": 1234}
		, {"user_id": "811411322687406080", "name": "Joe 3", "icon_id": "811411461028134912", "email": "josephreed2602@gmail.com", "discriminator": 1234}
		, {"user_id": "811411348876640256", "name": "Joe 4", "icon_id": "811411438727020544", "email": "josephreed2603@gmail.com", "discriminator": 1234}
		, {"user_id": "811411377200775168", "name": "Joe 5", "icon_id": "811411410646155264", "email": "josephreed2604@gmail.com", "discriminator": 1234}
    , {"user_id": "811410903487692800", "name": "Joe 1", "icon_id": "811411148556681216", "email": "josephreed2600@gmail.com", "discriminator": 1234}
		, {"user_id": "811411148556681216", "name": "Joe 2", "icon_id": "811411487263506432", "email": "josephreed2601@gmail.com", "discriminator": 1234}
		, {"user_id": "811411322687406080", "name": "Joe 3", "icon_id": "811411461028134912", "email": "josephreed2602@gmail.com", "discriminator": 1234}
		, {"user_id": "811411348876640256", "name": "Joe 4", "icon_id": "811411438727020544", "email": "josephreed2603@gmail.com", "discriminator": 1234}
		, {"user_id": "811411377200775168", "name": "Joe 5", "icon_id": "811411410646155264", "email": "josephreed2604@gmail.com", "discriminator": 1234}
    , {"user_id": "811410903487692800", "name": "Joe 1", "icon_id": "811411148556681216", "email": "josephreed2600@gmail.com", "discriminator": 1234}
		, {"user_id": "811411148556681216", "name": "Joe 2", "icon_id": "811411487263506432", "email": "josephreed2601@gmail.com", "discriminator": 1234}
		, {"user_id": "811411322687406080", "name": "Joe 3", "icon_id": "811411461028134912", "email": "josephreed2602@gmail.com", "discriminator": 1234}
		, {"user_id": "811411348876640256", "name": "Joe 4", "icon_id": "811411438727020544", "email": "josephreed2603@gmail.com", "discriminator": 1234}
		, {"user_id": "811411377200775168", "name": "Joe 5", "icon_id": "811411410646155264", "email": "josephreed2604@gmail.com", "discriminator": 1234}
	];
  }
}


const index = (req, res) => {
  res.render("index", {
    // key: value
  });
};

const app = (req, res) => {
  dal.getGuilds().then(dalGuildList => {
    dal.getUsers().then(dalUsersList => {
      res.render("app", {
        guildList: dalGuildList,
        userList: dalUsersList
      });
    });
  });
};

const signUp = (req, res) => {
  res.render("signUp", {
    // key: value
  });
};

const logIn = (req, res) => {
  res.render("logIn", {
    // key: value
  });
};

const createGuild = (req, res) => {
  res.render("createGuild", {
    // key: value
  });
};
const guildSettings = (req, res) => {
	res.render('guildSettings', {
    guild_id: req.params.snowflake
	});
};
const userSettings = (req, res) => {
	res.render('userSettings', {
    user_id: req.params.snowflake
	});
};

const routes = [
  {
    uri: "/",
    methods: ["get"],
    handler: index,
  },
  {
    uri: "/app",
    methods: ["get"],
    handler: app,
  },
  {
    uri: "/app/:guild_id",
    methods: ["get"],
    handler: app,
  },
  {
    uri: "/app/:guild_id/:channel_id",
    methods: ["get"],
    handler: app,
  },
  {
    uri: "/signUp",
    methods: ["get"],
    handler: signUp,
  },
  {
    uri: "/logIn",
    methods: ["get"],
    handler: logIn,
  },
  {
    uri: "/guilds/create",
    methods: ["get"],
    handler: createGuild,
  },
	{
		uri: '/guilds/:snowflake/settings',
		methods: ['get'],
		handler: guildSettings
	},
	{
		uri: '/users/:snowflake/settings',
		methods: ['get'],
		handler: userSettings
	}
];

module.exports = { logger, routes };
