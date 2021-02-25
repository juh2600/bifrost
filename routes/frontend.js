const logger = require("logger").get("frontend");
//const socket = io();

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
  // if (req.session.username) {
  //   res.redirect("/app");
  // } else {
  res.render("index", {
    // key: value
  });
  // }
  // console.log(usersArray);
};

const app = (req, res) => {
  db.getGuilds().then(dbGuildList => {
    db.getUsers().then(dbUsersList => {
      res.render("app", {
        guildList: dbGuildList,
        userList: dbUsersList
      });
    });
  });

  console.log(JSON.stringify(req.session));
};

const signUp = (req, res) => {
  // if (req.session.username) {
  //   res.redirect("/app");
  // } else {
  res.render("signUp", {
    // key: value
  });
  // }
};

const logIn = (req, res) => {
  // if (req.session.username) {
  //   res.redirect("/app");
  // } else {
  res.render("logIn", {
    // key: value
  });
  // }
};

const createGuild = (req, res) => {
  // if (req.session.username) {
  res.render("createGuild", {
    // key: value
  });
  // } else {
  //   res.redirect("/");
  // }
};

//////////
const createUser = (req, res) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    newUserIcon: req.body.newUserIcon,
  };
  usersArray.push(user);
  res.redirect("/");
};

const authorize = (req, res) => {
  usersArray.forEach((item, index) => {
    if (item.email === req.body.email && item.password === req.body.password) {
      req.session.username = item.username;
      res.redirect("/app");
    }
  });
  res.redirect("/login");
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
  res.render("userSettings", {
    user_id: req.params.snowflake,
  });
};

const logout = (req, res) => {
  console.log(JSON.stringify(req.session));
  req.session.destroy();
  res.redirect("/");
  console.log(JSON.stringify(req.session));
};

//////////

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
    uri: "/authorize",
    methods: ["post"],
    handler: authorize,
  },
  {
    uri: "/logout",
    methods: ["get"],
    handler: logout,
  },
  {
    uri: "/guilds/create",
    methods: ["get"],
    handler: createGuild,
  },
  {
    uri: "/guilds/:snowflake/settings",
    methods: ["get"],
    handler: guildSettings,
  },
  {
    uri: "/users/:snowflake/settings",
    methods: ["get"],
    handler: userSettings,
  },
];

module.exports = { logger, routes, configure };
