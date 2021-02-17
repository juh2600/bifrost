let channelContainer = document.getElementsByClassName('channel-container')[0];


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

    channel.appendChild(drag);
    channel.appendChild(name);
    channel.appendChild(deleteBtn);
    return channel;
}


const getData = () => {

}

const addChannel = () => {
    let newChannel = createChannel(document.getElementById("#newChannelName"));
    channelContainer.appendChild(newChannel);
}

document.getElementById("addChannelBtn").addEventListener("click", () => {addChannel()})