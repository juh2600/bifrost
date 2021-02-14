const logger = require("logger").get("frontend");

const index = (req, res) => {
  res.render("index", {
    // key: value
  });
};

const app = (req, res) => {
  res.render("app", {
    // key: value
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
		// key: value
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
