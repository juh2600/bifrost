let imgURL = document.getElementById("userImage").src;
let fileInput = document.getElementById("iconInput");
let iconFile = null;
let imageHasBeenChanged = false;
let user_id = document.getElementById("userIdField").value;
let defaultImage = `https://www.gravatar.com/avatar/${Math.floor(
  Math.random() * 15 + 1
)}?s=200&d=retro`;

document.getElementById("emailInput").addEventListener("input", () => {
  validateEmail();
});

const validateEmail = () => {
  let input = document.getElementById("emailInput").value;
  let emailRegex = /\w+@\w+\.\w+/;
  isValid = emailRegex.test(input);
  let emailErrorMsg = document.getElementById("emailErrorMsg");
  isValid
    ? emailErrorMsg.classList.add("hidden")
    : emailErrorMsg.classList.remove("hidden");
  return isValid;
};

// TODO inline stuff
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

const updateDefaultImageMaybe = () => {
  if (imgURL.includes(`https://www.gravatar.com/avatar/`)) updateDefaultImage();
};

document
  .getElementById("usernameInput")
  .addEventListener("focusout", updateDefaultImageMaybe);
document.getElementById("usernameInput").addEventListener("input", () => {
  document.getElementById(
    "usernamePreview"
  ).innerHTML = document.getElementById("usernameInput").value;
});

const updateDefaultImage = () => {
  let userName = document.getElementById("usernameInput").value;
  // FIXME should probably (also) use encodeURIComponent
  userName = userName.replaceAll(/[ _]/g, "+");
  console.log(userName);
  imgURL = defaultImage;
  updateUserIcon(imgURL);
};

document.getElementById("iconInput").addEventListener("input", () => {
  if (validateIcon()) {
    imageURL = window.URL.createObjectURL(
      document.getElementById("iconInput").files[0]
    );
    updateUserIcon(imageURL);
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

const logoutUser = () => {
  //TODO: Logout user. Destroy session. All that jazz
  console.log("logout");
};
document.getElementById("logoutBtn").addEventListener("click", logoutUser);

const updateUserIcon = (imgURL) => {
  document.getElementById("userImage").src = imgURL;
};

const validateForm = () => {
  if (!validateEmail() || !validateUsername()) {
    if (!validateIcon()) updateDefaultImage();
    return false;
  }
  return true;
};

const logout = () => {
  location.replace("/logout");
};

const removeImage = () => {
  updateDefaultImage();
  iconFile = null;
  imageHasBeenChanged = true;
};

document
  .getElementById("removeImageBtn")
  .addEventListener("click", removeImage);

//Intercept the form submit and post from here instead
document
  .getElementById("updateUserForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    //Post image and get icon_id
    //TODO: Fix below: Dont know how to post image

    updateDefaultImageMaybe();

    // If we have an image file, then send that
    // otherwise, send the image src of the preview
    // either way, use the snowflake we get back in the user post
    const formData = new FormData(); // may or may not use this, i know
    formData.append("icon", iconFile);
    const iconPostOptions = iconFile
      ? {
          method: "POST",
          body: formData,
        }
      : {
          method: "POST",
          body: JSON.stringify({ url: imgURL }),
          headers: new Headers({ "Content-Type": "application/json" }),
        };
    if (imageHasBeenChanged) {
      fetch(`/api/${APIVERSION}/icons`, iconPostOptions)
        .then((response) => response.json())
        .then(updateUser)
        .then(() => {
          window.location.href = "/app";
        })
        .catch(
          (document.getElementById("userImgTooLarge").innerHTML =
            "Image Too Large")
        );
    } else {
      updateUser({}).then(() => {
        window.location.href = "/app";
      });
    }
  });

const updateUser = async (icon) => {
  let formData = {
    name: document.getElementById("usernameInput").value,
    email: document.getElementById("emailInput").value,
  };
  if (icon && icon.icon_id) formData.icon_id = icon.icon_id;

  return fetch(`/api/${APIVERSION}/users/${user_id}`, {
    method: "put",
    body: JSON.stringify(formData),
    headers: new Headers({ "Content-Type": "application/json" }),
  });
};
