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
  }
}


const index = (req, res) => {
  res.render("index", {
    // key: value
  });
};

const app = (req, res) => {
  dal.getGuilds().then(dalGuildList => {
    res.render("app", {
      guildList: dalGuildList
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
      guild_id: req.params.guild_id
	});
};
const userSettings = (req, res) => {
	res.render('userSettings', {
		// key: value
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
