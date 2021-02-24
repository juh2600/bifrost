


const validateForm = () => {
    let email = document.getElementById("emailInput").value;
    let password = document.getElementById("passwordInput").value;
    return (email.length > 0 && password.length > 0);
}


//Intercept the form submit and post from here instead
document.getElementById("loginForm").addEventListener("submit", event => {
    event.preventDefault();

    let userObj = {
        email: document.getElementById("emailInput").value,
        password: document.getElementById("passwordInput").value
    }
    //TODO: ROUTE DOESNT EXIST YET. ROUTE TO APP IF DATA IS 200
    fetch(`/login`, {
        method: "post",
        body: userObj
    }).then(response => {
        console.log(response);
        //TODO: If response returns a 200, route to app page
        //IF not, stay here and show errors
    });
});