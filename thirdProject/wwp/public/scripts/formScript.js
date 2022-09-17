

// Create a signup form object to manage and add an event listener to it
let signupForm = document.getElementById("signupForm")
signupForm.addEventListener("submit", userSignup)

// create login form and add event listener
let loginForm = document.getElementById("loginForm")
loginForm.addEventListener("submit", userLogin)

function userSignup(e) {
    // prevent page reload and post request
    //e.preventDefault()
    
    // Get the input fields from the form
    formFields = signupForm.getElementsByTagName("input")

    // give the user a unique id
    let id = Math.random(10000);
    formFields[0].value = id;

    // get the username and password and check if its not null
    let username = formFields[1].value ?? null
    let password = formFields[2].value ?? null

    let formInfo = signupform.getElementbyId('info')
    if (!username || !password) {
        formInfo.innerText = "Error, try again"
        return
    } else {
        formInfo.innerText = "Success!"
        signupForm.submit()
    }
}

function userLogin(e) {

}
