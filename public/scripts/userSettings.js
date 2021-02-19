let imageURL = document.getElementById("userImage").src;
document.getElementById("emailInput").addEventListener("input", () => {
    validateEmail();
});

const validateEmail = () => {
    let input = document.getElementById("emailInput").value;
    let emailRegex = /\w+@\w+\.\w+/;
    isValid = emailRegex.test(input);
    let emailErrorMsg = document.getElementById("emailErrorMsg");
    isValid ? emailErrorMsg.classList.add("hidden"): emailErrorMsg.classList.remove("hidden");
    return isValid;
}


document.getElementById("usernameInput").addEventListener("input", () => {
    validateUsername();
});
const validateUsername = () => {
    let input = document.getElementById("usernameInput").value;
    let usernameRegex = /^[a-zA-Z0-9_ ]+$/;
    let areCharactersValid = usernameRegex.test(input);
    let isLongEnough = input.length > 0;
    let isShortEnough = input.length < 65;

    let usernameErrorMsg = document.getElementById("usernameErrorMsg");

    if(!isLongEnough) usernameErrorMsg.innerHTML = "Username is too short";
    else if(!areCharactersValid) usernameErrorMsg.innerHTML = "Invalid character(s)";
    else if(!isShortEnough) usernameErrorMsg.innerHTML = "Username is too long";

    let isValid = areCharactersValid && isShortEnough && isLongEnough;
    isValid ? usernameErrorMsg.classList.add("hidden"): usernameErrorMsg.classList.remove("hidden");
    return isValid;
}


const updateDefaultImage = () => {
    imageURL = "https://www.gravatar.com/avatar/" + Math.floor(Math.random() * 15 + 1) + "?s=200&d=retro";
    updateUserIcon(imageURL);
}



document.getElementById("iconInput").addEventListener("input", () => {
    validateIcon();
});

const validateIcon = () => {
    let input = document.getElementById("iconInput").value;
    console.log(input);
    let iconRegex = /\.(jpg|png|jpeg|svg|jfif|pjpeg|pjp)$/;
    isValid = iconRegex.test(input);
    let iconErrorMsg = document.getElementById("iconErrorMsg");
    isValid ? iconErrorMsg.classList.add("hidden"): iconErrorMsg.classList.remove("hidden");

    if(isValid) {
        imageURL = window.URL.createObjectURL(document.getElementById("iconInput").files[0]);
        updateUserIcon(imageURL);
    }
    

    return isValid;
}

document.getElementById("removeImageBtn").addEventListener("click", () => {removeImage();});

const removeImage = () => {
    if(!imageURL.includes("https://www.gravatar.com/avatar/")) updateDefaultImage();
} 


const updateUserIcon = imgURL => {
    document.getElementById("userImage").src = imgURL;
}



document.getElementById("logoutBtn").addEventListener("click", () => {
    logoutUser();
});


const logoutUser = () => {
    //TODO: Logout user. Destroy session. All that jazz
}


const validateForm = () => {
    if(!validateEmail() || !validateUsername()) {
        if(!validateIcon()) updateDefaultImage();
        return false;
    }
}