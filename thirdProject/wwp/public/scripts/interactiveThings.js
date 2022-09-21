
/* 
    Click Reveals
*/

// Elements that can be clicked to reveal other things
let allClickReveals = document.querySelectorAll('.click-reveal');

function hideHiddenContent(e) {
    console.log('hidden an element!');
    e.target.firstElementChild.classList.add('hidden');
    
}

function revealHiddenContent(e) {

    // prevent the children of the form from trying to reveal
    if (e.currentTarget == e.target) { // the revealer has to be the parent element
        // If the element isn't visible show it
        if (e.target.firstElementChild.classList.contains('hidden')) {

            console.log('revealing a hidden element!');
            e.target.firstElementChild.classList.remove('hidden');
           
        } 
        // if it is visible hide it
        else {
            hideHiddenContent(e);
        }
    }
}

// Add event listeners on page load
allClickReveals.forEach( function(revealer) {

    // addeventlistener ('click', function, useCapture)
    // useCapture will not call the function on the parent if a child is clicked
    revealer.addEventListener('click', revealHiddenContent, false)
    
});