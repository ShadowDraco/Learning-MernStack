if (apiBooks) {
    console.log(apiBooks)
    let bookList = document.querySelector('#bookList')

    let books = apiBooks.data
 
    // 66 books in the bible
    for (let i = 0; i < 11; i++) {
        bookList.insertAdjacentHTML('beforeend', `<div class='bg-secondary row bookRow'></li>`)
    }

    let bookRows = document.querySelectorAll('.bookRow')
    let count = 0
    bookRows.forEach(row => { 
        for (let j = 0; j < 11; j++) {
            bookRows[count].insertAdjacentHTML('beforeend', `<div class='col bg-gradient text-center p-3 list-group-item list-group-item-dark'> ${books[j + 11 * count].name} </li>`)
            console.log('c')
        }
        count++
    })
        
}