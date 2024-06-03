const taskKey = '@tasks'

function mudarMenu(opcao) {

    switch (opcao) {
        case '1':
            document.querySelector('#input').style.display = 'none'
            document.querySelector('#input2').style.display = 'none'
            document.querySelector('.container').style.display = 'block'
            break;
        case '3':
            document.querySelector('#input').placeholder = 'Título da tarefa (pode ser incompleto)';
            document.querySelector('#input').style.display = 'block'
            document.querySelector('.container').style.display = 'none'
            document.querySelector('#input2').style.display = 'none'
            break;
        case '6':
            document.querySelector('.container').style.display = 'none'
            document.querySelector('#input').placeholder = 'Data de início (aaaa/mm/dd)';
            document.querySelector('#input').style.display = 'block'
            document.querySelector('#input2').placeholder = 'Data final (aaaa/mm/dd)';
            document.querySelector('#input2').style.display = 'block'
            break;
        default:
            document.querySelector('#input').style.display = 'none'
            document.querySelector('#input2').style.display = 'none'
            document.querySelector('.container').style.display = 'none'
            break;
    }
}

// Função para adicionar tarefa
function addTask(event) {
    event.preventDefault() // Evita o recarregamento da página
    const taskList = document.querySelector('#taskList')

    const form = document.querySelector('#taskForm')
    const formData = new FormData(form)

    const taskTitle = formData.get('title')
    const taskDescription = formData.get('description')
    const taskStatus = formData.get('status')
    const taskAuthor = formData.get('author')

    let data = '{ "title":"' + taskTitle + '", "description":"' + taskDescription + '", "status":"' + taskStatus + '", "author":"' + taskAuthor + '" }'

    console.log(data)

    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => console.error('Error:', error));

//     const li = document.createElement('li')

//     li.innerHTML = `
//       <h2>${taskTitle}</h2>
//       <p>${taskDescription}</p>
//   `
//     const editButton = document.createElement('button')
//     editButton.textContent = '✏️'
//     editButton.title = 'Editar tarefa'
//     editButton.classList.add('editButton')
//     li.appendChild(editButton)

//     taskList.appendChild(li)

//     // Salvar tarefas no localStorage
//     const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
//     tasks.push({ title: taskTitle, description: taskDescription })
//     localStorage.setItem(taskKey, JSON.stringify(tasks))

//     form.reset()
//     addDialogToEditButton(tasks.length - 1) // começa pelo último adicionado
}

// Carregar tarefas do localStorage ao recarregar a página
window.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
    const taskList = document.querySelector('#taskList')
    taskList.innerHTML = tasks
        .map((task) => `<li><h2>${task.title}</h2><p>${task.description}</p><button class = "editButton" title = "Editar tarefa">✏️</button></li>`)
        .join('')
    addDialogToEditButton(0) // começa a partir do primeiro botão
})

function addDialogToEditButton(start) {
    let editButtons = document.querySelectorAll('.editButton');

    for (let index = start; index < editButtons.length; index++) {
        editButtons[index].addEventListener('click', () => dialog(index));
    }
}

function dialog(taskId) {

    let dialog = document.createElement('dialog')
    let cancelButton = document.createElement('button')
    cancelButton.innerText = 'Cancelar'
    cancelButton.id = 'cancelButton'
    cancelButton.addEventListener("click", function () {
        dialog.close();
        document.querySelector('main').removeChild(dialog)
    });
    let saveButton = document.createElement('button')
    saveButton.innerText = 'Salvar'

    let div = document.createElement('div')
    div.style = 'margin-top: 10px; display: flex; gap: 10px;'
    div.appendChild(cancelButton)
    div.appendChild(saveButton)

    const tasks = JSON.parse(localStorage.getItem(taskKey)) || []

    dialog.innerHTML = `
        <form id="editTaskForm">
            <label for="title"></label>
            <input type="text" name="title" value="${tasks[taskId].title}" required>
            <label for="description"></label>
            <textarea name="description" required>${tasks[taskId].description}</textarea>
        </form>
    `
    dialog.style = 'display: flex; flex-direction: column; align-items: center;'

    dialog.appendChild(div)
    dialog.open = false

    document.querySelector('main').appendChild(dialog)
    dialog.showModal()
}

function addRemoveButton(start) {

}