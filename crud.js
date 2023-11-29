// crud.js

$(document).ready(function () {

    // Função para adicionar um novo cliente
    function adicionarCliente() {
        const nome = $('#nome').val();
        const telefone = $('#telefone').val();
        const sexo = $('#sexo').val();
        const endereco = $('#endereco').val();

        const novoCliente = {
            nome: nome,
            telefone: telefone,
            sexo: sexo,
            endereco: endereco
        };

        $.ajax({
            url: '/api/data',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(novoCliente),
            success: function (data) {
                console.log('Cliente adicionado:', data);
            },
            error: function (error) {
                console.error('Erro ao adicionar cliente:', error);
            }
        });
    }

    // Função para deletar um cliente
    function deletarCliente() {
        // Substitua 'ID_DO_CLIENTE' pelo ID real do cliente que deseja deletar
        const idCliente = 'idCliente';

        $.ajax({
            url: `/api/data/${idCliente}`,
            type: 'DELETE',
            success: function (data) {
                console.log('Cliente deletado:', data);
            },
            error: function (error) {
                console.error('Erro ao deletar cliente:', error);
            }
        });
    }

    // Função para listar todos os clientes
    function listarClientes() {
        $.ajax({
            url: '/api/data',
            type: 'GET',
            success: function (data) {
                console.log('Lista de clientes:', data);
                // Aqui você pode manipular os dados conforme necessário (por exemplo, exibir na tela)
            },
            error: function (error) {
                console.error('Erro ao obter lista de clientes:', error);
            }
        });
    }

    // Função para atualizar um cliente
    function atualizarCliente() {
        // Substitua 'ID_DO_CLIENTE' pelo ID real do cliente que deseja atualizar
        const idCliente = 'idCliente';
        const nome = 'nome';
        const telefone = 'telefone';
        const sexo = 'sexo';

        const clienteAtualizado = {
            nome: nome,
            telefone: telefone,
            sexo: sexo,
            endereco: endereco
        };

        $.ajax({
            url: `/api/data/${idCliente}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(clienteAtualizado),
            success: function (data) {
                console.log('Cliente atualizado:', data);
            },
            error: function (error) {
                console.error('Erro ao atualizar cliente:', error);
            }
        });
    }

    // Event listeners para os botões no HTML
    $('#cadastrarButton').on('click', adicionarCliente);
    $('#deletarButton').on('click', deletarCliente);
    $('#listarButton').on('click', listarClientes);
    $('#atualizarButton').on('click', atualizarCliente);

});
