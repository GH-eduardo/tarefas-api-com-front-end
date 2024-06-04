
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
            document.querySelector('#divDoBotão').style.display = 'grid'
            document.querySelector('#taskList').style.display = 'none'
            document.querySelector('.container').style.display = 'none'
            document.querySelector('#input').placeholder = 'Data de início (aaaa-mm-dd)';
            document.querySelector('#input').style.display = 'block'
            document.querySelector('#input2').placeholder = 'Data final (aaaa-mm-dd)';
            document.querySelector('#input2').style.display = 'block'
            break;
        case '9':
            document.querySelector('#divDoBotão').style.display = 'grid'
            document.querySelector('#taskList').style.display = 'none'
            document.querySelector('#input').placeholder = 'Nome da Pessoa (completo)';
            document.querySelector('#input').style.display = 'block'
            document.querySelector('.container').style.display = 'none'
            document.querySelector('#input2').style.display = 'none'
            break;
        case '10':
            document.querySelector('#divDoBotão').style.display = 'grid'
            document.querySelector('#taskList').style.display = 'none'
            document.querySelector('#input').placeholder = 'Nome da Pessoa (completo)';
            document.querySelector('#input').style.display = 'block'
            document.querySelector('.container').style.display = 'none'
            document.querySelector('#input2').style.display = 'none'
            break;
        case '11':
            document.querySelector('#divDoBotão').style.display = 'grid'
            document.querySelector('#taskList').style.display = 'none'
            document.querySelector('#input').placeholder = 'Nome da Pessoa (completo)';
            document.querySelector('#input').style.display = 'block'
            document.querySelector('.container').style.display = 'none'
            document.querySelector('#input2').style.display = 'none'
            break;
        case '12':
            document.querySelector('#divDoBotão').style.display = 'grid'
            document.querySelector('#taskList').style.display = 'none'
            document.querySelector('#input').placeholder = 'Nome da Pessoa (completo)';
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

    let date = new Date()
    let dataAtual = date.toISOString().slice(0, 19).replace("T", " ");
    let data = '{ "title":"' + taskTitle + '", "description":"' + taskDescription + '", "status":"' + taskStatus + '", "author":"' + taskAuthor + '", "creation_date":"' + dataAtual + '" }'

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

    if (Array.isArray(tasks) == false) {
        tasks = [tasks]
    }

    const taskList = document.querySelector('#taskList')
    taskList.innerHTML = tasks
    .map((task) => `<li id="${task._id}"><h2>Título: ${task.title}</h2><p>Descrição: ${task.description}</p>
    <p>Status: ${task.status}</p><p>Autor: ${task.author}</p>
    <p>Data de criação: ${task.creation_date}</p> <p>Data de conclusão: ${task.conclusion_date}</p>
    <button class = "editButton" title = "Editar tarefa" onclick="dialog('${task._id}','${task.title}','${task.description}')">✏️</button>
    <button class = "removeButton" title = "Remover tarefa" onclick="remove('${task._id}')">️<img src="./delete-icon.png"></button>
    ${task.status !== 'concluída' ? '<button class = "completeButton" title = "Marcar como concluída" onclick="concluir(\'' + task._id + '\')">✅</button>' : ''}
    </li>`)
    .join('')

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

    const response = await fetch(`/tasks/created-in-period?startDate=${dataInicio}&endDate=${dataFim}`, {
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
    const resposta = await response.json();
    alert(resposta)
}

async function mostrarTarefaComDescricaoMaisLonga() {
    event.preventDefault() // Evita o recarregamento da página

    const response = await fetch('/tasks/longest-description', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const task = await response.json()
    console.log(task)
    carregarTarefas(task)
}

async function mostrarTodasTarefasDeUmaPessoa(author) {
    event.preventDefault() // Evita o recarregamento da página

    const response = await fetch(`/tasks/all/${author}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const tasks = await response.json();
    console.log(tasks)
    carregarTarefas(tasks)
}

async function contarTarefasDeUmaPessoa(author) {
    event.preventDefault() // Evita o recarregamento da página

    const response = await fetch(`/tasks/user/${author}/count`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const resposta = await response.json();
    alert(resposta)
}

async function mostrarTarefaMaisRecenteDeUmaPessoa(author) {
    event.preventDefault() // Evita o recarregamento da página

    const response = await fetch(`/tasks/user/${author}/most-recent`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const task = await response.json()
    carregarTarefas(task)
}

async function mostrarTarefaMaisAntigaDeUmaPessoa(author) {
    event.preventDefault() // Evita o recarregamento da página

    const response = await fetch(`/tasks/user/${author}/oldest`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const task = await response.json()
    carregarTarefas(task)
}

async function edit(id, title, description) {

    let data = '{ "title":"' + title + '", "description":"' + description + '" }'

    const response = await fetch(`/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    });
    const tasks = await response.json();
    document.getElementById(id).remove()
    carregarTarefas(tasks)
}

function dialog(id, title, description) {

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

    dialog.innerHTML = `
        <form id="editTaskForm">
            <label for="title">Novo Título: </label>
            <input type="text" name="title" value="${title}" id="newTitle" style="margin-bottom: 15px;"required>
            <label for="description">Nova Descrição: </label>
            <textarea name="description" id="newDescription" required>${description}</textarea>
        </form>
    `
    dialog.style = 'display: flex; flex-direction: column; align-items: center; gap: 10px;'

    saveButton.addEventListener("click", function () {
        let newTitle = document.querySelector('#newTitle').value
        let newDescription = document.querySelector('#newDescription').value

        console.log(newTitle, newDescription, title, description)

        if (newTitle != title || newDescription != description) {
            edit(id, newTitle, newDescription)
            dialog.close();
            document.querySelector('main').removeChild(dialog)
            alert('Tarefa editada com sucesso!')
        }
        else {
            dialog.close();
            document.querySelector('main').removeChild(dialog)
            alert('Não houve alterações')
        }
    });

    let div = document.createElement('div')
    div.style = 'margin-top: 10px; display: flex; gap: 10px;'
    div.appendChild(cancelButton)
    div.appendChild(saveButton)

    dialog.appendChild(div)
    dialog.open = false

    document.querySelector('main').appendChild(dialog)
    dialog.showModal()
}

async function remove(id) {
    console.log(id)
    const response = await fetch(`/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const tasks = await response.json();
    alert(tasks)
    document.getElementById(id).remove()
}

async function concluir(id) {
    let date = new Date()
    let dataAtual = date.toISOString().slice(0, 19).replace("T", " ");
    let data = '{ ' + '"status":"concluída", "conclusion_date":"' + dataAtual + '" }'

    const response = await fetch(`/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    });
    const tasks = await response.json();
    alert('Parebéns tarefa concluída! (status alterado para concluída e data de conclusão atualizada)')
    document.getElementById(id).remove()
    carregarTarefas(tasks)
}