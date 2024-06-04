const { response } = require("express")
const { stringify } = require("querystring")

const taskKey = '@tasks'

function mudarMenu(opcao) {

    switch (opcao) {
        case '1':
            document.querySelector('#taskList').style.display = 'none'
            document.querySelector('#input').style.display = 'none'
            document.querySelector('#input2').style.display = 'none'
            document.querySelector('#divDoBotão').style.display = 'none'
            document.querySelector('.container').style.display = 'block'
            break;
        case '3':
            document.querySelector('#taskList').style.display = 'none'
            document.querySelector('#input').placeholder = 'Título da tarefa (pode ser incompleto)';
            document.querySelector('#input').style.display = 'block'
            document.querySelector('.container').style.display = 'none'
            document.querySelector('#divDoBotão').style.display = 'grid'
            document.querySelector('#input2').style.display = 'none'
            break;
        case '6':
            document.querySelector('#taskList').style.display = 'none'
            document.querySelector('.container').style.display = 'none'
            document.querySelector('#input').placeholder = 'Data de início (aaaa-mm-dd)';
            document.querySelector('#input').style.display = 'block'
            document.querySelector('#input2').placeholder = 'Data final (aaaa-mm-dd)';
            document.querySelector('#input2').style.display = 'block'
            break;
        case '9':
            document.querySelector('#taskList').style.display = 'none'
            document.querySelector('#input').placeholder = 'Nome da Pessoa (pode ser incompleto)';
            document.querySelector('#input').style.display = 'block'
            document.querySelector('.container').style.display = 'none'
            document.querySelector('#input2').style.display = 'none'
            break;
        case '10':
            document.querySelector('#taskList').style.display = 'none'
            document.querySelector('#input').placeholder = 'Nome da Pessoa (pode ser incompleto)';
            document.querySelector('#input').style.display = 'block'
            document.querySelector('.container').style.display = 'none'
            document.querySelector('#input2').style.display = 'none'
            break;
        case '11':
            document.querySelector('#taskList').style.display = 'none'
            document.querySelector('#input').placeholder = 'Nome da Pessoa (pode ser incompleto)';
            document.querySelector('#input').style.display = 'block'
            document.querySelector('.container').style.display = 'none'
            document.querySelector('#input2').style.display = 'none'
            break;
        case '12':
            document.querySelector('#taskList').style.display = 'none'
            document.querySelector('#input').placeholder = 'Nome da Pessoa (pode ser incompleto)';
            document.querySelector('#input').style.display = 'block'
            document.querySelector('.container').style.display = 'none'
            document.querySelector('#input2').style.display = 'none'
            break;
        default:
            document.querySelector('#taskList').style.display = 'none'
            document.querySelector('#input').style.display = 'none'
            document.querySelector('#input2').style.display = 'none'
            document.querySelector('#divDoBotão').style.display = 'grid'
            document.querySelector('.container').style.display = 'none'
            break;
    }
}

function menuOperacao() {
    let opcao = document.querySelector('#opcoes').value
    let input = document.querySelector('#input').value
    let input2 = document.querySelector('#input2').value

    switch (opcao) {
        case '2':
            carregarTodasTarefas()
            break;
        case '3':
            pesquisarPorTitulo(input)
            break;
        case '4':
            listarTarefasConcluidas()
            break;
        case '5':
            listarTarefasPendentes()
            break;
        case '6':
            listarTarefasConcluidasNoIntervalo(input, input2)
            break;
        case '7':
            mostrarMediaDeConclusaoDeTarefas()
            break;
        case '8':
            mostrarTarefaComDescricaoMaisLonga()
            break;
        case '9':
            mostrarTodasTarefasDeUmaPessoa(input)
            break;
        case '10':
            contarTarefasDeUmaPessoa(input)
            break;
        case '11':
            mostrarTarefaMaisRecenteDeUmaPessoa(input)
            break;
        case '12':
            mostrarTarefaMaisAntigaDeUmaPessoa(input)
            break;
    }

}

// Função para adicionar tarefa
function addTask(event) {
    event.preventDefault() // Evita o recarregamento da página

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

    form.reset()
}

async function carregarTodasTarefas() {
    event.preventDefault() // Evita o recarregamento da página

    const response = await fetch('/tasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const tasks = await response.json();
    carregarTarefas(tasks)
}

async function carregarTarefas(tasks) {
    // event.preventDefault() // Evita o recarregamento da página

    // const response = await fetch('/tasks', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // });
    // const tasks = await response.json();

    const taskList = document.querySelector('#taskList')
    taskList.innerHTML = tasks
        .map((task) => `<li><h2>Título: ${task.title}</h2><p>Descrição: ${task.description}</p>
        <p>Status: ${task.status}</p><p>Autor: ${task.author}</p>
        <p>Data de criação: ${task.creation_date}</p> <p>Data de conclusão: ${task.conclusion_date}</p>
        <button class = "removeButton" title = "Remover tarefa">️<img src="./delete-icon.png"></button>
        <button class = "editButton" title = "Editar tarefa">✏️</button>
        <button class = "completeButton" title = "Marcar como concluída">✅</button></li>`)
        .join('')
    addDialogToEditButton(0) // começa a partir do primeiro botão

    document.querySelector('#taskList').style.display = 'block'
}

async function pesquisarPorTitulo(title) {
    event.preventDefault() // Evita o recarregamento da página

    const response = await fetch(`/tasks/title/${title}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const tasks = await response.json();
    carregarTarefas(tasks)

}

async function listarTarefasConcluidas() {
    event.preventDefault() // Evita o recarregamento da página

    const response = await fetch('/tasks/completed', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const tasks = await response.json();
    carregarTarefas(tasks)
}

async function listarTarefasPendentes() {
    event.preventDefault() // Evita o recarregamento da página

    const response = await fetch('/tasks/pending', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const tasks = await response.json();
    carregarTarefas(tasks)
}

async function listarTarefasConcluidasNoIntervalo(dataInicio, dataFim) {
    event.preventDefault() // Evita o recarregamento da página

    const response = await fetch(`/tasks/due-in-period?startDate=${dataInicio}&endDate=${dataFim}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const tasks = await response.json();
    carregarTarefas(tasks)
}

async function mostrarMediaDeConclusaoDeTarefas() {
    event.preventDefault() // Evita o recarregamento da página

    const response = await fetch('/tasks/average-completion', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const tasks = await response.json();
    let p = document.createElement('p')
    p.innerText = tasks + '%'
    document.querySelector('main').appendChild(p)
}

async function mostrarTarefaComDescricaoMaisLonga() {
    event.preventDefault() // Evita o recarregamento da página

    const response = await fetch('/tasks/longest-description', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const task = await response.json();

    console.log(task)

    const taskList = document.querySelector('#taskList')
    taskList.innerHTML = 
        `<li><h2>Título: ${task.title}</h2><p>Descrição: ${task.description}</p>
        <p>Status: ${task.status}</p><p>Autor: ${task.author}</p>
        <p>Data de criação: ${task.creation_date}</p> <p>Data de conclusão: ${task.conclusion_date}</p>
        <button class = "removeButton" title = "Remover tarefa">️<img src="./delete-icon.png"></button>
        <button class = "editButton" title = "Editar tarefa">✏️</button>
        <button class = "completeButton" title = "Marcar como concluída">✅</button></li>`
    addDialogToEditButton(0) // começa a partir do primeiro botão

    document.querySelector('#taskList').style.display = 'block'
}

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