checkSignedInUser()

/* 
 To do form
 */

let todoForm = document.querySelector('#todo-form')
todoForm.addEventListener("submit", addItemTodoList)

function addItemTodoList(e) {

    e.preventDefault()

    // get the input with the task in it
    let formField = todoForm.querySelector('input')
    task = formField.value ?? null;

    // the small element to display error or success
    let formInfo = todoForm.querySelector('small')
    
    if (task) { // if the task is not null
        console.log("adding task:", task)

        // add items to the todo-list
        todoList = document.querySelector('#todo-list ul .wrapper')
        todoList.insertAdjacentHTML("beforeend", `<li>${task}</li>`)

        formInfo.innerHTML = 'Success!' // update the small element

        formField.value = "" // Make the field clear itself after being submitted

    } else {
        console.log('invalid input')
        formInfo.innerHTML = 'Please enter a task'
        return
    }
}

/* 
Save Form
*/

let saveForm = document.querySelector('#save-todo')
saveForm.addEventListener("submit", userSave)

function userSave(e) {

    //e.preventDefault()
    let listToSave = document.querySelector('#todo-list ul .wrapper')

    let taskNumber = 0
    listToSave.childNodes.forEach(function(child) {
        
        // get the lsit elements and put their values into an input which will 
        // go into the request
        if(child.nodeName == "LI") {
            let newInput = `<input type="text" name="task ${taskNumber}" value="${child.innerHTML}">`
            saveForm.insertAdjacentHTML("beforeend", newInput)
            taskNumber++
        }
    })

    saveForm.submit()

}

/*
Sign up and sign in forms
*/

let signupForm = document.querySelector("#signup")
signupForm.addEventListener('submit', userSignup);

function userSignup(e) {

    // you can't prevent default when the form actually posts
    // e.preventDefault() // prevent form submission and page reload

    // get the username and password
    let formFields = signupForm.getElementsByTagName('input')
    // give the user a unique id
    let id = Math.random(1000);
    console.log('new user id', id)
    formFields[0].value = id;
    // get the username and password and check if its not null
    let username = formFields[1].value ?? null
    let password = formFields[2].value ?? null

    // if a username and password are not null
    if (username && password) {
        // add text to the small element
        let formInfo = signupForm.querySelector('small')
        formInfo.innerHTML = "Success!"
        // submit the form so the user data can be posted to the server
        signupForm.submit()

    } else { // if there is not a valid value
        formInfo.innerHTML = "Please enter a value."
        return
    }

}

// take the data from the ejs template or the session storage and make the todo list
function setUserTodo() {
    
    if (userData) {
        console.log('loading saved data from server')
       
        console.log(userData)
        if (userData.todo) {
            
            let todoList = document.querySelector('#todo-list ul .wrapper')
            let userTodo = userData.todo
            let listLength = Object.keys(userTodo).length
    
            for (let i = 0; i < listLength; i++) {
                let newTask = `<li> ${userTodo[`task ${i}`]} </li>`
                todoList.insertAdjacentHTML("beforeend", newTask)
            }
        }
    }
}

// Save to session storage if a user is found so that page refresh doesn't lose the logged in user

function checkSignedInUser() {

    console.log('checking for user')

    // check if userData was passed to the template
    if (userData) {
        sessionStorage.setItem('signedIn', true)
        sessionStorage.setItem('currentUser', JSON.stringify(userData))
        setUserTodo()

        // if no data was passed check if there was data from the session
    } else if (sessionStorage.getItem('signedIn') == true) {
        console.log("loading user data from session storage")
        userData = sessionStorage.getItem('currentUser')
        setUserTodo()
    }
}
