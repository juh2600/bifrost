const socket = io();

const chatAreaId = document.getElementById("chatArea");

//Adds message to chat area
socket.on("message", (message) => {
  fetch(
    `/api/v0/guilds/${selectedGuildId}/text-channels/${selectedChannelId}/messages`
  )
    .then((response) => response.json())
    .then((data) => {
      data[0].body = message;
      addMessage(data[0]);
    });

  chatAreaId.scrollTop = chatAreaId.scrollHeight;
});

const messageInput = document.querySelector("#message-input");
messageInput.addEventListener("keypress", (evt) => {
  if (evt.keyCode === 13) {
    evt.preventDefault();
    let msg = messageInput.value;
    socket.emit("chatMessage", {
      currentChannel: selectedChannelId,
      body: msg,
    });
  }
});
