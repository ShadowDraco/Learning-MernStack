/* click reveal elements */

let clickReveals = document.querySelectorAll('.click-reveal')
clickReveals.forEach(function(revealer) {
    revealer.addEventListener('click', revealHiddenEls)
   
})

function revealHiddenEls(e) {

    let revealable = e.target.querySelector('.reveal-me')
    console.log(revealable)

    if (revealable.classList.contains('hidden')) {
        revealable.classList.remove('hidden')
    } else {
        revealable.classList.add('hidden')
    }

}