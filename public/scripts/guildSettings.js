let imageURL = document.getElementById("guildImage").src;
let fileInput = document.getElementById("iconInput")
let iconFile = null;
let imageHasBeenChanged = false;
let guild_id = document.getElementById("guildIdField").value;

let settingsHaveBeenChanged = false;

document.getElementById("deleteGuildBtn").addEventListener("click", () => {
	deleteGuild();
});

//Delete guild
const deleteGuild = () => {
	console.log("delete");
	fetch(`/api/${APIVERSION}/guilds/${guild_id}`, {
		method: "delete",
		body: imageURL
	}).then(response => (
		window.location.href = "/app"
	));
}


const showSaveChangesContainer = () => {
	if(!settingsHaveBeenChanged) {
		document.getElementById("saveChangesContainer").classList.remove("hidden");
		settingsHaveBeenChanged = true;
	}
}



// TODO inline stuff
document.getElementById("guildNameInput").addEventListener("input", () => {
	showSaveChangesContainer();
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
	if(imageURL.includes("https://ui-avatars.com/api/?"))
		updateDefaultImage();
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
	showSaveChangesContainer();
	if( validateIcon()) {
		imageURL = window.URL.createObjectURL(document.getElementById("iconInput").files[0]);
		updateGuildIcon(imageURL);
		imageHasBeenChanged = true;
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



document.getElementById("deleteGuildBtn").addEventListener("click", deleteGuild);

const updateGuildIcon = (imgURL) => {
	document.getElementById("guildImage").src = imgURL;
};


const validateForm = () => {
	if(!validateGuildName()) {
		if(!validateIcon()) updateDefaultImage();
		return false;
	}
	return true;
};


const removeImage = () => {
	showSaveChangesContainer();
	updateDefaultImage();
	iconFile = null;
	imageHasBeenChanged = true;
};

document.getElementById("removeImageBtn").addEventListener("click", removeImage);



//Intercept the form submit and post from here instead
document.getElementById("updateGuildForm").addEventListener("submit", event => {
	event.preventDefault();

	if (validateForm()) {
		//Renumber the positions of the channels
		updatePositions();
		//Update the js object containing the channel list
		updateChannelList();

		//Post image and get icon_id
		//TODO: Fix below: Dont know how to post image


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
		if(imageHasBeenChanged) {
			fetch(`/api/${APIVERSION}/icons`, iconPostOptions)
				.then(response => response.json())
				.then(updateGuild)
				.then(updateChannels)
				.then(() => {
					//window.location.href = "/app/" + guild_id;
				});
		} else {
			updateGuild({})
				.then(updateChannels)
				.then(() => {
					//window.location.href = "/app/" + guild_id;
				});
		}
	}

});

const updateGuild = async (icon) => {
	let formData = {
		"name": document.getElementById("guildNameInput").value
	}
	if(icon && icon.icon_id) formData.icon_id = icon.icon_id;

	return fetch(`/api/${APIVERSION}/guilds/${guild_id}`, {
		method: "put",
		body: JSON.stringify(formData)
		, headers: new Headers({'Content-Type': 'application/json'})
	});
};
