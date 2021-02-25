let imageURL = document.getElementById("guildImage").src;
let fileInput = document.getElementById("iconInput");
let iconFile = null;

// TODO inline this
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
    isValid
		? guildNameErrorMsg.classList.add("hidden")
		: guildNameErrorMsg.classList.remove("hidden");
    return isValid;
};

const updateDefaultImageMaybe = () => {
	if(imageURL.includes("https://ui-avatars.com/api/?")) updateDefaultImage();
};

document.getElementById("guildNameInput").addEventListener("focusout", updateDefaultImageMaybe);

const updateDefaultImage = () => {
    let guildName = document.getElementById("guildNameInput").value;
	// FIXME should probably (also) use encodeURIComponent
    guildName = guildName.replaceAll(/[ _]/g, "+");
    console.log(guildName);
    imageURL = `https://ui-avatars.com/api/?background=${getUniqueColor()}&name=` + guildName;
    updateGuildIcon(imageURL);
};



document.getElementById("iconInput").addEventListener("input", () => {
    if( validateIcon()) {
        imageURL = window.URL.createObjectURL(document.getElementById("iconInput").files[0]);
        updateGuildIcon(imageURL);
    }
	iconFile = document.getElementById("iconInput").files[0];
	document.getElementById("iconInput").value = "";
});

const validateIcon = () => {
    let input = document.getElementById("iconInput").value;
    console.log(input);
    let iconRegex = /\.(jpg|png|jpeg|svg|jfif|pjpeg|pjp)$/i;
    isValid = iconRegex.test(input) || input == "";
    let iconErrorMsg = document.getElementById("iconErrorMsg");
    isValid
		? iconErrorMsg.classList.add("hidden")
		: iconErrorMsg.classList.remove("hidden");
    return isValid;
};

const updateGuildIcon = (imgURL) => {
    document.getElementById("guildImage").src = imgURL;
};


const validateForm = () => {
    if(!validateGuildName()) {
        if(!validateIcon())
				updateDefaultImage();
        return false;
    }
	return true;
};

const removeImage = () => {
    updateDefaultImage();
	iconFile = null;
};

document.getElementById("removeImageBtn").addEventListener("click", removeImage);




//Intercept the form submit and post from here instead
document.getElementById("createGuildForm").addEventListener("submit", event => {
	event.preventDefault();
	//Post image and get icon_id
	//TODO: Fix below: Dont know how to post image

	if (validateForm()) {

	updateDefaultImageMaybe();

	// If we have an image file, then send that
	// otherwise, send the image src of the preview
	// either way, use the snowflake we get back in the guild post
	const formData = new FormData(); // may or may not use this, i know
	formData.append('icon', iconFile);
	const iconPostOptions = (iconFile) ? {
		method: 'POST'
		, body: formData
	} : {
		method: 'POST'
		, body: JSON.stringify({url: imageURL})
		, headers: new Headers({'Content-Type': 'application/json'})
	};

    fetch(`/api/${APIVERSION}/icons`, iconPostOptions)
		.then(response => response.json())
		.then(data => {
			let formData = {
				"name": document.getElementById("guildNameInput").value,
				"icon_id": data.icon_id
			};

        return fetch(`/api/${APIVERSION}/guilds`, {
            method: "post",
            body: JSON.stringify(formData)
					, headers: new Headers({'Content-Type': 'application/json'})
        });
    })
		.then(response => response.json())
		.then(guild => {
			return fetch(`/api/${APIVERSION}/guilds/${guild.guild_id}/text-channels`, {
				method: 'POST'
				, body: JSON.stringify({
					name: 'general'
				})
				, headers: new Headers({'Content-Type': 'application/json'})
			});
		})
		.then(response => response.json())
		.then(channel => {
        window.location.href = "/app/" + channel.guild_id + '/' + channel.channel_id;
    });
}

});
