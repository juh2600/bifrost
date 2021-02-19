let imageURL = document.getElementById("guildImage").src;


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




document.getElementById("createGuildForm").addEventListener("submit", event => {
    event.preventDefault();
    console.log(event);
});