let selectedGuildId;
let selectedChannelId;


//Make 3 dots icon
document.getElementById("guildSettingsBtn").innerHTML = "<div class='three-dots'><div></div><div></div><div></div></div>";
document.getElementById("guildSettingsBtn").addEventListener("click", () => {
    //Route to guild settings
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