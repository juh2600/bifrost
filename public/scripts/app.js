document.getElementById("guildSettingsBtn").innerHTML = "<div class='three-dots'><div></div><div></div><div></div></div>";
document.getElementById("guildSettingsBtn").addEventListener("click", () => {
    //Route to guild settings
});


document.getElementById("createGuildBtn").addEventListener("click", () => {
    //Route to createGuild page
});


//Add guild to list of guilds. Pass in a guild object
const addGuild = guild => {
    let guildDiv = document.createElement("div");
    guildDiv.classList.add("guild");
    guildDiv.dataset.guildId = guild.guild_id;

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