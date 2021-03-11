let imageURL = document.getElementById("profileImg").src;
let fileInput = document.getElementById("iconInput");
let iconFile = null;
let usernameInputId = document.getElementById("usernameInput");
let emailInputId = document.getElementById("emailInput");
let passwordInputId = document.getElementById("passwordInput");
let confirmInputId = document.getElementById("confirmInput");
let iconInputId = document.getElementById("iconInput");
let profileImgId = document.getElementById("profileImg");

usernameInputId.addEventListener("focusout", () => {
	validateUsername();
});

let imgURL = `https://www.gravatar.com/avatar/${Math.floor(
	Math.random() * 15 + 1
)}?s=200&d=retro`;

// TODO inline this
emailInputId.addEventListener("focusout", () => {
	validateEmail();
});

const validateUsername = () => {
	let input = usernameInputId.value;
	let usernameRegex = /^[a-zA-Z0-9_ ]+$/;
	let areCharactersValid = usernameRegex.test(input);
	let isLongEnough = input.length > 0;
	let isShortEnough = input.length < 65;
	let usernameErrorMsg = document.getElementById("usernameErrorMsg");

	if (!isLongEnough) usernameErrorMsg.innerHTML = "Username is too short";
	else if (!areCharactersValid)
		usernameErrorMsg.innerHTML = "Invalid character(s)";
	else if (!isShortEnough) usernameErrorMsg.innerHTML = "Username is too long";

	let isValid = areCharactersValid && isShortEnough && isLongEnough;
	isValid
		? usernameErrorMsg.classList.add("hidden")
		: usernameErrorMsg.classList.remove("hidden");
	return isValid;
};

const validateEmail = () => {
	let input = emailInputId.value;
	let emailRegex = /\w+@\w+\.\w+/;
	isValid = emailRegex.test(input);
	let emailErrorMsg = document.getElementById("emailErrorMsg");
	isValid
		? emailErrorMsg.classList.add("hidden")
		: emailErrorMsg.classList.remove("hidden");
	return isValid;
};

passwordInputId.addEventListener("focusout", () => {
	validatePassword();
	// confirmPassword();
});

const validatePassword = () => {
	let input = passwordInputId.value;
	//Minimum eight characters, at least one letter and one number
	let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).*{8,}$/;
	let passwordIsValid = passwordRegex.test(input);
	let passwordErrorMsg = document.getElementById("passwordErrorMsg");

	passwordIsValid
		? passwordErrorMsg.classList.add("hidden")
		: passwordErrorMsg.classList.remove("hidden");

	return passwordIsValid;
};

confirmInputId.addEventListener("focusout", () => {
	confirmPassword();
});

const confirmPassword = () => {
	let isValid =
		confirmInputId.value == passwordInputId.value && confirmInputId.value != "";
	let confirmErrorMsg = document.getElementById("confirmErrorMsg");
	isValid
		? confirmErrorMsg.classList.add("hidden")
		: confirmErrorMsg.classList.remove("hidden");
	return isValid;
};

const updateDefaultImageMaybe = () => {
	if (imageURL.includes(`https://www.gravatar.com/avatar/`)) updateDefaultImage();
};

document.getElementById("usernameInput").addEventListener("focusout", updateDefaultImageMaybe);

const updateDefaultImage = () => {
	let userName = document.getElementById("usernameInput").value;
	// FIXME should probably (also) use encodeURIComponent
	userName = userName.replaceAll(/[ _]/g, "+");
	console.log(userName);
	imageURL = imgURL;
	updateUserIcon(imageURL);
};



document.getElementById("iconInput").addEventListener("input", () => {
	if (validateIcon()) {
		imageURL = window.URL.createObjectURL(
			document.getElementById("iconInput").files[0]
		);
		updateUserIcon(imageURL);
	}
	iconFile = document.getElementById("iconInput").files[0];
	document.getElementById("iconInput").value = "";
});

const validateIcon = () => {
	let input = iconInputId.value;
	console.log(input);
	let iconRegex = /\.(jpg|png|jpeg|svg|jfif|pjpeg|pjp)$/i;
	isValid = iconRegex.test(input) || input == "";
	let iconErrorMsg = document.getElementById("iconErrorMsg");
	isValid
		? iconErrorMsg.classList.add("hidden")
		: iconErrorMsg.classList.remove("hidden");
	return isValid;
};

const updateUserIcon = (imgURL) => {
	profileImgId.src = imgURL;
};


const validateForm = () => {
	let validators = [
		validateEmail(),
		validateUsername(),
		validatePassword(),
		confirmPassword(),
	];
	let isValid = validators.reduce((a, b) => a && b);
	return isValid;
};

const removeImage = () => {
	updateDefaultImage();
	iconFile = null;
	document.getElementById("signUpImgTooLarge").innerHTML = "";
};

document.getElementById("removeImageBtn").addEventListener("click", removeImage);


document.querySelector(".file-input").addEventListener("click", () => {
	document.getElementById("signUpImgTooLarge").innerHTML = "";
  });

//Intercept the form submit and post from here instead
document.getElementById("signupForm").addEventListener("submit", event => {
	event.preventDefault();
	//Post image and get icon_id
	//TODO: Fix below: Dont know how to post image

	if (validateForm()) {

		updateDefaultImageMaybe();

		// If we have an image file, then send that
		// otherwise, send the image src of the preview
		// either way, use the snowflake we get back in the user post
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
					"name": document.getElementById("usernameInput").value
					, "email": document.getElementById("emailInput").value
					, "password": document.getElementById("passwordInput").value
					, "icon_id": data.icon_id
				};

				return fetch(`/api/${APIVERSION}/users`, {
					method: "post",
					body: JSON.stringify(formData)
					, headers: new Headers({'Content-Type': 'application/json'})
				});
			})
			.then(() => {
				window.location.href = "/login";
			}).catch((err) => {defaultImgCheck(err)});
	}	
});

const defaultImgCheck = (err) =>{
	if(err){  
	  document.getElementById("signUpImgTooLarge").innerHTML = "Image Too Large";
	}
	else{
	  document.getElementById("signUpImgTooLarge").innerHTML = "";
	}  
  }

document.addEventListener("DOMContentLoaded", updateDefaultImage);
