const logger = require("logger").get("frontend");
const apiVersion = 'v1';

let db;
const configure = (obj) => {
	db = obj['db'];
};

const handle = (code, req, res) => {
	return errors => {
		res
			.status(code)
			.json(errors)
	};
};

const index = (req, res) => {
  res.render("index", {
    // key: value
  });
};

const app = (req, res) => {
  db.getGuilds().then(dbGuildList => {
    db.getUsers().then(dbUsersList => {
      res.render("app", {
        guildList: dbGuildList,
        userList: dbUsersList,
				apiVersion
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
  db.getGuilds({"guild_id": req.params.snowflake}).then(dbGuild => {
    if(dbGuild.length > 0){
      res.render('guildSettings', {
        guild: dbGuild[0]
      });
    }
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
    uri: "/signup",
    methods: ["get"],
    handler: signUp,
  },
  {
    uri: "/login",
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

module.exports = { logger, routes, configure };
