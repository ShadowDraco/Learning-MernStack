// if a user's color is passed from the server to the template to the script
if (currentUser) {
    console.log("applying user color!")
    // get the elements that have theme
    let themedEls = document.querySelectorAll('.user-color')
    themedEls.forEach(function (el) {
        // change the color of those elements
        console.log(currentUser)
        el.style.backgroundColor = currentUser.color
        console.log(el)   
    })       
}