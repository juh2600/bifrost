let isPageChanged = false;
let channelList;
let channelContainer = document.getElementsByClassName('channel-container')[0];

const setupEventListeners = () => {
    document.getElementById("addChannelBtn").addEventListener("click", () => {
        formatInputField();
        addChannel({"name":document.getElementById("newChannelName").value});
        updateChannelList();
    });
    document.getElementById("newChannelName").addEventListener("input", () => {
        formatInputField();
    });
}

const createChannel = (channelName) => {
    let channel = document.createElement('div');
    channel.classList.add('channel');

    let drag = document.createElement('div');
    drag.classList.add('drag');

    let name = document.createElement('p');
    name.classList.add('channel-name');
    name.innerHTML = '#' + channelName;

    let deleteBtn = document.createElement('div');
    deleteBtn.classList.add('delete');
    deleteBtn.classList.add('channel-delete');
    deleteBtn.innerHTML = '&times;';
    deleteBtn.addEventListener("click", evt => {
        deleteChannel(evt);
    });

    channel.appendChild(drag);
    channel.appendChild(name);
    channel.appendChild(deleteBtn);
    return channel;
}


const initializePage = () => {
    getData();
}


const getData = () => {
    fetch(`/api/${APIVERSION}/guilds/1/text-channels`)
    .then(response => response.json())
    .then(data => {
        populateData(data);
        setupEventListeners();
    });
}

const populateData = (data) => {
    //Sort channel list by position property
    data.sort((a, b) => (a.position > b.position) ? 1 : -1);
    console.log(data);
    for(let i = 0; i < data.length; i++) {
        addChannel(data[i]);
    }
    updateChannelList();
}

const addChannel = (channel) => {
    //Removes dashes from beginning/end if they exist
    channel.name = (channel.name.charAt(channel.name.length -1) == "-") ? channel.name.slice(0, -1) : channel.name;
    channel.name = (channel.name.charAt(0) == "-") ? channel.name.slice(1) : channel.name;

    let newChannel = createChannel(channel.name);
    newChannel.dataset.guild_id = guild_id;
    newChannel.dataset.name = channel.name;
    if(channel.position !== undefined) newChannel.dataset.position = channel.position;
    else if(channelList.length > 0) newChannel.dataset.position = parseInt(channelList[channelList.length-1].position) + 1;
    else newChannel.dataset.position = 0;
    if(channel.channel_id) newChannel.dataset.channel_id = channel.channel_id;
    channelContainer.appendChild(newChannel);
    document.getElementById("newChannelName").value = "";
    
}


const deleteChannel = evt => {
    channelContainer.removeChild(evt.toElement.parentElement);
    updatePositions();
    updateChannelList();
    console.log(channelList);
}

const updatePositions = () => {
    let newPosition = 0;
    [...document.getElementsByClassName('channel-container')[0].children].forEach(channel => {
        channel.dataset.position = newPosition;
        newPosition++;
    })
}

const updateChannelList = () => {
    channelList = [...document.getElementsByClassName('channel-container')[0].children].map(element => Object.assign({}, element.dataset));
}


const formatInputField = () => {
    let inputValue = document.getElementById("newChannelName").value;
    inputValue = inputValue.replaceAll(" ", "-");
    inputValue = inputValue.replaceAll("--", "-");
    inputValue = inputValue.replaceAll(/[^a-z-]/g, "");
    inputValue = inputValue.toLowerCase();
    document.getElementById("newChannelName").value = inputValue;
}


const updateChannels = () => {
    return fetch(`/api/${APIVERSION}/guilds/${guild_id}/text-channels`, {
        method: "put",
        body: JSON.stringify(channelList)
    });
}


initializePage();

