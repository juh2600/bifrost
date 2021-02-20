const logger = require("logger").get("frontend");

let people = [];

const index = (req, res) => {
  res.render("index", {
    // key: value
  });
};

const app = (req, res) => {
  if (req.session.user === "Cody") {
    res.render("app", {
      // key: value
    });
    console.log(JSON.stringify(req.session));
  } else {
    res.redirect("/");
    console.log(JSON.stringify(req.session));
  }
};

const signUp = (req, res) => {
  req.session.destroy();
  res.render("signUp", {
    // key: value
  });
  console.log(JSON.stringify(req.session));
};

const logIn = (req, res) => {
  req.session.user = "Cody";
  res.render("logIn", {
    // key: value
  });
  console.log(JSON.stringify(req.session));
};

const createGuild = (req, res) => {
  res.render("createGuild", {
    // key: value
  });
};
const guildSettings = (req, res) => {
  res.render("guildSettings", {
    // key: value
  });
};
const userSettings = (req, res) => {
  res.render("userSettings", {
    // key: value
  });
};

const createUser = (req, res) => {};

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

module.exports = { logger, routes };
