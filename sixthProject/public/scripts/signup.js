let signupForm = document.querySelector('form')
signupForm.addEventListener('submit', handleSubmit)

function handleSubmit(e) {

    //e.preventDefault() // don't submit the form yet
    
    signupForm.submit()
}