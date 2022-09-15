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

    } else {
        console.log('invalid input')
        formInfo.innerHTML = 'Please enter a task'
        return
    }
}