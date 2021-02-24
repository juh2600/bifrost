let selectedGuildId;
let selectedChannelId;

let channelList;
let messagesList = [];
let usersList = [];

//Get current guild and channel ids out of the URL if they are present
const getIdFromURL = (typeOfID) => {
    let url = window.location.href;
    if(typeOfID == "guild") {
        try {
            return (url.split("/app")[1].split("/")[1]);
        } catch (error) {}
    }
    else if (typeOfID = "channel") {
        try {
            return (url.split("/app")[1].split("/")[2]);
        } catch (error) {}
    }
    return null;
}
selectedGuildId = getIdFromURL("guild");
selectedChannelId = getIdFromURL("channel");


const updateChannelList = (addToHistory) => {
    clearChannelList();
    fetch(`/api/v0/guilds/${selectedGuildId}/text-channels`)
    .then(response => response.json())
    .then(data => {
        channelList = data;
        //sort by position
        channelList.sort((a, b) => (a.position > b.position) ? 1 : -1);
        createChannelList(data, addToHistory);
    });
}
const clearChannelList = () => {
    document.getElementById("channelList").innerHTML = "";   
}
const createChannelList = (channelList, addToHistory) => {
    //create divs and append to container
    channelList.forEach(channel => {
        let div = document.createElement("div");
        div.classList.add("channel");
        div.dataset.channelId = channel.channel_id;
        div.addEventListener("click", () => changeChannel(channel.channel_id, true));
        let name = document.createElement("p");
        name.innerHTML = "#" + channel.name;
        div.appendChild(name);
        document.getElementById("channelList").appendChild(div);
    });

    //show selected channel. if channel is invalid or unspecified,show first channel in list
    if(selectedChannelId) {
        if(!changeChannel(selectedChannelId, addToHistory)) changeChannel(channelList[0].channel_id, addToHistory);
    }
    else changeChannel(channelList[0].channel_id, addToHistory);
}


//Get messages for new channel, change selected channel styles
const changeChannel = (newChannelId, addToHistory) => {
    let newChannelExists = false;
    let newChannelName;
    //Search list for new channel
    channelList.forEach(channel => {
        if(channel.channel_id == newChannelId) {
            newChannelExists = true;
            newChannelName = channel.name;
        }
    });
    //if new channel exists, switch to it
    if(newChannelExists) {
        //Remove selected from all channels
        [...document.getElementById("channelList").children].forEach(channel => {
            channel.classList.remove("selected");
        });
        //add selected class to new selected channel
        document.querySelector('[data-channel-id="'+ newChannelId +'"]').classList.add("selected");
        //Change current channel name
        document.getElementById("channelName").innerHTML = `#${newChannelName}`;
        //Update selected channel id
        selectedChannelId = newChannelId;
        
        //Update url and history
        if(addToHistory) updateHistory();

        //Repopulate messages
        getMessages();
    }
    return newChannelExists;
}


const getMessages = () => {
    fetch(`/api/v0/guilds/${selectedGuildId}/text-channels/${selectedChannelId}/messages`)
    .then(response => response.json())
    .then(data => {
        messagesList = data;
        clearMessagesArea();
        populateMessages();
    });
}

const clearMessagesArea = () => {
    document.getElementById("chatArea").innerHTML = "";
}

//Create message div for each message and append to screen
const populateMessages = () => {
    messagesList.forEach(message => {
        addMessage(message);
    });
}

const addMessage = message => {
    let div = document.createElement("div");
        div.classList.add("message");
        div.dataset.messageId = message.message_id;

        let imgContainer = document.createElement("div");
        imgContainer.classList.add("img-circle");

        let image = document.createElement("img");

        let user = getUserById(message.author);
        console.log(message.author);
        console.log(user);
        image.src = "/api/v0/icons/" + user.icon_id;
        image.classList.add("img");
        imgContainer.appendChild(image);


        let messageSection = document.createElement("div");
        messageSection.classList.add("message-section");

        let titleBar = document.createElement("div");
        titleBar.classList.add("title-bar");

        let userName = document.createElement("p");
        userName.classList.add("username");
        userName.innerHTML = user.name;

        let timestamp = document.createElement("span");
        timestamp.classList.add("timestamp");
        //TODO: FIX LATER
        timestamp.innerHTML = "timestamp";

        titleBar.appendChild(userName);
        titleBar.appendChild(timestamp);


        let messageContent = document.createElement("p");
        messageContent.classList.add("content");
        messageContent.innerHTML = message.body;

        messageSection.appendChild(titleBar);
        messageSection.appendChild(messageContent);
        

        div.appendChild(imgContainer);
        div.appendChild(messageSection);

        document.getElementById("chatArea").appendChild(div);
}


const getUserById = userId => {
    usersList.forEach(user => {
        if(user.user_id == userId) return user;
    });
    return {
        "user_id": "-1",
        "name": "Deleted User",
        "icon_id": "",
        "email": "",
        "discriminator": 1234
    }
}

const changeGuild = (newGuildId, addToHistory) => {
    let newGuildExists = false;
    let newGuildName;
    //Search list for new guild
    [...document.getElementById("guildCollection").children].forEach(guild => {
        if(guild.dataset.guildId == newGuildId) {
            newGuildExists = true;
            newGuildName = guild.dataset.guildName;
        }
    });

    if(newGuildExists) {
        //Remove selected class from all guilds
        [...document.getElementById("guildCollection").children].forEach(guild => {
            guild.classList.remove("selected");
        });
        //add selected class to new selected guild
        document.querySelector('[data-guild-id="'+ newGuildId +'"]').classList.add("selected");
        //Change current guild name
        //Change current channel name
        document.getElementById("guildName").innerHTML = newGuildName;
        //Update selected channel id
        selectedGuildId = newGuildId;
        //Update url and history
        //if(addToHistory) updateHistory();
        updateChannelList(addToHistory);


        //Hide elements that are displayed when no channel is selected
        hideEmptyScreen();
    }
    else {
        //TODO: Show no channel selected page
        showEmptyScreen();
    }
}


const updateHistory = () => {
    let newURL = `/app/${selectedGuildId}/${selectedChannelId}`;
    history.pushState("What I was typing before", "", newURL);
}

//Callback when user clicks back button
window.onpopstate = () => {
    //get current url, parse it, and load correct guild & channel
    selectedGuildId = getIdFromURL("guild");
    selectedChannelId = getIdFromURL("channel");
    changeGuild(selectedGuildId, false);
}


//Page shown when no channel is selected
const showEmptyScreen = () => {
    //hide text channels label
    document.getElementById("channelListLabel").classList.add("hidden");

    //show cumpus
    document.getElementById("cumpusSection").classList.remove("hidden");

}

const hideEmptyScreen = () => {
    //show text channels label
    document.getElementById("channelListLabel").classList.remove("hidden");

    //hide cumpus
    document.getElementById("cumpusSection").classList.add("hidden");
}



//Make 3 dots icon
document.getElementById("guildSettingsBtn").innerHTML = "<div class='three-dots'><div></div><div></div><div></div></div>";

document.getElementById("guildSettingsBtn").addEventListener("click", () => {
    //Route to guild settings
    window.location.href = `/guilds/${selectedGuildId}/settings`;
});


document.getElementById("createGuildBtn").addEventListener("click", () => {
    //Route to createGuild page
    window.location.href = "/guilds/create";
});


//Add guild to list of guilds. Pass in a guild object
const addGuild = guild => {
    let guildDiv = document.createElement("div");
    guildDiv.classList.add("guild");
    guildDiv.dataset.guildId = guild.guild_id;
    guildDiv.dataset.guildName = guild.name;
    setupTooltip(guildDiv, guildDiv.dataset.guildName);
    guild.addEventListener("click", () => {changeGuild(guild.guild_id, true)});


    let imgContainer = document.createElement("div");
    imgContainer.classList.add("img-circle");

    let image = document.createElement("img");
    image.src = "/api/v0/icons/" + guild.icon_id;
    image.classList.add("img");

    imgContainer.appendChild(image);
    guildDiv.appendChild(imgContainer);
    document.getElementById("guildCollection").appendChild(guildDiv);
}

//Delete guild by ID
const removeGuild = guildId => {
    document.getElementById("guildCollection").querySelector(`[data-guild-id='${guildId}']`).remove();
}



//Show guild name on hover 
const setupTooltip = (guildDiv, message) => {
    let tooltip = document.getElementById("tooltip");
    guildDiv.addEventListener("mouseover", () => {
        tooltip.style.display = "block";
        tooltip.style.left = offset(guildDiv).left + 85;
        tooltip.style.top = offset(guildDiv).top + 17;
        tooltip.innerHTML = message;
    });
    guildDiv.addEventListener("mouseout", () => {
        tooltip.style.display = "none";
    });

}

//setup tool tip for all guilds that were rendered server side
[...document.getElementById("guildCollection").children].forEach(guild => {
    setupTooltip(guild, guild.dataset.guildName);
    guild.addEventListener("click", () => {changeGuild(guild.dataset.guildId, true)});
});

setupTooltip(document.getElementById("createGuildBtn"), "Add Guild");


//https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/
//Used to get the position of an element on the screen
const offset = (el) => {
    let rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}


//Route to user settings when click on profile
document.getElementById("currentUser").addEventListener("click", () => {
    window.location.href = `/users/${document.getElementById("currentUser").dataset.userId}/settings`;
});


//Get and store list of users
fetch("/api/v0/users")
.then(response => response.json())
.then(data => {
    console.log(data);
    usersList = data;
    //get init channel list if guild is selected
    if(selectedGuildId) changeGuild(selectedGuildId, true);
    else showEmptyScreen();
});