let imageURL = document.getElementById("guildImage").src;
let imageHasBeenChanged = false;
let guild_id = document.getElementById("guildIdField").value;

document.getElementById("deleteGuildBtn").addEventListener("click", () => {
    deleteGuild();
});

const deleteGuild = () => {
    console.log("delete");
    //TODO: api delete fetch request
}




document.getElementById("guildNameInput").addEventListener("input", () => {
    validateGuildName();
});
const validateGuildName = () => {
    let input = document.getElementById("guildNameInput").value;
    let guildNameRegex = /^[a-zA-Z0-9_ ]+$/;
    let areCharactersValid = guildNameRegex.test(input);
    let isLongEnough = input.length > 0;
    let isShortEnough = input.length < 65;

    let guildNameErrorMsg = document.getElementById("guildNameErrorMsg");

    if(!isLongEnough) guildNameErrorMsg.innerHTML = "Guild name is too short";
    else if(!areCharactersValid) guildNameErrorMsg.innerHTML = "Invalid character(s)";
    else if(!isShortEnough) guildNameErrorMsg.innerHTML = "Guild name is too long";

    let isValid = areCharactersValid && isShortEnough && isLongEnough;
    isValid ? guildNameErrorMsg.classList.add("hidden"):guildNameErrorMsg.classList.remove("hidden");
    return isValid;
}

document.getElementById("guildNameInput").addEventListener("focusout", () => {
    if(imageURL.includes("https://ui-avatars.com/api/?")) updateDefaultImage();
});

const updateDefaultImage = () => {
    let guildName = document.getElementById("guildNameInput").value;
    guildName = guildName.replaceAll(/[ _]/g, "+");
    console.log(guildName);
    imageURL = "https://ui-avatars.com/api/?background=random&name=" + guildName;
    updateGuildIcon(imageURL);
}



document.getElementById("iconInput").addEventListener("input", () => {
    if( validateIcon()) {
        imageURL = window.URL.createObjectURL(document.getElementById("iconInput").files[0]);
        updateGuildIcon(imageURL);
        imageHasBeenChanged = true;
    }
    document.getElementById("iconInput").value = "";
});

const validateIcon = () => {
    let input = document.getElementById("iconInput").value;
    console.log(input);
    let iconRegex = /\.(jpg|png|jpeg|svg|jfif|pjpeg|pjp)$/i;
    isValid = iconRegex.test(input) || input == "";
    let iconErrorMsg = document.getElementById("iconErrorMsg");
    isValid ? iconErrorMsg.classList.add("hidden"): iconErrorMsg.classList.remove("hidden");

    return isValid;
}



const updateGuildIcon = imgURL => {
    document.getElementById("guildImage").src = imgURL;
}


const validateForm = () => {
    if(!validateGuildName()) {
        if(!validateIcon()) updateDefaultImage();
        return false;
    }
}


document.getElementById("removeImageBtn").addEventListener("click", () => {removeImage();});

const removeImage = () => {
    updateDefaultImage();
} 



//Intercept the form submit and post from here instead
document.getElementById("updateGuildForm").addEventListener("submit", event => {
    event.preventDefault();
    //Post image and get icon_id
    //TODO: Fix below: Dont know how to post image
    if(imageHasBeenChanged) {
        fetch(`/api/${APIVERSION}/icons`, {
            method: "post",
            body: imageURL
        }).then(response => (
            response.json()
        )).then(updateGuild
        ).then(updateChannels
        ).then(data => {
            window.location.href = "/app/" + guild_id;
        });
    } else {
        updateGuild({})
        .then(updateChannels
        ).then(data => {
            window.location.href = "/app/" + guild_id;
        });
    }

});


const updateGuild = async(data) => {
    let formData = {
        "name": document.getElementById("guildNameInput").value
    }
    if(data.icon_id) formData.icon_id = data.icon_id;

    return fetch(`/api/${APIVERSION}/guilds/${guild_id}`, {
        method: "put",
        body: JSON.stringify(formData)
    });
}




