const socket = io();

const chatAreaId = document.getElementsByClassName("chat-area")[0];

//TODO: Send message to dal. dal sends message to db. I lost my train of thot
// done! -- jtreed
//Adds message to chat area
socket.on("message", (message) => {
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
    socket.emit("chatMessage", {
      channel_id: selectedChannelId,
      author_id: document.getElementById("currentUser").dataset.userId,
      body: msg,
    });

    //Clear input field after message is sent
    messageInput.value = "";
    chatAreaId.scrollTop = chatAreaId.scrollHeight;
  }
});
