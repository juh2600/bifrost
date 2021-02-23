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
        guild_id: "87654",
        icon_id: "sdfsdfjdshfkjashfkjahdsflkjadsa",
        name: "e",
      },
      {
        guild_id: "4536",
        icon_id: "qwertyuiop",
        name: "f",
      },
      {
        guild_id: "2142",
        icon_id: "sdfsdfjdshfkjashfkjahdsflkjadsa",
        name: "g",
      },
      {
        guild_id: "8798",
        icon_id: "qwertyuiop",
        name: "h",
      },
      {
        guild_id: "09",
        icon_id: "sdfsdfjdshfkjashfkjahdsflkjadsa",
        name: "I",
      },
      {
        guild_id: "345678",
        icon_id: "qwertyuiop",
        name: "J",
      },
    ];
  },
  getUsers: async () => {
    return [
      {
        user_id: "811410903487692800",
        name:
          "8888888888888888888888888888888888888888888888888888888888888888",
        icon_id: "811411148556681216",
        email: "josephreed2600@gmail.com",
        discriminator: 1234,
      },
      {
        user_id: "811411148556681216",
        name: "Joe 2",
        icon_id: "811411487263506432",
        email: "josephreed2601@gmail.com",
        discriminator: 1234,
      },
      {
        user_id: "811411322687406080",
        name: "Joe 3",
        icon_id: "811411461028134912",
        email: "josephreed2602@gmail.com",
        discriminator: 1234,
      },
      {
        user_id: "811411348876640256",
        name: "Joe 4",
        icon_id: "811411438727020544",
        email: "josephreed2603@gmail.com",
        discriminator: 1234,
      },
      {
        user_id: "811411377200775168",
        name: "Joe 5",
        icon_id: "811411410646155264",
        email: "josephreed2604@gmail.com",
        discriminator: 1234,
      },
      {
        user_id: "811410903487692808",
        name: "Joe 1",
        icon_id: "811411148556681216",
        email: "josephreed2600@gmail.com",
        discriminator: 1234,
      },
      {
        user_id: "811411148556681216",
        name: "Joe 2",
        icon_id: "811411487263506432",
        email: "josephreed2601@gmail.com",
        discriminator: 1234,
      },
      {
        user_id: "811411322687406080",
        name: "Joe 3",
        icon_id: "811411461028134912",
        email: "josephreed2602@gmail.com",
        discriminator: 1234,
      },
      {
        user_id: "811411348876640256",
        name: "Joe 4",
        icon_id: "811411438727020544",
        email: "josephreed2603@gmail.com",
        discriminator: 1234,
      },
      {
        user_id: "811411377200775168",
        name: "Joe 5",
        icon_id: "811411410646155264",
        email: "josephreed2604@gmail.com",
        discriminator: 1234,
      },
      {
        user_id: "811410903487692806",
        name: "Joe 1",
        icon_id: "811411148556681216",
        email: "josephreed2600@gmail.com",
        discriminator: 1234,
      },
      {
        user_id: "811411148556681216",
        name: "Joe 2",
        icon_id: "811411487263506432",
        email: "josephreed2601@gmail.com",
        discriminator: 1234,
      },
      {
        user_id: "811411322687406080",
        name: "Joe 3",
        icon_id: "811411461028134912",
        email: "josephreed2602@gmail.com",
        discriminator: 1234,
      },
      {
        user_id: "811411348876640256",
        name: "Joe 4",
        icon_id: "811411438727020544",
        email: "josephreed2603@gmail.com",
        discriminator: 1234,
      },
      {
        user_id: "811411377200775168",
        name: "Joe 5",
        icon_id: "811411410646155264",
        email: "josephreed2604@gmail.com",
        discriminator: 1234,
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
      dal.getUsers().then((dalUsersList) => {
        res.render("app", {
          guildList: dalGuildList,
          userList: dalUsersList,
        });
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
  res.render("guildSettings", {
    guild_id: req.params.snowflake,
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
