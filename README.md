# API To-Do List com interface web feita em typescript com node.js, express e MongoDB

## Pré-requisitos:
- Ter o `Node.js` e o Banco de dados `MongoDB` instalados você pode baixa-los através de seus sites oficiais aqui e aqui respectivamente

## Para inicializar:
- execute no terminal (estando no diretório raíz do repositório): ```npm install``` para instalar as dependências necessárias e após isso ```npm run start``` para inicializar o servidor, ao realizar esse comando deverá ser impresso no terminal a mensagem: "Servidor rodando em ```http://localhost:3000```"
segure Ctrl e clique no link para abri-lo no navegador padrão

## Funcionalidades disponíveis

- Criar, listar, editar (apenas o título e a descrição) e excluír tarefas
- Pesquisar tarefas pelo título (mesmo que digitado incompleto ou com letras mínusculas/maiúsculas que diferem da tarefa registrada no banco de dados)
- Listar todas as tarefas concluídas
- Listar todas as tarefas pendentes
- Listar tarefas que foram criadas em um determinado período
- Mostrar média de conclusão de tarefas
- Mostrar tarefa com a descrição mais longa
- Mostrar todas as tarefas de alguém
- Contar tarefas de alguém
- Mostrar a tarefa mais recente de alguém
- Mostrar a tarefa mais antiga de alguém

## Outras funcionalidades

- Quando uma tarefa é criada seu status pode ser 'pendente' ou 'em andamento' e a data e o horário do momento exato fica registrada
- Ao clicar no botão verde de uma tarefa (as tarefas concluídas não exibem esse botão), o status da tarefa é alterado para concluída e o momento em que houve o clique fica salvo na data de conclusão da tarefa