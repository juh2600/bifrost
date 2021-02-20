let usernameInputId = document.getElementById("usernameInput");
let emailInputId = document.getElementById("emailInput");
let passwordInputId = document.getElementById("passwordInput");
let confirmInputId = document.getElementById("confirmInput");
let iconInputId = document.getElementById("iconInput");
let profileImgId = document.getElementById("profileImg");

let imgUrl =
  "https://www.gravatar.com/avatar/" +
  Math.floor(Math.random() * 15 + 1) +
  "?s=200&d=retro";

usernameInputId.addEventListener("input", () => {
  validateUsername();
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

emailInputId.addEventListener("input", () => {
  validateEmail();
});

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

passwordInputId.addEventListener("input", () => {
  validatePassword();
  confirmPassword();
});

const validatePassword = () => {
  let input = passwordInputId.value;
  //Minimum eight characters, at least one letter and one number
  let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  let passwordIsValid = passwordRegex.test(input);
  let passwordErrorMsg = document.getElementById("passwordErrorMsg");

  passwordIsValid
    ? passwordErrorMsg.classList.add("hidden")
    : passwordErrorMsg.classList.remove("hidden");

  return passwordIsValid;
};

confirmInputId.addEventListener("input", () => {
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

iconInputId.addEventListener("input", () => {
  validateIcon();
});

const validateIcon = () => {
  let input = iconInputId.value;
  console.log(input);
  let iconRegex = /\.(jpg|png|jpeg|svg|jfif|pjpeg|pjp)$/;
  isValid = iconRegex.test(input) || input == "";
  let iconErrorMsg = document.getElementById("iconErrorMsg");
  isValid
    ? iconErrorMsg.classList.add("hidden")
    : iconErrorMsg.classList.remove("hidden");

  if (isValid) {
    let url = window.URL.createObjectURL(iconInputId.files[0]);
    updateUserIcon(url);
  }

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
  if (!isValid) {
    return false;
  }
};

document.getElementById("removeImageBtn").addEventListener("click", () => {
  profileImgId.src =
    "https://www.gravatar.com/avatar/" +
    Math.floor(Math.random() * 15 + 1) +
    "?s=200&d=retro";
});




//Intercept the form submit and post from here instead
document.getElementById("signupForm").addEventListener("submit", event => {
  event.preventDefault();
  //Post image and get icon_id
  //TODO: Fix below: Dont know how to post image
  fetch("/api/v0/icons", {
      method: "post",
      body: imageURL
  }).then(response => (
      response.json()
  )).then(data => {
      let formData = {
          "name": document.getElementById("usernameInput").value,
          "email": document.getElementById("emailInput").value,
          "password": document.getElementById("passwordInput").value,
          "icon_id": data.icon_id
      }
      return fetch("/api/v0/users", {
          method: "post",
          body: JSON.stringify(formData)
      });
  }).then(response => (
      response.json()
  )).then(data => {
      window.location.href = "/login";
  });

});