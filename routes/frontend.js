const logger = require("logger").get("frontend");
//const socket = io();
const apiVersion = "v1";

let db;
const configure = (obj) => {
  db = obj["db"];
};

const handle = (code, req, res) => {
  return (errors) => {
    console.error(errors);
    res.status(code).json(errors);
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

const requireAuth = (req, res, next) => {
  if (req.session.user_id) {
    next();
  } else {
    res.redirect("/");
  }
};

const app = (req, res) => {
  db.getGuilds()
    .then((dbGuildList) => {
      return db.getUsers().then((dbUsersList) => {
        const data = {
          guildList: dbGuildList,
          userList: dbUsersList,
          user: dbUsersList.filter(
            (user) => user.user_id == req.session.user_id
          )[0],
          apiVersion,
        };
        if (!data.user) {
          res.redirect("/");
          return;
        }
        console.log(data);
        console.log(req.session);
        res.render("app", data);
      });
    })
    .catch(handle(500, req, res));

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

// Shall create the session if they pass, or not do that if they don't
const attemptLogIn = (req, res) => {
  db.authenticate(req.body.email, req.body.password).then((user_id) => {
    if (user_id) {
      req.session.user_id = user_id;
      res.status(303).location("/app").end();
      return;
    }
    res.sendStatus(401);
    return;
  });
};

const authorize = (req, res) => {
  db.authenticate(req.body.email, req.body.password).then((user_id) => {
    if (user_id) {
      res.sendStatus(200);
      return;
    }
    res.sendStatus(401);
    return;
  });
};

const guildSettings = (req, res) => {
  db.getGuilds({ guild_id: req.params.snowflake }).then((dbGuild) => {
    if (dbGuild.length > 0) {
      res.render("guildSettings", {
        guild: dbGuild[0],
        apiVersion,
      });
    }
  });
};
const userSettings = (req, res) => {
  db.getUsers({ user_id: req.params.snowflake }).then((dbUser) => {
    res.render("userSettings", {
      apiVersion,
      currUser: dbUser[0],
    });
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
    uri: ["/app", "/app/:guild_id", "/app/:guild_id/:channel_id"],
    methods: ["get"],
    handler: [requireAuth, app],
  },
  {
    uri: "/signup",
    methods: ["get"],
    handler: signUp,
  },
  {
    desc: "Accepts nothing; returns 200 OK with login page",
    uri: "/login",
    methods: ["get"],
    handler: logIn,
  },
  {
    desc:
      "Accepts an email and password; returns either 303 See Other to /app or 401 Unauthorized",
    uri: "/login",
    methods: ["post"],
    handler: attemptLogIn,
  },
  {
    desc:
      "Accepts an email and password; returns either 200 OK or 401 Unauthorized",
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
    handler: [requireAuth, createGuild],
  },
  {
    uri: "/guilds/:snowflake/settings",
    methods: ["get"],
    handler: [requireAuth, guildSettings],
  },
  {
    uri: "/users/:snowflake/settings",
    methods: ["get"],
    handler: [requireAuth, userSettings],
  },
];

module.exports = { logger, routes, configure };
