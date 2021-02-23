const logger = require("logger").get("frontend");
//const socket = io();

const dal = {
  getGuilds: async () => {
    return [
      {
        guild_id: "456",
        icon_id: "sdfsdfjdshfkjashfkjahdsflkjadsa",
        name: "a",
      },
      {
        guild_id: "123",
        icon_id: "qwertyuiop",
        name: "b",
      },
      {
        guild_id: "4124",
        icon_id: "sdfsdfjdshfkjashfkjahdsflkjadsa",
        name: "c",
      },
      {
        guild_id: "452345",
        icon_id: "qwertyuiop",
        name: "d",
      },
      {
        guild_id: "75",
        icon_id: "sdfsdfjdshfkjashfkjahdsflkjadsa",
        name: "EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE",
      },
      {
        guild_id: "45",
        icon_id: "qwertyuiop",
        name: "LONG NAMEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE",
      },
      {
        guild_id: "456",
        icon_id: "sdfsdfjdshfkjashfkjahdsflkjadsa",
        name: "e",
      },
      {
        guild_id: "123",
        icon_id: "qwertyuiop",
        name: "f",
      },
      {
        guild_id: "4124",
        icon_id: "sdfsdfjdshfkjashfkjahdsflkjadsa",
        name: "g",
      },
      {
        guild_id: "452345",
        icon_id: "qwertyuiop",
        name: "h",
      },
      {
        guild_id: "75",
        icon_id: "sdfsdfjdshfkjashfkjahdsflkjadsa",
        name: "I",
      },
      {
        guild_id: "45",
        icon_id: "qwertyuiop",
        name: "J",
      },
    ];
  },
};

const usersArray = [];

const index = (req, res) => {
  if (req.session.username) {
    res.redirect("/app");
  } else {
    res.render("index", {
      // key: value
    });
  }
  console.log(usersArray);
};

const app = (req, res) => {
  if (req.session.username) {
    dal.getGuilds().then((dalGuildList) => {
      res.render("app", {
        guildList: dalGuildList,
      });
    });
  } else {
    res.redirect("/");
  }
  console.log(JSON.stringify(req.session));
};

const signUp = (req, res) => {
  if (req.session.username) {
    res.redirect("/app");
  } else {
    res.render("signUp", {
      // key: value
    });
  }
};

const logIn = (req, res) => {
  if (req.session.username) {
    res.redirect("/app");
  } else {
    res.render("logIn", {
      // key: value
    });
  }
};

const createGuild = (req, res) => {
  if (req.session.username) {
    res.render("createGuild", {
      // key: value
    });
  } else {
    res.redirect("/");
  }
};
const guildSettings = (req, res) => {
  if (req.session.username) {
    res.render("guildSettings", {
      // key: value
    });
  } else {
    res.redirect("/");
  }
};
const userSettings = (req, res) => {
  if (req.session.username) {
    res.render("userSettings", {
      // key: value
    });
  } else {
    res.redirect("/");
  }
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
    } else {
      res.redirect("/login");
    }
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
    uri: "/signUp",
    methods: ["get"],
    handler: signUp,
  },
  {
    uri: "/signUpComplete",
    methods: ["post"],
    handler: createUser,
  },
  {
    uri: "/logIn",
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

module.exports = { logger, routes };
