let loginForm = document.querySelector('form')
loginForm.addEventListener('submit', handleSubmit)

function handleSubmit(e) {

    //e.preventDefault() // don't submit the form yet
    
    loginForm.submit()
}