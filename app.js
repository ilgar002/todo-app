const form = document.querySelector(".todoForm")
const input = document.querySelector(".todoInput");
const taskList = document.querySelector(".todos");
const deleteAll = document.querySelector('.clearAll')
const addButton = document.querySelector('.createNewTodo')
const filterOptions = document.querySelectorAll('header .filter .option')

let todos;
if (localStorage.getItem("Todos")) {
    todos = JSON.parse(localStorage.getItem("Todos"))
}
else {
    todos = []
}

getLocal("all")
updateLocal()
countTodos()
entranceMessage()

//get data from local storage
function getLocal(status) {
    if (status == 'all') {
        for (let i = 0; i < todos.length; i++) {
            const todo = document.createElement('div');
            todo.classList.add("todo");
            if (todos[i].isCompleted == true) {
                todo.classList.add('checkDone')
            }
            const checkButton = document.createElement("button")
            checkButton.classList.add("todoCheck")
            checkButton.innerHTML = '<i class="done fa-solid fa-check"></i>'

            const todoTitle = document.createElement("span")
            todoTitle.classList.add('todoName')
            todoTitle.innerText = todos[i].name

            const form = document.createElement('form')
            form.classList.add('editForm')
            form.innerHTML = '<input class="editText" placeholder="Edit Title: "></input>'

            const editButton = document.createElement("button")
            editButton.classList.add('editTodo')
            editButton.innerHTML = '<i class="fa-solid fa-pen"></i><i class="fa-solid fa-xmark" ></i >'


            const todoDeleteBtn = document.createElement("button")
            todoDeleteBtn.classList.add('deleteTodo')
            todoDeleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'

            const buttons = document.createElement('div');
            buttons.classList.add('buttons')
            buttons.append(editButton, todoDeleteBtn)

            todo.append(checkButton, todoTitle, form, buttons);
            taskList.prepend(todo);

            checkTodo(checkButton)
            editTodo(editButton)
            deleteTodo(todoDeleteBtn)
            countTodos()
        }
    }
    else if (status == 'uncompleted') {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].isCompleted == false) {
                const todo = document.createElement('div');
                todo.classList.add("todo");
                const checkButton = document.createElement("button")
                checkButton.classList.add("todoCheck")
                checkButton.innerHTML = '<i class="done fa-solid fa-check"></i>'
                const todoTitle = document.createElement("span")
                todoTitle.classList.add('todoName')
                todoTitle.innerText = todos[i].name
                const form = document.createElement('form')
                form.classList.add('editForm')
                form.innerHTML = '<input class="editText" placeholder="Edit Title: "></input>'
                const editButton = document.createElement("button")
                editButton.classList.add('editTodo')
                editButton.innerHTML = '<i class="fa-solid fa-pen"></i><i class="fa-solid fa-xmark" ></i >'
                const todoDeleteBtn = document.createElement("button")
                todoDeleteBtn.classList.add('deleteTodo')
                todoDeleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'
                const buttons = document.createElement('div');
                buttons.classList.add('buttons')
                buttons.append(editButton, todoDeleteBtn)
                todo.append(checkButton, todoTitle, form, buttons);
                taskList.prepend(todo);
                checkTodo(checkButton)
                editTodo(editButton)
                deleteTodo(todoDeleteBtn)
            }
        }
    }
    else if (status == 'completed') {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].isCompleted == true) {
                const todo = document.createElement('div');
                todo.classList.add("todo");
                todo.classList.add('checkDone')
                const checkButton = document.createElement("button")
                checkButton.classList.add("todoCheck")
                checkButton.innerHTML = '<i class="done fa-solid fa-check"></i>'
                const todoTitle = document.createElement("span")
                todoTitle.classList.add('todoName')
                todoTitle.innerText = todos[i].name
                const form = document.createElement('form')
                form.classList.add('editForm')
                form.innerHTML = '<input class="editText" placeholder="Edit Title: "></input>'
                const editButton = document.createElement("button")
                editButton.classList.add('editTodo')
                editButton.innerHTML = '<i class="fa-solid fa-pen"></i><i class="fa-solid fa-xmark" ></i >'
                const todoDeleteBtn = document.createElement("button")
                todoDeleteBtn.classList.add('deleteTodo')
                todoDeleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'
                const buttons = document.createElement('div');
                buttons.classList.add('buttons')
                buttons.append(editButton, todoDeleteBtn)
                todo.append(checkButton, todoTitle, form, buttons);
                taskList.prepend(todo);
                checkTodo(checkButton)
                editTodo(editButton)
                deleteTodo(todoDeleteBtn)
            }
        }
    }
    entranceMessage()
}

//update local storage
function updateLocal() {
    localStorage.setItem("Todos", JSON.stringify(todos))
}

//entrance message
function entranceMessage() {
    const allTodos = document.querySelectorAll('.todo')
    const entranceMessage = document.querySelector('.entranceMessage')
    if (allTodos.length === 0) {
        entranceMessage.style.display = "block";
    }
    else {
        entranceMessage.style.display = "none";
    }
}

//create todo
function createTodo(inputText) {
    const todo = document.createElement('div');
    todo.classList.add("todo");
    const checkButton = document.createElement("button")
    checkButton.classList.add("todoCheck")
    checkButton.innerHTML = '<i class="done fa-solid fa-check"></i>'
    const todoTitle = document.createElement("span")
    todoTitle.classList.add('todoName')
    todoTitle.innerText = inputText

    const form = document.createElement('form')
    form.classList.add('editForm')
    form.innerHTML = '<input class="editText" placeholder="Edit Title: "></input>'

    const editButton = document.createElement("button")
    editButton.classList.add('editTodo')
    editButton.innerHTML = '<i class="fa-solid fa-pen"></i><i class="fa-solid fa-xmark" ></i >'

    const todoDeleteBtn = document.createElement("button")
    todoDeleteBtn.classList.add('deleteTodo')
    todoDeleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'

    const buttons = document.createElement('div');
    buttons.classList.add('buttons')
    buttons.append(editButton, todoDeleteBtn)

    todo.append(checkButton, todoTitle, form, buttons);
    taskList.prepend(todo);
    checkTodo(checkButton)
    editTodo(editButton)
    deleteTodo(todoDeleteBtn)
    let todoObj = {
        name: inputText,
        isCompleted: false
    }
    todos.push(todoObj)
    updateLocal()
    // getLocal("all")
    for (let j = 0; j < filterOptions.length; j++) {
        filterOptions[j].classList.remove('current')
    }
    filterOptions[1].classList.add('current')
    addButton.classList.remove('active');
    filterOptions[1].click()
}

//check todo
function checkTodo(checkButton) {
    checkButton.addEventListener('click', function () {
        this.parentElement.classList.toggle("checkDone")
        let checkedTodo = this.parentElement.querySelector("span").innerText
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].name == checkedTodo) {
                if (this.parentElement.classList.contains('checkDone')) {
                    todos[i].isCompleted = true
                    break
                }
                else {
                    todos[i].isCompleted = false
                    break
                }
            }
        }
        updateLocal()
        for (let j = 0; j < filterOptions.length; j++) {
            if (filterOptions[j].classList.contains('current')) {
                // filterOptions[j].click()
                setTimeout(function () {
                    filterOptions[j].click()
                }, 300)

            }
        }
    })
}

//delete todo
function deleteTodo(todoDeleteBtn) {
    todoDeleteBtn.addEventListener("click", function () {
        let deletedText = this.parentElement.parentElement.querySelector('span').innerText
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].name == deletedText) {
                todos.splice(i, 1)
            }
        }
        updateLocal()
        this.parentElement.parentElement.remove()
        countTodos()
        entranceMessage()
    })
}

input.addEventListener('input', () => {
    if (input.value.length > 0) {
        addButton.classList.add('active')
    }
    else {
        addButton.classList.remove('active');
    }
})

//input
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value.trim().length > 0) {
        createTodo(input.value)
        input.value = "";
        entranceMessage()
        countTodos()
    }
})

//count todos
function countTodos() {
    const countTodo = document.querySelectorAll(".todo").length
    const countText = document.querySelector('.countOfTodos')
    countText.innerText = (`Todos: ${countTodo}`)
}

//delete all todos
deleteAll.addEventListener("click", function () {
    const allTodos = document.querySelectorAll('.todo')
    for (let i = 0; i < allTodos.length; i++) {
        allTodos[i].remove()
    }
    todos = []
    localStorage.clear()
    countTodos()
    entranceMessage()
})

//editTodo
function editTodo(editButton) {
    editButton.addEventListener("click", function () {
        const title = this.parentElement.parentElement.querySelector('.todoName')
        const input = this.parentElement.parentElement.querySelector('.editText')
        title.classList.toggle('hide')
        input.classList.toggle('show')
        this.classList.toggle('editTodo2')
        changeTodoTitle(title, input.parentElement, input, this)
    })
}

function changeTodoTitle(title, form, input, editBtn) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].name == title.innerText) {
                todos[i].name = input.value
                break
            }
        }
        updateLocal()
        title.innerText = input.value
        title.classList.remove('hide')
        input.classList.remove('show')
        editBtn.classList.remove('editTodo2')
    })
    input.value = ''
}

//filter
for (let i = 0; i < filterOptions.length; i++) {
    filterOptions[i].addEventListener('click', function () {
        for (let j = 0; j < filterOptions.length; j++) {
            filterOptions[j].classList.remove('current')
        }
        filterOptions[i].classList.add('current')
        if (this.innerText == "All") {
            const allTodos = document.querySelectorAll('.todo')
            for (let i = 0; i < allTodos.length; i++) {
                allTodos[i].remove()
            }
            getLocal("all")
        }
        else if (this.innerText == "Uncompleted") {
            const allTodos = document.querySelectorAll('.todo')
            for (let i = 0; i < allTodos.length; i++) {
                allTodos[i].remove()
            }
            getLocal("uncompleted")
            countTodos()
        }
        else if (this.innerText == "Completed") {
            const allTodos = document.querySelectorAll('.todo')
            for (let i = 0; i < allTodos.length; i++) {
                allTodos[i].remove()
            }
            getLocal("completed")
            countTodos()
        }

    })

}
