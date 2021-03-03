const socket = io();

const chatAreaId = document.getElementsByClassName("chat-area")[0];

//Adds message to chat area
socket.on("message", (message) => {
  if (messagesList.length == 0) {
    clearMessagesArea();
  }
  addMessage(message);
  let bottom = chatAreaId.clientHeight + 60;
  let bottomBottom = chatAreaId.scrollHeight - chatAreaId.scrollTop;
  if (bottom > bottomBottom) {
    chatAreaId.scrollTop = chatAreaId.scrollHeight;
  }
});

const messageInput = document.querySelector("#message-input");
messageInput.addEventListener("keypress", (evt) => {
  if (evt.key === "Enter") {
    evt.preventDefault();
    let msg = messageInput.value;
    //Only allow user to send message if there is a message
    if (msg) {
      socket.emit("chatMessage", {
        channel_id: selectedChannelId,
        author_id: document.getElementById("currentUser").dataset.userId,
        body: msg,
      });

      //Clear input field after message is sent
      chatAreaId.scrollTop = chatAreaId.scrollHeight;
      messageInput.value = "";
    }
  }
});

// if you choose to use incremental updates in the future (e.g. just adding or removing something without refreshing the whole list),
// feel free to unroll these loops to make use of the data passed into each callback
for (let operation of ['create', 'update', 'delete'])
socket.on(operation + ' guild', () => {
	updateGuildDisplay();
});

for (let operation of ['create', 'update', 'delete'])
socket.on(operation + ' channel', () => {
	updateChannelList();
});

for (let operation of ['create', 'update', 'delete'])
socket.on(operation + ' user', () => {
	updateUserDisplay();
});
