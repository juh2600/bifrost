let selectedGuildId;
let selectedChannelId;

let channelList;

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


const updateChannelList = () => {
    clearChannelList();
    fetch(`/api/v0/guilds/${selectedGuildId}/text-channels`)
    .then(response => response.json())
    .then(data => {
        channelList = data;
        //sort by position
        channelList.sort((a, b) => (a.position > b.position) ? 1 : -1);
        createChannelList(data);
    });
}
const clearChannelList = () => {
    document.getElementById("channelList").innerHTML = "";   
}
const createChannelList = (channelList) => {
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
        if(!changeChannel(selectedChannelId, true)) changeChannel(channelList[0].channel_id, true);
    }
    else changeChannel(channelList[0].channel_id, true);
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
        populateMessages();
    }
    return newChannelExists;
}


//TODO: Request messages for new channel
const populateMessages = () => {

}


const changeGuild = (newGuildId, addToHistory) => {

}


const updateHistory = () => {
    let newURL = `/app/${selectedGuildId}/${selectedChannelId}`;
    history.pushState("What I was typing before", "", newURL);
}

//Callback when user clicks back button
window.onpopstate = () => {
    //history.back();
    //get current url, parse it, and load correct guild & channel
    selectedGuildId = getIdFromURL("guild");
    selectedChannelId = getIdFromURL("channel");
    changeGuild(selectedGuildId, false);
    changeChannel(selectedChannelId, false);
}


//get init channel list if guild is selected
if(selectedGuildId) updateChannelList();


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
})

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

