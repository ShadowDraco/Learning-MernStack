var bible = ''
if (apiBooks) {
    // get which version of the bbible is to be loaded
    if (window.location.href.includes('king-james')) {
        bible = 'king-james'
    } else {
        bible = 'world-messianic'
    }
    // get the element that books will be loaded into
    let bookList = document.querySelector('#bookList')
    // get the books from the bible
    let books = apiBooks.data
 
    // create rows to insert columns
    for (let i = 0; i < 11; i++) {
        bookList.insertAdjacentHTML('beforeend', `<div class='bg-secondary row bookRow'></li>`)
    }

    // get the book rows from the document then insert the books into the spaces
    let bookRows = document.querySelectorAll('.bookRow')
    let count = 0
    bookRows.forEach(row => { 
        for (let j = 0; j < 11; j++) {
            // create a dive to insert into a grid, with a link that will call the next layer in the api
            let html = `<div class='col bg-gradient text-center p-3 list-group-item list-group-item-dark bible-link'> <a class="stretched-link" href="/${bible}/${books[j+11 * count].name}}"> ${books[j + 11 * count].name} </a></li>`
            bookRows[count].insertAdjacentHTML('beforeend', html)
        }
        count++
    })
        
}